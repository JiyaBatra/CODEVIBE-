// src/components/MongoLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MongoLesson = () => {
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
    <div className="mongo-lesson" style={{ padding: '20px' }}>
      <h2>🍃 MONGODB LESSONS</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Link to="/MongoLesson1" className="course-box">
          <h3>Lesson 1: Introduction & Insert One</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-1') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson2" className="course-box">
          <h3>Lesson 2: Find Documents</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-2') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson3" className="course-box">
          <h3>Lesson 3: Insert Many</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-3') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson4" className="course-box">
          <h3>Lesson 4: Update Documents</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-4') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson5" className="course-box">
          <h3>Lesson 5: Delete Documents</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-5') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson6" className="course-box">
          <h3>Lesson 6: CRUD API with Node.js</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-6') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson7" className="course-box">
          <h3>Lesson 7: Aggregation</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-7') && <span> ✅</span>}
        </Link>
        <Link to="/MongoLesson8" className="course-box">
          <h3>Lesson 8: Mini Project</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('mongo-lesson-8') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default MongoLesson;
