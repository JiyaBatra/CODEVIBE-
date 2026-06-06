// src/pages/JsLesson24.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson24 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson25');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 24: Spread & Rest Operators</h1>

      <div className="lesson-content">
        <p>
          The <b>spread operator</b> <code>...</code> expands arrays or objects.  
          The <b>rest operator</b> <code>...</code> collects multiple elements into an array.
        </p>
        <p>
          Spread Example:<br />
          <code>
            let arr1 = [1,2];<br />
            let arr2 = [...arr1,3,4];<br />
            console.log(arr2); // [1,2,3,4]
          </code>
        </p>
        <p>
          Rest Example:<br />
          <code>
            function sum(...numbers) &#123;<br />
            &nbsp;&nbsp;return numbers.reduce((a,b) =&gt; a+b, 0);<br />
            &#125;<br />
            console.log(sum(1,2,3)); // 6
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: spread operator, rest operator, arrays, functions</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Has an array "nums1" with [10, 20].
2. Create another array "nums2" that uses spread operator to include nums1 and 30, 40.
3. Print nums2.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Has an array 'nums1' with [10, 20]."
        LessonId="js-lesson-24"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`10,20,30,40`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson25"
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
    onClick={() => navigate('/JsLesson23')}
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
    onClick={() => navigate('/JsLesson25')}
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

export default JsLesson24;
