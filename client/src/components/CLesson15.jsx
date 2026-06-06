// src/components/CLesson15.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson15 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/CLesson16');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 15: File Handling in C</h1>

      <div className="lesson-content">
        <p>File handling lets you read from and write to files. Use <code>fopen()</code>, <code>fprintf()</code>, <code>fscanf()</code>, <code>fclose()</code> etc.</p>
        <p>Example:</p>
        <pre>
{`#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "w");
    fprintf(fp, "Hello File!");
    fclose(fp);
    return 0;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a file named "test.txt".
2. Write "File Handling Works" into it.
3. (For the online compiler, just print "File Handling Works").`}
      </pre>

      <Compiler
        LessonId="c-lesson-15"
        language="c"
        hint="For this exercise just use printf with the text File Handling Works inside main() to simulate writing to a file."
        initialCode={`#include <stdio.h>

int main() {
    // Simulate writing to a file by printing output
    return 0;
}`}
        expectedOutput={`File Handling Works`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson16" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
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
    onClick={() => navigate('/CLesson14')}
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
    onClick={() => navigate('/CLesson16')}
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

export default CLesson15;
