import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson8');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 7: Aggregation</h1>

      <div className="lesson-content">
        <p>Aggregation allows advanced operations like counting, grouping, and summing.</p>
        <pre>
{`db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Group users by age and count them.
2. Print "Aggregation complete" after success.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Group users by age and count them. 2. Print 'Aggregation complete' after success."
        LessonId="mongo-lesson-7"
        language="javascript"
        initialCode={`// MongoDB aggregation example
console.log('Aggregation complete');`}
        expectedOutput={`Aggregation complete`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/MongoLesson8" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default MongoLesson7;
