// src/components/ReactLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { FaCheckCircle, FaArrowRight, FaReact, FaBookOpen, FaTrophy, FaRocket, FaCode, FaRoute } from 'react-icons/fa';

const ReactLesson = () => {
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
    { id: 'react-lesson-1', title: "Introduction to React", category: "Fundamentals", lessons: "1 lesson", description: "Learn what React is and why it's the most popular frontend library.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'react-lesson-2', title: "JSX Basics", category: "Fundamentals", lessons: "1 lesson", description: "Master JSX syntax and expression embedding in React.", difficulty: "Beginner", duration: "20 mins" },
    { id: 'react-lesson-3', title: "Components & Props", category: "Core Concepts", lessons: "1 lesson", description: "Create functional and class components with props.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'react-lesson-4', title: "State in React", category: "Core Concepts", lessons: "1 lesson", description: "Manage component state with useState hook.", difficulty: "Intermediate", duration: "35 mins" },
    { id: 'react-lesson-5', title: "Conditional Rendering", category: "Core Concepts", lessons: "1 lesson", description: "Implement conditional rendering techniques in React.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'react-lesson-6', title: "Lists and Keys", category: "Core Concepts", lessons: "1 lesson", description: "Render dynamic lists with proper key management.", difficulty: "Intermediate", duration: "20 mins" },
    { id: 'react-lesson-7', title: "Forms", category: "Forms & Inputs", lessons: "1 lesson", description: "Build and handle form submissions in React.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'react-lesson-8', title: "useEffect Hook", category: "Hooks", lessons: "1 lesson", description: "Handle side effects with the useEffect hook.", difficulty: "Intermediate", duration: "35 mins" },
    { id: 'react-lesson-9', title: "Conditional Rendering (Advanced)", category: "Core Concepts", lessons: "1 lesson", description: "Advanced patterns for conditional rendering.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'react-lesson-10', title: "Lifting State Up", category: "State Management", lessons: "1 lesson", description: "Share state between components by lifting state up.", difficulty: "Advanced", duration: "30 mins" },
    { id: 'react-lesson-11', title: "React Router Basics", category: "Routing", lessons: "1 lesson", description: "Implement client-side routing with React Router.", difficulty: "Advanced", duration: "40 mins" },
    { id: 'react-lesson-12', title: "Forms & Controlled Components", category: "Forms & Inputs", lessons: "1 lesson", description: "Master controlled components for form handling.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'react-lesson-13', title: "useEffect Hook (Advanced)", category: "Hooks", lessons: "1 lesson", description: "Advanced patterns and cleanup in useEffect.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'react-lesson-14', title: "Final Project - Complete React App", category: "Projects", lessons: "1 project", description: "Build a complete React application with all concepts learned.", difficulty: "Expert", duration: "120 mins", isProject: true }
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

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Routing': return <FaRoute />;
      case 'Projects': return <FaRocket />;
      case 'Hooks': return <FaCode />;
      default: return <FaReact />;
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="react-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaReact />
          </div>
          <div className="header-text">
            <h1>React Mastery Course</h1>
            <p>Build modern web applications with React.js - The most popular frontend library</p>
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
          <FaReact className="feature-icon" />
          <span>React 18+</span>
        </div>
        <div className="feature">
          <span>⚛️</span>
          <span>Hooks</span>
        </div>
        <div className="feature">
          <span>📦</span>
          <span>Components</span>
        </div>
        <div className="feature">
          <span>🎨</span>
          <span>JSX</span>
        </div>
        <div className="feature">
          <FaRoute className="feature-icon" />
          <span>React Router</span>
        </div>
        <div className="feature">
          <span>🚀</span>
          <span>Final Project</span>
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
              to={`/ReactLesson${index + 1}`}
              className="course-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
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
                  <span className="project-badge">🚀 FINAL PROJECT</span>
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
        .react-lesson {
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
          color: #61dafb;
          filter: drop-shadow(0 0 12px rgba(97, 218, 251, 0.9));
          animation: spin 10s linear infinite, float 3s ease-in-out infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
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
          color: #61dafb;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #61dafb;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #61dafb, #38bdf8);
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
          color: #61dafb;
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
          border-color: rgba(97, 218, 251, 0.3);
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
          color: #61dafb;
          font-size: 0.9rem;
        }

        .category-name {
          color: #61dafb;
          font-size: 0.8rem;
          font-weight: 500;
        }

        
        .start-btn,
        .start-btn *,
        .course-card:hover .start-btn,
        .course-card:hover .start-btn * {
          color: #08173d;
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
          background: linear-gradient(90deg,#61dafb,#38bdf8);
          border: none;
          border-radius: 8px;
          color: #1a1a2e;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .course-card:hover .start-btn {
          background: #4fa8d1;
          gap: 12px;
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
          .react-lesson {
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

export default ReactLesson;