import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToCertificate = () => navigate('/Certificate');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 10: Final Project – REST API</h1>

      <div className="lesson-content">
        <p>
          Build a simple REST API with CRUD operations for 'products'.
        </p>
        <pre>
{`let products = [];
app.get('/products', (req, res) => res.json(products));
app.post('/products', (req, res) => {
  products.push(req.body);
  res.send('Product added');
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create GET /products → returns array.
2. Create POST /products → adds product.
3. Test both routes.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create GET /products → returns array. 2. Create POST /products → adds product."
        LessonId="express-lesson-10"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();
app.use(express.json());

let products = [];

app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
  products.push(req.body);
  res.send('Product added');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Product added`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/Certificate" onClick={goToCertificate} className="next-lesson">
          🎓 VIEW CERTIFICATE
        </Link>
      )}
    </div>
  );
};

export default ExpressLesson10;
