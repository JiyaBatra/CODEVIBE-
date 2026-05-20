import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 1: Introduction to DBMS</h1>

      <div className="lesson-content">
        <p>
          A <b>Database Management System (DBMS)</b> is software that manages databases.  
          It helps in storing, retrieving, and managing data efficiently.
        </p>
        <p><b>Examples:</b> MySQL, PostgreSQL, Oracle, MongoDB</p>
        <p><b>Advantages:</b></p>
        <ul>
          <li>Data Security</li>
          <li>Reduced Redundancy</li>
          <li>Data Consistency</li>
          <li>Easy Backup & Recovery</li>
        </ul>
      </div>

      <pre className="instructions">
{`Task:
1. Create a database named 'SchoolDB' using SQL.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a database named 'SchoolDB' using SQL."
        LessonId="dbms-lesson-1"
        language="sql"
        initialCode={`CREATE DATABASE SchoolDB;`}
        expectedOutput={`database created`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson2" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson1;
