// src/pages/CssLesson6.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson7');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 6: Display and Visibility</h1>

      <div className="lesson-content">
        <p>
          Today we’ll explore the <b>display</b> and <b>visibility</b> properties in CSS.
        </p>
        <p>
          The <b>display</b> property controls how an element is displayed on the page.
          <code>display: none;</code> hides an element completely.
        </p>
        <p>
          The <b>visibility</b> property hides or shows elements but still takes up space in the layout.
          <code>visibility: hidden;</code> hides the element but keeps its space.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: display, visibility, block, inline, none, hidden</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A heading "Visible Heading" displayed normally.
2. A paragraph "This paragraph is hidden using display." hidden using display:none.
3. Another paragraph "This paragraph is hidden using visibility." hidden using visibility:hidden.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A heading 'Visible Heading' displayed normally."
        LessonId="css-lesson-6"
        language="css"
        initialCode={`

p:nth-of-type(1) {
  /* hide using display */
}

p:nth-of-type(2) {
  /* hide using visibility */
}`}
        expectedOutput={{
          "p:nth-of-type(1)": {
            display: "none"
          },
          "p:nth-of-type(2)": {
            visibility: "hidden"
          }
        }}
        customHTML={`
          <h1>Visible Heading</h1>
          <p>This paragraph is hidden using display.</p>
          <p>This paragraph is hidden using visibility.</p>
        `}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link 
          to="/CssLesson7" 
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
    onClick={() => navigate('/CssLesson5')}
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
    onClick={() => navigate('/CssLesson7')}
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

export default CssLesson6;
