import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson8 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 8 (JavaScript): Virtual Functions</h1>

      <div className="lesson-content">
        <p>
          In JavaScript, all methods behave like virtual functions. 
          If a derived class overrides a method, that version is called 
          even if the object is referenced through the base class.
        </p>

        <pre>{`class Base {
  say() {
    console.log("Base");
  }
}

class Der extends Base {
  say() {
    console.log("Der");
  }
}

const b = new Der(); // treated like base reference
b.say(); // Der`}</pre>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: method overriding, runtime polymorphism</p>
      </div>

      <pre className="instructions">{`Task:
1) Create Base class with say() printing "Base"
2) Create Derived class overriding say() to print "Der"
3) Make object of Derived but store in Base reference variable
4) Call say() -> Output: Der`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create Base class with say() printing 'Base' 2) Create Derived class overriding say() to print 'Der'"
        LessonId="oop-lesson-8"
        language="js"
        initialCode={`// write your code here
class Base {
  say() {
    console.log("Base");
  }
}

class Der extends Base {
  // override say()
}

// make base reference to derived object and call say()
`}
        expectedOutput={(o) => o.trim() === "Der"}
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
    onClick={() => nav('/OOPLesson7')}
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
    onClick={() => nav('/OOPLesson9')}
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

export default OOPLesson8;
