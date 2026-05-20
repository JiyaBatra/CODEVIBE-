import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson11');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 10: JSON Handling</h1>

      <div className="lesson-content">
        <p>
          JSON (JavaScript Object Notation) is used to send and receive structured data in Node.js.
        </p>
        <pre>
{`const data = {name: "Jiya", age: 18};
console.log(JSON.stringify(data));
console.log(JSON.parse('{"name":"Jiya","age":18}'));`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Convert object {name:"Jiya", age:18} to JSON string.
2. Parse the same JSON string back to an object.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Convert object name:'Jiya', age:18 to JSON string. 2. Parse the same JSON string back to an object."
        LessonId="node-lesson-10"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`"name":"Jiya"`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/NodeLesson11" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default NodeLesson10;
