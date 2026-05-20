
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson15 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson16');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 15: Arrays in JavaScript</h1>

      <div className="lesson-content">
        <p>
          An <b>array</b> is a collection of elements stored in a single variable.  
          Arrays can hold multiple data types like numbers, strings, booleans, etc.
        </p>
        <p>
          Syntax:<br />
          <code>
            let arrayName = [element1, element2, element3];
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            let fruits = ["Apple", "Mango", "Banana"];<br />
            console.log(fruits[0]); // Apple
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: array, index, console.log()</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates an array "colors" with values "Red", "Green", "Blue".
2. Prints the first element of the array.
3. Prints the length of the array.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates an array 'colors' with values 'Red', 'Green', 'Blue'."
        LessonId="js-lesson-15"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Red
3`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson16"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson15;
