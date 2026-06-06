// src/pages/CssLesson2.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson3');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 2: CSS Colors and Backgrounds</h1>

      <div className="lesson-content">
        <p>
          The <b>color</b> property changes the text color in CSS, while the <b>background-color</b> property sets the background color of an element.
        </p>
        <p>
          For example, to make a heading’s text blue and background yellow, you write:
          <code>color: blue;</code> and <code>background-color: yellow;</code>.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: background-color, color</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
- A heading "Colorful World" with blue text and yellow background.
- A paragraph with white text and black background.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: - A heading 'Colorful World' with blue text and yellow background."
        LessonId="css-lesson-2"
        language="css" // lock to CSS
        initialCode={`h1 {
  /* style for heading */
}

p {
  /* style for paragraph */
}`}
        expectedOutput={{
          h1: { color: "rgb(0, 0, 255)", backgroundColor: "rgb(255, 255, 0)" }, // blue + yellow
          p: { color: "rgb(255, 255, 255)", backgroundColor: "rgb(0, 0, 0)" }   // white + black
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CssLesson3" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}>
          ⏭ NEXT LESSON
        </Link>
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
    onClick={() => navigate('/CssLesson1')}
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
    onClick={() => navigate('/CssLesson3')}
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

export default CssLesson2;
