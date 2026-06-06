// src/pages/CssLesson5.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson6');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 5: Fonts and Text Styling</h1>

      <div className="lesson-content">
        <p>
          In this lesson, we’ll learn about changing fonts and styling text using CSS.
          You can change font-family, font-size, font-weight, font-style, and text-decoration.
        </p>
        <p>
          Example CSS properties:
          <code>font-family: Arial, sans-serif;</code><br />
          <code>font-weight: bold;</code><br />
          <code>text-decoration: underline;</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: font-family, font-size, font-weight, font-style, text-decoration</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A heading "Stylish Text" with font-family Arial, font-size 40px, and bold text.
2. A paragraph with font-family Georgia, italic style, and underlined text.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A heading 'Stylish Text' with font-family Arial, font-size 40px, and bold text."
        LessonId="css-lesson-5"
        language="css" // lock compiler to CSS mode
        initialCode={`h1 {
  /* style for heading */
}

p {
  /* style for paragraph */
}`}
        expectedOutput={{
          h1: {
            fontFamily: "Arial",
            fontSize: "40px",
            fontWeight: "700" // bold computed as 700
          },
          p: {
            fontFamily: "Georgia",
            fontStyle: "italic",
            textDecorationLine: "underline"
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson6"
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
    onClick={() => navigate('/CssLesson4')}
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
    onClick={() => navigate('/CssLesson6')}
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

export default CssLesson5;
