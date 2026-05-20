
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson11');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 10: While Loop</h1>

      <div className="lesson-content">
        <p>
          The <b>while</b> loop runs a block of code as long as the condition is true.
        </p>
        <p>
          Syntax:<br />
          <code>
            while(condition) &#123;<br />
            &nbsp;&nbsp;// code<br />
            &#125;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            let i = 1;<br />
            while(i &lt;= 5) &#123;<br />
            &nbsp;&nbsp;console.log(i);<br />
            &nbsp;&nbsp;i++;<br />
            &#125;
          </code>
          <br />This will print numbers 1 to 5.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: while loop, increment, condition check</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Uses a while loop to print numbers from 1 to 3, each on a new line.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Uses a while loop to print numbers from 1 to 3, each on a new line."
        LessonId="js-lesson-10"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`1
2
3`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson11"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson10;
