import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const MongoLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToCertificate = () => navigate('/Certificate');

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Finished the MongoDB course on CodeVibe! 🍃 Database collections, CRUD operations, and NoSQL architecture are locked in! Next stop, full-stack deployment! #MongoDB #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

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
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link to="/Certificate" onClick={goToCertificate} className="next-lesson" style={{ fontWeight: 'bold', fontSize: '18px', display: 'inline-block', marginBottom: '15px' }}>
              🏆 GO TO CERTIFICATE
            </Link>
          </div>

          {/* Social Share Buttons Block */}
          <div className="share-buttons-block" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={shareOnTwitter} 
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1a91da"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1DA1F2"}
            >
              Share on Twitter 🐦
            </button>
            <button 
              onClick={shareOnLinkedIn} 
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#00669b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0077B5"}
            >
              Share on LinkedIn 💼
            </button>
          </div>
        </div>
      )}
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
    onClick={() => navigate('/MongoLesson7')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  {/* <button
    onClick={() => navigate('/MongoLesson5')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button> */}
</div>
    </div>
  );
};

export default MongoLesson8;