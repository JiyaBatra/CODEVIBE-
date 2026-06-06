import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson13 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/Certificate');

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Conquered Advanced React on CodeVibe! ⚛️ Hooks, state management, and side-effects (useEffect) are fully sorted. Ready to build mega dynamic frontends! #ReactJS #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 13: useEffect Hook</h1>

      <div className="lesson-content">
        <p>
          The <code>useEffect</code> hook runs side effects in functional components.
        </p>
        <p>Example:</p>
        <pre>
{`useEffect(() => {
  console.log('Component mounted or updated');
}, []);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Use useEffect to log 'Hello React' on mount.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Use useEffect to log 'Hello React' on mount."
        LessonId="react-lesson-13"
        language="js"
        initialCode={`useEffect(() => {
  console.log('Hello React');
}, []);`}
        expectedOutput={`Hello React`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link to="/Certificate" onClick={goToNextLesson} className="next-lesson" style={{ fontWeight: 'bold', fontSize: '18px', display: 'inline-block', marginBottom: '15px', color: '#00d8ff' }}>
              ⏭ NEXT LESSON: Certificate
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
    onClick={() => navigate('/ReactLesson12')}
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
    onClick={() => navigate('/ReactLesson2')}
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

export default ReactLesson13;