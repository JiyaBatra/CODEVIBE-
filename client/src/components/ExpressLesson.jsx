// src/components/ExpressLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpressLesson = () => {
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
    <div className="express-lesson" style={{ padding: '20px' }}>
      <h2>🚀 EXPRESS.JS LESSONS</h2>

      <div
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        <Link to="/ExpressLesson1" className="course-box">
          <h3>Lesson 1: Introduction</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson2" className="course-box">
          <h3>Lesson 2: Routing Basics</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson3" className="course-box">
          <h3>Lesson 3: Middleware Basics</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson4" className="course-box">
          <h3>Lesson 4: Handling POST Requests</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson5" className="course-box">
          <h3>Lesson 5: CRUD Basics</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson6" className="course-box">
          <h3>Lesson 6: Route Parameters</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson7" className="course-box">
          <h3>Lesson 7: Query Parameters</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson8" className="course-box">
          <h3>Lesson 8: Express Router</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson9" className="course-box">
          <h3>Lesson 9: Error Handling</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/ExpressLesson10" className="course-box">
          <h3>Lesson 10: Final Project – REST API</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('express-lesson-10') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default ExpressLesson;
