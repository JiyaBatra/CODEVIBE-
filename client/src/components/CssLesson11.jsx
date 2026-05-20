
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson12');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 11: Transitions and Animations</h1>

      <div className="lesson-content">
        <p>
          Let’s animate! CSS <b>transitions</b> and <b>animations</b> bring life to your webpages.
        </p>
        <p>
          Transitions let you smoothly change property values on events (like hover), and animations let you create complex keyframe sequences.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Tags to Try: transition, animation, @keyframes, transform, hover</p>
      </div>

      <pre className="instructions">
{`Create a webpage with:
1. A button that changes background color from blue to red smoothly on hover.
2. A box that moves left to right continuously using animation.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A button that changes background color from blue to red smoothly on hover."
        LessonId="css-lesson-11"
        language="css" // lock to css
        initialCode={`button {
  /* button styles */
}

button:hover {
  /* hover styles */
}

.moving-box {
  /* box styles */
}

/* keyframes here */
`}
        expectedOutput={{
          "button": {
            backgroundColor: "rgb(0, 0, 255)", // blue
            transition: "background-color 0.5s ease"
          },
          // Hover color can't be directly checked via computed style without triggering hover.
          // You can check via code-string match in compiler or skip actual hover check here.
          ".moving-box": {
            width: "100px",
            height: "100px",
            backgroundColor: "rgb(255, 165, 0)", // orange
            position: "relative",
            animationIterationCount: "infinite",
            animationDirection: "alternate"
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CssLesson12"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson11;
