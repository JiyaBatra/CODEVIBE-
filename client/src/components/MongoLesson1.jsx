import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/MongoLesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">MongoDB Lesson 1: Introduction</h1>

      <div className="lesson-content">
        <p>
          MongoDB is a NoSQL database that stores data in JSON-like documents called BSON.
        </p>
        <p>
          It is flexible, scalable, and used with Node.js in full-stack apps.
        </p>
        <p>Example: A document in 'users' collection:</p>
        <pre>
{`{
  "_id": ObjectId("..."),
  "name": "Alice",
  "age": 20
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a database 'mydb'.
2. Create a collection 'users'.
3. Insert one document with name and age.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a database 'mydb'. 2. Create a collection 'users'."
        LessonId="mongo-lesson-1"
        language="javascript"
        initialCode={`// Use MongoDB shell commands or Node.js MongoDB driver
// Example Node.js:
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    const collection = db.collection('users');
    await collection.insertOne({ name: 'Alice', age: 20 });
    console.log('Document inserted');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);`}
        expectedOutput={`Document inserted`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/MongoLesson2" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default MongoLesson1;
