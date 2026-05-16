

# Contributing to CodeVibe

Thank you for your interest in contributing to CodeVibe! We're excited to have you help make coding education more accessible and engaging.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Contributions](#making-contributions)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Style Guide](#style-guide)
- [Review Process](#review-process)

---

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher (or yarn)
- Git 2.x or higher
- GitHub account with SSH keys configured

### Areas to Contribute

1. **Code**
   - Bug fixes
   - New features
   - Performance improvements
   - Code refactoring

2. **Documentation**
   - README improvements
   - API documentation
   - Tutorial writing
   - Comment clarifications

3. **Testing**
   - Unit tests
   - Integration tests
   - End-to-end tests
   - Bug reproductions

4. **Design**
   - UI/UX improvements
   - CSS enhancements
   - Component design
   - Accessibility improvements

---

## Development Setup

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/CODEVIBE-.git
cd CODEVIBE-
git remote add upstream https://github.com/JiyaBatra/CODEVIBE-.git
```

### 2. Create a Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/issue-name
```

### 3. Install Dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend (from server directory)
npm run dev

# Terminal 2 - Frontend (from client directory)
npm run dev
```

### 5. Verify Setup
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: Must be running locally or connection configured

---

## Making Contributions

### Small Contributions (Documentation, Minor Fixes)

1. Make your changes
2. Test locally
3. Commit with a clear message
4. Push to your fork
5. Create a PR

### Medium Contributions (Bug Fixes, Small Features)

1. Discuss in an issue first (if applicable)
2. Create a feature branch
3. Write tests for your changes
4. Document your code
5. Follow code style guidelines
6. Create a PR with description

### Large Contributions (Major Features)

1. Open an issue to discuss the feature
2. Wait for maintainer feedback
3. Get approval before implementing
4. Follow complete development process
5. Write comprehensive tests
6. Update all relevant documentation

---

## Assignment Guidelines

### Proposal and planning
- Start by opening an issue labeled `assignment` or `learning-content`.
- Describe the learning objective, expected outcome, and how the assignment complements existing lessons.
- Include example input/output, diagrams, or a short task description so reviewers can understand the scope.

### Implementation requirements
- Work in a dedicated branch like `assignment/<topic>` or `feature/<issue-number>-assignment`.
- Keep each assignment focused, accessible, and aligned with CodeVibe style.
- Document any new lesson content, sample files, or interactive examples clearly.
- Avoid duplicating content already covered in the repository.

### Submission expectations
- Reference the related issue in your pull request.
- Add a short summary of how learners will use the assignment.
- Include screenshots, demo steps, or verification instructions when applicable.
- If a contribution includes external references, cite sources and keep explanations original.

### What we do not accept
- Copy/pasted assignments from other sites without original teaching content.
- Off-topic projects unrelated to the course path.
- Duplicate material that repeats existing lessons.
- Assignments submitted without clear review or testing steps.

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or dependencies

### Scope
- `client` - Frontend/React changes
- `server` - Backend/Node.js changes
- `auth` - Authentication related
- `compiler` - Code execution related
- `dashboard` - Progress tracking related
- `certificates` - Certificate generation related

### Subject
- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

### Body
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line
- Use bullet points for multiple changes

### Footer
- Reference issues: `Fixes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples
```
feat(compiler): add C language support

Implement C compiler integration using gcc.
Users can now write, compile, and execute C code
in the browser with proper error messages.

Fixes #42
```

```
fix(auth): resolve token expiration issue

Tokens were not being refreshed on page reload.
Implemented automatic token refresh using
refresh token rotation.

Fixes #89
```

---

## Pull Request Process

### Before Creating a PR
- [ ] Synced fork with upstream main branch
- [ ] Tested changes locally
- [ ] Added/updated tests for changes
- [ ] Updated relevant documentation
- [ ] Ran linter and fixed issues
- [ ] Ensured no console errors/warnings

### PR Title Format
```
[type]: Short description of changes
```

Examples:
- `[feat]: Add dark mode support`
- `[fix]: Fix memory leak in compiler`
- `[docs]: Update API documentation`

### PR Description Template

-  Use the template: [Pull Request Template](.github/pull_request_template.md)

> **Note:** This template is automatically loaded when you open a new PR.
> Fill in every section — incomplete PRs may be closed without review.

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## How to Test
Steps to test the changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the code style
- [ ] I have performed self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] New tests added/updated
- [ ] Tests pass locally
- [ ] No new warnings generated
```

### PR Review
- Maintainers will review within 2-3 days
- Changes may be requested
- Be responsive to feedback
- Push additional commits to fix issues
- Request re-review when ready

### Merging
- PRs are merged by maintainers
- Commits are squashed or rebased based on project preference
- Delete your branch after merge

---

## Reporting Issues

### Bug Report Template

- Use the template: [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)

### Bug Report Best Practices
- Use clear, descriptive titles
- Provide minimal reproducible example
- Include relevant browser console errors
- Test on latest version first
- Search existing issues before reporting

### Feature Request Template

- Use the template: [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)

### Feature Request Best Practices
- Check existing issues/discussions first
- Provide clear use cases
- Consider impact on other features
- Be open to alternative solutions
- Discuss before implementing

### Documentation Request Template

- Use the template: [Documentation Improvement](.github/ISSUE_TEMPLATE/documentation.md)

### Documentation Request Best Practices
- Specify the exact file or section that needs improvement
- Explain why the current content is unclear or missing
- Suggest what the corrected or added content should say
- Link to any external references that support your suggestion
- Keep scope small, one doc issue per report

---

## Style Guide

### JavaScript/React
```javascript
// Use const by default, let when needed
const username = 'John';

