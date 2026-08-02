// src/pages/JsLesson26.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson26 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson27');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 26: Promises & Async/Await</h1>

      <div className="lesson-content">
        <p>
          A <b>Promise</b> represents an operation that will complete in the future.  
          <b>Async/Await</b> allows writing asynchronous code in a synchronous style.
        </p>
        <p>
          Example (Promise):<br />
          <code>
            let p = new Promise((resolve, reject) =&gt; &#123;<br />
            &nbsp;&nbsp;setTimeout(() =&gt; resolve("Done!"), 1000);<br />
            &#125;);<br />
            p.then(msg =&gt; console.log(msg)); // Done! after 1 sec
            .catch(err => console.error(err))