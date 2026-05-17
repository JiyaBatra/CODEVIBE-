// src/components/OOPLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl } from "../config/api.js";
const OOPLesson = () => {
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
    <div className="oop-lesson" style={{ padding: '20px' }}>
      <h2>🧑‍💻 OOP LESSONS (JavaScript)</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="course-box">
          <h3>Lesson 1: Classes & Objects</h3>
          <Link to="/OOPLesson1">Start Lesson</Link>
          {isDone('cpp-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 2: Constructors</h3>
          <Link to="/OOPLesson2">Start Lesson</Link>
          {isDone('cpp-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 3: Modules</h3>
          <Link to="/OOPLesson3">Start Lesson</Link>
          {isDone('cpp-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 4: Encapsulation</h3>
          <Link to="/OOPLesson4">Start Lesson</Link>
          {isDone('cpp-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 5: Inheritance</h3>
          <Link to="/OOPLesson5">Start Lesson</Link>
          {isDone('cpp-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 6: Multilevel Inheritance</h3>
          <Link to="/OOPLesson6">Start Lesson</Link>
          {isDone('cpp-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 7: Function Overloading</h3>
          <Link to="/OOPLesson7">Start Lesson</Link>
          {isDone('cpp-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 8: Virtual Functions</h3>
          <Link to="/OOPLesson8">Start Lesson</Link>
          {isDone('cpp-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 9: Abstraction (Pure Virtual)</h3>
          <Link to="/OOPLesson9">Start Lesson</Link>
          {isDone('cpp-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 10: Composition (HAS-A)</h3>
          <Link to="/OOPLesson10">Start Lesson</Link>
          {isDone('cpp-lesson-10') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 11: Operator Overloading</h3>
          <Link to="/OOPLesson11">Start Lesson</Link>
          {isDone('cpp-lesson-11') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 12: Mini Project — Bank Account</h3>
          <Link to="/OOPLesson12">Start Lesson</Link>
          {isDone('cpp-lesson-12') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 13: Mini Project — Library</h3>
          <Link to="/OOPLesson13">Start Lesson</Link>
          {isDone('cpp-lesson-13') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 14: Final — Polymorphic Menu</h3>
          <Link to="/OOPLesson14">Start Lesson</Link>
          {isDone('cpp-lesson-14') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default OOPLesson;
