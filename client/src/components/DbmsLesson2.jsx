import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DBMSLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DBMSLesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 2: DBMS Architecture</h1>

      <div className="lesson-content">
        <p>
          DBMS architecture describes how data is stored, managed, and accessed.  
          There are 3 levels:
        </p>
        <ul>
          <li><b>External Level</b> - User view</li>
          <li><b>Conceptual Level</b> - Logical structure of data</li>
          <li><b>Internal Level</b> - Physical storage of data</li>
        </ul>
        <p>
          This is called the <b>Three Schema Architecture</b>.
        </p>
      </div>

      <pre className="instructions">
{`Task:
1. Write a query to display all databases available in the system.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Write a query to display all databases available in the system."
        LessonId="dbms-lesson-2"
        language="sql"
        initialCode={`SHOW DATABASES;`}
        expectedOutput={`database`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DBMSLesson3" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default DBMSLesson2;
