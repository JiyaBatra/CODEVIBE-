import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson2 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 2 (JavaScript): Constructors</h1>
      <div className="lesson-content">
        <p>
          Constructors in JS are special methods named <code>constructor</code> 
          that run when an object is created.
        </p>
        <pre>{`class Box {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
}

const b = new Box(5, 10);
console.log(b.w, b.h); // 5 10`}</pre>
      </div>
      <pre className="instructions">{`Task:
1) Create class Point with constructor(x, y)
2) Make object new Point(3, 4)
3) Print: 3 4`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create class Point with constructor(x, y) 2) Make object new Point(3, 4)"
        LessonId="oop-lesson-2"
        language="js"
        initialCode={`// write your code here
class Point {
  // constructor here
}

// create object and print
`}
        expectedOutput={(o)=>o.trim()==="3 4"}
        onSuccess={()=>setOk(true)}
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
    onClick={() => nav('/OOPLesson1')}
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
    onClick={() => nav('/OOPLesson3')}
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

export default OOPLesson2;
