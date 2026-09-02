// src/components/MongoLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Link } from 'react-router-dom';
import CourseSidebar from './CourseSidebar';
import { FaCheckCircle, FaArrowRight, FaDatabase, FaBookOpen, FaTrophy, FaSearch, FaPlus, FaEdit, FaTrash, FaChartLine } from 'react-icons/fa';

const MongoLesson = () => {
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
    { id: 'mongo-lesson-1', title: "Introduction & Insert One", category: "CRUD Operations", lessons: "1 lesson", description: "Learn MongoDB basics and insert single documents into collections.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'mongo-lesson-2', title: "Find Documents", category: "CRUD Operations", lessons: "1 lesson", description: "Master querying and finding documents with filters.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'mongo-lesson-3', title: "Insert Many", category: "CRUD Operations", lessons: "1 lesson", description: "Insert multiple documents efficiently in one operation.", difficulty: "Beginner", duration: "20 mins" },
    { id: 'mongo-lesson-4', title: "Update Documents", category: "CRUD Operations", lessons: "1 lesson", description: "Update existing documents using update operators.", difficulty: "Intermediate", duration: "35 mins" },
    { id: 'mongo-lesson-5', title: "Delete Documents", category: "CRUD Operations", lessons: "1 lesson", description: "Remove documents from collections safely.", difficulty: "Intermediate", duration: "20 mins" },
    { id: 'mongo-lesson-6', title: "CRUD API with Node.js", category: "Integration", lessons: "1 lesson", description: "Build a complete CRUD API integrating MongoDB with Node.js.", difficulty: "Advanced", duration: "60 mins", isProject: true },
    { id: 'mongo-lesson-7', title: "Aggregation", category: "Advanced", lessons: "1 lesson", description: "Master MongoDB aggregation pipeline for data processing.", difficulty: "Advanced", duration: "45 mins" },
    { id: 'mongo-lesson-8', title: "Mini Project", category: "Projects", lessons: "1 project", description: "Build a complete application using all MongoDB concepts.", difficulty: "Advanced", duration: "90 mins", isProject: true }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return { bg: '#00b89420', color: '#00b894', border: '#00b894' };
      case 'Intermediate': return { bg: '#0984e320', color: '#0984e3', border: '#0984e3' };
      case 'Advanced': return { bg: '#6c5ce720', color: '#a29bfe', border: '#6c5ce7' };
      default: return { bg: '#636e7220', color: '#b2bec3', border: '#636e72' };
    }
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'CRUD Operations': return <FaDatabase />;
      case 'Integration': return <FaDatabase />;
      case 'Advanced': return <FaChartLine />;
      case 'Projects': return <FaDatabase />;
      default: return <FaDatabase />;
    }
  };

  const getOperationIcon = (title) => {
    if (title.includes("Insert")) return <FaPlus />;
    if (title.includes("Find")) return <FaSearch />;
    if (title.includes("Update")) return <FaEdit />;
    if (title.includes("Delete")) return <FaTrash />;
    return null;
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="mongo-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaDatabase />
          </div>
          <div className="header-text">
            <h1>MongoDB Mastery Course</h1>
            <p>Learn the leading NoSQL database - Store, query, and manage data efficiently</p>
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
          <FaPlus className="feature-icon" />
          <span>Create</span>
        </div>
        <div className="feature">
          <FaSearch className="feature-icon" />
          <span>Read</span>
        </div>
        <div className="feature">
          <FaEdit className="feature-icon" />
          <span>Update</span>
        </div>
        <div className="feature">
          <FaTrash className="feature-icon" />
          <span>Delete</span>
        </div>
        <div className="feature">
          <span>📊</span>
          <span>Aggregation</span>
        </div>
        <div className="feature">
          <span>🚀</span>
          <span>Node.js Integration</span>
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
          const operationIcon = getOperationIcon(lesson.title);
          
          return (
            <Link 
              key={lesson.id}
              to={`/MongoLesson${index + 1}`}
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

              {/* Category Icon & Title */}
              <div className="category-wrapper">
                <span className="category-icon">{getCategoryIcon(lesson.category)}</span>
                <span className="category-name">{lesson.category}</span>
              </div>

              {/* Operation Icon */}
              {operationIcon && (
                <div className="operation-icon">
                  {operationIcon}
                </div>
              )}

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
        .mongo-lesson {
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
          color: #3CB371;
          filter: drop-shadow(0 0 10px rgba(60, 179, 113, 0.5));
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
          color: #3CB371;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #3CB371;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg,#2E8B57,#3CB371);
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
          color: #4db33d;
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
          border-color: rgba(77, 179, 61, 0.3);
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
          color: #3CB371;
          font-size: 0.9rem;
        }

        .category-name {
          color: #3CB371;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .operation-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 2rem;
          opacity: 0.1;
          color: #4db33d;
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
          background: linear-gradient(90deg,#2E8B57,#3CB371);
          box-shadow: 0 0 15px rgba(60, 179, 113, 0.4);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .course-card:hover .start-btn {
          background: linear-gradient(90deg,#3CB371,#20B2AA);
          box-shadow: 0 0 25px rgba(60, 179, 113, 0.6);
          transform: translateY(-2px);
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
          .mongo-lesson {
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

export default MongoLesson;