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
      <h2>HTML LESSON'S</h2>

      <div className="lesson-grid">
        <div className='course-box'>
          <h3>Lesson1: Introduction to HTML</h3>
          <Link to="/HtmlLesson1">Start Lesson</Link>
          {isDone('html-lesson-1') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson2: TYPE OF HTML ELEMENT — BLOCK OR INLINE</h3>
          <Link to="/HtmlLesson2">Start Lesson</Link>
          {isDone('html-lesson-2') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson3: Html List</h3>
          <Link to="/HtmlLesson3">Start Lesson</Link>
          {isDone('html-lesson-3') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson4: Html Attribute</h3>
          <Link to="/HtmlLesson4">Start Lesson</Link>
          {isDone('html-lesson-4') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson5: Html Media tag</h3>
          <Link to="/HtmlLesson5">Start Lesson</Link>
          {isDone('html-lesson-5') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson6: Html Table</h3>
          <Link to="/HtmlLesson6">Start Lesson</Link>
          {isDone('html-lesson-6') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson7: Html Form</h3>
          <Link to="/HtmlLesson7">Start Lesson</Link>
          {isDone('html-lesson-7') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson8: Html Class & ID</h3>
          <Link to="/HtmlLesson8">Start Lesson</Link>
          {isDone('html-lesson-8') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson9: HTML Quiz</h3>
          <Link to="/HtmlLesson9">Start Lesson</Link>
          {isDone('html-lesson-9') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson10: HTML Project</h3>
          <Link to="/HtmlLesson10">Start Lesson</Link>
          {isDone('html-lesson-10') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default HtmlLesson;
