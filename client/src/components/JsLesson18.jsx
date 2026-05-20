// src/pages/JsLesson18.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson18 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson19');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 18: Object Methods & <code>this</code> Keyword</h1>

      <div className="lesson-content">
        <p>
          Objects can have <b>methods</b>, which are functions stored as properties.
        </p>
        <p>
          The <code>this</code> keyword refers to the current object.
        </p>
        <p>
          Example:<br />
          <code>
            let person = &#123;<br />
            &nbsp;&nbsp;name: "Jiya",<br />
            &nbsp;&nbsp;sayHello: function() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;console.log("Hello " + this.name);<br />
            &nbsp;&nbsp;&#125;<br />
            &#125;;<br />
            person.sayHello(); // Hello Jiya
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: object, method, this, function</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates an object "student" with keys: name="CodeVibe", age=18.
2. Add a method "introduce" that prints "My name is " followed by the name.
3. Call the "introduce" method.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates an object 'student' with keys: name='CodeVibe', age=18."
        LessonId="js-lesson-18"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`My name is CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson19"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson18;
