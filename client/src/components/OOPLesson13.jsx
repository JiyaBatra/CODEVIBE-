import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson13 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 13 (JavaScript): Mini Project — Library</h1>

      <div className="lesson-content">
        <p>We model a <b>Book</b> and a <b>Library</b> using composition (HAS-A).</p>

        <pre>{`class Book {
  constructor(title) {
    this.title = title;
  }
}

class Library {
  constructor() {
    this.b = new Book("DSA");
  }

  first() {
    return this.b.title;
  }
}

const lib = new Library();
console.log(lib.first()); // DSA`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Make a Book class that stores a title.
2) Make a Library class that HAS a Book("DSA").
3) Call library.first() and print -> DSA`}</pre>

      <Compiler
        hint="💡 Hint: 1) Make a Book class that stores a title. 2) Make a Library class that HAS a Book('DSA')."
        LessonId="oop-lesson-13"
        language="js"
        initialCode={`// Write your code here
class Book {
  // constructor
}

class Library {
  // constructor with Book("DSA")
  // method first()
}

// Test code
const lib = new Library();
// console.log(lib.first());
`}
        expectedOutput={(o) => o.trim() === "DSA"}
        onSuccess={() => setOk(true)}
      />

      {ok && (
        <Link
          to="/OOPLesson14"
          onClick={() => nav('/OOPLesson14')}
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default OOPLesson13;
