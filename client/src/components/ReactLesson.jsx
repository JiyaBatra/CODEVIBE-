// src/components/ReactLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const ReactLesson = () => {
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
    <div className="react-lesson" style={{ padding: '20px' }}>
      <h2>⚛️ REACT LESSONS</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Link to="/ReactLesson1" className="course-box">
          <h3>Lesson 1: Introduction to React</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-1') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson2" className="course-box">
          <h3>Lesson 2: JSX Basics</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-2') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson3" className="course-box">
          <h3>Lesson 3: Components & Props</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-3') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson4" className="course-box">
          <h3>Lesson 4: State in React</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-4') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson5" className="course-box">
          <h3>Lesson 5: Conditional Rendering</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-5') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson6" className="course-box">
          <h3>Lesson 6: Lists and Keys</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-6') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson7" className="course-box">
          <h3>Lesson 7: Forms</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-7') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson8" className="course-box">
          <h3>Lesson 8: useEffect Hook</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-8') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson9" className="course-box">
          <h3>Lesson 9: Conditional Rendering (Advanced)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-9') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson10" className="course-box">
          <h3>Lesson 10: Lifting State Up</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-10') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson11" className="course-box">
          <h3>Lesson 11: React Router Basics</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-11') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson12" className="course-box">
          <h3>Lesson 12: Forms & Controlled Components</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-12') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson13" className="course-box">
          <h3>Lesson 13: useEffect Hook (Advanced)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-13') && <span> ✅</span>}
        </Link>
        <Link to="/ReactLesson14" className="course-box">
          <h3>Lesson 14: (You can add your final lesson here)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('react-lesson-14') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default ReactLesson;
