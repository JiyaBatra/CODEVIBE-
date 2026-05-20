import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson9');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 8: Express Router</h1>

      <div className="lesson-content">
        <p>
          Router allows modular route handling.
        </p>
        <p>Example:</p>
        <pre>
{`const router = express.Router();
router.get('/about', (req, res) => res.send('About Page'));
app.use('/info', router); // route is /info/about`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a router.
2. Add route '/about'.
3. Use it at '/info/about'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a router. 2. Add route '/about'."
        LessonId="express-lesson-8"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();
const router = express.Router();

router.get('/about', (req, res) => res.send('About Page'));

app.use('/info', router);

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`About Page`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ExpressLesson9" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ExpressLesson8;
