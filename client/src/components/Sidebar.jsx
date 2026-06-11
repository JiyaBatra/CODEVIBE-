import React, { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useAuth } from '../AuthProvider.jsx';
import API_BASE_URL from '../config/api';

const Sidebar = ({ coursePrefix, totalLessons, courseTitle }) => {
  const { user, token } = useAuth();
  const userEmail = user?.email;
  const [isOpen, setIsOpen] = useState(false);
  const [popMessage, setPopMessage] = useState('');

  // Auto-close after 6 seconds when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Populate popMessage based on progress data if needed
  // For now, set a default message
  useEffect(() => {
    setPopMessage('Course Progress');
  }, [isOpen]);

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background: #fff;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, left 0.3s ease;
          z-index: 1000;
        }
        .sidebar--open {
          transform: translateX(0);
          left: 0;
        }
        .sidebar--closed {
          transform: translateX(-100%);
          left: -250px;
        }
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          cursor: pointer;
        }
        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,0,0,0.2);
          border: none;
          color: #fff;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .toggle-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;
          background: linear-gradient(135deg, #ff4b6e, #ff8c4d);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255,77,110,0.4);
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 250px;
            left: -250px;
            transform: translateX(0);
          }
          .sidebar--open {
            left: 0;
            transform: none;
          }
          .backdrop {
            display: block;
          }
          .toggle-btn {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .sidebar {
            left: 0;
            transform: translateX(0);
          }
          .backdrop {
            display: none;
          }
          .toggle-btn {
            display: none;
          }
        }
      `}</style>
      
      <button
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      
      {isOpen && (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="sidebar sidebar--open">
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            <div style={{ padding: '20px' }}>
              <h4>{courseTitle}</h4>
              {/* Course content goes here */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;