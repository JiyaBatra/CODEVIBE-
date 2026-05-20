// src/components/DSALesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const DSALesson = () => {
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
    <div className="dsa-lesson" style={{ padding: '20px' }}>
      <h2>📘 DATA STRUCTURES & ALGORITHMS (DSA) LESSONS (Using JS)</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        
        <Link to="/DSALesson1" className="course-box">
          <h3>Lesson 1: Introduction to DSA</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson2" className="course-box">
          <h3>Lesson 2: Time & Space Complexity</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson3" className="course-box">
          <h3>Lesson 3: Arrays & Basic Operations</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson4" className="course-box">
          <h3>Lesson 4: Strings & Manipulation</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson5" className="course-box">
          <h3>Lesson 5: Searching & Sorting</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson6" className="course-box">
          <h3>Lesson 6: Stacks & Queues</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson7" className="course-box">
          <h3>Lesson 7: Linked Lists</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson8" className="course-box">
          <h3>Lesson 8: Doubly & Circular Linked Lists</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson9" className="course-box">
          <h3>Lesson 9: Stack (Detailed)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson10" className="course-box">
          <h3>Lesson 10: Queue (Detailed)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-10') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson11" className="course-box">
          <h3>Lesson 11: Linked List (Detailed)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-11') && <span> ✅</span>}
        </Link>

        <Link to="/DSALesson12" className="course-box">
          <h3>Lesson 12: Stack (Implementation)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('dsa-lesson-12') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default DSALesson;
