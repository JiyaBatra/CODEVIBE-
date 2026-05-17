// src/components/NodeLesson.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkCompleteButton from './MarkCompleteButton.jsx';

const NodeLesson = () => {
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
    <div className="node-lesson" style={{ padding: '20px' }}>
      <h2>Node.js LESSONS</h2>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>

        <div className="course-box">
          <h3>Lesson 1: Introduction</h3>
          <Link to="/NodeLesson1">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-1" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-1') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 2: Hello World</h3>
          <Link to="/NodeLesson2">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-2" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-2') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 3: Modules</h3>
          <Link to="/NodeLesson3">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-3" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-3') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 4: HTTP Module</h3>
          <Link to="/NodeLesson4">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-4" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-4') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 5: File System (fs)</h3>
          <Link to="/NodeLesson5">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-5" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-5') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 6: Events</h3>
          <Link to="/NodeLesson6">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-6" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-6') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 7: Express.js</h3>
          <Link to="/NodeLesson7">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-7" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-7') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 8: Express Routing</h3>
          <Link to="/NodeLesson8">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-8" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-8') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 9: Middleware</h3>
          <Link to="/NodeLesson9">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-9" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-9') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 10: JSON Handling</h3>
          <Link to="/NodeLesson10">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-10" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-10') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 11: MongoDB Connection</h3>
          <Link to="/NodeLesson11">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-11" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-11') && <span> ✅</span>}
        </div>

        <div className="course-box">
          <h3>Lesson 12: Mini Project - REST API</h3>
          <Link to="/NodeLesson12">Start Lesson</Link>
          <MarkCompleteButton lessonId="node-lesson-12" completed={completed} onComplete={(id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))} />
          {isDone('node-lesson-12') && <span> ✅</span>}
        </div>

      </div>
    </div>
  );
};

export default NodeLesson;
