// src/components/DBMSLessons.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DBMSLessons = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`http://localhost:5002/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = (id) => completed.includes(id);

  return (
    <div className="dbms-lesson" style={{ padding: '20px' }}>
      <h2>DBMS LESSONS</h2>

      <div className="lesson-grid">
        <div className="course-box">
          <h3>Lesson1: Introduction to DBMS</h3>
          <Link to="/DBMSLesson1">Start Lesson</Link>
          {isDone('dbms-lesson-1') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson2: DBMS Architecture</h3>
          <Link to="/DBMSLesson2">Start Lesson</Link>
          {isDone('dbms-lesson-2') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson3: SQL Basics</h3>
          <Link to="/DBMSLesson3">Start Lesson</Link>
          {isDone('dbms-lesson-3') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson4: UPDATE & DELETE Commands</h3>
          <Link to="/DBMSLesson4">Start Lesson</Link>
          {isDone('dbms-lesson-4') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson5: SELECT with WHERE & LIKE</h3>
          <Link to="/DBMSLesson5">Start Lesson</Link>
          {isDone('dbms-lesson-5') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson6: ORDER BY & GROUP BY</h3>
          <Link to="/DBMSLesson6">Start Lesson</Link>
          {isDone('dbms-lesson-6') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson7: INNER & OUTER JOINS</h3>
          <Link to="/DBMSLesson7">Start Lesson</Link>
          {isDone('dbms-lesson-7') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson8: PRIMARY & FOREIGN KEYS</h3>
          <Link to="/DBMSLesson8">Start Lesson</Link>
          {isDone('dbms-lesson-8') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson9: VIEWS</h3>
          <Link to="/DBMSLesson9">Start Lesson</Link>
          {isDone('dbms-lesson-9') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson10: Normalization</h3>
          <Link to="/DBMSLesson10">Start Lesson</Link>
          {isDone('dbms-lesson-10') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson11: Aggregate Functions</h3>
          <Link to="/DBMSLesson11">Start Lesson</Link>
          {isDone('dbms-lesson-11') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson12: Mini Project (Library Management System)</h3>
          <Link to="/DBMSLesson12">Start Lesson</Link>
          {isDone('dbms-lesson-12') && <span style={{ marginLeft: 8 }}>✅</span>}
        </div>
      </div>
    </div>
  );
};

export default DBMSLessons;
