import API_BASE_URL from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson8 = () => {
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
  const goToNextLesson = () => navigate('/DSALesson9');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 8: Doubly & Circular Linked Lists</h1>

      <div className="lesson-content">
        <p>
          A **Doubly Linked List** has nodes with pointers to <strong>both next and previous</strong> nodes.
        </p>
        <p>
          A **Circular Linked List** connects the last node back to the first node.
        </p>
        <p>Advantages:</p>
        <ul>
          <li>Efficient insertion/deletion at both ends</li>
          <li>Traversal in both directions (for doubly)</li>
        </ul>
        <p>Example Node in C (Doubly):</p>
        <pre>
{`struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a doubly linked list with 3 nodes.
2. Print values in forward and backward order.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a doubly linked list with 3 nodes. 2. Print values in forward and backward order."
        LessonId="dsa-lesson-8"
        language="c"
        initialCode={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};

int main() {
    // Write your code here
    return 0;
}`}
        expectedOutput={`1`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DSALesson9" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Doubly Linked Lists</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['flatten-a-multilevel-doubly-linked-list'] || false} 
              onChange={() => togglePractice('flatten-a-multilevel-doubly-linked-list')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Flatten a Multilevel Doubly Linked List</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['lru-cache'] || false} 
              onChange={() => togglePractice('lru-cache')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/lru-cache/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>LRU Cache</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['design-linked-list'] || false} 
              onChange={() => togglePractice('design-linked-list')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/design-linked-list/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Design Linked List</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['copy-list-with-random-pointer'] || false} 
              onChange={() => togglePractice('copy-list-with-random-pointer')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/copy-list-with-random-pointer/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Copy List with Random Pointer</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['browser-history'] || false} 
              onChange={() => togglePractice('browser-history')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/design-browser-history/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Browser History</a>
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
    onClick={() => navigate('/DSALesson7')}
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
    onClick={() => navigate('/DSALesson9')}
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

export default DSALesson8;
