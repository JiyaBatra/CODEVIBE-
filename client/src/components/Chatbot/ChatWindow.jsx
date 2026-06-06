import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaTrash } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import QuickSuggestions from './QuickSuggestions';

// Search suggestions shown when input is focused & empty
const searchSuggestions = [
  'What is HTML?',
  'What is Flexbox?',
  'What is React?',
  'What is MongoDB?',
  'What is OOP?',
  'What is a Syntax Error?',
  'What is JavaScript?',
  'What is Node.js?',
];

const ChatWindow = ({ 
  messages, 
  isTyping, 
  onClose, 
  onSendMessage, 
  onClearChat,
  onSuggestionClick 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPick = (text) => {
    onSendMessage(text);
    setInputValue('');
    setShowSuggestions(false);
  };

  // Filter suggestions based on typed value
  const filteredSuggestions = inputValue.trim()
    ? searchSuggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase())
      )
    : searchSuggestions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="chatbot-window"
    >
      {/* Header */}
      <div className="chatbot-header">
        {/* Animated bottom glow line */}
        <div className="chatbot-header-glow"></div>
        
        <div className="chatbot-header-left">
          {/* Bot avatar in header */}
          <div className="chatbot-header-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="8" width="14" height="10" rx="2" fill="white" fillOpacity="0.9"/>
              <rect x="9" y="4" width="6" height="4" rx="1" fill="white" fillOpacity="0.9"/>
              <circle cx="9" cy="13" r="1.5" fill="#ff4d6d"/>
              <circle cx="15" cy="13" r="1.5" fill="#ff4d6d"/>
              <rect x="10" y="15.5" width="4" height="1" rx="0.5" fill="#ff4d6d"/>
              <line x1="12" y1="4" x2="12" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="2.5" r="0.8" fill="white"/>
              <line x1="5" y1="12" x2="3" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="19" y1="12" x2="21" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="chatbot-status-dot"></span>
          </div>
          <div>
            <h3 className="chatbot-header-title">CodeVibe AI</h3>
            <p className="chatbot-header-status">
              <span className="chatbot-pulse-dot">
                <span className="chatbot-pulse-ring"></span>
                <span className="chatbot-pulse-core"></span>
              </span>
              Online &amp; Ready
            </p>
          </div>
        </div>

        <div className="chatbot-header-right">
          <button 
            onClick={onClearChat}
            className="chatbot-btn chatbot-icon-btn"
            title="Clear Chat"
          >
            <FaTrash size={13} />
          </button>
          <button 
            onClick={onClose}
            className="chatbot-btn chatbot-icon-btn"
          >
            <FaTimes size={15} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chatbot-messages">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg.text} 
              isBot={msg.isBot} 
              timestamp={msg.timestamp} 
            />
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Quick Suggestions Chips */}
      <div className="chatbot-quick-area">
        <QuickSuggestions onSelect={onSuggestionClick} />
      </div>

      {/* Input Area */}
      <div className="chatbot-input-area">
        {/* Search suggestions dropdown */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              className="chatbot-suggestions-dropdown"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="chatbot-suggestions-label">💡 Try asking:</div>
              {filteredSuggestions.map((s, i) => (
                <button
                  key={i}
                  className="chatbot-btn chatbot-suggestion-item"
                  onClick={() => handleSuggestionPick(s)}
                >
                  <span className="chatbot-suggestion-icon">🔍</span>
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="chatbot-input-form">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Type your coding doubt here..."
            className="chatbot-input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="chatbot-btn chatbot-send-btn"
          >
            <FaPaperPlane size={14} className={inputValue.trim() ? "ml-[-2px]" : ""} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
