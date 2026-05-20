// src/pages/CssLesson7.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson8');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 7: Positioning Elements</h1>

      <div className="lesson-content">
        <p>
          In this lesson, we'll dive into CSS <b>position</b> property and how it helps in placing elements precisely on the page.
        </p>
        <p>
          The position property values include: <code>static</code> (default), <code>relative</code>, <code>absolute</code>, and <code>fixed</code>.
          Using <code>top</code>, <code>left</code>, <code>right</code>, and <code>bottom</code>, you can adjust element's position.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: position, top, left, right, bottom, relative, absolute, fixed</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A div with red background, positioned relative, shifted 20px down and 30px right.
2. A div with blue background, positioned absolute, at top 50px and left 100px.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A div with red background, positioned relative, shifted 20px down and 30px right."
        LessonId="css-lesson-7"
        language="css" // property-check mode
        initialCode={`.relative-box {
  /* style relative box here */
}

.absolute-box {
  /* style absolute box here */
}`}
        expectedOutput={{
          ".relative-box": {
            position: "relative",
            top: "20px",
            left: "30px",
            backgroundColor: "rgb(255, 0, 0)" // red
          },
          ".absolute-box": {
            position: "absolute",
            top: "50px",
            left: "100px",
            backgroundColor: "rgb(0, 0, 255)" // blue
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson8"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson7;
