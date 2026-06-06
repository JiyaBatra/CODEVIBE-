import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson14 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Object-Oriented Programming (OOP) principles fully conquered on CodeVibe! 🧩 Encapsulation, Inheritance, and Polymorphism are clear as day! Onwards to building modular software! #OOP #GSSoC26");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1>OOP Lesson 14 (JavaScript): Final — Polymorphic Menu</h1>

      <div className="lesson-content">
        <p>
          Polymorphism = one interface, many implementations.  
          Here <code>Action</code> is the base, and <code>Add</code>/<code>Mul</code> override <code>run()</code>.
        </p>

        <pre>{`class Action {
  run(a, b) {
    throw new Error("Must override run()");
  }
}

class Add extends Action {
  run(a, b) {
    return a + b;
  }
}

class Mul extends Action {
  run(a, b) {
    return a * b;
  }
}

let p = new Add();
console.log(p.run(4, 6)); // 10`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create Action base with run(a,b) that throws error.
2) Create Add and Mul classes overriding run().
3) Let p = new Add(); print p.run(4,6) => 10`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create Action base with run(a,b) that throws error. 2) Create Add and Mul classes overriding run()."
        LessonId="oop-lesson-14"
        language="js"
        initialCode={`// Write your code here
class Action {
  run(a, b) {
    // throw error here
  }
}

class Add extends Action {
  // override run
}

class Mul extends Action {
  // override run
}

// Test
let p = new Add();
// console.log(p.run(4,6));
`}
        expectedOutput={(o) => o.trim() === "10"}
        onSuccess={() => setOk(true)}
      />

      {ok && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link
              to="/Certificate"
              onClick={() => nav('/Certificate')}
              style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '18px', color: '#9c27b0', marginBottom: '15px' }}
            >
              🎉 GET CERTIFICATE
            </Link>
          </div>

          {/* Social Share Buttons Block */}
          <div className="share-buttons-block" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={shareOnTwitter} 
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1a91da"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1DA1F2"}
            >
              Share on Twitter 🐦
            </button>
            <button 
              onClick={shareOnLinkedIn} 
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#00669b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0077B5"}
            >
              Share on LinkedIn 💼
            </button>
          </div>
        </div>
      )}
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
    onClick={() => nav('/OOPLesson13')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>
{/* 
  <button
    onClick={() => nav('/OOPLesson2')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button> */}
</div>
    </div>
  );
};

export default OOPLesson14;