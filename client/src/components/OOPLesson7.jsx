import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson7 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  return (
    <div className="lesson">
      <h1>OOP Lesson 7 (JavaScript): Function Overloading</h1>
      <div className="lesson-content">
        <p>
          JavaScript does not support function overloading like C++.
          But we can simulate it by checking the number of arguments 
          or using default/optional parameters.
        </p>
        <pre>{`class Calc {
  add(a, b, c) {
    if (c !== undefined) {
      return a + b + c;
    } else {
      return a + b;
    }
  }
}

const c = new Calc();
console.log(c.add(2, 3));    // 5
console.log(c.add(2, 3, 4)); // 9`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Make class Calc with add(a,b) and add(a,b,c) simulated in one method
2) Print add(2,3,4) => 9`}</pre>

      <Compiler
        hint="💡 Hint: 1) Make class Calc with add(a,b) and add(a,b,c) simulated in one method 2) Print add(2,3,4) => 9"
        LessonId="oop-lesson-7"
        language="js"
        initialCode={`// write your code here
class Calc {
  add(a, b, c) {
    // check if c is given
  }
}

const c = new Calc();
// call add(2,3,4)
`}
        expectedOutput={(o) => o.trim() === "9"}
        onSuccess={() => setOk(true)}
      />

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
    onClick={() => nav('/OOPLesson6')}
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
    onClick={() => nav('/OOPLesson8')}
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
export default OOPLesson7;
