const DEFAULT_MAX_OPEN_ISSUES = 5;

const IGNORED_LOGINS = new Set([
  "github-actions[bot]",
  "dependabot[bot]",
  "dependabot-preview[bot]",
]);

function getIgnoredLogins(owner) {
  const configuredLogins = (process.env.MODERATION_EXCLUDED_LOGINS || "")
    .split(",")
    .map((login) => login.trim())
    .filter(Boolean);

  return new Set(
    [...IGNORED_LOGINS, owner, ...configuredLogins].map((login) =>
      login.toLowerCase()
    )
  );
}

function isIgnoredLogin(login, ignoredLogins) {
  return (
    !login ||
    ignoredLogins.has(login.toLowerCase()) ||
    login.toLowerCase().endsWith("[bot]")
  );
}

function normalizeTitle(title) {
  return (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getMaxOpenIssues() {
  const configuredLimit = Number.parseInt(process.env.MAX_OPEN_ISSUES, 10);
  return Number.isFinite(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : DEFAULT_MAX_OPEN_ISSUES;
}

async function commentAndCloseIssue({
  github,
  context,
  issueNumber,
  comment,
  stateReason = "not_planned",
}) {
  const { owner, repo } = context.repo;

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: comment,
  });

  await github.rest.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    state: "closed",
    state_reason: stateReason,
  });
}

async function closePullRequest({ github, context, pullNumber, comment }) {
  const { owner, repo } = context.repo;

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body: comment,
  });

  await github.rest.pulls.update({
    owner,
    repo,
    pull_number: pullNumber,
    state: "closed",
  });
}

async function searchAll(github, q) {
  const items = [];
  let page = 1;

  while (page <= 10) {
    const response = await github.rest.search.issuesAndPullRequests({
      q,
      per_page: 100,
      page,
    });

    items.push(...response.data.items);

    if (response.data.items.length < 100 || items.length >= 1000) {
      break;
    }

    page += 1;
  }

  return items;
}

async function getIssueAssignees({ github, context, issueNumber }) {
  const { owner, repo } = context.repo;
  const response = await github.rest.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  });

  return (response.data.assignees || []).map((assignee) =>
    assignee.login.toLowerCase()
  );
}

function findReferencedIssueNumbers(text) {
  const issueNumbers = new Set();
  const value = text || "";
  const patterns = [
    /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi,
    /#(\d+)/g,
  ];

  for (const pattern of patterns) {
    let match = pattern.exec(value);

    while (match) {
      issueNumbers.add(Number.parseInt(match[1], 10));
      match = pattern.exec(value);
    }
  }

  return [...issueNumbers].filter(Number.isFinite);
}

async function enforceIssueLimit({ github, context, issue, core, ignoredLogins }) {
  const { owner, repo } = context.repo;
  const login = issue.user && issue.user.login;

  if (isIgnoredLogin(login, ignoredLogins)) {
    core.info(`Skipping issue limit for ${login || "unknown user"}.`);
    return;
  }

  const maxOpenIssues = getMaxOpenIssues();
  const openIssues = await searchAll(
    github,
    `repo:${owner}/${repo} is:issue is:open author:${login}`
  );

  if (openIssues.length <= maxOpenIssues) {
    core.info(`${login} has ${openIssues.length} open issue(s).`);
    return;
  }

  const reason = [
    `Closing this issue because @${login} currently has ${openIssues.length} open issues in this repository.`,
    "",
    `Please keep at most ${maxOpenIssues} open issues at a time so contributors can review and assign work fairly.`,
  ].join("\n");

  for (const openIssue of openIssues) {
    await commentAndCloseIssue({
      github,
      context,
      issueNumber: openIssue.number,
      comment: reason,
    });
  }
}

