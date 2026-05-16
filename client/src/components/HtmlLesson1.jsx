import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';

const HtmlLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true); // when user submits correct code
  };

  const goToNextLesson = () => {
    navigate("/html/lesson2");
  };

  // expected string we want to match (normalized)
  const expectedNormalized = '<h1> heading 1 </h1> <h6> last heading </h6> <p> paragraph </p>';

  return (
    <div className="lesson" style={{ padding: "20px" }}>
      <h1>Lesson 1: Introduction to HTML</h1>
      <br />
      <p>
        🔸 <strong>HTML Explanation in Simple English:</strong><br />
        HTML stands for <strong>HyperText Markup Language</strong>.<br />
        It is used in all web browsers like Chrome, Firefox, Edge, Opera, etc.<br /><br />
        <strong>HyperText:</strong> Text with links to other pages.<br />
        <strong>Markup:</strong> Structure of content (heading, paragraph, image, etc.)<br />
        HTML works using HTTP — that's why it's rendered in browsers.
      </p>
      <br/>
    <hr/>
      <h3>🔹 Why Learn HTML?</h3>
      <ul>
        <li>It is the foundation of every website.</li>
        <li>HTML defines the structure of your content.</li>
        <li>It is easy to learn and widely used.</li>
      </ul>
          <br/>
    <hr/>

      <h3>🔹 Basic Structure of HTML</h3>
      <pre style={{
        backgroundColor: "#f4f4f4",
        padding: "15px",
        borderRadius: "10px",
        fontFamily: "monospace",
        overflowX: "auto",
        border: "1px solid #ccc"
      }}>
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

      <p>In the next lesson, you'll learn about basic tags and document structure in detail.</p>
      <p>
            <br/>
    <hr/>
        <ol>
          <h3 className = "instruction"> INSTRUCTION </h3>
          <div className = "list">
          <li>{`<h1> heading 1 </h1>`}</li>
          <li>{`<h6> last heading </h6>`}</li>
          <li>{`<p> paragraph </p>`}</li>
          </div>
        </ol>
      </p>
          <br/>
    <hr/>

      <h2> 💻 Try Yourself, Follow Instruction !!</h2>

      <Compiler 
        LessonId="html-lesson1"
        // normalize both sides and compare -> avoid whitespace issues
        expectedOutput={(output) => {
          const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
          return norm(output) === norm(expectedNormalized);
        }}
        initialCode={`<h1> heading 1 </h1>\n<h6> last heading </h6>\n<p> paragraph </p>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/HtmlLesson2">⏭NEXT LESSON</Link>
      )}
    </div>
  );
};

export default HtmlLesson1;
