import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';
import './Lesson.css';

const HtmlLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate("/html/lesson5");
  };

  return (
    <div className="lesson-content" style={{ padding: "20px"}}>

      <h1 className='lesson-title'>
        Lesson 4: Html Attribute
      </h1>

      {/*SECTION 1*/}
      <section className="lesson-section">

        <h2 className="section-title">
          Basic Structure
        </h2>

        <p className="lesson-text">
          An attribute is extra information added inside an HTML tag to give more control or settings to that tag.
        </p>

        <p className="lesson-text">
          It helps define the behaviour, appearance, or properties of HTML elements.
        </p>

        <pre className="code-block">
          {`<tagname attribute="value">content</tagname>

For example:
<a href="http://www.google.com">Visit Google</a>`}
        </pre>
      </section>

      {/*SECTION 2 */}
      <section className="lesson-section">
        <h2 className="section-title">
          Common HTML Attributes
        </h2>

        <ul className="lesson-list">
          <li>href - Defines the URL for a link.</li>
          <li>src - Source of image/audio/video/file.</li>
          <li>alt - Alternate text for image.</li>
          <li>title - Tooltip text on hover.</li>
          <li>id - Unique identifier.</li>
          <li>class - Used to group elements.</li>
          <li>style - Inline CSS to style element.</li>
          <li>target - Defines where to open (_blank, _self).</li>
          <li>type - Type of input field.</li>
          <li>value - Sets default value.</li>
          <li>placeholder - Hint text inside input box.</li>
          <li>disabled - Disables the element.</li>
          <li>readonly - Makes input field read-only.</li>
          <li>heigh - Set height of image.</li>
          <li>width - Set width of image.</li>          
        </ul>
      </section>

      {/*SECTION 3 */}
      <section className="lesson-section">
        <h2 className="section-title">
          Try Yourself, Follow Instructions!
        </h2>

        <pre className="code-block">{`
<!-- Instruction 1: Create an anchor tag with href="https://www.google.com" and text "Go to Google" -->
<a href="https://www.google.com">Go to Google</a>

<!-- Instruction 2: Create an input tag with type="text" and placeholder="Enter your name" -->
<input type="text" placeholder="Enter your name">

<!-- Instruction 3: Create a button with the text "Submit" and disabled attribute -->
<button type="button" disabled>Submit</button>

<!-- Instruction 4: Create a paragraph with title="Hover Text" and text "This is a paragraph." -->
<p title="Hover Text">This is a paragraph.</p>
        `}
        </pre>

      <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly."
  LessonId="html-lesson4"
  expectedOutput={`<a href="https://www.google.com">Go to Google</a>
<input type="text" placeholder="Enter your name">
<button type="button" disabled>Submit</button>
<p title="Hover Text">This is a paragraph.</p>`}
  initialCode={`<h1> HELLO, From Code Vibe </h1>`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link to="/HtmlLesson5">⏭ NEXT LESSON</Link>
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
    onClick={() => navigate('/HtmlLesson3')}
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
    onClick={() => navigate('/HtmlLesson5')}
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

export default HtmlLesson4;
