import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson12');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 11: Aggregate Functions</h1>

      <div className="lesson-content">
        <p>
          Aggregate functions compute values from multiple rows:
          <b>SUM, AVG, COUNT, MAX, MIN</b>
        </p>
        <pre>
{`SELECT COUNT(*) FROM Books;
SELECT AVG(price) FROM Books;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Count the total number of books.
2. Find the average price of books.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Count the total number of books. 2. Find the average price of books."
        LessonId="dbms-lesson-11"
        language="sql"
        initialCode={`SELECT COUNT(*) FROM Books;
SELECT AVG(price) FROM Books;`}
        expectedOutput={`books`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson12" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson11;
