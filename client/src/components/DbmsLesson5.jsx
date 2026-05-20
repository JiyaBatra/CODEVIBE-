import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson6');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 5: SELECT with WHERE & LIKE</h1>

      <div className="lesson-content">
        <p>
          Use <b>WHERE</b> to filter rows; <b>LIKE</b> for pattern matching.
        </p>
        <pre>
{`SELECT * FROM Books WHERE price > 500;
SELECT * FROM Books WHERE title LIKE 'C%';`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Select all books with price >= 600.
2. Select books where title starts with 'C'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Select all books with price >= 600. 2. Select books where title starts with 'C'."
        LessonId="dbms-lesson-5"
        language="sql"
        initialCode={`SELECT * FROM Books WHERE price >= 600;
SELECT * FROM Books WHERE title LIKE 'C%';`}
        expectedOutput={`c programming`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson6" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson5;
