// src/components/CLesson17.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson17 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);

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

      {isCorrect && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 You completed all C Lessons!</p>
      )}
    </div>
  );
};

export default CLesson17;
