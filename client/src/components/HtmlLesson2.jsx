import React, { useState } from 'react'; 
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';
import './Lesson.css';

const HtmlLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true); 
  };

  const goToNextLesson = () => {
    navigate("/html/lesson3");
  };

  // expected output (single line for easy normalization)
  const expectedNormalized = `<b> bold </b> <i> italic </i> <u> underline </u> <strong> bold important message </strong> <em> italic important message </em> <mark> highlight </mark> <marquee> headline </marquee> <br> <hr> <abbr>HTML</abbr>`;

  return (
    <div className="lesson-content" style={{ padding: "20px" }}>
      <h1 className="lesson-title">
        Lesson 2 : Types of HTML Elements: Block vs Inline
      </h1>

      {/* SECTION 1 */}
      <section className="lesson-section">
        <h2 className="section-title">
          BLOCK LEVEL ELEMENTS
        </h2>

        <p className="lesson-text">
          Block Level Elements always start on a new line and take up the <strong> full width </strong> available (even if the content is small).
        </p>

        <ol className="lesson-list" type='i'>
          <li>Start on a new line</li>
          <li>Take full horizontal space</li>
          <li>Can contain both block and inline elements</li>
          <li>Used for larger layout sections</li>
        </ol>

        <div className="highlight-box">
          <p>
            <strong>Note:</strong>
          </p>

          <p>
            <em>Opening tag looks like {'<element>'}, and closing tag looks like {'</element>'}. Can you see the difference? The closing tag has a "/" before the element name.</em>
          </p>
        </div>
      </section>

      {/*SECTION 2*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Common Block Level Tags and their Usage
        </h2>

        <ul className="lesson-list">
          <li><b>{'<div>'}</b>: General-purpose container</li>
          <li><b>{'<p>'}</b>: Paragraph</li>
          <li><b>{'<h1>'} to {'<h6>'}</b>: Headings</li>
          <li><b>{'<ul>'}</b>: Unordered list</li>
          <li><b>{'<ol>'}</b>: Ordered list</li>
          <li><b>{'<li>'}</b>: List item</li>
          <li><b>{'<table>'}</b>: Table</li>
          <li><b>{'<section>'}</b>: Section</li>
          <li><b>{'<article>'}</b>: Article</li>
          <li><b>{'<footer>'}</b>: Footer</li>
        </ul>
      </section>

      {/*SECTION 3 */}
      <section className="lesson-section">
        <h2 className="section-title">
          INLINE ELEMENTS
        </h2>

        <p className="lesson-text">
          Inline elements do <strong> NOT </strong> start on a new line and only take up as much width as necessary.
        </p>

        <ol className='lesson-list' type='i'>
          <li>Do not start on a new line</li>
          <li>Take only as much space as needed</li>
          <li>Cannot contain block-level elements</li>
          <li>Mostly used for formatting</li>
        </ol>
      </section>

      {/*SECTION 4*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Common Inline Tags and their Usage
        </h2>

        <ul className="lesson-list">
          <li><b>{'<span>'}</b>: Inline container</li>
          <li><b>{'<a>'}</b>: Link</li>
          <li><b>{'<strong>'}</b>: Bold important</li>
          <li><b>{'<em>'}</b>: Italic important</li>
          <li><b>{'<img>'}</b>: Image</li>
          <li><b>{'<mark>'}</b>: Highlight</li>
          <li><b>{'<code>'}</b>: Code snippet</li>
          <li><b>{'<br>'}</b>: Line break</li>
          <li><b>{'<input>'}</b>: Input</li>
        </ul>
      </section>

      {/*SECTION 5*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Instructions
        </h2>

        <ol className="lesson-list">
          <li>{`<b> bold </b>`}</li>
          <li>{`<i> italic </i>`}</li>
          <li>{`<u> underline </u>`}</li>
          <li>{`<strong> bold important message </strong>`}</li>
          <li>{`<em> italic important message </em>`}</li>
          <li>{`<mark> highlight </mark>`}</li>
          <li>{`<marquee> headline </marquee>`}</li>
          <li>{`<br>`}</li>
          <li>{`<hr>`}</li>
          <li>{`<abbr>HTML</abbr>`}</li> 
        </ol>

        <h2 className="section-title">
          Try Yourself, Follow Instruction !!
        </h2>

        <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly." 
        LessonId="html-lesson2"
        expectedOutput={`<b> bold </b> <i> italic </i> <u> under line </u> <strong> bold important message </strong> <em> italic important message </em> <mark> highlight </mark> <marquee> headline </marquee> <br> <hr> <abbr>HTML</abbr>`}
        initialCode={`<h1> HELLO, From Code Vibe </h1>`}
        onSuccess={handleSuccess}
        />

        {isCorrect && (
          <Link to="/HtmlLesson3">⏭ NEXT LESSON</Link>
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
    onClick={() => navigate('/HtmlLesson1')}
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
    onClick={() => navigate('/HtmlLesson3')}
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

export default HtmlLesson2;
