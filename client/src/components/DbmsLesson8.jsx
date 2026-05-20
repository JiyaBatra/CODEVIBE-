
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson9');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 8: PRIMARY & FOREIGN KEYS</h1>

      <div className="lesson-content">
        <p>
          <b>PRIMARY KEY</b> uniquely identifies a row.<br />
          <b>FOREIGN KEY</b> links tables.
        </p>
        <pre>
{`CREATE TABLE Students(
  id INT PRIMARY KEY,
  name VARCHAR(50),
  book_id INT,
  FOREIGN KEY (book_id) REFERENCES Books(id)
);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create Students table with id as PRIMARY KEY.
2. book_id as FOREIGN KEY referencing Books table.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create Students table with id as PRIMARY KEY. 2. book_id as FOREIGN KEY referencing Books table."
        LessonId="dbms-lesson-8"
        language="sql"
        initialCode={`CREATE TABLE Students(
  id INT PRIMARY KEY,
  name VARCHAR(50),
  book_id INT,
  FOREIGN KEY (book_id) REFERENCES Books(id)
);`}
        expectedOutput={`students`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson9" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson8;
