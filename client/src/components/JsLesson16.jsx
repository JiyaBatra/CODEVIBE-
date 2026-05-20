// src/pages/JsLesson17.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson17 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson18');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 17: Objects in JavaScript</h1>

      <div className="lesson-content">
        <p>
          An <b>object</b> is a collection of key-value pairs, used to store structured data.
        </p>
        <p>
          Syntax:<br />
          <code>
            let objectName = &#123;<br />
            &nbsp;&nbsp;key1: value1,<br />
            &nbsp;&nbsp;key2: value2<br />
            &#125;;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            let person = &#123;<br />
            &nbsp;&nbsp;name: "Jiya",<br />
            &nbsp;&nbsp;age: 18<br />
            &#125;;<br />
            console.log(person.name); // Jiya
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: object, key, value, console.log()</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates an object "car" with keys: brand="Tesla", model="Model 3", year=2023.
2. Print the brand of the car.
3. Print the year of the car.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates an object 'car' with keys: brand='Tesla', model='Model 3', year..."
        LessonId="js-lesson-17"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Tesla
2023`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson18"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson17;
