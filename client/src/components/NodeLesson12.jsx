import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/Certificate');

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Completed the entire Node.js backend course on CodeVibe! 🟢 Event loop, asynchronous architecture, and server-side JavaScript are fully mastered! Onwards to full-stack scaling! #NodeJS #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 12: Mini Project - REST API</h1>

      <div className="lesson-content">
        <p>
          Build a simple REST API using Express.js that handles GET requests and returns JSON data.
        </p>
        <pre>
{`const express = require('express');
const app = express();

app.get('/users', (req,res) => {
  res.json([{name:"Jiya", age:18}]);
});

app.listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a GET /users route.
2. Return JSON array [{name:"Jiya", age:18}].`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a GET /users route. 2. Return JSON array [name:'Jiya', age:18]."
        LessonId="node-lesson-12"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Jiya`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link to="/Certificate" onClick={goToNextLesson} className="next-lesson" style={{ fontWeight: 'bold', fontSize: '18px', display: 'inline-block', marginBottom: '15px' }}>
              🏆 VIEW CERTIFICATE
            </Link>
          </div>

          {/* Social Share Buttons Block */}
          <div className="share-buttons-block" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={shareOnTwitter} 
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1a91da"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1DA1F2"}
            >
              Share on Twitter 🐦
            </button>
            <button 
              onClick={shareOnLinkedIn} 
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#00669b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0077B5"}
            >
              Share on LinkedIn 💼
            </button>
          </div>
        </div>
      )}
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
    onClick={() => navigate('/NodeLesson11')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  {/* <button
    onClick={() => navigate('/NodeLesson2')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button> */}
</div>
     
    </div>
  );
};

export default NodeLesson12;