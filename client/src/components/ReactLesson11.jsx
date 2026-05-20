import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson12');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 11: React Router Basics</h1>

      <div className="lesson-content">
        <p>
          React Router allows navigation between components without reloading the page.
        </p>
        <p>Example:</p>
        <pre>
{`<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Setup BrowserRouter with two routes.
2. Render Home component at '/'.
3. Render About component at '/about'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Setup BrowserRouter with two routes. 2. Render Home component at '/'."
        LessonId="react-lesson-11"
        language="js"
        initialCode={`// Implement BrowserRouter with Routes as mentioned`}
        expectedOutput={`Home`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson12" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson11;
