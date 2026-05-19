import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="lesson">
      <h1>Lesson 4: HTML Attributes</h1>
      <div className="lesson">
        <p>
          An attribute is extra information added inside an HTML tag to give more control or settings to that tag.
          It helps define the behaviour, appearance, or properties of HTML elements.
        </p>
    

        <h3>BASIC STRUCTURE</h3>
        <pre>
{`<tagname attribute="value">content</tagname>

For example:
<a href="http://www.google.com">Visit Google</a>`}
        </pre>
                  <br/>
    <hr/>

        <h3>Common HTML Attributes</h3>
        <ul>
          <li><dt>href</dt> <dd>Defines the URL for a link.</dd></li>
          <li><dt>src</dt> <dd>Source of image/audio/video/file.</dd></li>
          <li><dt>alt</dt> <dd>Alternate text for image.</dd></li>
          <li><dt>title</dt> <dd>Tooltip text on hover.</dd></li>
          <li><dt>id</dt> <dd>Unique identifier.</dd></li>
          <li><dt>class</dt> <dd>Used to group elements.</dd></li>
          <li><dt>style</dt> <dd>Inline CSS to style element.</dd></li>
          <li><dt>target</dt> <dd>Defines where to open (_blank, _self).</dd></li>
          <li><dt>type</dt> <dd>Type of input field.</dd></li>
          <li><dt>value</dt> <dd>Sets default value.</dd></li>
          <li><dt>placeholder</dt> <dd>Hint text inside input box.</dd></li>
          <li><dt>disabled</dt> <dd>Disables the element.</dd></li>
          <li><dt>readonly</dt> <dd>Makes input field read-only.</dd></li>
          <li><dt>height</dt> <dd>Set height of image.</dd></li>
          <li><dt>width</dt> <dd>Set width of image.</dd></li>
        </ul>
                  <br/>
    <hr/>
    
    <h2> 💻 Try Yourself, Follow Instructions!</h2>

        <pre className="compiler-instruction">{`
<!-- Instruction 1: Create an anchor tag with href="https://www.google.com" and text "Go to Google" -->
<a href="https://www.google.com">Go to Google</a>

<!-- Instruction 2: Create an input tag with type="text" and placeholder="Enter your name" -->
<input type="text" placeholder="Enter your name">

<!-- Instruction 3: Create a button with the text "Submit" and disabled attribute -->
<button type="button">Submit</button>

<!-- Instruction 4: Create a paragraph with title="Hover Text" and text "This is a paragraph." -->
<p title="Hover Text">This is a paragraph.</p>
        `}</pre>

      
      </div>

      <Compiler
  LessonId="html-lesson4"
  expectedOutput={(output) => {
    const normalize = (s) => s.replace(/\s+/g, " ").trim();
    const expected = `<a href="https://www.google.com">Go to Google</a>
<input type="text" placeholder="Enter your name">
<button type="button">Submit</button>
<p title="Hover Text">This is a paragraph.</p>`;
    return normalize(output) === normalize(expected);
  }}
  initialCode={`<h1> HELLO, From Code Vibe </h1>`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link to="/HtmlLesson5">⏭ NEXT LESSON</Link>
      )}
    </div>
  );
};

export default HtmlLesson4;
