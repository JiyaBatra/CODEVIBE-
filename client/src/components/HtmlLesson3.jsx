import React, { useState } from 'react';
import Compiler from './Compiler';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="lesson">
      <h1>Lesson 3: HTML List</h1>
      <br />
      <p>
        In HTML, lists are used to display multiple items in an organized way.
        There are three main types of lists:
      </p>

      <h2>Ordered list {'<ol>'}</h2>
      <ul>
        <li>This list shows items in a specific order.</li>
        <li>It is useful when sequence matters, like in a recipe or instruction.</li>
      </ul>

      <pre>{`<ol>
  <li>wake up</li>
  <li>brush your teeth</li>
  <li>have breakfast</li>
</ol>`}</pre>

      <hr />

      <h2>Unordered list {'<ul>'}</h2>
      <ul>
        <li>This list shows items with bullet points, not numbers.</li>
        <li>It is used when order doesn't matter, like a grocery list.</li>
      </ul>

      <pre>{`<ul>
  <li>milk</li>
  <li>bread</li>
  <li>egg</li>
</ul>`}</pre>

      <hr />

      <h2>Description list {'<dl>'}</h2>
      <p>This list is used for terms and their descriptions, like in a dictionary.</p>
                

      <pre>{`<dl>
  <dt>HTML</dt>
  <dd>It stands for Hyper Text Markup Language</dd>
</dl>`}</pre>
          <br/>
    <hr/>
      <br />
      <h2>Try Yourself: Create all three types of lists</h2>

      <Compiler
        LessonId="html-lesson3"
        
         expectedOutput={(output) => {
    const normalize = (s) => s.replace(/\s+/g, " ").trim();
    const expected=`<ol>
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
    </div>
  );
};

export default HtmlLesson3;
