import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 2: Find Documents</h1>

      <div className="lesson-content">
        <p>
          To fetch data from a collection, we use <code>find()</code>.
        </p>
        <pre>
{`const users = await db.collection('users').find({}).toArray();
console.log(users);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Fetch all documents from 'users' collection.
2. Print them.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Fetch all documents from 'users' collection. 2. Print them."
        LessonId="mongo-lesson-2"
        language="javascript"
        initialCode={`const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    const users = await db.collection('users').find({}).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);`}
        expectedOutput={`Alice`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/MongoLesson3" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default MongoLesson2;
