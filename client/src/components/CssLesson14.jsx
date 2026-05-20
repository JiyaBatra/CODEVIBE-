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
        <Link
          to="/Certificate"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON: Certificate
        </Link>
      )}
    </div>
  );
};

export default CssLesson14;
