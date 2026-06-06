import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson6 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  return (
    <div className="lesson">
      <h1>OOP Lesson 6 (JavaScript): Multilevel Inheritance</h1>
      <div className="lesson-content">
        <p>
          Multilevel inheritance in JavaScript means one class extends another, 
          which itself extends another — forming a chain.
        </p>
        <pre>{`class A {
  greet() {
    console.log("Hello");
  }
}

class B extends A {}

class C extends B {}

const obj = new C();
obj.greet(); // Hello`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create classes A → B → C (multilevel chain)
2) A has method greet() that prints "Hello"
3) Make object of C and call greet() -> Output: Hello`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create classes A → B → C (multilevel chain) 2) A has method greet() that prints 'Hello'"
        LessonId="oop-lesson-6"
        language="js"
        initialCode={`// write your code here
class A {
  // greet() here
}

class B extends A {}

class C extends B {}

// create C object and call greet()
`}
        expectedOutput={(o) => o.trim() === "Hello"}
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
    onClick={() => nav('/OOPLesson5')}
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
    onClick={() => nav('/OOPLesson7')}
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

export default OOPLesson6;
