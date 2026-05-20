// src/components/CssLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const CssLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = id => completed.includes(id);

  return (
    <div
      className="css-lesson"
      style={{
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2>CSS LESSONS</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Link to="/CssLesson1" className="course-box">
          <h3>Lesson1: Introduction to CSS</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson2" className="course-box">
          <h3>Lesson2: CSS Syntax & Selectors</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson3" className="course-box">
          <h3>Lesson3: CSS Colors & Backgrounds</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson4" className="course-box">
          <h3>Lesson4: CSS Fonts & Text</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson5" className="course-box">
          <h3>Lesson5: CSS Box Model</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson6" className="course-box">
          <h3>Lesson6: CSS Margin & Padding</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson7" className="course-box">
          <h3>Lesson7: CSS Border & Outline</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson8" className="course-box">
          <h3>Lesson8: CSS Display & Visibility</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson9" className="course-box">
          <h3>Lesson9: CSS Positioning</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson10" className="course-box">
          <h3>Lesson10: CSS Flexbox</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-10') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson11" className="course-box">
          <h3>Lesson11: CSS Grid</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-11') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson12" className="course-box">
          <h3>Lesson12: CSS Transitions & Animations</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-12') && <span> ✅</span>}
        </Link>

        <Link to="/CssLesson13" className="course-box">
          <h3>Lesson13: CSS Project</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('css-lesson-13') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default CssLesson;
