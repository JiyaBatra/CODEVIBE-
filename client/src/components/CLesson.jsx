// src/components/CLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const CLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = (id) => completed.includes(id);

  return (
    <div className="c-lesson" style={{ padding: '20px' }}>
      <h2>C LESSONS</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
         <Link to="/CLesson1" className="course-box">
          <h3>Lesson1: Introduction to C</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-1') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson2" className="course-box">
          <h3>Lesson2: Variables & Data Types</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-2') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson3" className="course-box">
          <h3>Lesson3: Operators</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-3') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson4" className="course-box">
          <h3>Lesson4: Conditional Statements (if / else)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-4') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson5" className="course-box">
          <h3>Lesson5: Loops (for / while / do-while)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-5') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson6" className="course-box">
          <h3>Lesson6: Functions</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-6') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson7" className="course-box">
          <h3>Lesson7: Arrays</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-7') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson8" className="course-box">
          <h3>Lesson8: Pointers</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-8') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson9" className="course-box">
          <h3>Lesson9: Strings</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-9') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson10" className="course-box">
          <h3>Lesson10: Structures</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-10') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson11" className="course-box">
          <h3>Lesson11: File Handling</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-11') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson12" className="course-box">
          <h3>Lesson12: Dynamic Memory (malloc / free)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-12') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson13" className="course-box">
          <h3>Lesson13: Recursion</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-13') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>

        <Link to="/CLesson14" className="course-box">
          <h3>Lesson14: Mini Project (Student Management)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('c-lesson-14') && <span style={{ marginLeft: 8 }}>✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default CLesson;
