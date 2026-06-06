import React from 'react';
import { motion } from 'framer-motion';

const dotVariants = {
  animate: (i) => ({
    y: [0, -7, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      delay: i * 0.18,
      ease: 'easeInOut',
    },
  }),
};

const TypingIndicator = () => {
  return (
    <div className="chat-typing-wrapper">
      {/* Bot avatar */}
      <div className="chat-avatar chat-avatar--bot" style={{ flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="8" width="14" height="10" rx="2" fill="white" fillOpacity="0.9"/>
          <rect x="9" y="4" width="6" height="4" rx="1" fill="white" fillOpacity="0.9"/>
          <circle cx="9" cy="13" r="1.5" fill="#ff4d6d"/>
          <circle cx="15" cy="13" r="1.5" fill="#ff4d6d"/>
          <line x1="12" y1="4" x2="12" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="2.5" r="0.8" fill="white"/>
          <line x1="5" y1="12" x2="3" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="19" y1="12" x2="21" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="chat-typing-bubble">
        <span className="chat-typing-label">CodeVibe AI is typing</span>
        <div className="chat-typing-dots">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="chat-typing-dot"
              custom={i}
              variants={dotVariants}
              animate="animate"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
