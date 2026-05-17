// src/components/ExpressLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl } from "../config/api.js";

const ExpressLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    axios.get(apiUrl(`/api/progress/${email}`))
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
        <div className="course-box">
          <h3>Lesson 1: Introduction</h3>
          <Link to="/ExpressLesson1">Start Lesson</Link>
          {isDone('express-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 2: Routing Basics</h3>
          <Link to="/ExpressLesson2">Start Lesson</Link>
          {isDone('express-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 3: Middleware Basics</h3>
          <Link to="/ExpressLesson3">Start Lesson</Link>
          {isDone('express-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 4: Handling POST Requests</h3>
          <Link to="/ExpressLesson4">Start Lesson</Link>
          {isDone('express-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 5: CRUD Basics</h3>
          <Link to="/ExpressLesson5">Start Lesson</Link>
          {isDone('express-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 6: Route Parameters</h3>
          <Link to="/ExpressLesson6">Start Lesson</Link>
          {isDone('express-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 7: Query Parameters</h3>
          <Link to="/ExpressLesson7">Start Lesson</Link>
          {isDone('express-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 8: Express Router</h3>
          <Link to="/ExpressLesson8">Start Lesson</Link>
          {isDone('express-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 9: Error Handling</h3>
          <Link to="/ExpressLesson9">Start Lesson</Link>
          {isDone('express-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 10: Final Project – REST API</h3>
          <Link to="/ExpressLesson10">Start Lesson</Link>
          {isDone('express-lesson-10') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default ExpressLesson;
