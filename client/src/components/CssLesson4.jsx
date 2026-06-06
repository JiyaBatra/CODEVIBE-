// src/pages/CssLesson4.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson5');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 4: Margin & Padding</h1>

      <div className="lesson-content">
        <p>
          Today we’ll learn about <b>margin</b> and <b>padding</b> — two essential properties for spacing in CSS.
        </p>
        <p><b>Margin</b> controls the space outside an element’s border.</p>
        <p><b>Padding</b> adds space inside the element between the content and its border.</p>
        <p>
          Example:<br />
          <code>margin: 20px;</code> → 20px space outside<br />
          <code>padding: 15px;</code> → 15px space inside
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: margin, padding, margin-top, margin-bottom, padding-left, padding-right</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A heading "Margin and Padding Example" with 30px margin and 20px padding.
2. A paragraph with text and 15px margin and 10px padding.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A heading 'Margin and Padding Example' with 30px margin and 20px padding."
        LessonId="css-lesson-4"
        language="css"
        initialCode={`h1 {
  /* style for heading */
}

p {
  /* style for paragraph */
}`}
        expectedOutput={{
          h1: {
            marginTop: "30px",
            marginRight: "30px",
            marginBottom: "30px",
            marginLeft: "30px",
            paddingTop: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            paddingLeft: "20px"
          },
          p: {
            marginTop: "15px",
            marginRight: "15px",
            marginBottom: "15px",
            marginLeft: "15px",
            paddingTop: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            paddingLeft: "10px"
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson5"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
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
    onClick={() => navigate('/CssLesson3')}
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
    onClick={() => navigate('/CssLesson5')}
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

export default CssLesson4;
