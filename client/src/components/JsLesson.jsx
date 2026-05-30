// src/components/JsLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaJs, FaBookOpen, FaTrophy, FaReact, FaDatabase, FaRocket } from 'react-icons/fa';

const JsLesson = () => {
  const [completed, setCompleted] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = (id) => completed.includes(id);

  const lessons = [
    { id: 'js-lesson-1', title: "Introduction to JS", category: "Fundamentals", lessons: "1 lesson", description: "Learn what JavaScript is and how it powers the web.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'js-lesson-2', title: "Variables & Data Types", category: "Fundamentals", lessons: "1 lesson", description: "Master variables, let, const, var, and data types.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'js-lesson-3', title: "Operators & Expressions", category: "Fundamentals", lessons: "1 lesson", description: "Learn arithmetic, comparison, and logical operators.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'js-lesson-4', title: "Conditional Statements", category: "Fundamentals", lessons: "1 lesson", description: "Master if-else, switch statements for decision making.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'js-lesson-5', title: "Loops", category: "Fundamentals", lessons: "1 lesson", description: "Learn for, while, do-while loops for iteration.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'js-lesson-6', title: "Functions", category: "Fundamentals", lessons: "1 lesson", description: "Understand functions, parameters, and return values.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'js-lesson-7', title: "Arrays", category: "Core Concepts", lessons: "1 lesson", description: "Learn array creation, manipulation, and methods.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'js-lesson-8', title: "Objects", category: "Core Concepts", lessons: "1 lesson", description: "Master objects, properties, and methods.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'js-lesson-9', title: "DOM Manipulation", category: "DOM", lessons: "1 lesson", description: "Learn to manipulate HTML elements with JavaScript.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'js-lesson-10', title: "Events", category: "DOM", lessons: "1 lesson", description: "Handle user interactions with event listeners.", difficulty: "Intermediate", duration: "35 mins" },
    { id: 'js-lesson-11', title: "String Methods", category: "Core Concepts", lessons: "1 lesson", description: "Master string manipulation methods.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'js-lesson-12', title: "Array Methods", category: "Core Concepts", lessons: "1 lesson", description: "Learn map, filter, reduce, and more array methods.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'js-lesson-13', title: "Date & Time", category: "Core Concepts", lessons: "1 lesson", description: "Work with dates and time in JavaScript.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'js-lesson-14', title: "Math & Numbers", category: "Core Concepts", lessons: "1 lesson", description: "Learn Math object and number operations.", difficulty: "Intermediate", duration: "20 mins" },
    { id: 'js-lesson-15', title: "Scope & Hoisting", category: "Advanced", lessons: "1 lesson", description: "Understand scope chains and hoisting behavior.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'js-lesson-16', title: "ES6 Features", category: "Modern JS", lessons: "1 lesson", description: "Learn modern JavaScript syntax and features.", difficulty: "Advanced", duration: "45 mins" },
    { id: 'js-lesson-17', title: "DOM Traversing", category: "DOM", lessons: "1 lesson", description: "Navigate between DOM elements efficiently.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'js-lesson-18', title: "Events Advanced", category: "DOM", lessons: "1 lesson", description: "Master event delegation and advanced event handling.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'js-lesson-19', title: "Error Handling", category: "Advanced", lessons: "1 lesson", description: "Learn try-catch and error handling strategies.", difficulty: "Advanced", duration: "25 mins" },
    { id: 'js-lesson-20', title: "JSON & AJAX", category: "API", lessons: "1 lesson", description: "Work with JSON data and AJAX requests.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'js-lesson-21', title: "Promises", category: "API", lessons: "1 lesson", description: "Master Promise-based asynchronous programming.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'js-lesson-22', title: "Async/Await", category: "API", lessons: "1 lesson", description: "Write cleaner async code with async/await.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'js-lesson-23', title: "Local & Session Storage", category: "Storage", lessons: "1 lesson", description: "Store data locally in the browser.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'js-lesson-24', title: "Fetch API", category: "API", lessons: "1 lesson", description: "Make HTTP requests with Fetch API.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'js-lesson-25', title: "JS Projects Part 1", category: "Projects", lessons: "1 project", description: "Build practical JavaScript projects.", difficulty: "Advanced", duration: "60 mins", isProject: true },
    { id: 'js-lesson-26', title: "JS Projects Part 2", category: "Projects", lessons: "1 project", description: "Continue building intermediate projects.", difficulty: "Advanced", duration: "60 mins", isProject: true },
    { id: 'js-lesson-27', title: "JS Projects Part 3", category: "Projects", lessons: "1 project", description: "Complete advanced JavaScript projects.", difficulty: "Advanced", duration: "60 mins", isProject: true },
    { id: 'js-lesson-28', title: "Local & Session Storage (MCQ)", category: "Assessment", lessons: "1 quiz", description: "Test your storage API knowledge.", difficulty: "Intermediate", duration: "15 mins", isQuiz: true },
    { id: 'js-lesson-29', title: "Shopping Website Project", category: "Project", lessons: "1 project", description: "Build a complete shopping cart website.", difficulty: "Expert", duration: "120 mins", isProject: true }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return { bg: '#00b89420', color: '#00b894', border: '#00b894' };
      case 'Intermediate': return { bg: '#0984e320', color: '#0984e3', border: '#0984e3' };
      case 'Advanced': return { bg: '#6c5ce720', color: '#a29bfe', border: '#6c5ce7' };
      case 'Expert': return { bg: '#ff767520', color: '#ff7675', border: '#ff7675' };
      default: return { bg: '#636e7220', color: '#b2bec3', border: '#636e72' };
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Projects': return <FaRocket />;
      case 'API': return <FaDatabase />;
      case 'Modern JS': return <FaReact />;
      default: return <FaJs />;
    }
  };

  return (
    <div className="js-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaJs />
          </div>
          <div className="header-text">
            <h1>JavaScript Mastery Course</h1>
            <p>Learn how to give functionality to websites with JavaScript</p>
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-stats">
            <div className="stats-left">
              <FaBookOpen className="stat-icon" />
              <span>{completedCount}/{lessons.length} Lessons Completed</span>
            </div>
            <div className="stats-right">
              {progressPercentage === 100 && <FaTrophy className="trophy-icon" />}
              <span className="progress-percent">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Key Features Banner */}
      <div className="features-banner">
        <div className="feature">
          <FaJs className="feature-icon" />
          <span>ES6+ Features</span>
        </div>
        <div className="feature">
          <span>🔄</span>
          <span>Async/Await</span>
        </div>
        <div className="feature">
          <span>🎯</span>
          <span>DOM Mastery</span>
        </div>
        <div className="feature">
          <span>🚀</span>
          <span>Real Projects</span>
        </div>
        <div className="feature">
          <span>📦</span>
          <span>API Integration</span>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="lessons-grid">
        {lessons.map((lesson, index) => {
          const difficultyStyle = getDifficultyColor(lesson.difficulty);
          const isCompleted = isDone(lesson.id);
          const isHovered = hoveredCard === index;
          
          return (
            <Link 
              key={lesson.id}
              to={`/JsLesson${index + 1}`}
              className="course-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              
            >
              {/* Difficulty Badge */}
              <div className="badge-container">
                <span 
                  className="difficulty-badge"
                  style={{
                    background: difficultyStyle.bg,
                    color: difficultyStyle.color,
                    borderColor: difficultyStyle.border
                  }}
                >
                  {lesson.difficulty.toUpperCase()}
                </span>
                {isCompleted && (
                  <span className="completed-badge">
                    <FaCheckCircle /> Completed
                  </span>
                )}
                {lesson.isProject && (
                  <span className="project-badge">🚀 PROJECT</span>
                )}
                {lesson.isQuiz && (
                  <span className="quiz-badge">📝 QUIZ</span>
                )}
              </div>

              {/* Category Icon & Title */}
              <div className="category-wrapper">
                <span className="category-icon">{getCategoryIcon(lesson.category)}</span>
                <span className="category-name">{lesson.category}</span>
              </div>

              {/* Course Title */}
              <h3 className="course-title">{lesson.title}</h3>
              
              {/* Meta Info */}
              <div className="course-meta">
                <span className="course-lessons">{lesson.lessons}</span>
                <span className="course-duration">⏱️ {lesson.duration}</span>
              </div>
              
              {/* Description */}
              <p className="course-description">{lesson.description}</p>
              
              {/* Start Button */}
              <div className="start-btn-wrapper">
                <button className="start-btn">
                  <span>Start Lesson</span>
                  <FaArrowRight className="btn-arrow" />
                </button>
              </div>

              {/* Completion overlay */}
              {isCompleted && (
                <div className="completion-overlay">
                  <FaCheckCircle />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .js-lesson {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
          padding: 40px 60px;
        }

        /* Header Section */
        .lessons-header {
          margin-bottom: 40px;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .header-icon {
          font-size: 3.5rem;
          color: #FFD166;
          filter: drop-shadow(0 0 10px rgba(255,200,87,.9));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .header-text h1 {
          font-size: 2rem;
          color: white;
          margin: 0 0 10px 0;
          font-weight: bold;
        }

        .header-text p {
          color: #a0a0a0;
          margin: 0;
          font-size: 1rem;
        }

        /* Progress Section */
        .progress-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progress-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          color: #e0e0e0;
        }

        .stats-left, .stats-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stat-icon {
          color: #FFD166;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #FFD166;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #FFD166, #facc15);
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        /* Features Banner */
        .features-banner {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          color: #a0a0a0;
          font-size: 0.9rem;
        }

        .feature-icon {
          color: #f7df1e;
        }

        /* Lessons Grid */
        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          animation: fadeInUp 0.6s ease 0.2s both;
        }

        /* Course Card */
        .course-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .course-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(247, 223, 30, 0.3);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .badge-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .difficulty-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 0.5px;
          border: 1px solid;
        }

        .completed-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          background: #00b89420;
          color: #00b894;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .project-badge {
          padding: 4px 12px;
          background: #6c5ce720;
          color: #a29bfe;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .quiz-badge {
          padding: 4px 12px;
          background: #fdcb6e20;
          color: #fdcb6e;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .category-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .category-icon {
          color: #f7df1e;
          font-size: 0.9rem;
        }

        .category-name {
          color: #f7df1e;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .course-title {
          color: white;
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          font-weight: 600;
          min-height: 64px;
        }

        .course-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .course-lessons, .course-duration {
          color: #888;
          font-size: 0.8rem;
        }

        .course-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 20px;
          min-height: 70px;
        }

        .start-btn-wrapper {
          margin-top: auto;
        }

        .start-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #FFD166;
          color: #000;
          font-weight: 700;
          box-shadow: 0 0 15px rgba(255, 209, 102, 0.4);
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }
        
        .course-category {
          color: #FACC15;
        }


        .course-card:hover .start-btn {
        background: #FFD166;
        color: #000;
        box-shadow: 0 0 25px rgba(255,209,102,.6);
        }


        .start-btn,
        .start-btn *,
        .course-card:hover .start-btn,
        .course-card:hover .start-btn * {
          color: #000;
          }
          
        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .course-card:hover .btn-arrow {
          transform: translateX(5px);
        }

        .completion-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #00b894;
          font-size: 1.2rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .js-lesson {
            padding: 20px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .header-text h1 {
            font-size: 1.5rem;
          }

          .features-banner {
            gap: 12px;
          }

          .feature {
            font-size: 0.75rem;
            padding: 5px 10px;
          }

          .lessons-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .course-card {
            padding: 20px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .lessons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default JsLesson;