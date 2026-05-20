// src/pages/JsLesson25.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson25 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson26');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 25: ES6 Modules (import/export)</h1>

      <div className="lesson-content">
        <p>
          ES6 Modules allow you to split JavaScript code into multiple files.  
          You can <b>export</b> variables/functions from one file and <b>import</b> them in another.
        </p>
        <p>
          Example:<br />
          <code>
            // file: math.js<br />
            export function add(a, b) &#123; return a + b; &#125;<br /><br />
            // file: main.js<br />
            import { add } from './math.js';<br />
            console.log(add(5, 3)); // 8
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: export, import, modular code, functions</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a file "utils.js" and export a function "greet" that prints "Hello CodeVibe".
2. In another file "main.js", import the "greet" function and call it.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a file 'utils.js' and export a function 'greet' that prints 'He..."
        LessonId="js-lesson-25"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson26"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson25;
