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
      <div className="lesson-grid">
        <div className="course-box">
          <h3>Lesson 1: Introduction & Insert One</h3>
          <Link to="/MongoLesson1">Start Lesson</Link>
          {isDone('mongo-lesson-1') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 2: Find Documents</h3>
          <Link to="/MongoLesson2">Start Lesson</Link>
          {isDone('mongo-lesson-2') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 3: Insert Many</h3>
          <Link to="/MongoLesson3">Start Lesson</Link>
          {isDone('mongo-lesson-3') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 4: Update Documents</h3>
          <Link to="/MongoLesson4">Start Lesson</Link>
          {isDone('mongo-lesson-4') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 5: Delete Documents</h3>
          <Link to="/MongoLesson5">Start Lesson</Link>
          {isDone('mongo-lesson-5') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 6: CRUD API with Node.js</h3>
          <Link to="/MongoLesson6">Start Lesson</Link>
          {isDone('mongo-lesson-6') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 7: Aggregation</h3>
          <Link to="/MongoLesson7">Start Lesson</Link>
          {isDone('mongo-lesson-7') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 8: Mini Project</h3>
          <Link to="/MongoLesson8">Start Lesson</Link>
          {isDone('mongo-lesson-8') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default MongoLesson;
