import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson10 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 10 (JavaScript): Composition (HAS-A)</h1>

      <div className="lesson-content">
        <p>
          In composition, one class <b>has</b> another class as a property. 
          Example: A Car <b>has</b> an Engine.
        </p>

        <pre>{`class Engine {
  constructor(hp) {
    this.hp = hp;
  }
}

class Car {
  constructor() {
    this.engine = new Engine(150); // Car HAS an Engine
  }
}

const c = new Car();
console.log(c.engine.hp); // 150`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Make Engine class with constructor(hp)
2) Make Car class that HAS an Engine with hp=150
3) Print the hp => 150`}</pre>

      <Compiler
        hint="💡 Hint: 1) Make Engine class with constructor(hp) 2) Make Car class that HAS an Engine with hp=150"
        LessonId="oop-lesson-10"
        language="js"
        initialCode={`// Write your code here
class Engine {
  // constructor
}

class Car {
  // has Engine
}

// make Car and print engine.hp
`}
        expectedOutput={(o) => o.trim() === "150"}
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
    onClick={() => nav('/OOPLesson9')}
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
    onClick={() => nav('/OOPLesson11')}
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

export default OOPLesson10;
