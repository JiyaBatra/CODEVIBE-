// src/pages/JsLesson29.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Compiler from '../components/Compiler';

const JsLesson29 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate("/Certificate");
  };

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Just built a functional Dynamic Shopping Cart Project using JavaScript on CodeVibe! ⚡ Mastered DOM manipulation and event listeners. Frontend journey is getting exciting! 🚀");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Lesson 29: Shopping Website JS Project</h1>

      <div className="lesson-content">
        <p>
          Welcome to the JS Shopping Website project! The HTML & CSS structure is already provided below.  
          Your task is to write JavaScript to make the shopping cart functional.
        </p>
        <p>Features you need to implement using JS:</p>
        <ul>
          <li>Add item to cart</li>
          <li>Remove item from cart</li>
          <li>Update total price dynamically</li>
        </ul>
        <p>The HTML & CSS are preloaded in the compiler.</p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: DOM manipulation, event listeners, arrays, loops, innerHTML, onclick</p>
      </div>

      <pre className="instructions">
{`Instructions:
1. Each product has a "Add to Cart" button. When clicked, it should add the product to the cart.
2. Cart should display all selected items with quantity and price.
3. Total price should update automatically when items are added or removed.
4. Provide a "Remove" button for each cart item to remove it from the cart.`}
      </pre>

      <Compiler
        hint="💡 Hint: Instructions: 1. Each product has a 'Add to Cart' button. When clicked, it should add the product to the cart."
        LessonId="js-lesson-29"
        language="js"
        initialCode={`// Write your JS code here to make the shopping cart functional

// Example steps you may follow:
// 1. Select all add-to-cart buttons
// 2. Create an array to hold cart items
// 3. Update the cart DOM when items are added or removed
// 4. Calculate and display total price

`}
        expectedOutput={`// Dynamic behavior: adding/removing items and updating total price correctly`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <div style={{ marginTop: '20px' }} className="success-action-container">
          <div>
            <Link
              to="/Certificate"
              style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '18px', color: '#4caf50', marginBottom: '15px' }}
              onClick={goToNextLesson}
            >
              ⏭ NEXT LESSON: Certificate
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
    onClick={() => navigate('/JsLesson28')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  {/* <button
    onClick={() => navigate('/JsLesson3')}
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

export default JsLesson29;