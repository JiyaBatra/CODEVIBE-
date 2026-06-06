import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots } from 'react-icons/fa';
import ChatWindow from './ChatWindow';
import { chatbotResponses, fallbackResponse } from '../../data/chatbotResponses';

// Attractive welcome message
const WELCOME_MESSAGE = `🚀 Welcome to CodeVibe AI

I can help you learn:

🌐 HTML & CSS
⚡ JavaScript & React
📦 Node.js & Express
🍃 MongoDB
🔁 DSA & OOP
🐞 Debugging

Try asking:
• "What is Flexbox?"
• "What is React?"
• "What is OOP?"`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: WELCOME_MESSAGE,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages.length]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase().trim().replace(/[?!.,।]/g, '');

    // ── Layer 1: Direct substring match (fastest, original behaviour) ──
    for (const entry of chatbotResponses) {
      if (entry.keywords.some(keyword => lowerInput.includes(keyword))) {
        return entry.response;
      }
    }

    // ── Layer 2: Smart word-level match after stripping filler words ──
    // Remove question/filler words that carry no topic meaning
    const stopWords = new Set([
      // Hinglish fillers
      'kya', 'hai', 'hota', 'hoti', 'hote', 'kaise', 'kaun', 'kahan', 'kab',
      'kyun', 'kyu', 'aur', 'me', 'ka', 'ki', 'ke', 'ko', 'se', 'mein',
      'batao', 'samjhao', 'bata', 'mujhe', 'iska', 'uska', 'matlab', 'karo',
      // English fillers
      'what', 'is', 'are', 'was', 'were', 'how', 'why', 'when', 'where',
      'which', 'who', 'explain', 'describe', 'tell', 'me', 'about', 'define',
      'definition', 'meaning', 'a', 'an', 'the', 'of', 'in', 'on', 'at',
      'to', 'for', 'and', 'or', 'but', 'difference', 'between', 'use',
      'used', 'work', 'works', 'can', 'you', 'i', 'want', 'know', 'please',
      'do', 'does', 'give', 'show', 'example', 'with', 'from', 'it',
    ]);

    const extractWords = (text) =>
      text
        .toLowerCase()
        .replace(/[?!.,।]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 1 && !stopWords.has(w));

    const inputWords = extractWords(lowerInput);
    if (inputWords.length === 0) return fallbackResponse;

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of chatbotResponses) {
      for (const keyword of entry.keywords) {
        const keywordWords = extractWords(keyword);
        if (keywordWords.length === 0) continue;

        // Count how many keyword words appear in the input (with partial match)
        const matchCount = keywordWords.filter(kw =>
          inputWords.some(iw => iw === kw || iw.includes(kw) || kw.includes(iw))
        ).length;

        const score = matchCount / keywordWords.length;

        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry;
        }
      }
    }

    // ── Layer 3: Accept match if ≥60% of keyword words matched ──
    if (bestMatch && bestScore >= 0.6) {
      return bestMatch.response;
    }

    // ── Layer 4: Single strong-word match (for 1-word topics) ──
    // e.g. user types "flexbox" or "hoisting" or "closure"
    if (inputWords.length >= 1) {
      for (const entry of chatbotResponses) {
        for (const keyword of entry.keywords) {
          const keywordWords = extractWords(keyword);
          if (keywordWords.length === 1 && inputWords.includes(keywordWords[0])) {
            return entry.response;
          }
          // Also check if any single input word fully matches any single keyword word
          if (inputWords.some(iw => keywordWords.includes(iw) && iw.length > 3)) {
            if (!bestMatch || entry !== bestMatch) {
              // Only use if score is decent
              const kwScore = inputWords.filter(iw => keywordWords.includes(iw)).length / Math.max(inputWords.length, keywordWords.length);
              if (kwScore > bestScore && kwScore >= 0.4) {
                bestScore = kwScore;
                bestMatch = entry;
              }
            }
          }
        }
      }
      if (bestMatch && bestScore >= 0.4) return bestMatch.response;
    }

    return fallbackResponse;
  };

  const handleSendMessage = (text) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponseText = getBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: WELCOME_MESSAGE,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onClose={() => setIsOpen(false)}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            onSuggestionClick={handleSendMessage}
          />
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-btn fixed z-[9999] flex items-center justify-center text-white focus:outline-none"
        style={{
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          padding: '0',
          margin: '0',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff4d6d, #ff85a1)'
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: ['0 0 15px rgba(255,77,109,0.5)', '0 0 30px rgba(255,77,109,0.8)', '0 0 15px rgba(255,77,109,0.5)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaCommentDots size={28} />
      </motion.button>
    </>
  );
};

export default Chatbot;
