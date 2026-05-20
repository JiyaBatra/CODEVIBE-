// src/pages/CssLesson1.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CssLesson2');
  };

  return (
    <div className="lesson">
      
      {/* Heading */}
      <h1 className="lesson-title">Chapter 1: Introduction to CSS</h1>

      {/* Lesson Content */}
      <div className="lesson-content">
        <p>
          CSS stands for <b>Cascading Style Sheets</b>. It is a language used to style HTML elements.
          While HTML creates the structure of a webpage, CSS makes it beautiful by adding colors, fonts,
          spacing, layouts, and animations.
        </p>
        <p>
          The term “Cascading” means that styles apply in a specific order — if multiple styles are written
          for one element, the final style depends on priority rules.
          “Style Sheets” means a set of styles applied to HTML.
        </p>
        <p>
          You can use CSS in three ways:
          <ol>
            <li><b>Inline CSS</b> – Adding styles directly inside an HTML tag using the style attribute.</li>
            <li><b>Internal CSS</b> – Writing CSS inside a &lt;style&gt; tag within the HTML file.</li>
            <li><b>External CSS</b> – Linking a separate .css file to your HTML file.</li>
          </ol>
        </p>
        <p>
          CSS is essential in web development because without it, web pages look plain and boring.
          It helps create responsive designs, dark mode, hover effects, transitions, and animations.
        </p>
      </div>

      {/* Tags to Try */}
      <div className="tags-to-try">
        <p>Tags to Try: &lt;style&gt;, color, font-size, background-color, text-align</p>
      </div>

      {/* Instructions */}
      <pre className="instructions">
        Create a webpage with a heading “Hello CSS” and apply red color and 30px font size to it using CSS.
      </pre>

      {/* Compiler */}
      <Compiler
        hint="💡 Hint: Create a webpage with a heading “Hello CSS” and apply red color and 30px font size to it using CSS."
  LessonId="css-lesson-1"
  language="css"
  initialCode={`h1 {\n  /* Write your CSS here */\n}`}
  expectedOutput={{
    "h1": {
      color: "rgb(255, 0, 0)", // red in RGB
      fontSize: "30px"         // font size
    }
  }}
  onSuccess={handleSuccess}
/>


      {/* Next Lesson link */}
      {isCorrect && (
        <Link 
          to="/CssLesson2" 
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}

    </div>
  );
};

export default CssLesson1;
