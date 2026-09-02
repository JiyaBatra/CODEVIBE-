const Contributor = require("../../models/Contributor");

const getBearerToken = (authorization = "") => {
  const [scheme, token] = authorization.split(" ");
  return scheme === "Bearer" ? token : "";
};

const validateLeaderboardToken = (req, res) => {
  if (!process.env.LEADERBOARD_API_TOKEN) {
    return true;
  }

  const token = getBearerToken(req.headers.authorization);

  if (token === process.env.LEADERBOARD_API_TOKEN) {
    return true;
  }

  res.status(401).json({ message: "Invalid leaderboard API token" });
  return false;
};

exports.syncContributors = async (req, res) => {
  try {
    if (!validateLeaderboardToken(req, res)) {
      return;
    }

    const { contributors } = req.body;

    if (!Array.isArray(contributors)) {
      return res.status(400).json({ message: "contributors must be an array" });
    }

    const operations = contributors
      .filter((contributor) => contributor && contributor.login)
      .map((contributor) => ({
        updateOne: {
          filter: { username: contributor.login },
          update: {
            $set: {
              username: contributor.login,
              profileUrl: contributor.htmlUrl || "",
              points: Number(contributor.score) || 0,
              commits: Number(contributor.commits) || 0,
              prs: Number(contributor.mergedPullRequests) || 0,
              issues: Number(contributor.closedIssues) || 0,
            },
          },
          upsert: true,
        },
      }));

    if (operations.length > 0) {
      await Contributor.bulkWrite(operations);
    }

    res.status(200).json({
      message: "Contributor leaderboard synced successfully",
      count: operations.length,
    });
  } catch (error) {
    console.error("Contributor sync error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const contributors = await Contributor.find()
      .sort({ points: -1, username: 1 })
      .limit(100)
      .lean();

    res.status(200).json({ contributors });
  } catch (error) {
    console.error("Contributor leaderboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
