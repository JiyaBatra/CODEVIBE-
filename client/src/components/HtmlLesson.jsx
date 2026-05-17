// src/components/HtmlLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getUserEmail } from '../utils/getUserEmail';
import { API_BASE_URL } from '../utils/markLessonComplete';
import { Link } from 'react-router-dom';
import MarkCompleteButton from './MarkCompleteButton.jsx';


const HtmlLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = getUserEmail();
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then(res => setCompleted(res.data.completedLessons || []))
      .catch(err => console.error(err));
  }, []);

  const isDone = id => completed.includes(id);

  return (
    <div
      className="html-lesson"
      style={{
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2>HTML LESSON'S</h2>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div className='course-box'>
          <h3>Lesson1: Introduction to HTML</h3>
          <Link to="/HtmlLesson1">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson1" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson1') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson2: TYPE OF HTML ELEMENT — BLOCK OR INLINE</h3>
          <Link to="/HtmlLesson2">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson2" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson2') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson3: Html List</h3>
          <Link to="/HtmlLesson3">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson3" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson3') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson4: Html Attribute</h3>
          <Link to="/HtmlLesson4">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson4" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson4') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson5: Html Media tag</h3>
          <Link to="/HtmlLesson5">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson5" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson5') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson6: Html Table</h3>
          <Link to="/HtmlLesson6">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson6" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson6') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson7: Html Form</h3>
          <Link to="/HtmlLesson7">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson7" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson7') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson8: Html Class & ID</h3>
          <Link to="/HtmlLesson8">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson8" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson8') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson9: HTML Quiz</h3>
          <Link to="/HtmlLesson9">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson9" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson9') && <span> ✅</span>}
        </div>

        <div className='course-box'>
          <h3>Lesson10: HTML Project</h3>
          <Link to="/HtmlLesson10">Start Lesson</Link>
          <MarkCompleteButton lessonId="html-lesson10" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('html-lesson10') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default HtmlLesson;
