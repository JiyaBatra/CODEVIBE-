// src/components/CLesson11.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson12'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 11: Strings in C</h1>

      <div className="lesson-content">
        <p>Strings in C are arrays of characters ending with a null character <code>'\0'</code>.</p>
        <p>Example of declaring and printing a string:</p>
        <code>
{`#include <stdio.h>

int main() {
    char name[] = "Alice";
    printf("Hello %s\\n", name);
    return 0;
}`}
        </code>
        <p>You can also take string input using <code>scanf</code>:</p>
        <code>
{`char name[20];
scanf("%s", name);`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: string declaration, initialization, printf with %s</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares a string variable with your name.
2. Prints "My name is <your name>" using printf.`}
      </pre>

      <Compiler
        LessonId="c-lesson-11"
        language="c"
        hint="Declare char name[] = John; and print it using printf with the format: My name is followed by the string."
        initialCode={`#include <stdio.h>

int main() {
    // Declare your string here
    
    // Print the string
    
    return 0;
}`}
        expectedOutput={`My name is John`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson12" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CLesson11;
