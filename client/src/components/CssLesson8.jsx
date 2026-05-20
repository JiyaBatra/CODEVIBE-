// src/pages/CssLesson8.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson9');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 8: Flexbox Basics</h1>

      <div className="lesson-content">
        <p>
          Flexbox is a powerful CSS layout module to arrange elements in a flexible way.
          It allows you to easily align, distribute space, and reorder items inside a container.
        </p>
        <p>
          The main properties we’ll focus on are <code>display: flex;</code>, <code>justify-content</code>, and <code>align-items</code>.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: display, flex, justify-content, align-items, flex-direction</p>
      </div>

      <pre className="instructions">
{`Create a webpage with a container div that:
- Uses flexbox.
- Has 3 child divs with different background colors.
- Aligns children centered horizontally and vertically.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with a container div that: - Uses flexbox."
        LessonId="css-lesson-8"
        language="css" // property-check mode
        initialCode={`.container {
  /* flex styles here */
}

.box1, .box2, .box3 {
  /* common box styles */
}

.box1 { /* red */ }
.box2 { /* green */ }
.box3 { /* blue */ }
`}
        expectedOutput={{
          ".container": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },
          ".box1": {
            width: "100px",
            height: "100px",
            margin: "10px",
            backgroundColor: "rgb(255, 0, 0)" // red
          },
          ".box2": {
            width: "100px",
            height: "100px",
            margin: "10px",
            backgroundColor: "rgb(0, 128, 0)" // green
          },
          ".box3": {
            width: "100px",
            height: "100px",
            margin: "10px",
            backgroundColor: "rgb(0, 0, 255)" // blue
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson9"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson8;
