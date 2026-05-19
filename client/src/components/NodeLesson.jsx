// src/components/NodeLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const NodeLesson = () => {
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
    <div className="node-lesson" style={{ padding: '20px' }}>
      <h2>Node.js LESSONS</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>

        <Link to="/NodeLesson1" className="course-box">
          <h3>Lesson 1: Introduction</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson2" className="course-box">
          <h3>Lesson 2: Hello World</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson3" className="course-box">
          <h3>Lesson 3: Modules</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson4" className="course-box">
          <h3>Lesson 4: HTTP Module</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson5" className="course-box">
          <h3>Lesson 5: File System (fs)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson6" className="course-box">
          <h3>Lesson 6: Events</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson7" className="course-box">
          <h3>Lesson 7: Express.js</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson8" className="course-box">
          <h3>Lesson 8: Express Routing</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson9" className="course-box">
          <h3>Lesson 9: Middleware</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson10" className="course-box">
          <h3>Lesson 10: JSON Handling</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-10') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson11" className="course-box">
          <h3>Lesson 11: MongoDB Connection</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-11') && <span> ✅</span>}
        </Link>

        <Link to="/NodeLesson12" className="course-box">
          <h3>Lesson 12: Mini Project - REST API</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('node-lesson-12') && <span> ✅</span>}
        </Link>

      </div>
    </div>
  );
};

export default NodeLesson;
