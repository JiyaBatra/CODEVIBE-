import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 12: Mini Project - Library Management System</h1>

      <div className="lesson-content">
        <p>
          Combine all learned DBMS concepts:
          CREATE tables, INSERT books/students, UPDATE prices, SELECT queries, and JOINs.
        </p>
      </div>

      <pre className="instructions">
{`Task:
1. Create Books & Students tables.
2. Insert 3 books & 3 students.
3. Show student names & the book they borrowed using JOIN.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create Books & Students tables. 2. Insert 3 books & 3 students."
        LessonId="dbms-lesson-12"
        language="sql"
        initialCode={`-- Write your SQL code here
CREATE TABLE Books(id INT PRIMARY KEY, title VARCHAR(50), price INT);
CREATE TABLE Students(id INT PRIMARY KEY, name VARCHAR(50), book_id INT, FOREIGN KEY(book_id) REFERENCES Books(id));
INSERT INTO Books VALUES(1,'C Programming',500),(2,'Java Basics',600),(3,'DBMS',550);
INSERT INTO Students VALUES(1,'Alice',1),(2,'Bob',2),(3,'Charlie',3);
SELECT Students.name, Books.title FROM Students INNER JOIN Books ON Students.book_id = Books.id;`}
        expectedOutput={`alice`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/Certificate" className="next-lesson">
          ✅ COURSE COMPLETED
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson12;
