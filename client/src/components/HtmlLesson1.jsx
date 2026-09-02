import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';
import './Lesson.css';

const HtmlLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true); // when user submits correct code
  };

  const goToNextLesson = () => {
    navigate("/html/lesson2");
  };

  return (
    <div className="lesson-content" style={{ padding: "20px" }}>

      <h1 className="lesson-title">
        Lesson 1: Introduction to HTML
      </h1>
      
      {/* SECTION 1*/}
      <section className="lesson-section">
        <h2 className="section-title">
          HTML Explanation in Simple English
        </h2>

        <p className="lesson-text">
          HTML stands for
          <strong> HyperText Markup Language</strong>.
        </p>

        <p className="lesson-text">
          It is used in all web browsers like Chrome, Firefox, Edge, Opera, etc.
        </p>

        <div className="highlight-box">
          <p>
            <strong>HyperText: </strong>
            Text with links to other pages.
          </p>

          <p>
            <strong>Markup: </strong>
            Structure of content like headings,paragraphs, images, etc.
          </p>
        </div>

        <p className="lesson-text">
          HTML works using HTTP — that's why it's rendered in browsers.
        </p>

      </section>

      {/* SECTION 2*/}

      <section className='lesson-section'>
        <h2 className="section-title">
          Why Learn HTML?
        </h2>

        <ul className="lesson-list">
          <li>It is the foundation of every website.</li>
          <li>HTML defines the structure of your content.</li>
          <li>It is easy to learn and widely used.</li>
        </ul>

      </section>

      {/* SECTION 3*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Basic Structure of HTML
        </h2>

        <pre className="code-block">
{`<!DOCTYPE html>
<html>
<head>
  <title>CodeVibe</title>
</head>
<body>
  <h1>Hello from CodeVibe</h1>
  <p>Powered by BE WITH ME</p>
</body>
</html>`}
      </pre>
      </section>

      {/* SECTION 4*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Instructions
        </h2>

        <p className="lesson-text">
          In the next lesson, you'll learn about basic tags and document structure in detail.
        </p>

        <ol className="lesson-list">
          <li>{`<h1> heading 1 </h1>`}</li>
          <li>{`<h6> last heading </h6>`}</li>
          <li>{`<p> paragraph </p>`}</li>
        </ol>

        <h2 className='section-title'> Try Yourself, Follow Instruction !!</h2>

        <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly." 
        LessonId="html-lesson1"
        expectedOutput={`<h1> heading 1 </h1> <h6> last heading </h6> <p> paragraph </p>`}
        initialCode={`<h1> heading 1 </h1>\n<h6> last heading </h6>\n<p> paragraph </p>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/HtmlLesson2" className='next-lesson-btn'>NEXT LESSON</Link>
      )}
      </section>
         {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/HtmlLesson2')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button>
</div>
  </div>
  );
};

export default HtmlLesson1;
