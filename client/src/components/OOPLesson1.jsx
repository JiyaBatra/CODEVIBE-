import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson1 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();
  return (
    <div className="lesson">
      <h1>OOP Lesson 1 (JavaScript): Classes & Objects</h1>
      <div className="lesson-content">
        <p>In JavaScript, a <b>class</b> is a blueprint and an <b>object</b> is an instance of that class.</p>
        <pre>{`class Car {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }
}

const c = new Car("Toyota", 2020);
console.log(c.brand, c.year);`}</pre>
      </div>
      <pre className="instructions">{`Task:
1) Create class Person with constructor(name, age)
2) Make an object with name="Alice", age=25
3) Print: Alice 25`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create class Person with constructor(name, age) 2) Make an object with name='Alice', age=25"
        LessonId="oop-lesson-1"
        language="js"
        initialCode={`// write your code here
class Person {
  // constructor
}

// create object and print
`}
        expectedOutput={(o)=>o.trim()==="Alice 25"}
        onSuccess={()=>setOk(true)}
      />
               {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => nav('/OOPLesson2')}
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
export default OOPLesson1;
