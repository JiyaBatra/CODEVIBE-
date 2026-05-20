import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson8');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 7: INNER & OUTER JOINS</h1>

      <div className="lesson-content">
        <p>
          Joins combine rows from multiple tables:
          <b>INNER JOIN</b> → only matching rows<br />
          <b>LEFT/RIGHT OUTER JOIN</b> → includes non-matching rows from left/right table
        </p>
        <pre>
{`SELECT Students.name, Books.title
FROM Students
INNER JOIN Books ON Students.book_id = Books.id;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Join Students and Books table to show student name & book title.
2. Use INNER JOIN.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Join Students and Books table to show student name & book title. 2. Use INNER JOIN."
        LessonId="dbms-lesson-7"
        language="sql"
        initialCode={`SELECT Students.name, Books.title
FROM Students
INNER JOIN Books ON Students.book_id = Books.id;`}
        expectedOutput={`c programming`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson8" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson7;