// Use arrow functions
const handleClick = () => {
  // implementation
};

// Component naming - PascalCase
function UserProfile() {
  return <div>Profile</div>;
}

// Variable/function naming - camelCase
const userData = {};
const fetchUserData = () => {};

// Use destructuring
const { name, email } = user;

// Template literals for strings
const message = `Hello, ${name}!`;
```

### CSS
```css
/* Use meaningful class names */
.course-card {
  /* properties */
}

/* Avoid inline styles */
/* Use CSS variables */
.container {
  color: var(--primary-color);
}

/* Organize properties logically */
.card {
  /* Layout properties */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  margin: 1rem;
  padding: 1.5rem;
  
  /* Visual properties */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Comments
```javascript
// Single line comment for code explanation
const result = calculateTotal(); // explains what this does

/**
 * Multi-line comment for functions
 * @param {string} name - User name
 * @returns {object} User data
 */
function getUserData(name) {
  // implementation
}
```

---

## Review Process

### What Maintainers Look For
1. **Code Quality**
   - Follows project style guide
   - Clear and maintainable
   - Proper error handling
   - No unnecessary complexity

2. **Tests**
   - Tests for new features
   - Tests for bug fixes
   - Good test coverage
   - Meaningful test descriptions

3. **Documentation**
   - Code comments where needed
   - README updates if applicable
   - API documentation for new endpoints
   - Example usage for complex features

4. **Performance**
   - No unnecessary re-renders
   - Efficient algorithms
   - Proper caching
   - Minimal bundle size impact

### Timeline
- **2-3 days**: Initial review
- **24 hours**: Response to requested changes
- **1 week**: Re-review and merge decision

---

## Development Workflow Example

```bash
# 1. Create feature branch
git checkout -b feature/add-dark-mode

# 2. Make changes and commit
git add .
git commit -m "feat(ui): add dark mode support"

# 3. Keep updated with upstream
git fetch upstream
git rebase upstream/main

# 4. Push to your fork
git push origin feature/add-dark-mode

# 5. Create PR on GitHub

# 6. Address feedback (if any)
git add .
git commit -m "style: adjust dark mode colors based on feedback"
git push origin feature/add-dark-mode

# 7. PR merged and branch deleted
```

---

## Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## Getting Help

- **GitHub Issues**: Use for bugs and features
- **GitHub Discussions**: Use for questions and ideas
- **Email**: contribute@codevibe.dev

---

## Recognition

Contributors will be recognized in:
- README contributors section
- GitHub contributors page
- Monthly community highlights
- Special badges for major contributions

---

## Final Notes

- Start small with documentation or simple bug fixes
- Read existing code to understand patterns
- Don't hesitate to ask questions
- Be patient with review process
- Have fun learning and contributing!

Thank you for making CodeVibe better! 🚀

---

