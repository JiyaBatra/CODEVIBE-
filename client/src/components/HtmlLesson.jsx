// src/components/HtmlLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HtmlLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`http://localhost:5002/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = id => completed.includes(id);

  return (
    <div
      className="html-lesson"
      style={{
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2>HTML LESSONS</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Link to="/HtmlLesson1" className="course-box">
          <h3>Lesson1: Introduction to HTML</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson2" className="course-box">
          <h3>Lesson2: Type of HTML element — Block or Inline</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson3" className="course-box">
          <h3>Lesson3: Html List</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson4" className="course-box">
          <h3>Lesson4: Html Attribute</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson5" className="course-box">
          <h3>Lesson5: Html Media tag</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson6" className="course-box">
          <h3>Lesson6: Html Table</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson7" className="course-box">
          <h3>Lesson7: Html Form</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson8" className="course-box">
          <h3>Lesson8: Html Class & ID</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson9" className="course-box">
          <h3>Lesson9: HTML Quiz</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/HtmlLesson10" className="course-box">
          <h3>Lesson10: HTML Project</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('html-lesson-10') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default HtmlLesson;
