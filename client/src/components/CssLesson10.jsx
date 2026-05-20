// src/pages/CssLesson10.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Compiler from "../components/Compiler";

const CssLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate("/CssLesson11");

  return (
    <div className="lesson">
      {/* Heading */}
      <h1 className="lesson-title">Chapter 10: Pseudo-classes and Pseudo-elements</h1>

      {/* Lesson Content */}
      <div className="lesson-content">
        <p>
          CSS <b>pseudo-classes</b> define special states of elements.  
          Example: <code>:hover</code>, <code>:first-child</code>, <code>:focus</code>.
        </p>
        <p>
          CSS <b>pseudo-elements</b> style specific parts of elements.  
          Example: <code>::before</code>, <code>::after</code>, <code>::first-line</code>.
        </p>
        <p>Example CSS:</p>
        <pre>{`a:hover { color: red; }
p::first-line { font-weight: bold; }`}</pre>
      </div>

      {/* Tags */}
      <div className="tags-to-try">
        <p>Tags to Try: :hover, :first-child, :focus, ::before, ::after</p>
      </div>

      {/* Instructions */}
      <pre className="instructions">
{`Task:
1. Create a button that changes background color to green when hovered.
2. Style paragraphs so the first line is bold.`}
      </pre>

      {/* Compiler */}
      <Compiler
        hint="💡 Hint: 1. Create a button that changes background color to green when hovered. 2. Style paragraphs so the first lin..."
        LessonId="css-lesson-10"
        language="css"
        initialCode={`button {
  /* normal button styles */
}

button:hover {
  /* button hover styles */
}

p::first-line {
  /* style first line of paragraph */
}`}
        expectedOutput={{
          "button:hover": {
            backgroundColor: "rgb(0, 128, 0)", // Green on hover
          },
          "p::first-line": {
            fontWeight: "700", // bold
          },
        }}
        customHTML={`<button>Hover Me</button><p>This is a long paragraph that should show bold only in the first line of text.</p>`}
        onSuccess={handleSuccess}
      />

      {/* Next Lesson */}
      {isCorrect && (
        <Link
          to="/CssLesson11"
          style={{ marginTop: "20px", display: "inline-block", fontWeight: "bold" }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CssLesson10;
