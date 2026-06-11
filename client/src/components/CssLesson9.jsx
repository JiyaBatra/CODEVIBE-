// src/pages/CssLesson9.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson10');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 9: CSS Grid Basics</h1>

      <div className="lesson-content">
        <p>
          CSS Grid is another powerful layout system that lets you create complex, two-dimensional grid-based layouts.
        </p>
        <p>
          You'll learn properties like <code>display: grid;</code>, <code>grid-template-columns</code>, and <code>grid-gap</code>.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: display, grid, grid-template-columns, grid-gap, grid-template-rows</p>
      </div>

      <pre className="instructions">
{`Create a webpage with a grid container that:
- Has 3 columns, each 100px wide.
- Contains 6 child divs with numbers 1 to 6.
- Adds 10px gap between grid items.`}
      </pre>

      {/* Compiler */}
      <Compiler
        hint="💡 Hint: Create a webpage with a grid container that: - Has 3 columns, each 100px wide."
        LessonId="css-lesson-9"
        language="css" // property-check mode
        initialCode={`.grid-container {
  /* grid styles here */
}

.grid-container div {
  /* optional child styles */
}`}
        expectedOutput={{
          ".grid-container": {
            display: "grid",
            gridTemplateColumns: "100px 100px 100px",
            gap: "10px"
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson10"
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
    onClick={() => navigate('/CssLesson8')}
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
    onClick={() => navigate('/CssLesson10')}
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

export default CssLesson9;
