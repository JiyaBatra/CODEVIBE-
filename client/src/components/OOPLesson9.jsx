import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson9 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 9 (JavaScript): Abstraction</h1>

      <div className="lesson-content">
        <p>
          JavaScript doesn’t have <code>abstract</code> classes natively, but we can 
          simulate them. The base class defines a method that throws an error, forcing 
          derived classes to override it.
        </p>

        <pre>{`class Shape {
  name() {
    throw new Error("Must override name()");
  }
}

class Square extends Shape {
  name() {
    return "Square";
  }
}

const s = new Square();
console.log(s.name()); // Square`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create abstract-like class Shape with name() that throws error
2) Create Square extends Shape, override name() return "Square"
3) In main, make object of Square and print: Square`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create abstract-like class Shape with name() that throws error 2) Create Square extends Shape, override n..."
        LessonId="oop-lesson-9"
        language="js"
        initialCode={`// write your code here
class Shape {
  name() {
    // throw error here
  }
}

// class Square extends Shape ...

// make object and print name()
`}
        expectedOutput={(o) => o.trim() === "Square"}
        onSuccess={() => setOk(true)}
      />

      {ok && (
        <Link to="/OOPLesson10" onClick={() => nav('/OOPLesson10')}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default OOPLesson9;
