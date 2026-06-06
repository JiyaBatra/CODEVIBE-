import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson4 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  return (
    <div className="lesson">
      <h1>OOP Lesson 4 (JavaScript): Encapsulation</h1>
      <div className="lesson-content">
        <p>
          Encapsulation hides data using <b>private fields</b> (#) 
          and provides access via methods.
        </p>
        <pre>{`class Bank {
  #balance;

  setBalance(b) { this.#balance = b; }
  getBalance() { return this.#balance; }
}

const b = new Bank();
b.setBalance(500);
console.log(b.getBalance()); // 500`}</pre>
      </div>
      <pre className="instructions">{`Task:
1) Class Account with private field #bal
2) Add methods setBal(b) and getBal()
3) Set 999 and print: 999`}</pre>

      <Compiler
        hint="💡 Hint: 1) Class Account with private field #bal 2) Add methods setBal(b) and getBal()"
        LessonId="oop-lesson-4"
        language="js"
        initialCode={`// write your code here
class Account {
  // private field and methods
}

// create object, set 999 and print
`}
        expectedOutput={(o)=>o.trim()==="999"}
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
    onClick={() => nav('/OOPLesson3')}
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
    onClick={() => nav('/OOPLesson5')}
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
export default OOPLesson4;
