// src/components/DSALesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DSALesson = () => {
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
    <div className="dsa-lesson" style={{ padding: '20px' }}>
      <h2>📘 DATA STRUCTURES & ALGORITHMS (DSA) LESSONS (Using JS)</h2>

      <div className="lesson-grid">
        
        <div className="course-box">
          <h3>Lesson 1: Introduction to DSA</h3>
          <Link to="/DSALesson1">Start Lesson</Link>
          {isDone('dsa-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 2: Time & Space Complexity</h3>
          <Link to="/DSALesson2">Start Lesson</Link>
          {isDone('dsa-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 3: Arrays & Basic Operations</h3>
          <Link to="/DSALesson3">Start Lesson</Link>
          {isDone('dsa-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 4: Strings & Manipulation</h3>
          <Link to="/DSALesson4">Start Lesson</Link>
          {isDone('dsa-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 5: Searching & Sorting</h3>
          <Link to="/DSALesson5">Start Lesson</Link>
          {isDone('dsa-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 6: Stacks & Queues</h3>
          <Link to="/DSALesson6">Start Lesson</Link>
          {isDone('dsa-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 7: Linked Lists</h3>
          <Link to="/DSALesson7">Start Lesson</Link>
          {isDone('dsa-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 8: Doubly & Circular Linked Lists</h3>
          <Link to="/DSALesson8">Start Lesson</Link>
          {isDone('dsa-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 9: Stack (Detailed)</h3>
          <Link to="/DSALesson9">Start Lesson</Link>
          {isDone('dsa-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 10: Queue (Detailed)</h3>
          <Link to="/DSALesson10">Start Lesson</Link>
          {isDone('dsa-lesson-10') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 11: Linked List (Detailed)</h3>
          <Link to="/DSALesson11">Start Lesson</Link>
          {isDone('dsa-lesson-11') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 12: Stack (Implementation)</h3>
          <Link to="/DSALesson12">Start Lesson</Link>
          {isDone('dsa-lesson-12') && <span> ✅</span>}
        </div>

      </div>
    </div>
  );
};

export default DSALesson;
