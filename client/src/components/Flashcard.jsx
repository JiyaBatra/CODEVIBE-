import React, { useState } from 'react';
import './Flashcard.css';

const flashcardsData = {
  HTML: [
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "Which tag is used for the largest heading?", answer: "<h1>" },
    { question: "What tag creates a hyperlink?", answer: "<a href='...'>" },
    { question: "Which tag is used for an unordered list?", answer: "<ul>" },
    { question: "What attribute specifies an image source?", answer: "src" },
  ],
  CSS: [
    { question: "What does CSS stand for?", answer: "Cascading Style Sheets" },
    { question: "Which property changes text color?", answer: "color" },
    { question: "How do you center a div using flexbox?", answer: "display: flex; justify-content: center; align-items: center;" },
    { question: "What is the box model?", answer: "Content, Padding, Border, Margin" },
    { question: "Which property controls spacing inside an element?", answer: "padding" },
  ],
  JavaScript: [
    { question: "What does DOM stand for?", answer: "Document Object Model" },
    { question: "Which keyword declares a constant?", answer: "const" },
    { question: "What is a closure?", answer: "A function that retains access to its outer scope even after the outer function has returned" },
    { question: "What does === check?", answer: "Strict equality — both value and type" },
    { question: "What is an arrow function?", answer: "A shorter syntax for functions: () => {}" },
  ],
  C: [
    { question: "What is the entry point of a C program?", answer: "main() function" },
    { question: "Which header file is used for input/output?", answer: "#include <stdio.h>" },
    { question: "What does printf() do?", answer: "Prints formatted output to the console" },
    { question: "What is a pointer?", answer: "A variable that stores the memory address of another variable" },
    { question: "What is the size of int in C?", answer: "Typically 4 bytes (platform dependent)" },
  ],
  DBMS: [
    { question: "What does SQL stand for?", answer: "Structured Query Language" },
    { question: "What is a primary key?", answer: "A unique identifier for each record in a table" },
    { question: "What is a foreign key?", answer: "A field that links to the primary key of another table" },
    { question: "What does SELECT * FROM table do?", answer: "Retrieves all columns from the specified table" },
    { question: "What is normalization?", answer: "Organizing a database to reduce redundancy and improve integrity" },
  ],
};

const Flashcard = () => {
  const categories = Object.keys(flashcardsData);
  const [selectedCategory, setSelectedCategory] = useState('HTML');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = flashcardsData[selectedCategory];
  const total = cards.length;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setFlipped(false);
  };

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div className="flashcard-page">
      <h1 className="flashcard-title">⚡ Flashcard Revision Mode</h1>
      <p className="flashcard-subtitle">Click a card to reveal the answer</p>

      <div className="flashcard-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="card-counter">{currentIndex + 1} / {total}</p>

      <div className={`flashcard-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <span className="card-label">Q</span>
            <p>{cards[currentIndex].question}</p>
          </div>
          <div className="flashcard-back">
            <span className="card-label">A</span>
            <p>{cards[currentIndex].answer}</p>
          </div>
        </div>
      </div>

      <div className="flashcard-nav">
        <button className="nav-btn" onClick={handlePrev}>← Prev</button>
        <button className="nav-btn" onClick={handleNext}>Next →</button>
      </div>
    </div>
  );
};

export default Flashcard;