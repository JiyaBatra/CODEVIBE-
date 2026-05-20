import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const [practiceCompleted, setPracticeCompleted] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const email = localStorage.getItem('userEmail') || 'guest';
    const savedPractice = localStorage.getItem(`dsaPractice_${email}`);
    if (savedPractice) {
      try {
        setPracticeCompleted(JSON.parse(savedPractice));
      } catch (e) {
        console.error('Error parsing practice progress', e);
      }
    }
  }, []);

  const togglePractice = (problemId) => {
    setPracticeCompleted(prev => {
      const email = localStorage.getItem('userEmail') || 'guest';
      const updated = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem(`dsaPractice_${email}`, JSON.stringify(updated));
      return updated;
    });
  };


  const handleRun = (userCode) => {
    // simulate JS code run
    try {
      // eslint-disable-next-line no-eval
      const result = eval(userCode);
      setOutput(result || "Welcome to DSA"); // simulate if console.log not returned
      if (result === undefined || result === "Welcome to DSA") {
        setIsCorrect(true);
      }
    } catch (err) {
      setOutput(err.message);
    }
  };

  const goToNextLesson = () => navigate('/DSALesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 1: Introduction to Data Structures & Algorithms</h1>

      <div className="lesson-content">
        <p>
          Data Structures are **ways to organize and store data** so that it can be used efficiently. 
          Algorithms are **step-by-step instructions** for solving a problem using those data structures.
        </p>

        <p>
          Examples of Data Structures: <b>Array, Linked List, Stack, Queue, Tree, Graph</b>.<br/>
          Examples of Algorithms: <b>Searching, Sorting, Recursion</b>.
        </p>

        <p>
          Why we learn this: Without organizing data properly, your programs will be slow or inefficient. Understanding both theory and practice is key to becoming a solid programmer.
        </p>
      </div>

      <pre className="instructions">
{`Task:
1. Write a simple program to print "Welcome to DSA" using JavaScript.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Write a simple program to print 'Welcome to DSA' using JavaScript."
        LessonId="dsa-lesson-1"
        language="js"
        initialCode={`// Write your code here
console.log("Welcome to DSA");`}
        runCode={handleRun}
      />

      {output && (
        <div className="output">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}

      {isCorrect && (
        <Link to="/DSALesson2" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Stack Implementation</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['validate-stack-sequences'] || false} 
              onChange={() => togglePractice('validate-stack-sequences')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/validate-stack-sequences/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Validate Stack Sequences</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['basic-calculator-ii'] || false} 
              onChange={() => togglePractice('basic-calculator-ii')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/basic-calculator-ii/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Basic Calculator II</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['decode-string'] || false} 
              onChange={() => togglePractice('decode-string')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/decode-string/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Decode String</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['largest-rectangle-in-histogram'] || false} 
              onChange={() => togglePractice('largest-rectangle-in-histogram')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Largest Rectangle in Histogram</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['maximal-rectangle'] || false} 
              onChange={() => togglePractice('maximal-rectangle')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/maximal-rectangle/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Maximal Rectangle</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSALesson1;
