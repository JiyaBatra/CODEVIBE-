import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson5');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 4: Update Documents</h1>

      <div className="lesson-content">
        <p>Use <code>updateOne()</code> or <code>updateMany()</code> to modify documents.</p>
        <pre>
{`await db.collection('users').updateOne(
  { name: 'Alice' },
  { $set: { age: 21 } }
);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Update Alice's age to 21.
2. Print "Document updated" after success.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Update Alice's age to 21. 2. Print 'Document updated' after success."
        LessonId="mongo-lesson-4"
        language="javascript"
        initialCode={`const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    await db.collection('users').updateOne(
      { name: 'Alice' },
      { $set: { age: 21 } }
    );
    console.log('Document updated');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);`}
        expectedOutput={`Document updated`}
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
    onClick={() => navigate('/MongoLesson3')}
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
    onClick={() => navigate('/MongoLesson5')}
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

export default MongoLesson4;
