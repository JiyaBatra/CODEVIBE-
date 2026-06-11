import API_BASE_URL from '../config/api';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';
import axios from 'axios';

const DSALesson1 = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail') || 'guest';

  // 1. Updated: Initialize compiler state straight from localStorage
  const [isCorrect, setIsCorrect] = useState(() => {
    const savedLessonStatus = localStorage.getItem(`dsa_lesson_1_completed_${email}`);
    return savedLessonStatus ? JSON.parse(savedLessonStatus) : false;
  });

  const [practiceCompleted, setPracticeCompleted] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedPractice = localStorage.getItem(`dsaPractice_${email}`);
    let localPractice = {};
    if (savedPractice) {
      try {
        localPractice = JSON.parse(savedPractice);
        setPracticeCompleted(localPractice);
      } catch (e) {
        console.error('Error parsing practice progress', e);
      }
    }

    if (email !== 'guest') {
      axios.get(`${API_BASE_URL}/api/progress/${email}`)
        .then(res => {
          const completedFromBackend = res.data?.completedLessons || [];
          let hasUpdates = false;
          const mergedPractice = { ...localPractice };
          completedFromBackend.forEach(problemId => {
            if (!mergedPractice[problemId]) {
              mergedPractice[problemId] = true;
              hasUpdates = true;
            }
          });
          if (hasUpdates) {
            setPracticeCompleted(mergedPractice);
            localStorage.setItem(`dsaPractice_${email}`, JSON.stringify(mergedPractice));
          }
        })
        .catch(err => console.error('Error syncing practice progress from backend:', err));
    }
  }, [email]);

  // 2. New Handler: Triggers when the user runs the correct compiler code
  const handleCompilerSuccess = () => {
    setIsCorrect(true);
    localStorage.setItem(`dsa_lesson_1_completed_${email}`, JSON.stringify(true));
    
    // Optional: If they have a backend endpoint to track main lessons, fire it here
    if (email !== 'guest') {
      axios.post(`${API_BASE_URL}/api/lesson/dsa-lesson-1/complete`, { email, score: 100 })
        .catch(err => console.error("Error saving main lesson progress:", err));
    }
  };

  const togglePractice = (problemId) => {
    setPracticeCompleted(prev => {
      const updated = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem(`dsaPractice_${email}`, JSON.stringify(updated));

      if (updated[problemId]) {
        axios.post(`${API_BASE_URL}/api/lesson/${problemId}/complete`, { email, score: 100 })
          .catch(err => console.error("Save practice progress error:", err));
      }

      return updated;
    });
  };

  const goToNextLesson = () => navigate('/DSALesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 1: Introduction to Data Structures & Algorithms</h1>

      <div className="lesson-content">
        <p>
          Data Structures are ways to store and organize data efficiently. Algorithms are step-by-step instructions to solve problems using these structures.
        </p>
        <p>
          Examples of data structures: Array, Linked List, Stack, Queue, Tree, Graph.<br />
          Examples of algorithms: Searching, Sorting, Recursion.
        </p>
      </div>

      <pre className="instructions">
{`Task:
1. Write a simple program to print "Welcome to DSA" using a JavaScript function.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Write a simple program to print 'Welcome to DSA' using a JavaScript function."
        LessonId="dsa-lesson-1"
        language="js"
        initialCode={`// Example: Hello from CodeVibe
function welcomeDSA() {
  console.log("Welcome to DSA");
}

// Call the function
welcomeDSA();`}
        expectedOutput={`Welcome to DSA`}
        onSuccess={handleCompilerSuccess} // 3. Updated: Triggers our persistent handler
      />

      {isCorrect && (
        <Link
          to="/DSALesson2"
          className="next-lesson"
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}

      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Intro to DSA</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['solve-me-first'] || false} 
              onChange={() => togglePractice('solve-me-first')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://www.hackerrank.com/challenges/solve-me-first/problem" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Solve Me First</a>
            <span style={{ backgroundColor: '#00ea64', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>HackerRank</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['simple-array-sum'] || false} 
              onChange={() => togglePractice('simple-array-sum')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://www.hackerrank.com/challenges/simple-array-sum/problem" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Simple Array Sum</a>
            <span style={{ backgroundColor: '#00ea64', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>HackerRank</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['a-very-big-sum'] || false} 
              onChange={() => togglePractice('a-very-big-sum')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://www.hackerrank.com/challenges/a-very-big-sum/problem" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>A Very Big Sum</a>
            <span style={{ backgroundColor: '#00ea64', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>HackerRank</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['diagonal-difference'] || false} 
              onChange={() => togglePractice('diagonal-difference')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://www.hackerrank.com/challenges/diagonal-difference/problem" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Diagonal Difference</a>
            <span style={{ backgroundColor: '#00ea64', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>HackerRank</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['plus-minus'] || false} 
              onChange={() => togglePractice('plus-minus')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://www.hackerrank.com/challenges/plus-minus/problem" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Plus Minus</a>
            <span style={{ backgroundColor: '#00ea64', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>HackerRank</span>
          </div>
        </div>
      </div>
      {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/DSALesson2')}
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

export default DSALesson1;