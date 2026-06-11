// src/components/CLesson17.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson17 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);

  // 🐦 Twitter Share Function
  const shareOnTwitter = () => {
    const text = "I just completed the C Programming course on CodeVibe! 🚀\n\nCheck it out: https://codevibeforyou.netlify.app\n\n#CodeVibe #GSSoC26 #100DaysOfCode";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  // 💼 LinkedIn Share Function
  const shareOnLinkedIn = () => {
    const url = "https://codevibeforyou.netlify.app";
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Mini Project 2: Student Management System</h1>

      <div className="lesson-content">
        <p>A Student Management System can store and display student data using structures and arrays.</p>
        <p>Example:</p>
        <pre>
{`#include <stdio.h>

struct Student {
    char name[50];
    int roll;
};

int main() {
    struct Student s1 = {"John", 101};
    printf("%s %d", s1.name, s1.roll);
    return 0;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a Student structure.
2. Store one student's name and roll.
3. Print them.
Expected Output: Alice 1`}
      </pre>

      <Compiler
        LessonId="c-lesson-17"
        language="c"
        hint="Define struct Student with name and roll fields. Create a student with name Alice and roll 1, then print both."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`}
        expectedOutput={`Alice 1`}
        onSuccess={handleSuccess}
      />

      {/* 🎉 Lesson Completion Section with Social Share Buttons */}
      {isCorrect && (
        <div className="completion-section" style={{ marginTop: '20px', padding: '15px', border: '1px solid #22c55e', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <p style={{ color: 'green', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>
            🎉 You completed all C Lessons!
          </p>
          
          <div className="share-buttons-container" style={{ display: 'flex', gap: '10px' }}>
            {/* Twitter Button */}
            <button 
              onClick={shareOnTwitter} 
              style={{ padding: '10px 15px', backgroundColor: '#1DA1F2', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              Share on Twitter 🐦
            </button>

            {/* LinkedIn Button */}
            <button 
              onClick={shareOnLinkedIn} 
              style={{ padding: '10px 15px', backgroundColor: '#0077B5', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              Share on LinkedIn 💼
            </button>
          </div>
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
    onClick={() => navigate('/CLesson16')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  {/* <button
    onClick={() => navigate('/CLesson1')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button> */}
</div>
    </div>
  );
};

export default CLesson17;