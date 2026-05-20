// src/components/OOPLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const OOPLesson = () => {
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
    <div className="oop-lesson" style={{ padding: '20px' }}>
      <h2>🧑‍💻 OOP LESSONS (JavaScript)</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <Link to="/OOPLesson1" className="course-box">
          <h3>Lesson 1: Classes & Objects</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-1') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson2" className="course-box">
          <h3>Lesson 2: Constructors</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-2') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson3" className="course-box">
          <h3>Lesson 3: Modules</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-3') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson4" className="course-box">
          <h3>Lesson 4: Encapsulation</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-4') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson5" className="course-box">
          <h3>Lesson 5: Inheritance</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-5') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson6" className="course-box">
          <h3>Lesson 6: Multilevel Inheritance</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-6') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson7" className="course-box">
          <h3>Lesson 7: Function Overloading</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-7') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson8" className="course-box">
          <h3>Lesson 8: Virtual Functions</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-8') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson9" className="course-box">
          <h3>Lesson 9: Abstraction (Pure Virtual)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-9') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson10" className="course-box">
          <h3>Lesson 10: Composition (HAS-A)</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-10') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson11" className="course-box">
          <h3>Lesson 11: Operator Overloading</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-11') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson12" className="course-box">
          <h3>Lesson 12: Mini Project — Bank Account</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-12') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson13" className="course-box">
          <h3>Lesson 13: Mini Project — Library</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-13') && <span> ✅</span>}
        </Link>

        <Link to="/OOPLesson14" className="course-box">
          <h3>Lesson 14: Final — Polymorphic Menu</h3>
          <span className="start-btn">Start Lesson</span>
          {isDone('cpp-lesson-14') && <span> ✅</span>}
        </Link>
      </div>
    </div>
  );
};

export default OOPLesson;
