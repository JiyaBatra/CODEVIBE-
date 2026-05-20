import React, { useState } from 'react';
import Compiler from './Compiler';
import { useNavigate, Link } from 'react-router-dom';

const HtmlLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  // Called when user’s code matches expected output
  const handleSuccess = () => {
    setIsCorrect(true);
  };

  // Navigate to next lesson on button click (optional)
  const goToNextLesson = () => {
    navigate('/html/lesson7'); 
  };

  return (
    <div className="lesson">
      <h1>Lesson 6: HTML Tables</h1>
      <br />
      <p>
        🔸 Tables in HTML are used to display data in rows and columns.
        It helps organize content in a clear way.
      </p>

      <h3>🔹 Basic Table Tags</h3>
      <ul>
        <li><code>&lt;table&gt;</code> — Creates a table.</li>
        <li><code>&lt;tbody&gt;</code> — Table body.</li>
        <li><code>&lt;tr&gt;</code> — Table row.</li>
        <li><code>&lt;th&gt;</code> — Table header.</li>
        <li><code>&lt;td&gt;</code> — Table data/cell.</li>
      </ul>
              <br/>
    <hr/>


      <h3>🔹 Example Code</h3>
      <pre>
{`<table border="1">
<tbody>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jiya</td>
    <td>20</td>
  </tr>
</tbody>
</table>`}
      </pre>
              <br/>
    <hr/>


      <h2>Try Yourself !!</h2>
    <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly." 
  LessonId="html-lesson6"
  expectedOutput={`<table border="1">
<tbody>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jiya</td>
    <td>20</td>
  </tr>
</tbody>
</table>`}
  initialCode={`<h1>HELLO, From Code Vibe</h1>`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link to="/HtmlLesson7">⏭ NEXT LESSON</Link>
      )}
    </div>
  );
};

export default HtmlLesson6;
