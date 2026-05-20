// src/pages/JsLesson20.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson20 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson21');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 20: Events in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Events allow JavaScript to respond to user actions like clicking, hovering, or pressing keys.
        </p>
        <p>
          Example:<br />
          <code>
            &lt;button id="myBtn"&gt;Click Me&lt;/button&gt;<br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.getElementById("myBtn").onclick = function() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;alert("Button Clicked!");<br />
            &nbsp;&nbsp;&#125;;<br />
            &lt;/script&gt;
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: onclick, onmouseover, onkeypress, addEventListener</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Has a button with id "btn" and text "Click Me".
2. When the button is clicked, an alert appears with message "Hello CodeVibe".`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Has a button with id 'btn' and text 'Click Me'."
        LessonId="js-lesson-20"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson21"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson20;
