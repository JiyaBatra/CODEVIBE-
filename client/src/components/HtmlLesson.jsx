// src/components/HtmlLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Link } from 'react-router-dom';
import CourseSidebar from './CourseSidebar';
import { FaCheckCircle, FaArrowRight, FaCode, FaHtml5, FaBookOpen, FaTrophy, FaStar } from 'react-icons/fa';

const HtmlLesson = () => {
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
    { id: 'html-lesson-1', title: "Introduction to HTML", category: "Frontend", lessons: "1 lesson", description: "Start your web development journey with HTML fundamentals.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'html-lesson-2', title: "Type of HTML element — Block or Inline", category: "Frontend", lessons: "1 lesson", description: "Understand the difference between block and inline elements.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'html-lesson-3', title: "HTML List", category: "Frontend", lessons: "1 lesson", description: "Create organized lists for your web pages.", difficulty: "Beginner", duration: "20 mins" },
    { id: 'html-lesson-4', title: "HTML Attribute", category: "Frontend", lessons: "1 lesson", description: "Add attributes to HTML elements for enhanced functionality.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'html-lesson-5', title: "HTML Media tag", category: "Frontend", lessons: "1 lesson", description: "Embed images, audio, and video into your websites.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'html-lesson-6', title: "HTML Table", category: "Frontend", lessons: "1 lesson", description: "Create and style tables for displaying data.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'html-lesson-7', title: "HTML Form", category: "Frontend", lessons: "1 lesson", description: "Build interactive forms for user input collection.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'html-lesson-8', title: "HTML Class & ID", category: "Frontend", lessons: "1 lesson", description: "Use classes and IDs for styling and JavaScript.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'html-lesson-9', title: "HTML Quiz", category: "Assessment", lessons: "1 quiz", description: "Test your HTML knowledge with interactive quizzes.", difficulty: "All Levels", duration: "15 mins", isQuiz: true },
    { id: 'html-lesson-10', title: "HTML Project", category: "Project", lessons: "1 project", description: "Build a complete HTML project to master your skills.", difficulty: "Advanced", duration: "60 mins", isProject: true }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return { bg: '#00b89420', color: '#00b894', border: '#00b894' };
      case 'Intermediate': return { bg: '#0984e320', color: '#0984e3', border: '#0984e3' };
      case 'Advanced': return { bg: '#6c5ce720', color: '#a29bfe', border: '#6c5ce7' };
      case 'All Levels': return { bg: '#fdcb6e20', color: '#fdcb6e', border: '#fdcb6e' };
      default: return { bg: '#636e7220', color: '#b2bec3', border: '#636e72' };
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="html-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaHtml5 />
          </div>
          <div className="header-text">
            <h1>HTML Mastery Course</h1>
            <p>Learn HTML from basics to advanced with hands-on projects</p>
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

      {/* Lessons Grid */}
      <div className="lesson-layout-wrapper" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="lessons-grid">
        {lessons.map((lesson, index) => {
          const difficultyStyle = getDifficultyColor(lesson.difficulty);
          const isCompleted = isDone(lesson.id);
          const isHovered = hoveredCard === index;
          
          return (
            <Link 
              key={lesson.id}
              to={`/${lesson.path || `HtmlLesson${index + 1}`}`}
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
                {lesson.isQuiz && <span className="quiz-badge">📝 QUIZ</span>}
                {lesson.isProject && <span className="project-badge">🚀 PROJECT</span>}
              </div>

              {/* Course Title */}
              <h3 className="course-title">{lesson.title}</h3>
              
              {/* Category */}
              <div className="course-category">{lesson.category}</div>
              
              {/* Lessons Count */}
              <div className="course-lessons">{lesson.lessons}</div>
              
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
        </div>
        
        <div className="desktop-sidebar" style={{ display: 'block', width: '0px', height: '0px', overflow: 'visible' }}>
          <CourseSidebar 
            coursePrefix={lessons[0]?.id ? lessons[0].id.split('-')[0] : 'course'} 
            totalLessons={lessons.length} 
            courseTitle={lessons[0]?.category || "Course"} 
          />
        </div>
      </div>

      <style jsx>{`
        .html-lesson {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
          padding: 40px 60px;
        }

        /* Header Section */
        .lessons-header {
          margin-bottom: 50px;
          animation: fadeInUp 0.6s ease;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .header-icon {
          font-size: 3.5rem;
          color: #EF4444;
          filter: drop-shadow(0 0 10px rgba(255,92,122,.9));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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
          color: #ff4d4d;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #FF5C7A;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #EF4444, #FF5C7A);
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
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
          display: block;
        }

        .course-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 77, 77, 0.3);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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

        .quiz-badge {
          padding: 4px 12px;
          background: #fdcb6e20;
          color: #fdcb6e;
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
          font-size: 1.25rem;
          margin: 0 0 8px 0;
          font-weight: 600;
          min-height: 64px;
        }

        .course-category {
          color: #FF6B81;
          font-size: 0.85rem;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .course-lessons {
          color: #888;
          font-size: 0.8rem;
          margin-bottom: 15px;
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
          background: linear-gradient(90deg,#EF4444,#FF5C7A);
          box-shadow: 0 0 15px rgba(255,92,122,.4);
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
          background: linear-gradient(90deg,#EF4444,#FF5C7A);
          box-shadow: 0 0 25px rgba(255,92,122,.6);
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
        @media (max-width: 1024px) {
          .lesson-layout-wrapper {
            flex-direction: column !important;
          }
          .desktop-sidebar {
            width: 100% !important;
            position: static !important;
            margin-top: 32px;
          }
        }
        @media (max-width: 768px) {
          .html-lesson {
            padding: 20px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .header-text h1 {
            font-size: 1.5rem;
          }

          .lessons-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

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

export default HtmlLesson;