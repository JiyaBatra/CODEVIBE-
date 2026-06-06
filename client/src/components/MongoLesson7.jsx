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

             {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/MongoLesson6')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  <button
    onClick={() => navigate('/MongoLesson8')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button>
</div>
    </div>
  );
};

export default MongoLesson7;
