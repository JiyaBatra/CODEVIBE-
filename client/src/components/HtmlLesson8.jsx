import React, { useState } from 'react';
import Compiler from './Compiler';
import { useNavigate, Link } from 'react-router-dom';

const HtmlLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  // Called when user’s code matches expected output
  const handleSuccess = () => {
    setIsCorrect(true);
  };

  // Navigate to next lesson manually
  const goToNextLesson = () => {
    navigate('/html/lesson9');
  };

  return (
    <div className="lesson">
      <h1>Lesson 8: Class and ID in HTML</h1>
      <br />
      <p>
        🔸 <b>Class</b> and <b>ID</b> are attributes used to give custom names to elements so you can style or target them using CSS or JavaScript.
      </p>

      <h3>🔹 Difference</h3>
      <ul>
        <li><b>Class:</b> Can be used for multiple elements.</li>
        <li><b>ID:</b> Should be unique for one element only.</li>
      </ul>
              <br/>
    <hr/>


      <h3>🔹 Example Code</h3>

      <pre>
{`<p class="my-text">This is a paragraph with a class.</p>
<div id="unique-box">This has a unique ID.</div>`}
      </pre>
        <br/>
    <hr/>

      <h2>Try Yourself !!</h2>
      <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly."
        LessonId="html-lesson8"
        expectedOutput={`<p class="my-text">This is a paragraph with a class.</p>
<div id="unique-box">This has a unique ID.</div>`}
        initialCode={`<h1>HELLO, From Code Vibe</h1>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
         <Link to="/HtmlLesson9"> ⏭ NEXT LESSON</Link>
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
    onClick={() => navigate('/HtmlLesson7')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  <button
    onClick={() => navigate('/HtmlLesson9')}
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

export default HtmlLesson8;
