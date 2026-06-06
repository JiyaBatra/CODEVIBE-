import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';
import './Lesson.css';

const HtmlLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true); // when user submits correct code
  };

  const goToNextLesson = () => {
    navigate("/html/lesson4");
  };

  return (
    <div className="lesson-content" style={{ padding: "20px" }}>

      <h1 className="lesson-title">
        Lesson 3: HTML Lists
      </h1>

      {/*SECTION 1*/}
      <section className="lesson-section">
        <p className="lesson-text">
          In HTML, lists are used to display multiple items in an organized way.
        </p>

        <p className="lesson-text">
          There are three main types of lists:
        </p>

        <ul className="lesson-list">
          <li>Ordered List</li>
          <li>Unordered List</li>
          <li>Description List</li>
        </ul>
      </section>

      {/*SECTION 2*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Ordered List {'<ol>'}
        </h2>

        <p className="lesson-text">
          This list shows items in a specific order.
        </p>
        <p className='lesson-text'>
          It is useful when sequence matters, like in a recipe or instruction.
        </p>
        <pre className="code-block">
          {`<ol>
  <li>wake up</li>
  <li>brush your teeth</li>
  <li>have breakfast</li>
</ol>`}
        </pre>
      </section>

      {/*SECTION 3*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Unordered List {'<ul>'}
        </h2>

        <p className="lesson-text">
         This list shows items with bullet points, not numbers.
        </p>
        <p className='lesson-text'>
          It is used when order doesn't matter, like a grocery list.
        </p>

        <pre className="code-block">
         {`<ul>
  <li>milk</li>
  <li>bread</li>
  <li>egg</li>
</ul>`}
        </pre>
      </section>

      {/*SECTION 4*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Description List {'<dl>'}
        </h2>
        
        <p className="lesson-text">
          This list is used for terms and their descriptions, like in a dictionary.
        </p>

        <pre className="code-block">
         {`<dl>
  <dt>HTML</dt>
  <dd>It stands for Hyper Text Markup Language</dd>
</dl>`}
        </pre>
      </section>

      {/*SECTION 5 */}
      <section className="lesson-section">
        <h2 className="section-title">
          Try Yourself: Create all three types of lists
        </h2>

      <Compiler
        LessonId="html-lesson3"

        expectedOutput={(output) => {
          const normalize = (s) => s.replace(/\s+/g, " ").trim();
          const expected = `<ol>
<li>wake up</li>
<li>brush your teeth</li>
<li>have breakfast</li>
</ol>

<ul>
<li>milk</li>
<li>bread</li>
<li>egg</li>
</ul>

<dl>
<dt>HTML</dt>
<dd>It stands for Hyper Text Markup Language</dd>
</dl>`
          return normalize(output) === normalize(expected);
        }}
        initialCode={`<h1>Hello from Code Vibe</h1>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/HtmlLesson4">⏭ NEXT LESSON</Link>
      )}

      </section>
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
    onClick={() => navigate('/HtmlLesson2')}
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
    onClick={() => navigate('/HtmlLesson4')}
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

export default HtmlLesson3;
