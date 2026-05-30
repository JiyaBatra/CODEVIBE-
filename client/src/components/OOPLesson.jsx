// src/components/OOPLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaObjectGroup, FaBookOpen, FaTrophy, FaCode, FaProjectDiagram, FaCrown } from 'react-icons/fa';

const OOPLesson = () => {
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
    { id: 'cpp-lesson-1', title: "Classes & Objects", category: "Fundamentals", lessons: "1 lesson", description: "Learn how to create classes and instantiate objects in OOP.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'cpp-lesson-2', title: "Constructors", category: "Fundamentals", lessons: "1 lesson", description: "Master constructor types: default, parameterized, and copy.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'cpp-lesson-3', title: "Modules", category: "Organization", lessons: "1 lesson", description: "Organize code using modules and separate compilation.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'cpp-lesson-4', title: "Encapsulation", category: "Core Concepts", lessons: "1 lesson", description: "Hide data and expose only necessary functionality.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'cpp-lesson-5', title: "Inheritance", category: "Core Concepts", lessons: "1 lesson", description: "Create parent-child relationships between classes.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'cpp-lesson-6', title: "Multilevel Inheritance", category: "Core Concepts", lessons: "1 lesson", description: "Extend inheritance chains for deeper hierarchies.", difficulty: "Intermediate", duration: "35 mins" },
    { id: 'cpp-lesson-7', title: "Function Overloading", category: "Polymorphism", lessons: "1 lesson", description: "Create multiple functions with the same name.", difficulty: "Intermediate", duration: "25 mins" },
    { id: 'cpp-lesson-8', title: "Virtual Functions", category: "Polymorphism", lessons: "1 lesson", description: "Implement runtime polymorphism with virtual functions.", difficulty: "Advanced", duration: "45 mins" },
    { id: 'cpp-lesson-9', title: "Abstraction (Pure Virtual)", category: "Polymorphism", lessons: "1 lesson", description: "Create abstract classes and pure virtual functions.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'cpp-lesson-10', title: "Composition (HAS-A)", category: "Relationships", lessons: "1 lesson", description: "Build complex objects by composing simpler ones.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'cpp-lesson-11', title: "Operator Overloading", category: "Advanced", lessons: "1 lesson", description: "Define custom behavior for operators.", difficulty: "Advanced", duration: "40 mins" },
    { id: 'cpp-lesson-12', title: "Mini Project — Bank Account", category: "Projects", lessons: "1 project", description: "Build a banking system with deposit, withdraw, and balance features.", difficulty: "Advanced", duration: "90 mins", isProject: true },
    { id: 'cpp-lesson-13', title: "Mini Project — Library", category: "Projects", lessons: "1 project", description: "Create a library management system with books and members.", difficulty: "Advanced", duration: "90 mins", isProject: true },
    { id: 'cpp-lesson-14', title: "Final — Polymorphic Menu", category: "Projects", lessons: "1 project", description: "Build a polymorphic menu system showcasing all OOP concepts.", difficulty: "Expert", duration: "120 mins", isProject: true }
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
      case 'Projects': return <FaProjectDiagram />;
      case 'Polymorphism': return <FaCrown />;
      case 'Advanced': return <FaCode />;
      default: return <FaObjectGroup />;
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="oop-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaObjectGroup />
          </div>
          <div className="header-text">
            <h1>Object-Oriented Programming (OOP)</h1>
            <p>Master OOP concepts in JavaScript - Classes, Inheritance, Polymorphism & More</p>
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
          <FaObjectGroup className="feature-icon" />
          <span>Classes & Objects</span>
        </div>
        <div className="feature">
          <span>🔒</span>
          <span>Encapsulation</span>
        </div>
        <div className="feature">
          <span>🌳</span>
          <span>Inheritance</span>
        </div>
        <div className="feature">
          <span>🔄</span>
          <span>Polymorphism</span>
        </div>
        <div className="feature">
          <span>🎯</span>
          <span>Abstraction</span>
        </div>
        <div className="feature">
          <span>🚀</span>
          <span>Real Projects</span>
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
              to={`/OOPLesson${index + 1}`}
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
        .oop-lesson {
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
          color: #e67e5f;
          filter: drop-shadow(0 0 6px rgba(230,126,95,0.9));
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
          color: #e17055;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #e67e5f;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #e17055, #d63031);
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
          color: #e17055;
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
          border-color: rgba(225, 112, 85, 0.3);
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

        .category-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .category-icon {
          color: #e17055;
          font-size: 0.9rem;
        }

        .category-name {
          color: #e17055;
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
          background: linear-gradient(90deg,#f4a261,#e67e5f);
          box-shadow: 0 0 15px rgba(255, 92, 122, 0.4);
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
    background: linear-gradient(90deg,#F87171,#FF5C7A);
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
        @media (max-width: 768px) {
          .oop-lesson {
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

export default OOPLesson;