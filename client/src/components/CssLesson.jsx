// src/components/CssLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { FaCheckCircle, FaArrowRight, FaCss3Alt, FaBookOpen, FaTrophy, FaPaintBrush, FaMobileAlt } from 'react-icons/fa';

const CssLesson = () => {
  const [completed, setCompleted] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = id => completed.includes(id);

  const lessons = [
    { id: 'css-lesson-1', title: "Introduction to CSS", category: "Frontend", lessons: "1 lesson", description: "Learn how to style beautiful websites with CSS.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'css-lesson-2', title: "CSS Syntax & Selectors", category: "Frontend", lessons: "1 lesson", description: "Master CSS selectors to target any HTML element.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'css-lesson-3', title: "CSS Colors & Backgrounds", category: "Frontend", lessons: "1 lesson", description: "Add colors, gradients, and backgrounds to your designs.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'css-lesson-4', title: "CSS Fonts & Text", category: "Frontend", lessons: "1 lesson", description: "Style typography and text elements beautifully.", difficulty: "Beginner", duration: "20 mins" },
    { id: 'css-lesson-5', title: "CSS Box Model", category: "Frontend", lessons: "1 lesson", description: "Understand the core concept of box model in CSS.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'css-lesson-6', title: "CSS Margin & Padding", category: "Frontend", lessons: "1 lesson", description: "Master spacing and layout with margin & padding.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'css-lesson-7', title: "CSS Border & Outline", category: "Frontend", lessons: "1 lesson", description: "Create borders and outlines for visual separation.", difficulty: "Beginner", duration: "20 mins" },
    { id: 'css-lesson-8', title: "CSS Display & Visibility", category: "Frontend", lessons: "1 lesson", description: "Control element display and visibility states.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'css-lesson-9', title: "CSS Positioning", category: "Frontend", lessons: "1 lesson", description: "Master absolute, relative, fixed, and sticky positioning.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'css-lesson-10', title: "CSS Flexbox", category: "Frontend", lessons: "1 lesson", description: "Build flexible and responsive layouts with Flexbox.", difficulty: "Intermediate", duration: "45 mins" },
    { id: 'css-lesson-11', title: "CSS Grid", category: "Frontend", lessons: "1 lesson", description: "Create powerful 2D layouts with CSS Grid.", difficulty: "Advanced", duration: "45 mins" },
    { id: 'css-lesson-12', title: "CSS Transitions & Animations", category: "Frontend", lessons: "1 lesson", description: "Add smooth animations and transitions to elements.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'css-lesson-13', title: "CSS Project", category: "Project", lessons: "1 project", description: "Build a complete website using all CSS concepts.", difficulty: "Advanced", duration: "60 mins", isProject: true },
    { id: 'css-lesson-14', title: "Shopping Site Styling", category: "Project", lessons: "1 project", description: "Style a fully functional e-commerce website.", difficulty: "Advanced", duration: "90 mins", isProject: true }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return { bg: '#00b89420', color: '#00b894', border: '#00b894' };
      case 'Intermediate': return { bg: '#0984e320', color: '#0984e3', border: '#0984e3' };
      case 'Advanced': return { bg: '#6c5ce720', color: '#a29bfe', border: '#6c5ce7' };
      default: return { bg: '#636e7220', color: '#b2bec3', border: '#636e72' };
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="css-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaCss3Alt />
          </div>
          <div className="header-text">
            <h1>CSS Mastery Course</h1>
            <p>Learn how to style beautiful and responsive websites with CSS</p>
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
          <FaPaintBrush className="feature-icon" />
          <span>Modern CSS3</span>
        </div>
        <div className="feature">
          <FaMobileAlt className="feature-icon" />
          <span>Responsive Design</span>
        </div>
        <div className="feature">
          <span>🎨</span>
          <span>Flexbox & Grid</span>
        </div>
        <div className="feature">
          <span>✨</span>
          <span>Animations</span>
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
              to={`/CssLesson${index + 1}`}
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
                  <span className="project-badge">🚀 PROJECT</span>
                )}
              </div>

              {/* Course Title */}
              <h3 className="course-title">{lesson.title}</h3>
              
              {/* Category */}
              <div className="course-category">{lesson.category}</div>
              
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
        .css-lesson {
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
          color: #08173D;
          filter: drop-shadow(0 0 10px #ffffff);
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
          color: #2965f1;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #4CC9F0;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg,#08173D,#162456);
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        /* Features Banner */
        .features-banner {
          display: flex;
          justify-content: center;
          gap: 30px;
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
          color: #2965f1;
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
            background: linear-gradient(
    135deg,
    rgba(192,132,252,0.12),
    rgba(236,72,153,0.08)
  );
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

        .course-card:hover .start-btn {
          background: linear-gradient(90deg,#08173D,#162456);
          box-shadow: 0 0 25px rgba(76, 201, 240, 0.6);
          transform: translateY(-2px);
        }

        .badge-container {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
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

        .course-title {
          color: white;
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          font-weight: 600;
          min-height: 64px;
        }

        .course-category {
          color: #ec4899;
          font-size: 0.85rem;
          margin-bottom: 8px;
          font-weight: 500;
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
          background: linear-gradient(90deg,#08173D,#162456);
          box-shadow: 0 0 15px rgba(76, 201, 240, 0.4);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .course-card:hover .start-btn {
          background: #1a4ec4;
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
          .css-lesson {
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
            gap: 15px;
          }

          .feature {
            font-size: 0.8rem;
            padding: 6px 12px;
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

export default CssLesson;