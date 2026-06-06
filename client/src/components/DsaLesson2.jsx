import API_BASE_URL from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const [practiceCompleted, setPracticeCompleted] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const email = localStorage.getItem('userEmail') || 'guest';
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
  }, []);

  const togglePractice = (problemId) => {
    setPracticeCompleted(prev => {
      const email = localStorage.getItem('userEmail') || 'guest';
      const updated = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem(`dsaPractice_${email}`, JSON.stringify(updated));

      if (updated[problemId]) {
        axios.post(`${API_BASE_URL}/api/lesson/${problemId}/complete`, { email, score: 100 })
          .catch(err => console.error("Save practice progress error:", err));
      }

      return updated;
    });
  };


  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DSALesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 2: Time & Space Complexity (JS)</h1>

      <div className="lesson-content">
        <p>
          <strong>Time Complexity:</strong> Tells how the runtime of an algorithm increases as input size grows.
        </p>
        <p>
          <strong>Space Complexity:</strong> Tells how much memory an algorithm uses relative to input size.
        </p>
        <p>Common Big O notations:</p>
        <ul>
          <li>O(1) – Constant time</li>
          <li>O(n) – Linear time</li>
          <li>O(n²) – Quadratic time</li>
        </ul>
        <p>Example in JS: Sum of first N numbers using a loop</p>
        <pre>
{`let n = 5;
let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}
console.log(sum); // prints 15`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Write a JavaScript program to calculate the sum of first 5 numbers using a loop.
2. Print the sum.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Write a JavaScript program to calculate the sum of first 5 numbers using a loop. 2. Print the sum."
        LessonId="dsa-lesson-2"
        language="js"
        initialCode={`// Hello from CodeVibe
console.log("Hello from CodeVibe");`}
        expectedOutput={`15`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/DSALesson3"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Time Complexity</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['time-complexity---perm-missing-elem'] || false} 
              onChange={() => togglePractice('time-complexity---perm-missing-elem')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://app.codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Time Complexity - Perm Missing Elem</a>
            <span style={{ backgroundColor: '#1e90ff', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Codility</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['frog-jmp'] || false} 
              onChange={() => togglePractice('frog-jmp')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://app.codility.com/programmers/lessons/3-time_complexity/frog_jmp/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Frog Jmp</a>
            <span style={{ backgroundColor: '#1e90ff', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Codility</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['tape-equilibrium'] || false} 
              onChange={() => togglePractice('tape-equilibrium')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://app.codility.com/programmers/lessons/3-time_complexity/tape_equilibrium/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Tape Equilibrium</a>
            <span style={{ backgroundColor: '#1e90ff', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Codility</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['contains-duplicate'] || false} 
              onChange={() => togglePractice('contains-duplicate')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/contains-duplicate/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Contains Duplicate</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['single-number'] || false} 
              onChange={() => togglePractice('single-number')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/single-number/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Single Number</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
        </div>
      </div>
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
    onClick={() => navigate('/DSALesson1')}
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
    onClick={() => navigate('/DSALesson3')}
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

export default DSALesson2;
