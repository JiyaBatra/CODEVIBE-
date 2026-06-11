import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NodeLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 1: Introduction</h1>

      <div className="lesson-content">
        <p>
          Node.js is a JavaScript runtime built on Chrome's V8 engine.  
          It allows running JavaScript on the server side.
        </p>
        <ul>
          <li>Event-driven, non-blocking I/O</li>
          <li>Great for real-time apps</li>
          <li>Uses npm (Node Package Manager) for libraries</li>
        </ul>
      </div>

      <pre className="instructions">
{`Task:
1. Install Node.js from nodejs.org
2. Run: node -v and npm -v to check installation`}
      </pre>

      <button onClick={handleSuccess}>Mark as Completed ✅</button>
     {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/NodeLesson2')}
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

export default NodeLesson1;
