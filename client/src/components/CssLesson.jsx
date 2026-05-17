// src/components/CssLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CssLesson = () => {
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
      className="css-lesson"
      style={{
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2>CSS LESSON'S</h2>

      <div className="lesson-grid">
        <div className="course-box">
          <h3>Lesson1: Introduction to CSS</h3>
          <Link to="/CssLesson1">Start Lesson</Link>
          {isDone('css-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson2: CSS Syntax & Selectors</h3>
          <Link to="/CssLesson2">Start Lesson</Link>
          {isDone('css-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson3: CSS Colors & Backgrounds</h3>
          <Link to="/CssLesson3">Start Lesson</Link>
          {isDone('css-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson4: CSS Fonts & Text</h3>
          <Link to="/CssLesson4">Start Lesson</Link>
          {isDone('css-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson5: CSS Box Model</h3>
          <Link to="/CssLesson5">Start Lesson</Link>
          {isDone('css-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson6: CSS Margin & Padding</h3>
          <Link to="/CssLesson6">Start Lesson</Link>
          {isDone('css-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson7: CSS Border & Outline</h3>
          <Link to="/CssLesson7">Start Lesson</Link>
          {isDone('css-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson8: CSS Display & Visibility</h3>
          <Link to="/CssLesson8">Start Lesson</Link>
          {isDone('css-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson9: CSS Positioning</h3>
          <Link to="/CssLesson9">Start Lesson</Link>
          {isDone('css-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson10: CSS Flexbox</h3>
          <Link to="/CssLesson10">Start Lesson</Link>
          {isDone('css-lesson-10') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson11: CSS Grid</h3>
          <Link to="/CssLesson11">Start Lesson</Link>
          {isDone('css-lesson-11') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson12: CSS Transitions & Animations</h3>
          <Link to="/CssLesson12">Start Lesson</Link>
          {isDone('css-lesson-12') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson13: CSS Project</h3>
          <Link to="/CssLesson13">Start Lesson</Link>
          {isDone('css-lesson-13') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default CssLesson;
