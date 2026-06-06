import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 3: Insert Multiple Documents</h1>

      <div className="lesson-content">
        <p>You can insert multiple documents at once using <code>insertMany()</code>.</p>
        <pre>
{`await db.collection('users').insertMany([
  { name: 'Bob', age: 25 },
  { name: 'Carol', age: 30 }
]);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Insert two new users into 'users' collection.
2. Print "Documents inserted" after success.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Insert two new users into 'users' collection. 2. Print 'Documents inserted' after success."
        LessonId="mongo-lesson-3"
        language="javascript"
        initialCode={`const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    await db.collection('users').insertMany([
      { name: 'Bob', age: 25 },
      { name: 'Carol', age: 30 }
    ]);
    console.log('Documents inserted');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);`}
        expectedOutput={`Documents inserted`}
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
    onClick={() => navigate('/MongoLesson2')}
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
    onClick={() => navigate('/MongoLesson4')}
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

export default MongoLesson3;
