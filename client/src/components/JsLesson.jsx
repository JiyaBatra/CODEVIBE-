// src/components/JsLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl } from "../config/api.js";


const JsLesson = () => {
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
    <div className="js-lesson" style={{ padding: '20px' }}>
      <h2>JS LESSONS</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        
        <div className="course-box">
          <h3>Lesson 1: Introduction to JS</h3>
          <Link to="/JsLesson1">Start Lesson</Link>
          {isDone('js-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 2: Variables & Data Types</h3>
          <Link to="/JsLesson2">Start Lesson</Link>
          {isDone('js-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 3: Operators & Expressions</h3>
          <Link to="/JsLesson3">Start Lesson</Link>
          {isDone('js-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 4: Conditional Statements</h3>
          <Link to="/JsLesson4">Start Lesson</Link>
          {isDone('js-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 5: Loops</h3>
          <Link to="/JsLesson5">Start Lesson</Link>
          {isDone('js-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 6: Functions</h3>
          <Link to="/JsLesson6">Start Lesson</Link>
          {isDone('js-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 7: Arrays</h3>
          <Link to="/JsLesson7">Start Lesson</Link>
          {isDone('js-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 8: Objects</h3>
          <Link to="/JsLesson8">Start Lesson</Link>
          {isDone('js-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 9: DOM Manipulation</h3>
          <Link to="/JsLesson9">Start Lesson</Link>
          {isDone('js-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 10: Events</h3>
          <Link to="/JsLesson10">Start Lesson</Link>
          {isDone('js-lesson-10') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 11: String Methods</h3>
          <Link to="/JsLesson11">Start Lesson</Link>
          {isDone('js-lesson-11') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 12: Array Methods</h3>
          <Link to="/JsLesson12">Start Lesson</Link>
          {isDone('js-lesson-12') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 13: Date & Time</h3>
          <Link to="/JsLesson13">Start Lesson</Link>
          {isDone('js-lesson-13') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 14: Math & Numbers</h3>
          <Link to="/JsLesson14">Start Lesson</Link>
          {isDone('js-lesson-14') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 15: Scope & Hoisting</h3>
          <Link to="/JsLesson15">Start Lesson</Link>
          {isDone('js-lesson-15') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 16: ES6 Features</h3>
          <Link to="/JsLesson16">Start Lesson</Link>
          {isDone('js-lesson-16') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 17: DOM Traversing</h3>
          <Link to="/JsLesson17">Start Lesson</Link>
          {isDone('js-lesson-17') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 18: Events Advanced</h3>
          <Link to="/JsLesson18">Start Lesson</Link>
          {isDone('js-lesson-18') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 19: Error Handling</h3>
          <Link to="/JsLesson19">Start Lesson</Link>
          {isDone('js-lesson-19') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 20: JSON & AJAX</h3>
          <Link to="/JsLesson20">Start Lesson</Link>
          {isDone('js-lesson-20') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 21: Promises</h3>
          <Link to="/JsLesson21">Start Lesson</Link>
          {isDone('js-lesson-21') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 22: Async/Await</h3>
          <Link to="/JsLesson22">Start Lesson</Link>
          {isDone('js-lesson-22') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 23: Local & Session Storage</h3>
          <Link to="/JsLesson23">Start Lesson</Link>
          {isDone('js-lesson-23') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 24: Fetch API</h3>
          <Link to="/JsLesson24">Start Lesson</Link>
          {isDone('js-lesson-24') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 25: JS Projects Part 1</h3>
          <Link to="/JsLesson25">Start Lesson</Link>
          {isDone('js-lesson-25') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 26: JS Projects Part 2</h3>
          <Link to="/JsLesson26">Start Lesson</Link>
          {isDone('js-lesson-26') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 27: JS Projects Part 3</h3>
          <Link to="/JsLesson27">Start Lesson</Link>
          {isDone('js-lesson-27') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 28: Local & Session Storage (MCQ)</h3>
          <Link to="/JsLesson28">Start Lesson</Link>
          {isDone('js-lesson-28') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 29: Shopping Website Project</h3>
          <Link to="/JsLesson29">Start Lesson</Link>
          {isDone('js-lesson-29') && <span> ✅</span>}
        </div>

      </div>
    </div>
  );
};

export default JsLesson;
