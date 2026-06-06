// src/pages/CssLesson14.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson14 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/Certificate');
  };

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Just completed the CSS for Beginners Course on CodeVibe! 🎨✨ Mastered layouts, grids, and styling. Onwards to frontend mastery! 🚀");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const instructionsText = `Style the shopping site:
- Header background: #333, text white, nav links inline with spacing.
- Products displayed in a grid with gap.
- Buttons with background #ff6600, white text, rounded corners.
- Footer background #222, white text, center aligned.`;

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 14: Shopping Site Styling</h1>

      <div className="lesson-content">
        <p>This is your chance to style a simple shopping website using CSS.</p>
        <p><b>Instructions:</b></p>
        <pre className="instructions">{instructionsText}</pre>
        <p>Use the given HTML (pre‑loaded in the preview) and write your CSS in the editor.</p>
      </div>

      <Compiler
        hint="💡 Hint: instructionsText"
        LessonId="css-lesson-14"
        language="css" // property-check mode
        initialCode={`header {
  /* header styles */
}

header nav a {
  /* nav link styles */
}

.products {
  /* products grid styles */
}

.product button {
  /* button styles */
}

footer {
  /* footer styles */
}`}
        expectedOutput={{
          "header": {
            backgroundColor: "rgb(51, 51, 51)",
            color: "rgb(255, 255, 255)",
            padding: "15px"
          },
          "header nav a": {
            color: "rgb(255, 255, 255)",
            margin: "0px 10px"
          },
          ".products": {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            padding: "20px"
          },
          ".product": {
            border: "1px solid rgb(204, 204, 204)",
            padding: "10px",
            textAlign: "center"
          },
          ".product button": {
            backgroundColor: "rgb(255, 102, 0)",
            color: "rgb(255, 255, 255)",
            border: "0px none rgb(255, 255, 255)",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer"
          },
          "footer": {
            backgroundColor: "rgb(34, 34, 34)",
            color: "rgb(255, 255, 255)",
            textAlign: "center",
            padding: "10px"
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link
              to="/Certificate"
              style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '18px', color: '#ff6600', marginBottom: '15px' }}
              onClick={goToNextLesson}
            >
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
    onClick={() => navigate('/CssLesson13')}
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
    onClick={() => navigate('/CssLesson2')}
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

export default CssLesson14;