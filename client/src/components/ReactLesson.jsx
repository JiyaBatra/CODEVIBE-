// src/components/ReactLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkCompleteButton from './MarkCompleteButton.jsx';

const ReactLesson = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const email = getUserEmail();
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
        <div className="course-box">
          <h3>Lesson 1: Introduction to React</h3>
          <Link to="/ReactLesson1">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-1" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-1') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 2: JSX Basics</h3>
          <Link to="/ReactLesson2">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-2" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-2') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 3: Components & Props</h3>
          <Link to="/ReactLesson3">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-3" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-3') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 4: State in React</h3>
          <Link to="/ReactLesson4">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-4" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-4') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 5: Conditional Rendering</h3>
          <Link to="/ReactLesson5">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-5" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-5') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 6: Lists and Keys</h3>
          <Link to="/ReactLesson6">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-6" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-6') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 7: Forms</h3>
          <Link to="/ReactLesson7">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-7" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-7') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 8: useEffect Hook</h3>
          <Link to="/ReactLesson8">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-8" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-8') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 9: Conditional Rendering (Advanced)</h3>
          <Link to="/ReactLesson9">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-9" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-9') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 10: Lifting State Up</h3>
          <Link to="/ReactLesson10">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-10" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-10') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 11: React Router Basics</h3>
          <Link to="/ReactLesson11">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-11" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-11') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 12: Forms & Controlled Components</h3>
          <Link to="/ReactLesson12">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-12" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-12') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 13: useEffect Hook (Advanced)</h3>
          <Link to="/ReactLesson13">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-13" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-13') && <span> ✅</span>}
        </div>
        <div className="course-box">
          <h3>Lesson 14: (You can add your final lesson here)</h3>
          <Link to="/ReactLesson14">Start Lesson</Link>
          <MarkCompleteButton lessonId="react-lesson-14" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('react-lesson-14') && <span> ✅</span>}
        </div>
      </div>
    </div>
  );
};

export default ReactLesson;