async function closeDuplicateAssignedIssue({
  github,
  context,
  issue,
  core,
  ignoredLogins,
}) {
  const { owner, repo } = context.repo;
  const login = issue.user && issue.user.login;

  if (isIgnoredLogin(login, ignoredLogins)) {
    core.info(`Skipping duplicate check for ${login || "unknown user"}.`);
    return;
  }

  const normalizedCurrentTitle = normalizeTitle(issue.title);

  if (!normalizedCurrentTitle) {
    return;
  }

  const openIssues = await searchAll(
    github,
    `repo:${owner}/${repo} is:issue is:open in:title "${issue.title.replace(/"/g, '\\"')}"`
  );

  const duplicate = openIssues.find((candidate) => {
    if (candidate.number === issue.number) {
      return false;
    }

    if (normalizeTitle(candidate.title) !== normalizedCurrentTitle) {
      return false;
    }

    return Array.isArray(candidate.assignees) && candidate.assignees.length > 0;
  });

  if (!duplicate) {
    core.info(`No assigned duplicate found for issue #${issue.number}.`);
    return;
  }

  const assignees = duplicate.assignees
    .map((assignee) => `@${assignee.login}`)
    .join(", ");

  await commentAndCloseIssue({
    github,
    context,
    issueNumber: issue.number,
    comment: [
      `Closing this issue as a duplicate of #${duplicate.number}.`,
      "",
      `That issue is already assigned to ${assignees}, so please continue the discussion there.`,
    ].join("\n"),
  });
}

async function moderateIssue({ github, context, core }) {
  const issue = context.payload.issue;

  if (!issue || issue.pull_request || issue.state !== "open") {
    return;
  }

  const ignoredLogins = getIgnoredLogins(context.repo.owner);

  await closeDuplicateAssignedIssue({
    github,
    context,
    issue,
    core,
    ignoredLogins,
  });

  await enforceIssueLimit({
    github,
    context,
    issue,
    core,
    ignoredLogins,
  });
}

async function moderatePullRequest({ github, context, core }) {
  const pullRequest = context.payload.pull_request;

  if (!pullRequest || pullRequest.state !== "open") {
    return;
  }

  const ignoredLogins = getIgnoredLogins(context.repo.owner);
  const login = pullRequest.user && pullRequest.user.login;

  if (isIgnoredLogin(login, ignoredLogins)) {
    core.info(`Skipping pull request moderation for ${login || "unknown user"}.`);
    return;
  }

  const issueNumbers = findReferencedIssueNumbers(
    `${pullRequest.title}\n${pullRequest.body || ""}`
  );

  if (issueNumbers.length === 0) {
    await closePullRequest({
      github,
      context,
      pullNumber: pullRequest.number,
      comment: [
        "Closing this pull request because it does not reference an assigned issue.",
        "",
        "Please ask to be assigned to an issue first, then open a pull request that references it with `Fixes #issue-number` or `Closes #issue-number`.",
      ].join("\n"),
    });
    return;
  }

  for (const issueNumber of issueNumbers) {
    let assignees = [];

    try {
      assignees = await getIssueAssignees({
        github,
        context,
        issueNumber,
      });
    } catch (error) {
      core.warning(`Could not read linked issue #${issueNumber}: ${error.message}`);
      continue;
    }

    if (assignees.includes(login.toLowerCase())) {
      core.info(`Pull request #${pullRequest.number} is linked to assigned issue #${issueNumber}.`);
      return;
    }
  }

  await closePullRequest({
    github,
    context,
    pullNumber: pullRequest.number,
    comment: [
      "Closing this pull request because the linked issue is not assigned to you.",
      "",
      `Linked issue(s): ${issueNumbers.map((number) => `#${number}`).join(", ")}`,
      "",
      "Please ask a maintainer to assign the issue to you before opening a pull request.",
    ].join("\n"),
  });
}

async function moderateContributions({ github, context, core }) {
  if (context.eventName === "issues") {
    await moderateIssue({ github, context, core });
    return;
  }

  if (context.eventName === "pull_request_target") {
    await moderatePullRequest({ github, context, core });
  }
}

module.exports = {
  moderateContributions,
};
