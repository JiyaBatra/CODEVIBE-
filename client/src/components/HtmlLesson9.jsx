import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

const HtmlLesson9 = () => {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What does the <iframe> tag do?",
      options: ["Displays an image", "Embeds another document", "Creates a link", "Plays audio"],
      correctAnswer: 1,
    },
    {
      question: "Which tag is used to play a video in HTML?",
      options: ["<vid>", "<media>", "<video>", "<movie>"],
      correctAnswer: 2,
    },
    {
      question: "Which of the following is a media tag?",
      options: ["<div>", "<audio>", "<span>", "<form>"],
      correctAnswer: 1,
    },
    {
      question: "Which input type is used to enter email?",
      options: ["text", "email", "mail", "input"],
      correctAnswer: 1,
    },
    {
      question: "What is the purpose of the <img> tag?",
      options: ["Play sound", "Embed video", "Show image", "Submit form"],
      correctAnswer: 2,
    },
    {
      question: "What does the 'sandbox' attribute in <iframe> do?",
      options: [
        "Increases performance of iframe content",
        "Isolates the iframe content from the parent",
        "Embeds multimedia content",
        "Allows fullscreen display",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which attribute is used with <form> to prevent auto-validation of fields?",
      options: ["validate", "novalidate", "disablevalidate", "required"],
      correctAnswer: 1,
    },
    {
      question: "What does the 'contenteditable' attribute do?",
      options: [
        "Prevents editing of text content",
        "Makes the content inside the element editable",
        "Adds a tooltip",
        "Highlights the element",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which input type is best for selecting a number within a fixed range?",
      options: ["range", "number", "text", "slider"],
      correctAnswer: 0,
    },
    {
      question: "What does the <template> tag do?",
      options: [
        "Displays a reusable HTML block",
        "Renders hidden content for client-side scripts to use",
        "Acts as a style template for CSS",
        "Creates a skeleton layout",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the default method of a <form> tag if 'method' attribute is not defined?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctAnswer: 0,
    },
    {
      question: "Which tag is used to define self-contained content, like a blog post?",
      options: ["<section>", "<article>", "<div>", "<summary>"],
      correctAnswer: 1,
    },
    {
      question: "What is the difference between <strong> and <b>?",
      options: [
        "<strong> is semantic, <b> is not",
        "No difference at all",
        "<b> makes text bold, <strong> makes it italic",
        "<strong> works in HTML5 only",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which tag is used to define metadata for an HTML document?",
      options: ["<meta>", "<data>", "<info>", "<property>"],
      correctAnswer: 0,
    },
    {
      question: "Which HTML element is used for progressive web apps to cache assets?",
      options: ["<cache>", "<manifest>", "<service-worker>", "<link>"],
      correctAnswer: 1,
    },
  ];

  const COURSE_ID = 'html';
  const TOTAL = questions.length;

  const [selectedOptions, setSelectedOptions] = useState(Array(TOTAL).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [pastResult, setPastResult] = useState(null);
  const [saving, setSaving] = useState(false);

  // On mount, fetch the most recent saved result so it survives a refresh
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    axios
      .get(`${API_BASE_URL}/api/exam/results?courseId=${COURSE_ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const results = res.data?.results || [];
        if (results.length > 0) setPastResult(results[0]);
      })
      .catch(() => {}); // silently ignore — user may not be logged in
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    selectedOptions.forEach((selected, index) => {
      if (selected === questions[index].correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);

    // Persist to backend so the score survives a page refresh
    const token = localStorage.getItem('authToken');
    if (token) {
      setSaving(true);
      try {
        await axios.post(
          `${API_BASE_URL}/api/exam/submit`,
          { courseId: COURSE_ID, score: calculatedScore, totalQuestions: TOTAL, passingScore: 67 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error('Failed to save exam result:', err);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="lesson">
      <h1>Lesson 9: HTML Quiz (MCQ)</h1>
      <p>Test your HTML knowledge by answering the following questions:</p>

      {/* Show a previously saved score if the user comes back after a refresh */}
      {!submitted && pastResult && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
            📋 Your last attempt ({new Date(pastResult.attemptedAt).toLocaleDateString()}):&nbsp;
            <strong style={{ color: pastResult.passed ? '#22c55e' : '#f87171' }}>
              {pastResult.score}/{pastResult.totalQuestions} ({pastResult.percentage}%)
            </strong>
          </p>
        </div>
      )}

      {questions.map((q, i) => (
        <div key={i} className="question-block" style={{ marginBottom: "20px" }}>
          <h3>{i + 1}. {q.question}</h3>
          {q.options.map((opt, j) => (
            <label key={j} style={{ display: "block", marginLeft: "15px", cursor: submitted ? "default" : "pointer" }}>
              <input
                type="radio"
                name={`question-${i}`}
                value={j}
                checked={selectedOptions[i] === j}
                onChange={() => handleOptionChange(i, j)}
                disabled={submitted}
              />
              {" "}{opt}
            </label>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
          Submit Quiz
        </button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h2>Your Score: {score} / {TOTAL}{saving && <span style={{ fontSize: '0.85rem', marginLeft: '10px', color: '#94a3b8' }}>Saving…</span>}</h2>
          {score >= 10 ? (
            <Link to="/HtmlLesson10">⏭ NEXT LESSON</Link>
          ) : (
            <p>Keep practicing! Try again to reach Lesson 10.</p>
          )}
        </div>
      )}
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
    onClick={() => navigate('/HtmlLesson8')}
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
    onClick={() => navigate('/HtmlLesson10')}
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

export default HtmlLesson9;
