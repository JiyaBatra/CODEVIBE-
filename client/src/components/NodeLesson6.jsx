import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 6: Events</h1>

      <div className="lesson-content">
        <p>
          Node.js can handle events using the EventEmitter class from the 'events' module.
        </p>
        <pre>
{`const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('greet', () => console.log('Hello Event!'));
emitter.emit('greet'); // Hello Event!`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create an event called "greet".
2. Log "Hello Event!" when it is triggered.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create an event called 'greet'. 2. Log 'Hello Event!' when it is triggered."
        LessonId="node-lesson-6"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello Event!`}
        onSuccess={handleSuccess}
      />

       {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/NodeLesson5')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  <button
    onClick={() => navigate('/NodeLesson7')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button>
</div>
     
    </div>
  );
};

export default NodeLesson6;
