
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson10');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 9: VIEWS</h1>

      <div className="lesson-content">
        <p>
          <b>VIEW</b> is a virtual table based on a SELECT query.
        </p>
        <pre>
{`CREATE VIEW BookView AS
SELECT title, price FROM Books WHERE price > 500;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a view 'BookView' showing books with price > 500.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a view 'BookView' showing books with price > 500."
        LessonId="dbms-lesson-9"
        language="sql"
        initialCode={`CREATE VIEW BookView AS
SELECT title, price FROM Books WHERE price > 500;`}
        expectedOutput={`bookview`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson10" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson9;
