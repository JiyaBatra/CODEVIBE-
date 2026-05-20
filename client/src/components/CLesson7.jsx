// src/components/CLesson7.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson8'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 7: Arrays in C</h1>

      <div className="lesson-content">
        <p>An array is a collection of elements of the same type stored in contiguous memory locations. Arrays are useful for storing multiple values in a single variable.</p>
        <p>Example:</p>
        <code>
{`#include <stdio.h>
int main() {
    int numbers[3] = {10, 20, 30};
    printf("%d\\n", numbers[0]); // prints 10
    printf("%d\\n", numbers[1]); // prints 20
    printf("%d\\n", numbers[2]); // prints 30
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: array declaration, initialization, accessing elements</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares an integer array of size 5.
2. Stores values 5, 10, 15, 20, 25 in it.
3. Prints the third element of the array.`}
      </pre>

      <Compiler
        LessonId="c-lesson-7"
        language="c"
        hint="Declare int arr[5] = {5, 10, 15, 20, 25}; then print arr[2] — arrays are zero-indexed so index 2 gives the third element."
        initialCode={`#include <stdio.h>

int main() {
    // Declare and initialize the array here
    
    // Print the third element
    
    return 0;
}`}
        expectedOutput={`15`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson8" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CLesson7;
