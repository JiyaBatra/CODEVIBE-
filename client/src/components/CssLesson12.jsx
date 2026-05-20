// src/pages/CssLesson12.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson13');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 12: Responsive Design Basics</h1>

      <div className="lesson-content">
        <p>
          Time to make your site flexible! Responsive design lets your webpage look great on any device.
        </p>
        <p>
          We use media queries to apply different CSS rules based on screen size, orientation, and resolution.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: @media, max-width, min-width, responsive, viewport</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A div with background color red by default.
2. When the screen width is less than 600px, the div’s background color changes to blue.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A div with background color red by default."
        LessonId="css-lesson-12"
        language="css" // property-check mode
        initialCode={`.responsive-box {
  /* default style */
}

@media (max-width: 600px) {
  .responsive-box {
    /* small screen style */
  }
}`}
        expectedOutput={{
          // Default check (large screen)
          ".responsive-box": {
            backgroundColor: "rgb(255, 0, 0)" // red
          },
          // For responsive media query check:
          "@media (max-width: 600px) .responsive-box": {
            backgroundColor: "rgb(0, 0, 255)" // blue
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson13"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson12;
