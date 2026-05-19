// src/components/JsLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const JsLesson = () => {
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
    <div className="js-lesson" style={{ padding: '20px' }}>
      <h2>JS LESSONS</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        
        <Link to="/JsLesson1" className="course-box">
          <h3>Lesson 1: Introduction to JS</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson2" className="course-box">
          <h3>Lesson 2: Variables & Data Types</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson3" className="course-box">
          <h3>Lesson 3: Operators & Expressions</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson4" className="course-box">
          <h3>Lesson 4: Conditional Statements</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson5" className="course-box">
          <h3>Lesson 5: Loops</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson6" className="course-box">
          <h3>Lesson 6: Functions</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson7" className="course-box">
          <h3>Lesson 7: Arrays</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson8" className="course-box">
          <h3>Lesson 8: Objects</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson9" className="course-box">
          <h3>Lesson 9: DOM Manipulation</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson10" className="course-box">
          <h3>Lesson 10: Events</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-10') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson11" className="course-box">
          <h3>Lesson 11: String Methods</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-11') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson12" className="course-box">
          <h3>Lesson 12: Array Methods</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-12') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson13" className="course-box">
          <h3>Lesson 13: Date & Time</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-13') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson14" className="course-box">
          <h3>Lesson 14: Math & Numbers</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-14') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson15" className="course-box">
          <h3>Lesson 15: Scope & Hoisting</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-15') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson16" className="course-box">
          <h3>Lesson 16: ES6 Features</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-16') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson17" className="course-box">
          <h3>Lesson 17: DOM Traversing</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-17') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson18" className="course-box">
          <h3>Lesson 18: Events Advanced</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-18') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson19" className="course-box">
          <h3>Lesson 19: Error Handling</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-19') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson20" className="course-box">
          <h3>Lesson 20: JSON & AJAX</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-20') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson21" className="course-box">
          <h3>Lesson 21: Promises</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-21') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson22" className="course-box">
          <h3>Lesson 22: Async/Await</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-22') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson23" className="course-box">
          <h3>Lesson 23: Local & Session Storage</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-23') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson24" className="course-box">
          <h3>Lesson 24: Fetch API</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-24') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson25" className="course-box">
          <h3>Lesson 25: JS Projects Part 1</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-25') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson26" className="course-box">
          <h3>Lesson 26: JS Projects Part 2</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-26') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson27" className="course-box">
          <h3>Lesson 27: JS Projects Part 3</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-27') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson28" className="course-box">
          <h3>Lesson 28: Local & Session Storage (MCQ)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-28') && <span> ✅</span>}
        </Link>

        <Link to="/JsLesson29" className="course-box">
          <h3>Lesson 29: Shopping Website Project</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('js-lesson-29') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default JsLesson;
