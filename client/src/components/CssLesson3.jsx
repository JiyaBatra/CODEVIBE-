// src/pages/CssLesson3.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const CssLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true); // when user submits correct code
  };

  const goToNextLesson = () => {
    navigate("/CssLesson4");
  };

  return (
    <div className="lesson">
      {/* Lesson Title */}
      <h1 className="lesson-title">Chapter 3: Borders & Text Alignment</h1>

      {/* Lesson Explanation */}
      <div className="lesson-content">
        <p>
          In this lesson, we will learn about <b>borders</b> and <b>text-align</b> in CSS.
          The <b>border</b> property allows you to add a line around an element — you can control its thickness, style (solid, dashed, dotted), and color.
        </p>
        <p>
          The <b>text-align</b> property controls the horizontal alignment of text.
          You can align text to the left, center, right, or justify it.
        </p>
        <p>
          Basic syntax for a border: <code>border: 2px solid red;</code>
          Example for text alignment: <code>text-align: center;</code>
        </p>
        <p>
          This lesson is beginner-friendly — initial HTML is given. Write CSS inside the &lt;style&gt; tag.
        </p>
      </div>

      {/* Tags to Try */}
      <div className="tags-to-try">
        <p>Tags to Try: border, border-radius, text-align, padding, margin</p>
      </div>

      {/* Instructions */}
      <pre className="instructions">
{`Create a webpage with:
1. A heading "Bordered Heading" that has a 2px solid red border and centered text.
2. A paragraph with the text "This is a justified paragraph example..." that has a 1px dashed blue border and justified alignment.`}
      </pre>

      {/* Compiler */}
      <Compiler
        hint="💡 Hint: Create a webpage with: 1. A heading 'Bordered Heading' that has a 2px solid red border and centered text."
        LessonId="css-lesson-3"
        language="css" // lock to CSS
        initialCode={`h1 {
  /* style heading here */
}

p {
  /* style paragraph here */
}`}
        expectedOutput={{
          h1: { 
            border: "2px solid rgb(255, 0, 0)",
            textAlign: "center" 
          },
          p: { 
            border: "1px dashed rgb(0, 0, 255)", 
            textAlign: "justify" 
          }
        }}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link 
          to="/CssLesson4" 
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson3;
