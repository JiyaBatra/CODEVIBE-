import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 6: ORDER BY & GROUP BY</h1>

      <div className="lesson-content">
        <p>
          <b>ORDER BY</b> sorts records; <b>GROUP BY</b> groups records with aggregate functions.
        </p>
        <pre>
{`SELECT * FROM Books ORDER BY price DESC;
SELECT price, COUNT(*) FROM Books GROUP BY price;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Display books ordered by price descending.
2. Count how many books have the same price.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Display books ordered by price descending. 2. Count how many books have the same price."
        LessonId="dbms-lesson-6"
        language="sql"
        initialCode={`SELECT * FROM Books ORDER BY price DESC;
SELECT price, COUNT(*) FROM Books GROUP BY price;`}
        expectedOutput={`c programming`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson7" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson6;
