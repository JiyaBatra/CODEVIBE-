import React, { useState } from 'react'; 
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';

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
  const expectedNormalized = `<b> bold </b> <i> italic </i> <u> under line </u> <strong> bold important message </strong> <em> italic important message </em> <mark> highlight </mark> <marquee> headline </marquee> <br> <hr> <abbr>HTML</abbr>`;

  return (
    <div className='lesson'>
      <h1>Lesson 2: TYPE OF HTML ELEMENT — BLOCK OR INLINE</h1>
      <br />

      <p>
        <strong>BLOCK LEVEL ELEMENTS</strong> always start on a new line and take up the
        <strong> full width </strong> available (even if the content is small).
      </p>

      <ol type='i'>
        <li>Start on a new line</li>
        <li>Take full horizontal space</li>
        <li>Can contain both block and inline elements</li>
        <li>Used for larger layout sections</li>
      </ol>

      <h3>
        Note:<em>Opening tag looks like {'<element>'}, and closing tag looks like {'</element>'}. Can you see the difference? The closing tag has a "/" before the element name.</em>
      </h3>
          <br/>
    <hr/>
    <br/>
      <p><strong>Common BLOCK LEVEL TAGS AND THEIR USAGE:</strong></p>
      <ul>
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

      <hr />

      <h2>INLINE ELEMENTS</h2>
      <p>
        Inline elements do NOT start on a new line and only take up as much width as necessary.
      </p>

      <ol type='i'>
        <li>Do not start on a new line</li>
        <li>Take only as much space as needed</li>
        <li>Cannot contain block-level elements</li>
        <li>Mostly used for formatting</li>
      </ol>

      <h4><strong>Common INLINE TAGS AND THEIR USAGE:</strong></h4>
      <ul>
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

      <hr />
      <br />
      <p>
        <ol>
          <h3> INSTRUCTION </h3>
          <div className='list'>
          <li>{`<b> bold </b>`}</li>
          <li>{`<i> italic </i>`}</li>
          <li>{`<u> under line </u>`}</li>
          <li>{`<strong> bold important message </strong>`}</li>
          <li>{`<em> italic important message </em>`}</li>
          <li>{`<mark> highlight </mark>`}</li>
          <li>{`<marquee> headline </marquee>`}</li>
          <li>{`<br>`}</li>
          <li>{`<hr>`}</li>
          <li>{`<abbr>HTML</abbr>`}</li>
          </div>
        </ol>
      </p>
    <br/>
    <hr/>

      <h2> 💻 Try Yourself, Follow Instruction !!</h2>

      <Compiler 
        LessonId="html-lesson2"
        expectedOutput={(output) => {
          const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
          return norm(output) === norm(expectedNormalized);
        }}
        initialCode={`<h1> HELLO, From Code Vibe </h1>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/HtmlLesson3">⏭NEXT LESSON</Link>
      )}
    </div>
  );
};

export default HtmlLesson2;
