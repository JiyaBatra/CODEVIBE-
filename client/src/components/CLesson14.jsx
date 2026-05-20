// src/components/CLesson14.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson14 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/CLesson15');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 14: Structures in C</h1>

      <div className="lesson-content">
        <p>Structures in C allow grouping of variables of different types under a single name. They are great for representing entities like students, books, or employees.</p>
        <p>Example:</p>
        <pre>
{`#include <stdio.h>

struct Student {
    char name[50];
    int age;
};

int main() {
    struct Student s1 = {"Alice", 20};
    printf("%s is %d years old", s1.name, s1.age);
    return 0;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a structure 'Book' with title and price.
2. Initialize it and print both values.
Expected Output:
C Programming 500`}
      </pre>

      <Compiler
        LessonId="c-lesson-14"
        language="c"
        hint="Define struct Book with char title[50] and int price. Create a variable with C Programming and 500, then print both."
        initialCode={`#include <stdio.h>

int main() {
    // Create your structure and print values
    return 0;
}`}
        expectedOutput={`C Programming 500`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson15" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CLesson14;
