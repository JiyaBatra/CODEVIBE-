import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 3: SQL Basics</h1>

      <div className="lesson-content">
        <p>
          SQL (Structured Query Language) is used to manage relational databases.  
          Common commands:
        </p>
        <ul>
          <li><b>CREATE</b> - Create tables/databases</li>
          <li><b>INSERT</b> - Insert data</li>
          <li><b>SELECT</b> - Retrieve data</li>
        </ul>
        <p>Example:</p>
        <pre>
{`CREATE TABLE Students (id INT, name VARCHAR(50));
INSERT INTO Students VALUES (1, 'Alice');
SELECT * FROM Students;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a table 'Books' with id, title, and price.
2. Insert one book with id=1, title='C Programming', price=500.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a table 'Books' with id, title, and price. 2. Insert one book with id=1, title='C Programming', pr..."
        LessonId="dbms-lesson-3"
        language="sql"
        initialCode={`CREATE TABLE Books (id INT, title VARCHAR(50), price INT);
INSERT INTO Books VALUES (1, 'C Programming', 500);
SELECT * FROM Books;`}
        expectedOutput={`c programming`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson4" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson3;
