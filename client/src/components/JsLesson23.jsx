// src/pages/JsLesson23.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson23 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson24');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 23: Destructuring (Arrays & Objects)</h1>

      <div className="lesson-content">
        <p>
          Destructuring allows you to extract values from arrays or objects into separate variables easily.
        </p>
        <p>
          Array Destructuring:<br />
          <code>
            let nums = [10, 20];<br />
            let [a, b] = nums;<br />
            console.log(a); // 10<br />
            console.log(b); // 20
          </code>
        </p>
        <p>
          Object Destructuring:<br />
          <code>
            let person = &#123;name: "Jiya", age: 18&#125;;<br />
            let &#123;name, age&#125; = person;<br />
            console.log(name); // Jiya<br />
            console.log(age); // 18
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: array destructuring, object destructuring, variables</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Has an array "colors" with values ["Red", "Green", "Blue"].
2. Use destructuring to extract the first two colors into variables "first" and "second".
3. Print both variables.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Has an array 'colors' with values ['Red', 'Green', 'Blue']."
        LessonId="js-lesson-23"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Red
Green`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson24"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson23;
