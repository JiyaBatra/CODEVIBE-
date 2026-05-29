// src/pages/JsLesson4.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson5');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 4: Data Types in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Data types define the kind of data a variable can store.  
          In JavaScript, there are two main categories: **Primitive** and **Non-Primitive**.
        </p>
        <ul>
          <li><b>Primitive:</b> String, Number, Boolean, Undefined, Null, Symbol, BigInt</li>
          <li><b>Non-Primitive:</b> Objects, Arrays, Functions</li>
        </ul>
        <p>
          Example:<br />
          <code>let name = "Jiya"; // String</code><br />
          <code>let age = 20; // Number</code><br />
          <code>let isStudent = true; // Boolean</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: string, number, boolean, null, undefined, object</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a string variable "fruit" with value "Mango".
2. Creates a number variable "quantity" with value 5.
3. Creates a boolean variable "isFresh" with value true.
4. Prints all values in the console (each on a new line).`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a string variable 'fruit' with value 'Mango'."
        LessonId="js-lesson-4"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Mango
5
true`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson5"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson4;
