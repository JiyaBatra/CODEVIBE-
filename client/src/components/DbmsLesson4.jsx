import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson5');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 4: UPDATE & DELETE Commands</h1>

      <div className="lesson-content">
        <p>
          <b>UPDATE</b> changes existing records; <b>DELETE</b> removes records.
        </p>
        <pre>
{`UPDATE Students SET name='Bob' WHERE id=1;
DELETE FROM Students WHERE id=1;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Update the book price of 'C Programming' to 600.
2. Delete any book with id=2.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Update the book price of 'C Programming' to 600. 2. Delete any book with id=2."
        LessonId="dbms-lesson-4"
        language="sql"
        initialCode={`UPDATE Books SET price=600 WHERE title='C Programming';
DELETE FROM Books WHERE id=2;`}
        expectedOutput={`c programming`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson5" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson4;
