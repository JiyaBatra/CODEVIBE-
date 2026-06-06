import React from 'react';
import { motion } from 'framer-motion';

// Category icon detector based on message content
const getCategoryIcon = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('html') || lower.includes('tag') || lower.includes('element')) return '🌐';
  if (lower.includes('css') || lower.includes('style') || lower.includes('flexbox') || lower.includes('grid')) return '🎨';
  if (lower.includes('javascript') || lower.includes('js ') || lower.includes('function') || lower.includes('variable') || lower.includes('array') || lower.includes('promise')) return '⚡';
  if (lower.includes('react') || lower.includes('jsx') || lower.includes('hook') || lower.includes('component') || lower.includes('state') || lower.includes('props')) return '⚛️';
  if (lower.includes('mongodb') || lower.includes('mongo') || lower.includes('nosql') || lower.includes('collection')) return '🍃';
  if (lower.includes('node') || lower.includes('express') || lower.includes('server') || lower.includes('backend') || lower.includes('api')) return '📦';
  if (lower.includes('dsa') || lower.includes('algorithm') || lower.includes('data structure') || lower.includes('array') || lower.includes('linked list') || lower.includes('tree') || lower.includes('graph')) return '🔁';
  if (lower.includes('oop') || lower.includes('class') || lower.includes('inheritance') || lower.includes('polymorphism') || lower.includes('encapsulation')) return '🔷';
  if (lower.includes('error') || lower.includes('bug') || lower.includes('debug') || lower.includes('syntax') || lower.includes('fix')) return '🐞';
  if (lower.includes('sql') || lower.includes('database') || lower.includes('dbms') || lower.includes('query')) return '🗄️';
  if (lower.includes('c language') || lower.includes('c program') || lower.includes('pointer') || lower.includes('printf')) return '⚙️';
  return null;
};

// Format bot response: detect headers, bullets, code blocks
const formatMessage = (text, isBot) => {
  if (!isBot) {
    return <p className="chat-text">{text}</p>;
  }

  const lines = text.split('\n');
  const elements = [];
  let codeBlock = [];
  let inCode = false;
  let key = 0;

  const flushCode = () => {
    if (codeBlock.length) {
      elements.push(
        <pre key={`code-${key++}`} className="chat-code-block">
          <code>{codeBlock.join('\n')}</code>
        </pre>
      );
      codeBlock = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCode) { flushCode(); inCode = false; }
      else { inCode = true; }
      return;
    }
    if (inCode) { codeBlock.push(line); return; }

    if (!line.trim()) {
      elements.push(<div key={`sp-${key++}`} className="chat-spacer" />);
    } else if (/^#{1,3}\s/.test(line)) {
      const content = line.replace(/^#{1,3}\s/, '');
      elements.push(<h4 key={`h-${key++}`} className="chat-heading">{content}</h4>);
    } else if (/^[•\-\*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      elements.push(
        <div key={`li-${key++}`} className="chat-bullet">
          <span className="chat-bullet-dot">•</span>
          <span>{line.replace(/^[•\-\*\d+\.]\s+/, '')}</span>
        </div>
      );
    } else if (line.includes('`') && !line.startsWith('`')) {
      const parts = line.split('`');
      elements.push(
        <p key={`p-${key++}`} className="chat-text">
          {parts.map((part, pi) =>
            pi % 2 === 1
              ? <code key={pi} className="chat-inline-code">{part}</code>
              : part
          )}
        </p>
      );
    } else {
      elements.push(<p key={`p-${key++}`} className="chat-text">{line}</p>);
    }
  });

  flushCode();
  return <>{elements}</>;
};

// Bot Avatar SVG (AI/Robot icon)
const BotAvatar = () => (
  <div className="chat-avatar chat-avatar--bot">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  </div>
);

// User Avatar SVG (profile icon)
const UserAvatar = () => (
  <div className="chat-avatar chat-avatar--user">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.9"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" fillOpacity="0.9"/>
    </svg>
  </div>
);

const ChatMessage = ({ message, isBot, timestamp }) => {
  const categoryIcon = isBot ? getCategoryIcon(message) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      className={`chat-message-row ${isBot ? 'chat-message-row--bot' : 'chat-message-row--user'}`}
    >
      {/* Avatar — shown on left for bot, right for user */}
      {isBot && <BotAvatar />}

      <div className={`chat-bubble-wrap ${isBot ? 'chat-bubble-wrap--bot' : 'chat-bubble-wrap--user'}`}>
        {/* Category badge for bot */}
        {isBot && categoryIcon && (
          <span className="chat-category-badge">{categoryIcon}</span>
        )}

        {/* Bubble */}
        <div className={`chat-bubble ${isBot ? 'chat-bubble--bot' : 'chat-bubble--user'}`}>
          {formatMessage(message, isBot)}
        </div>

        {/* Subtle timestamp */}
        <span className={`chat-timestamp ${isBot ? 'chat-timestamp--bot' : 'chat-timestamp--user'}`}>
          {timestamp}
        </span>
      </div>

      {!isBot && <UserAvatar />}
    </motion.div>
  );
};

export default ChatMessage;
