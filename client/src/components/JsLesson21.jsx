// src/pages/JsLesson21.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson21 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson22');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 21: Event Listeners & Event Object</h1>

      <div className="lesson-content">
        <p>
          Event listeners let you attach multiple events to an element without overwriting previous ones.
        </p>
        <p>
          The <b>event object</b> contains information about the event like which key was pressed or which element was clicked.
        </p>
        <p>
          Example:<br />
          <code>
            &lt;button id="btn"&gt;Click Me&lt;/button&gt;<br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.getElementById("btn").addEventListener("click", function(event) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;alert("Button clicked: " + event.type);<br />
            &nbsp;&nbsp;&#125;);<br />
            &lt;/script&gt;
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: addEventListener, event object, event.type</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Has a button with id "btn".
2. Add a click event listener to the button.
3. When clicked, print the type of the event using the event object.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Has a button with id 'btn'."
        LessonId="js-lesson-21"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`click`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson22"
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
    onClick={() => navigate('/JsLesson20')}
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
    onClick={() => navigate('/JsLesson22')}
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

export default JsLesson21;
