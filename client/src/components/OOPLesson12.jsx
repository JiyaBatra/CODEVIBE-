import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson12 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 12 (JavaScript): Mini Project — Bank Account</h1>

      <div className="lesson-content">
        <p>
          We simulate a small bank account using encapsulation. 
          JavaScript now supports <code>#privateFields</code> to hide data.
        </p>

        <pre>{`class Account {
  #bal;
  constructor() {
    this.#bal = 0;
  }

  deposit(x) {
    this.#bal += x;
  }

  withdraw(x) {
    this.#bal -= x;
  }

  get() {
    return this.#bal;
  }
}

const a = new Account();
a.deposit(200);
a.withdraw(50);
console.log(a.get()); // 150`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create an Account class with private field #bal.
2) deposit(x) adds to balance, withdraw(x) subtracts.
3) Run deposit(200), withdraw(50), then print get() => 150`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create an Account class with private field #bal. 2) deposit(x) adds to balance, withdraw(x) subtracts."
        LessonId="oop-lesson-12"
        language="js"
        initialCode={`// Write your code here
class Account {
  // constructor, deposit, withdraw, get
}

// Test code
const a = new Account();
// a.deposit(200);
// a.withdraw(50);
// console.log(a.get());
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
    onClick={() => nav('/OOPLesson11')}
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
    onClick={() => nav('/OOPLesson13')}
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

export default OOPLesson12;
