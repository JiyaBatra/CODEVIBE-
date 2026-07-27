import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 10: Build a REST API</h1>

      <div className="lesson-content">
        <p>
          A REST API exposes resources through HTTP routes. For a small Express API,
          define routes for reading and creating resources, return JSON responses, and
          use the correct HTTP status code for a successful creation.
        </p>
        <pre>
{`app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { id: tasks.length + 1, title: req.body.title };
  tasks.push(task);
  res.status(201).json(task);
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create an Express application with a GET /api/tasks route.
2. Return a JSON array containing one task.
3. Start the server and print "Tasks API ready" to the console.`}
      </pre>

      <Compiler
        hint="Create the Express app, define GET /api/tasks with res.json(...), then log the required message when the server starts."
        LessonId="express-lesson-10"
        language="node"
        initialCode={`const express = require('express');
const app = express();

app.get('/api/tasks', (req, res) => {
  // Return an array with one task here.
});

console.log('Tasks API ready');`}
        expectedOutput="Tasks API ready"
        onSuccess={() => setIsCorrect(true)}
      />

      {isCorrect && (
        <div className="success-action-container" style={{ marginTop: '20px' }}>
          <p>Great work — you have completed the Express learning path.</p>
          <Link to="/Certificate" className="next-lesson">
            Continue to Certificate
          </Link>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #333',
        }}
      >
        <button
          onClick={() => navigate('/ExpressLesson9')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← Previous Lesson
        </button>
      </div>
    </div>
  );
};

export default ExpressLesson10;
