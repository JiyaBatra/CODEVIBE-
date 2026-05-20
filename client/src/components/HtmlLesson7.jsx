import React, { useState } from "react";
import Compiler from "./Compiler";
import { Link, useNavigate } from "react-router-dom";

const HtmlLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  // Called when user's code matches expected output
  const handleSuccess = () => {
    setIsCorrect(true);
  };

  // Optional: Navigate programmatically if needed
  const goToNextLesson = () => {
    navigate("/HtmlLesson8");
  };

  return (
    <div className="lesson">
      <h1>Lesson 7: HTML Forms</h1>
      <br />
      <p>
        🔸 Forms are used to collect input from users, like name, email, password, etc.
        Useful in signup/login pages, contact forms, etc.
      </p>

      <h3>🔹 Basic Form Elements</h3>
      <ul>
        <li><code>&lt;form&gt;</code> — Defines the form.</li>
        <li><code>&lt;input&gt;</code> — User input field.</li>
        <li><code>&lt;textarea&gt;</code> — Multi-line input.</li>
        <li><code>&lt;button&gt;</code> — Button to submit the form.</li>
      </ul>
              <br/>
    <hr/>


      <h3>Common List of Input Fields</h3>
      <ul>
        <li><code>&lt;input type="text"&gt;</code> — Single-line text input.</li>
        <li><code>&lt;input type="email"&gt;</code> — Email address field.</li>
        <li><code>&lt;input type="password"&gt;</code> — Password input.</li>
        <li><code>&lt;input type="number"&gt;</code> — Numbers only.</li>
        <li><code>&lt;input type="date"&gt;</code> — Date picker.</li>
        <li><code>&lt;input type="radio"&gt;</code> — Single option select.</li>
        <li><code>&lt;input type="checkbox"&gt;</code> — Multiple selections.</li>
        <li><code>&lt;input type="file"&gt;</code> — File upload.</li>
        <li><code>&lt;input type="submit"&gt;</code> — Submit button.</li>
        <li><code>&lt;input type="reset"&gt;</code> — Reset fields.</li>
        <li><code>&lt;input type="tel"&gt;</code> — Phone number.</li>
        <li><code>&lt;input type="url"&gt;</code> — Website link.</li>
        <li><code>&lt;textarea&gt;</code> — Multi-line input.</li>
        <li><code>&lt;select&gt;</code> — Dropdown menu.</li>
      </ul>
              <br/>
    <hr/>


      <h3>🔹 Example Code</h3>
      <pre>
{`<form onsubmit="return false">
  Name: <input type="text" name="name"><br>
  Email: <input type="email" name="email"><br>
  <button type="button">Submit</button>
</form>`}
      </pre>

      <h2>Try Yourself !!</h2>
     <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly."
  LessonId="html-lesson7"
  expectedOutput={`<form onsubmit="return false">
  Name: <input type="text" name="name"><br>
  Email: <input type="email" name="email"><br>
  <button type="button">Submit</button>
</form>`}
  initialCode={`<h1>HELLO, From Code Vibe</h1>`}
  onSuccess={handleSuccess}
/>


      {isCorrect && (
        <div style={{ marginTop: "20px" }}>
          {/* You can use either Link OR navigate */}
          <Link to="/HtmlLesson8">⏭ NEXT LESSON</Link>
          {/* OR button: <button onClick={goToNextLesson}>Next Lesson</button> */}
        </div>
      )}
    </div>
  );
};

export default HtmlLesson7;
