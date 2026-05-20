import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson14 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 14 (JavaScript): Final — Polymorphic Menu</h1>

      <div className="lesson-content">
        <p>
          Polymorphism = one interface, many implementations.  
          Here <code>Action</code> is the base, and <code>Add</code>/<code>Mul</code> override <code>run()</code>.
        </p>

        <pre>{`class Action {
  run(a, b) {
    throw new Error("Must override run()");
  }
}

class Add extends Action {
  run(a, b) {
    return a + b;
  }
}

class Mul extends Action {
  run(a, b) {
    return a * b;
  }
}

let p = new Add();
console.log(p.run(4, 6)); // 10`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create Action base with run(a,b) that throws error.
2) Create Add and Mul classes overriding run().
3) Let p = new Add(); print p.run(4,6) => 10`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create Action base with run(a,b) that throws error. 2) Create Add and Mul classes overriding run()."
        LessonId="oop-lesson-14"
        language="js"
        initialCode={`// Write your code here
class Action {
  run(a, b) {
    // throw error here
  }
}

class Add extends Action {
  // override run
}

class Mul extends Action {
  // override run
}

// Test
let p = new Add();
// console.log(p.run(4,6));
`}
        expectedOutput={(o) => o.trim() === "10"}
        onSuccess={() => setOk(true)}
      />

      {ok && (
        <Link
          to="/Certificate"
          onClick={() => nav('/Certificate')}
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
        >
          🎉 GET CERTIFICATE
        </Link>
      )}
    </div>
  );
};

export default OOPLesson14;
