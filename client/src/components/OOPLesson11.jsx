import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson11 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 11 (JavaScript): Operator Overloading (Simulated)</h1>

      <div className="lesson-content">
        <p>
          JavaScript does not support real operator overloading like C++, 
          but we can simulate it with methods like <code>add()</code>.
        </p>

        <pre>{`class Num {
  constructor(v) {
    this.v = v;
  }
  
  add(other) {
    return new Num(this.v + other.v);
  }
}

const result = new Num(4).add(new Num(6));
console.log(result.v); // 10`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create a Num class with constructor(v).
2) Add an add(other) method that returns a new Num with summed value.
3) Do new Num(4).add(new Num(6)) and print v => 10`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create a Num class with constructor(v). 2) Add an add(other) method that returns a new Num with summed va..."
        LessonId="oop-lesson-11"
        language="js"
        initialCode={`// Write your code here
class Num {
  // constructor and add()
}

// test code here
`}
        expectedOutput={(o) => o.trim() === "10"}
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
    onClick={() => nav('/OOPLesson10')}
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
    onClick={() => nav('/OOPLesson12')}
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

export default OOPLesson11;
