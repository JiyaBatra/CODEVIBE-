import API_BASE_URL from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson13 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [output, setOutput] = useState("");
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

  const handleRun = (userCode) => {
    try {
      const result = eval(userCode);
      setOutput(result || "Welcome to DSA");
      if (result === undefined || result === "Welcome to DSA") {
        setIsCorrect(true);
      }
    } catch (err) {
      setOutput(err.message);
    }
  };

  const goToNextLesson = () => navigate('/Certificate');

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Crushed the Data Structures & Algorithms (DSA) course on CodeVibe! 🧠💻 Ready to tackle complex algorithmic problems and optimization! #DSA #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 13: Interview Asked DSA Questions</h1>


     

   
      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Elite DSA Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['two-Sum'] || false} 
              onChange={() => togglePractice('two-Sum')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/two-sum/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Two Sum</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['contains-duplicate'] || false} 
              onChange={() => togglePractice('contains-duplicate')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/contains-duplicate/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Contains Duplicate</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['product-of-array-except-self'] || false} 
              onChange={() => togglePractice('product-of-array-except-self')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/product-of-array-except-self/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Product of Array Except Self</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['best-time-to-buy-and-sell-stock'] || false} 
              onChange={() => togglePractice('best-time-to-buy-and-sell-stock')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Best Time to Buy and Sell Stock</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['valid-palindrome'] || false} 
              onChange={() => togglePractice('valid-palindrome')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/valid-palindrome/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Valid Palindrome</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['container-with-most-water'] || false} 
              onChange={() => togglePractice('container-with-most-water')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/container-with-most-water/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Container With Most Water</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['longest-substring-without-repeating-characters'] || false} 
              onChange={() => togglePractice('longest-substring-without-repeating-characters')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Longest Substring Without Repeating Characters</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['permutation-in-string'] || false} 
              onChange={() => togglePractice('permutation-in-string')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/permutation-in-string/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Permutation in String</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['valid-parentheses'] || false} 
              onChange={() => togglePractice('valid-parentheses')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/valid-parentheses/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Valid Parentheses</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['min-stack'] || false} 
              onChange={() => togglePractice('min-stack')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/min-stack/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Min Stack</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['reverse-linked-list'] || false} 
              onChange={() => togglePractice('reverse-linked-list')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/reverse-linked-list/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Reverse Linked List</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['linked-list-cycle'] || false} 
              onChange={() => togglePractice('linked-list-cycle')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Linked List Cycle</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['maximum-depth-of-binary-tree'] || false} 
              onChange={() => togglePractice('maximum-depth-of-binary-tree')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/maximum-depth-of-binary-tree/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Maximum Depth of Binary Tree</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['invert-binary-tree'] || false} 
              onChange={() => togglePractice('invert-binary-tree')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/invert-binary-tree/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Invert Binary Tree</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['binary-tree-level-order-traversal'] || false} 
              onChange={() => togglePractice('binary-tree-level-order-traversal')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/binary-tree-level-order-traversal/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Binary Tree Level Order Traversal</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['number-of-islands'] || false} 
              onChange={() => togglePractice('number-of-islands')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/number-of-islands/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Number of Islands</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['climbing-stairs'] || false} 
              onChange={() => togglePractice('climbing-stairs')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/climbing-stairs/description/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Climbing Stairs</a>
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
    onClick={() => navigate('/DSALesson12')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

 
</div>
    </div>
  );
};

export default DSALesson13;