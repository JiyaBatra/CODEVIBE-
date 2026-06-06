import API_BASE_URL from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState({});
  const navigate = useNavigate();

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
  const goToNextLesson = () => navigate('/DSALesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 3: Arrays & Basic Operations (JS)</h1>

      <div className="lesson-content">
        <p>
          Arrays are collections of elements stored in contiguous memory locations.
        </p>
        <p>Common operations:</p>
        <ul>
          <li>Accessing elements</li>
          <li>Updating elements</li>
          <li>Traversing the array</li>
          <li>Finding sum or maximum/minimum</li>
        </ul>
        <p>Example in JS:</p>
        <pre>
{`// Hello from CodeVibe
function sumArray() {
  let arr = [1, 2, 3, 4, 5];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  console.log(sum);
}

sumArray();
`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a JavaScript array with numbers 1 to 5.
2. Print the sum of all elements.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a JavaScript array with numbers 1 to 5. 2. Print the sum of all elements."
        LessonId="dsa-lesson-3"
        language="js"
        initialCode={`// Hello from CodeVibe
console.log("Hello from CodeVibe");`}
        expectedOutput={`15`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/DSALesson4"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}

      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Arrays</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['two-sum'] || false} 
              onChange={() => togglePractice('two-sum')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Two Sum</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['best-time-stock'] || false} 
              onChange={() => togglePractice('best-time-stock')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Best Time to Buy Stock</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['maximum-subarray'] || false} 
              onChange={() => togglePractice('maximum-subarray')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/maximum-subarray/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Maximum Subarray</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
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
              checked={practiceCompleted['product-of-array-except-self'] || false} 
              onChange={() => togglePractice('product-of-array-except-self')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/product-of-array-except-self/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Product of Array Except Self</a>
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
    onClick={() => navigate('/DSALesson2')}
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
    onClick={() => navigate('/DSALesson4')}
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

export default DSALesson3;
