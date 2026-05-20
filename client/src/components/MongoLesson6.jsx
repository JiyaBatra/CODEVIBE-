import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 6: CRUD API with Node.js</h1>

      <div className="lesson-content">
        <p>Combine MongoDB with Express.js to create a backend API.</p>
        <p>Example:</p>
        <pre>
{`app.get('/users', async (req, res) => {
  const users = await db.collection('users').find({}).toArray();
  res.json(users);
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create GET route '/users' to fetch all users.
2. Print "API running" after route setup.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create GET route '/users' to fetch all users. 2. Print 'API running' after route setup."
        LessonId="mongo-lesson-6"
        language="javascript"
        initialCode={`const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');

    app.get('/users', async (req, res) => {
      const users = await db.collection('users').find({}).toArray();
      res.json(users);
    });

    app.listen(3000, () => console.log('API running'));
  } catch(err) {
    console.error(err);
  }
}

run();`}
        expectedOutput={`API running`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/MongoLesson7" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default MongoLesson6;
