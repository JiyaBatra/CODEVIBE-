import React from 'react';
import { motion } from 'framer-motion';

// Modern chip-style quick actions
const suggestions = [
  { label: '🌐 HTML',       query: 'What is HTML?' },
  { label: '🎨 CSS',        query: 'What is CSS?' },
  { label: '⚡ JavaScript', query: 'What is JavaScript?' },
  { label: '⚛️ React',      query: 'What is React?' },
  { label: '🍃 MongoDB',    query: 'What is MongoDB?' },
  { label: '📦 Node.js',    query: 'What is Node.js?' },
  { label: '🔁 DSA',        query: 'What is DSA?' },
  { label: '🐞 Debugging',  query: 'What is debugging?' },
  { label: '🔷 OOP',        query: 'What is OOP?' },
];

const QuickSuggestions = ({ onSelect }) => {
  return (
    <div className="quick-chips-bar">
      {suggestions.map((s, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onSelect(s.query)}
          className="chatbot-btn quick-chip"
          title={s.query}
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickSuggestions;
