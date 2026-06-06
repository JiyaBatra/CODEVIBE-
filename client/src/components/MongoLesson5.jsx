import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson6');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 5: Delete Documents</h1>

      <div className="lesson-content">
        <p>Use <code>deleteOne()</code> or <code>deleteMany()</code> to remove documents.</p>
        <pre>
{`await db.collection('users').deleteOne({ name: 'Bob' });`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Delete user named Bob.
2. Print "Document deleted" after success.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Delete user named Bob. 2. Print 'Document deleted' after success."
        LessonId="mongo-lesson-5"
        language="javascript"
        initialCode={`const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    await db.collection('users').deleteOne({ name: 'Bob' });
    console.log('Document deleted');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);`}
        expectedOutput={`Document deleted`}
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
    onClick={() => navigate('/MongoLesson4')}
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
    onClick={() => navigate('/MongoLesson6')}
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

export default MongoLesson5;
