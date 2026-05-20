import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const DSALesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
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


  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/DSALesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 6: Stacks & Queues</h1>

      <div className="lesson-content">
        <p>
          Stacks and Queues are **linear data structures**:
        </p>
        <ul>
          <li><b>Stack:</b> LIFO (Last In First Out)</li>
          <li><b>Queue:</b> FIFO (First In First Out)</li>
        </ul>
        <p>Stack Example using array:</p>
        <pre>
{`int stack[10], top=-1;
void push(int x){ stack[++top] = x; }
int pop(){ return stack[top--]; }`}
        </pre>
        <p>Queue Example using array:</p>
        <pre>
{`int queue[10], front=0, rear=-1;
void enqueue(int x){ queue[++rear] = x; }
int dequeue(){ return queue[front++]; }`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Implement a stack using an array in C.
2. Push 3 numbers into the stack.
3. Pop all numbers and print them.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Implement a stack using an array in C. 2. Push 3 numbers into the stack."
        LessonId="dsa-lesson-6"
        language="c"
        initialCode={`#include <stdio.h>

int main() {
    int stack[10], top=-1;
    // Write your code here
    return 0;
}`}
        expectedOutput={`1`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/DSALesson7" className="next-lesson" onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
      {/* 🎯 Practice Problems Section */}
      <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#1a1a2e', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#fff' }}>
        <h2 style={{ color: '#ff4d6d', borderBottom: '2px solid #ff4d6d', paddingBottom: '10px', marginBottom: '20px' }}>🎯 Practice Problems: Stacks & Queues</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['valid-parentheses'] || false} 
              onChange={() => togglePractice('valid-parentheses')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Valid Parentheses</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['min-stack'] || false} 
              onChange={() => togglePractice('min-stack')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/min-stack/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Min Stack</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['implement-queue-using-stacks'] || false} 
              onChange={() => togglePractice('implement-queue-using-stacks')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Implement Queue using Stacks</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['implement-stack-using-queues'] || false} 
              onChange={() => togglePractice('implement-stack-using-queues')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/implement-stack-using-queues/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Implement Stack using Queues</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', backgroundColor: '#16213e', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={practiceCompleted['evaluate-reverse-polish-notation'] || false} 
              onChange={() => togglePractice('evaluate-reverse-polish-notation')}
              style={{ width: '20px', height: '20px', accentColor: '#ff4d6d', cursor: 'pointer' }}
            />
            <a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', flexGrow: 1, cursor: 'pointer' }}>Evaluate Reverse Polish Notation</a>
            <span style={{ backgroundColor: '#ffa116', color: '#000', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LeetCode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSALesson6;
