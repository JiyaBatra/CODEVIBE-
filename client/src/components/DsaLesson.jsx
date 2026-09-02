// src/components/DSALesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CourseSidebar from './CourseSidebar';
import API_BASE_URL from '../config/api';
import { FaCheckCircle, FaArrowRight, FaCode, FaBookOpen, FaTrophy, FaChartLine, FaDatabase, FaLink, FaLayerGroup } from 'react-icons/fa';

const DSALesson = () => {
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
    { id: 'dsa-lesson-1', title: "Introduction to DSA", category: "Fundamentals", lessons: "1 lesson", description: "Learn what Data Structures and Algorithms are and why they matter.", difficulty: "Beginner", duration: "25 mins" },
    { id: 'dsa-lesson-2', title: "Time & Space Complexity", category: "Fundamentals", lessons: "1 lesson", description: "Master Big O notation and analyze algorithm efficiency.", difficulty: "Beginner", duration: "35 mins" },
    { id: 'dsa-lesson-3', title: "Arrays & Basic Operations", category: "Arrays", lessons: "1 lesson", description: "Learn array creation, traversal, insertion, and deletion.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'dsa-lesson-4', title: "Strings & Manipulation", category: "Strings", lessons: "1 lesson", description: "Master string operations and manipulation techniques.", difficulty: "Beginner", duration: "30 mins" },
    { id: 'dsa-lesson-5', title: "Searching & Sorting", category: "Algorithms", lessons: "1 lesson", description: "Learn binary search, bubble sort, merge sort, and more.", difficulty: "Intermediate", duration: "45 mins" },
    { id: 'dsa-lesson-6', title: "Stacks & Queues", category: "Linear DS", lessons: "1 lesson", description: "Introduction to stack and queue data structures.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'dsa-lesson-7', title: "Linked Lists", category: "Linear DS", lessons: "1 lesson", description: "Learn singly linked list operations and implementation.", difficulty: "Intermediate", duration: "40 mins" },
    { id: 'dsa-lesson-8', title: "Doubly & Circular Linked Lists", category: "Linear DS", lessons: "1 lesson", description: "Advanced linked list variants and their use cases.", difficulty: "Advanced", duration: "35 mins" },
    { id: 'dsa-lesson-9', title: "Stack (Detailed)", category: "Linear DS", lessons: "1 lesson", description: "Deep dive into stack implementation and applications.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'dsa-lesson-10', title: "Queue (Detailed)", category: "Linear DS", lessons: "1 lesson", description: "Comprehensive queue implementation and types.", difficulty: "Intermediate", duration: "30 mins" },
    { id: 'dsa-lesson-11', title: "Linked List (Detailed)", category: "Linear DS", lessons: "1 lesson", description: "Master linked list operations and problem-solving.", difficulty: "Advanced", duration: "45 mins" },
    { id: 'dsa-lesson-12', title: "Stack (Implementation)", category: "Linear DS", lessons: "1 lesson", description: "Build a complete stack from scratch with all operations.", difficulty: "Advanced", duration: "35 mins", isProject: false },
    { id: 'dsa-lesson-13', title: "Important Leetcode Questions", category: "Linear DS", lessons: "1 lesson", description: "Inteview Asked DSA Question", difficulty: "Advanced", duration: "60 min mins"}

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
      case 'Algorithms': return <FaChartLine />;
      case 'Arrays': return <FaLayerGroup />;
      case 'Linear DS': return <FaLink />;
      default: return <FaDatabase />;
    }
  };

  const completedCount = lessons.filter(lesson => isDone(lesson.id)).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="dsa-lesson">
      {/* Header Section */}
      <div className="lessons-header">
        <div className="header-content">
          <div className="header-icon">
            <FaCode />
          </div>
          <div className="header-text">
            <h1>Data Structures & Algorithms (DSA)</h1>
            <p>Master DSA concepts using JavaScript - Build efficient solutions for coding interviews</p>
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
          <span>📊</span>
          <span>Big O Notation</span>
        </div>
        <div className="feature">
          <span>🔍</span>
          <span>Searching</span>
        </div>
        <div className="feature">
          <span>📈</span>
          <span>Sorting</span>
        </div>
        <div className="feature">
          <span>🥞</span>
          <span>Stacks</span>
        </div>
        <div className="feature">
          <span>📋</span>
          <span>Queues</span>
        </div>
        <div className="feature">
          <span>🔗</span>
          <span>Linked Lists</span>
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
              to={`/DSALesson${index + 1}`}
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
        .dsa-lesson {
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
          color: #22d3ee;
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.9));
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
          color: #22d3ee;
        }

        .trophy-icon {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .progress-percent {
          font-weight: bold;
          color: #22d3ee;
        }

        .start-btn,
        .start-btn *,
        .course-card:hover .start-btn,
        .course-card:hover .start-btn * {
          color: #08173d;
          }

        .progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg,#22d3ee,#06b6d4);
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
          border-color: rgba(0, 206, 201, 0.3);
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

        .category-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .category-icon {
          color: #00cec9;
          font-size: 0.9rem;
        }

        .category-name {
          color: #00cec9;
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
          background: linear-gradient(90deg,#22d3ee,#06b6d4);
          box-shadow: 0 0 15px rgba(76, 201, 240, 0.4);
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
          background: linear-gradient(90deg,#4CC9F0,#60A5FA);
          box-shadow: 0 0 25px rgba(76,201,240,.6);
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
          .dsa-lesson {
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

export default DSALesson;