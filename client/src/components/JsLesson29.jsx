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
    navigate("/JsLesson30"); // agar next lesson hai
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
        <Link
          to="/JsLesson30"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson29;
