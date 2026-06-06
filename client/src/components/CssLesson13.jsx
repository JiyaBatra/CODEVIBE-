// src/pages/CssLesson13.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  // 5 Average questions - 1 mark each
  { id: 1, question: "Which property changes text color?", options: ["background-color", "color", "font-size", "margin"], answer: "color", marks: 1 },
  { id: 2, question: "Which CSS property controls the space outside an element?", options: ["padding", "margin", "border", "width"], answer: "margin", marks: 1 },
  { id: 3, question: "Which selector targets all <p> elements?", options: ["#p", ".p", "p", "*p"], answer: "p", marks: 1 },
  { id: 4, question: "How do you make text bold in CSS?", options: ["font-weight: bold;", "text-style: bold;", "font-style: bold;", "font: bold;"], answer: "font-weight: bold;", marks: 1 },
  { id: 5, question: "Which property sets the background color?", options: ["color", "background-color", "bgcolor", "background"], answer: "background-color", marks: 1 },

  // 10 Difficult questions - 2 marks each
  { id: 6, question: "What is the default display value of a <div> element?", options: ["inline", "block", "inline-block", "flex"], answer: "block", marks: 2 },
  { id: 7, question: "Which property is used to control the order of flex items?", options: ["flex-direction", "order", "align-items", "justify-content"], answer: "order", marks: 2 },
  { id: 8, question: "How do you select an element with class 'nav' inside an element with id 'header'?", options: ["#header nav", "#header .nav", ".header #nav", "#nav .header"], answer: "#header .nav", marks: 2 },
  { id: 9, question: "Which property adds space between grid columns and rows?", options: ["grid-gap", "grid-space", "gap", "grid-margin"], answer: "grid-gap", marks: 2 },
  { id: 10, question: "Which pseudo-class applies styles when a user hovers over an element?", options: [":active", ":hover", ":focus", ":visited"], answer: ":hover", marks: 2 },
  { id: 11, question: "What does 'em' unit represent in CSS?", options: ["Pixels", "Percentage", "Relative to font-size", "Fixed size"], answer: "Relative to font-size", marks: 2 },
  { id: 12, question: "Which property is NOT part of the box model?", options: ["margin", "padding", "border", "font-size"], answer: "font-size", marks: 2 },
  { id: 13, question: "How to make an element invisible but still take space?", options: ["display: none;", "visibility: hidden;", "opacity: 0;", "hidden: true;"], answer: "visibility: hidden;", marks: 2 },
  { id: 14, question: "Which property is used to make a website responsive?", options: ["@media", "viewport", "flex", "animation"], answer: "@media", marks: 2 },
  { id: 15, question: "Which CSS function rounds the corners of elements?", options: ["border-round", "border-radius", "corner-radius", "round-corner"], answer: "border-radius", marks: 2 },
];

const CssLesson13 = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        totalScore += q.marks;
      }
    });
    setScore(totalScore);
  };

  const goToNextLesson = () => {
    navigate('/Certificate'); // ya jo bhi next route hai
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">CSS Lesson 13: MCQ Test</h1>
      <p>Answer all questions. You need at least 11 points to unlock the next lesson.</p>

      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <div key={q.id} style={{ marginBottom: '20px' }}>
            <p><b>{q.id}. {q.question}</b></p>
            {q.options.map(opt => (
              <label key={opt} style={{ display: 'block', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                  required
                /> {opt}
              </label>
            ))}
          </div>
        ))}

        {score === null ? (
          <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
            Submit
          </button>
        ) : (
          <div>
            <h3>Your Score: {score} / 20</h3>
            {score >= 11 ? (
              <>
                <p>Awesome! You passed and unlocked the next lesson.</p>
                <button onClick={goToNextLesson} style={{ padding: '10px 20px', fontWeight: 'bold' }}>
                  ⏭ NEXT LESSON
                </button>
              </>
            ) : (
              <p style={{ color: 'red' }}>
                Score below 11. Please try again to unlock the next lesson.
              </p>
            )}
          </div>
        )}
      </form>
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
    onClick={() => navigate('/CssLesson12')}
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
    onClick={() => navigate('/CssLesson14')}
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

export default CssLesson13;
