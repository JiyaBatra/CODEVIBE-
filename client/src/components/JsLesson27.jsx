// src/pages/JsLesson27.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson27 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson28');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 27: Fetch API</h1>

      <div className="lesson-content">
        <p>
          The <b>Fetch API</b> allows JavaScript to make HTTP requests to get or send data to a server.
        </p>
        <p>
          Example:<br />
          <code>
            fetch('https://jsonplaceholder.typicode.com/todos/1')<br />
            &nbsp;&nbsp;.then(response =&gt; response.json())<br />
            .catch(err => console.error(err))