import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToCertificate = () => navigate('/Certificate');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 8: Mini Project</h1>

      <div className="lesson-content">
        <p>Create a backend that:</p>
        <ul>
          <li>Connects to MongoDB</li>
          <li>Has routes for CRUD on 'users'</li>
          <li>Runs on port 3000</li>
        </ul>
      </div>

      <pre className="instructions">
{`Task:
1. Create backend with Express + MongoDB.
2. Setup GET /users and POST /users.
3. Print "Backend running" after setup.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create backend with Express + MongoDB. 2. Setup GET /users and POST /users."
        LessonId="mongo-lesson-8"
        language="javascript"
        initialCode={`const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
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

    app.post('/users', async (req, res) => {
      await db.collection('users').insertOne(req.body);
      res.send('User added');
    });

    app.listen(3000, () => console.log('Backend running'));
  } catch(err) {
    console.error(err);
  }
}

run();`}
        expectedOutput={`Backend running`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/Certificate" onClick={goToCertificate} className="next-lesson">
          🏆 GO TO CERTIFICATE
        </Link>
      )}
    </div>
  );
};

export default MongoLesson8;
