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
      {ok && <Link to="/OOPLesson2" onClick={()=>nav('/OOPLesson2')}>⏭ NEXT LESSON</Link>}
    </div>
  );
};
export default OOPLesson1;
