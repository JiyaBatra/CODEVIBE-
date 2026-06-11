import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson5 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  return (
    <div className="lesson">
      <h1>OOP Lesson 5 (JavaScript): Inheritance</h1>
      <div className="lesson-content">
        <p>
          In JavaScript, inheritance allows one class to extend another 
          using the <code>extends</code> keyword.
        </p>
        <pre>{`class Animal {
  speak() {
    console.log("sound");
  }
}

class Dog extends Animal {}

const d = new Dog();
d.speak(); // sound`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create base class Shape with method name() that prints "Shape"
2) Create derived class Circle extends Shape
3) Make Circle object and call name() -> Output: Shape`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create base class Shape with method name() that prints 'Shape' 2) Create derived class Circle extends Shape"
        LessonId="oop-lesson-5"
        language="js"
        initialCode={`// write your code here
class Shape {
  // name() method
}

class Circle extends Shape {
  // nothing extra
}

// create Circle object and call name()
`}
        expectedOutput={(o) => o.trim() === "Shape"}
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
    onClick={() => nav('/OOPLesson4')}
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
    onClick={() => nav('/OOPLesson6')}
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
export default OOPLesson5;
