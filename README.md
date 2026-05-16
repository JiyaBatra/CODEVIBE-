# CodeVibe - Learn. Practice. Master. Code.

<div align="center">

![CodeVibe Banner](https://img.shields.io/badge/CodeVibe-v1.0.0-ff4d6d)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)](https://github.com/JiyaBatra/CODEVIBE-)
[![GSSoC26](https://img.shields.io/badge/GSSoC-2026-orange)](https://gssoc.girlscript.tech/)

A modern, browser-based coding practice platform inspired by FreeCodeCamp. Learn programming through structured tasks, real-time coding and instant evaluation — **no local environment setup required**.

**[Live Demo](https://codevibeforyou.netlify.app/)** •
**[Project Structure](#project-structure)** •
**[Contributing](#contributing)** •
**[Code of Conduct](#code-of-conduct)** •
**[Community](#community)** •
**[Contact & Support](#contact--support)**

</div>

---

## What is CodeVibe?

CodeVibe removes friction from the learning journey. Whether you're a complete beginner or brushing up on fundamentals, CodeVibe provides:

- **Browser-based IDE**: Write, test, and execute code instantly in your browser
- **Structured Learning**: Follow guided modules from basics to advanced concepts
- **Instant Feedback**: Get real-time evaluation and detailed performance metrics
- **Progress Tracking**: Monitor your learning journey with comprehensive dashboards
- **Certificates**: Earn certificates upon successful completion of courses
- **Zero Setup**: No environment configuration — start coding in seconds

---

## Why CodeVibe?

| Feature | Benefit |
|---------|---------|
| **In-Browser Compiler** | Write code without installing anything—instant execution |
| **Structured Curriculum** | Learn through carefully designed lessons and exercises |
| **Automatic Evaluation** | Get instant feedback on correctness and performance |
| **Progress Dashboard** | Track completed tasks and monitor learning patterns |
| **MCQ-Based Assessment** | Comprehensive final tests to verify knowledge |
| **Certificates** | Shareable credentials upon course completion |
| **Detailed Feedback** | Identify strengths and areas for improvement |

---

## Key Features

### 1. Interactive Code Editor
- Syntax-highlighted code editor with real-time compilation
- Support for HTML, CSS, JavaScript, and C programming
- Instant output execution without leaving the platform

### 2. Structured Learning Paths
- **C Programming**: From basics to advanced concepts (17+ lessons)
- **Web Development**: HTML fundamentals (15+ lessons)
- **CSS Mastery**: Styling and responsive design (14+ lessons)
- **Database Fundamentals**: SQL and DBMS concepts (12+ lessons)

### 3. Evaluation System
- Automated solution checking
- Scoring system: 100 points for correct solutions
- Deductions for incorrect attempts following predefined rules
- Instant feedback on submissions

### 4. Progress Tracking & Analytics
- Personal dashboard with learning statistics
- Task completion history
- Performance metrics and weak area identification
- Visual progress indicators

### 5. Final Assessment
- MCQ-based comprehensive exams
- Knowledge evaluation across all topics
- Test results integrated with overall progress

### 6. Certificate System
- Digital certificates upon course completion
- Customized certificate design with student details
- Printable and shareable format

---

## Learning Paths

### Beginner Path
1. **C Fundamentals** (17 lessons)
   - Variables, data types, operators
   - Control structures and loops
   - Functions and arrays
   - String manipulation

2. **Web Basics with HTML** (15 lessons)
   - HTML structure and semantics
   - Forms and input handling
   - Accessibility principles
   - Best practices

3. **Styling with CSS** (14 lessons)
   - CSS selectors and properties
   - Flexbox and Grid layouts
   - Responsive design
   - Animations and transitions

### Intermediate Path
4. **Database Fundamentals** (12 lessons)
   - DBMS concepts
   - SQL queries and joins
   - Normalization
   - Indexing and optimization

---   

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JiyaBatra/CODEVIBE-.git
   cd CODEVIBE-
   ```

2. **Install dependencies**
   ```bash
   # Frontend setup
   cd client
   npm install
   
   # Backend setup
   cd ../server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the development servers**
   
   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd client
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
CODEVIBE-/
├── .github/                        # GitHub configuration and templates
│   ├── ISSUE_TEMPLATE/             # Issue templates for contributors
│   │   ├── bug_report.md           # Bug report template
│   │   ├── feature_request.md      # Feature request template
│   │   └── documentation.md        # Documentation improvement template
│   └── pull_request_template.md    # PR description template
├── client/                         # React frontend application
│   ├── src/
│   │   ├── components/             # React components (lessons, compiler, dashboard)
│   │   ├── assets/                 # Images, icons, static files
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   └── package.json
├── server/                         # Node.js/Express backend
│   ├── routes/                     # API endpoints
│   ├── models/                     # Database schemas
│   ├── middleware/                 # Auth and validation middleware
│   └── server.js                   # Server entry point
├── CODE_OF_CONDUCT.md              # Community standards and behavior expectations
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
└── README.md                       # This file
```

---

## API Documentation

### Authentication
- `POST /api/auth/register` - User signup
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Lessons
- `GET /api/lessons/:courseId` - Fetch lessons for a course
- `GET /api/lessons/:id` - Get specific lesson details

### Code Execution
- `POST /api/compiler/execute` - Execute user code and get results
- `POST /api/compiler/submit` - Submit solution for evaluation

### Progress Tracking
- `GET /api/progress/:userId` - Get user progress dashboard
- `POST /api/progress/track` - Record lesson completion

### Certificates
- `GET /api/certificates/:userId` - Generate certificate
- `POST /api/certificates/download` - Download certificate

---

## Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **CSS3** - Custom styling with animations and transitions
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database for data persistence
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing and security

### Deployment
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Render, Heroku, or Railway
- **Database**: MongoDB Atlas (cloud)

---

## Core Functionalities

### User Authentication
```
Sign Up → Email Verification → Complete Profile → Access Dashboard
```

### Learning Flow
```
Select Course → Browse Lessons → Read Instructions → Write Code → Submit Solution → Get Feedback
```

### Assessment Path
```
Complete All Lessons → Take Final Exam → View Results → Receive Certificate
```

---

## Future Enhancements

- [ ] Real-time code collaboration (pair programming)
- [ ] Advanced DSA practice modules with visualizations
- [ ] System programming and competitive coding tracks
- [ ] AI-powered hints and personalized learning recommendations
- [ ] Mentor/instructor dashboard for managing students
- [ ] Mobile application for on-the-go learning
- [ ] Community forum for peer support
- [ ] Leaderboards and achievement badges
- [ ] Integration with coding interview platforms

---

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help makes CodeVibe better.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CODEVIBE-.git
   cd CODEVIBE-
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests for new features

4. **Commit and push**
   ```bash
   git add .
   git commit -m 'Add amazing feature'
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Describe what your PR does
   - Reference any related issues
   - Ensure CI/CD checks pass

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## Community

Join our growing community of learners and contributors!

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and suggest features
- **Pull Requests**: Contribute code improvements
- **Email**: [contact@codevibe.dev]

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### MongoDB Connection Issues
- Verify MongoDB is running: `mongo --version`
- Check connection string in .env file
- Ensure IP whitelist includes your machine

### Compiler Errors
- Check browser console for detailed errors
- Verify code syntax before submission
- Clear browser cache and reload

---

## Performance

CodeVibe is optimized for performance:
- **Lazy loading** of course content
- **Code splitting** for faster initial load
- **Caching** of compiled results
- **Optimized API** responses with pagination

---

## Security

- JWT-based authentication with secure tokens
- Password hashing with bcrypt
- SQL injection prevention with parameterized queries
- XSS protection through input sanitization
- CORS configured for production

---

## Testing

Run the test suite:
```bash
# Frontend tests
cd client && npm test

# Backend tests
cd ../server && npm test
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by [FreeCodeCamp](https://freecodecamp.org/) and its amazing educational approach
- Built with love by the CodeVibe community
- Special thanks to all contributors and early adopters

---

## Changelog

### v1.0.0 (Current)
- Initial release with 4 core courses
- User authentication system
- Code compilation and execution
- Progress tracking dashboard
- Certificate generation

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

---

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/JiyaBatra/CODEVIBE-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JiyaBatra/CODEVIBE-/discussions)
- **Email**: jiyabatra@example.com

---

<div align="center">

Made with ❤️ by the **CodeVibe Team**

---

**[⬆ back to top](#codevibe---learn-practice-master-code)**

</div>
