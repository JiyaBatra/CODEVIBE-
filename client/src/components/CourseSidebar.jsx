import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { FaTrophy, FaTimes, FaStar } from 'react-icons/fa';

const CourseSidebar = ({ coursePrefix, totalLessons, courseTitle }) => {
  const [progressData, setProgressData] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [popMessage, setPopMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      if (parsedUser.email) {
        const token = localStorage.getItem('authToken');
        axios.get(`${API_BASE_URL}/api/progress/${parsedUser.email}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
          .then(res => {
            setProgressData(res.data);
            const completed = (res.data.completedLessons || []).filter(id => id && id.startsWith(coursePrefix)).length;
            setCompletedCount(completed);
          })
          .catch(err => console.error(err));
      }
    }
  }, [coursePrefix]);

  useEffect(() => {
    const handleProgress = () => {
      setIsOpen(true);
      
      // Auto-dismiss after 6 seconds for better UX
      setTimeout(() => setIsOpen(false), 6000);
    };
    window.addEventListener('codevibe-progress-updated', handleProgress);
    return () => window.removeEventListener('codevibe-progress-updated', handleProgress);
  }, []);

  useEffect(() => {
    const data = progressData || { xp: 0, level: 1 };
    const lessonsLeft = totalLessons - completedCount;
    
    const messages = [
      `Level ${data.level} 🔥`,
      `${data.xp} Total XP 🌟`,
      lessonsLeft > 0 ? `${lessonsLeft} lessons left!` : `Course Mastered! 🎉`,
      'Click to view progress!'
    ];
    
    setPopMessage(messages[0]);
    let i = 1;
    
    const interval = setInterval(() => {
      setPopMessage(messages[i % messages.length]);
      i++;
    }, 4000);
    
    return () => clearInterval(interval);
  }, [progressData, completedCount, totalLessons]);

  const data = progressData || { xp: 0, level: 1, completedLessons: [] };

  const currentXp = data.xp || 0;
  const currentLevel = data.level || 1;
  const xpAway = 100 - (currentXp % 100);
  
  const coursePercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));
  const lessonsLeft = totalLessons - completedCount;

  return (
    <>
      <style>{`
        .gami-fab-container {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .gami-bubble {
          background: rgba(255, 75, 110, 0.9);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(255, 75, 110, 0.4);
          animation: bounceFade 4s infinite;
          transform-origin: bottom left;
          backdrop-filter: blur(5px);
          white-space: nowrap;
        }

        .gami-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff4b6e, #ff8c4d);
          border: none;
          box-shadow: 0 10px 25px rgba(255, 75, 110, 0.5);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: pulseGlow 2s infinite;
        }

        .gami-fab:hover {
          transform: scale(1.1) rotate(15deg);
        }

        .gami-expanded-card {
          position: fixed;
          bottom: 100px;
          left: 40px;
          z-index: 9999;
          background: linear-gradient(145deg, rgba(20,20,30,0.95), rgba(30,30,45,0.95));
          border-radius: 24px;
          padding: 24px;
          border: 1px solid rgba(255, 77, 109, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255, 77, 109, 0.1);
          width: 320px;
          backdrop-filter: blur(15px);
          animation: popScaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: bottom left;
        }

        .gami-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 77, 109, 0.15);
          border: 1px solid rgba(255, 77, 109, 0.3);
          color: #ff4d4d;
          height: 28px;
          padding: 0 12px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
          font-weight: 600;
        }

        .gami-close-btn:hover {
          background: rgba(255, 77, 109, 0.8);
          border-color: rgba(255, 77, 109, 0.8);
          color: white;
        }

        .gami-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9998;
          background: transparent;
        }

        @keyframes popScaleIn {
          0% { opacity: 0; transform: scale(0.5) translateY(40px); }
          50% { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes bounceFade {
          0%, 100% { opacity: 0; transform: translateY(10px) scale(0.9); }
          10%, 90% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(255, 77, 109, 0.6); }
          70% { box-shadow: 0 0 0 15px rgba(255, 77, 109, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 77, 109, 0); }
        }
      `}</style>

      {/* Expanded Detail Card */}
      {isOpen && (
        <>
          <div className="gami-backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="gami-expanded-card">
            <button className="gami-close-btn" onClick={() => setIsOpen(false)}>
              Close ✕
            </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Course Progress Section */}
            <div>
              <h4 style={{ color: 'white', margin: '0 0 16px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🎯</span> {courseTitle}
              </h4>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.9)', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '500' }}>
                  <span>Progress</span>
                  <span style={{ color: '#ff4d4d' }}>{coursePercent}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #ff4b6e, #ff8c4d)',
                    width: `${coursePercent}%`,
                    height: '100%',
                    borderRadius: '5px',
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}></div>
                </div>
                
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
                  {lessonsLeft > 0 
                    ? `You are only ${lessonsLeft} lesson${lessonsLeft > 1 ? 's' : ''} away from completing this course! Keep pushing! 💪` 
                    : `Amazing! You have mastered this course! 🎉`}
                </p>
              </div>
            </div>

            {/* Global XP Section */}
            <div>
              <h4 style={{ color: 'white', margin: '0 0 16px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>⭐</span> Level {currentLevel}
              </h4>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ 
                    width: '40px', height: '40px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', color: '#000',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                  }}>
                    {currentLevel}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{currentXp} Total XP</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Next rank in {xpAway} XP</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
                  Every lesson gives you <strong>50 XP</strong>! Complete {Math.ceil(xpAway / 50)} more lesson{Math.ceil(xpAway / 50) > 1 ? 's' : ''} to reach Level {currentLevel + 1} instantly! 🔥
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Floating Button Container */}
      <div className="gami-fab-container">
        {!isOpen && popMessage && (
          <div className="gami-bubble" key={popMessage}>
            {popMessage}
          </div>
        )}

        {!isOpen && (
          <button className="gami-fab" onClick={() => setIsOpen(!isOpen)} aria-label="Course Progress">
            <FaTrophy size={26} />
          </button>
        )}
      </div>
    </>
  );
};

export default CourseSidebar;
