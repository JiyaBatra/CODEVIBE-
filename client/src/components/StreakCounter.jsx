import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flame } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { useAuth } from '../AuthProvider.jsx';

const StreakCounter = () => {
  const [streakData, setStreakData] = useState({ streak: 0, maxStreak: 0, events: [] });
  const [isHovered, setIsHovered] = useState(false);
  const { user, token } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail || !token) return;

    const fetchStreak = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/analytics/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        const currentStreak = data?.stats?.streak || 0;
        const events = data?.analytics?.timelines?.points || [];
        
        // Let's compute max streak from existing streak if not provided
        const maxStreak = Math.max(currentStreak, data?.stats?.maxStreak || currentStreak || 0);

        setStreakData({ streak: currentStreak, maxStreak, events });
      } catch (err) {
        console.error('Error fetching streak data', err);
      }
    };

    fetchStreak();

    // Listen for progress updates to refresh streak!
    window.addEventListener('codevibe-progress-updated', fetchStreak);
    return () => window.removeEventListener('codevibe-progress-updated', fetchStreak);
  }, [userEmail, token]);

  const { events } = streakData;

  const toLocalDateStr = (dateObj) => {
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const activeDates = events.reduce((acc, event) => {
    const d = new Date(event.x || event.createdAt || event.date || "");
    if (d && !Number.isNaN(d.getTime())) {
      acc[toLocalDateStr(d)] = true;
    }
    return acc;
  }, {});

  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toLocalDateStr(today);
  
  const yesterday = new Date(today.getTime() - dayMs);
  const yesterdayStr = toLocalDateStr(yesterday);

  // Compute Streak Dynamically on Frontend
  let computedStreak = 0;
  let computedMaxStreak = streakData.maxStreak || 0;
  
  const uniqueDatesArray = Object.keys(activeDates).sort((a, b) => new Date(b) - new Date(a));
  
  if (uniqueDatesArray.length > 0) {
    const newestDateStr = uniqueDatesArray[0];
    if (newestDateStr === todayStr || newestDateStr === yesterdayStr) {
      computedStreak = 1;
      let prevDate = new Date(newestDateStr);
      for (let i = 1; i < uniqueDatesArray.length; i++) {
        const currDate = new Date(uniqueDatesArray[i]);
        const expected = new Date(prevDate.getTime() - dayMs);
        if (toLocalDateStr(currDate) === toLocalDateStr(expected)) {
          computedStreak++;
          prevDate = currDate;
        } else {
          break;
        }
      }
    }
  }

  computedMaxStreak = Math.max(computedStreak, computedMaxStreak);
  const isActiveToday = activeDates[todayStr] || false;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (6 - i) * dayMs);
    return {
      dateKey: toLocalDateStr(d),
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      isToday: i === 6
    };
  });

  return (
    <div 
      className="streak-counter-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0 12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isActiveToday ? '#ff8c4d' : '#888' }}>
        <Flame size={20} fill={isActiveToday ? '#ff8c4d' : 'transparent'} />
        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{computedStreak}</span>
      </div>

      {isHovered && (
        <div className="streak-popover" style={{
          position: 'absolute',
          top: '100%',
          right: '50%',
          transform: 'translateX(50%)',
          marginTop: '12px',
          background: 'linear-gradient(145deg, rgba(20,20,30,0.98), rgba(30,30,45,0.98))',
          border: '1px solid rgba(255, 140, 77, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          width: '240px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255, 140, 77, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          color: 'white',
          animation: 'fadeInUp 0.2s ease-out'
        }}>
          {/* Tooltip triangle indicator */}
          <div style={{
            position: 'absolute', top: '-6px', right: '50%', transform: 'translateX(50%) rotate(45deg)',
            width: '12px', height: '12px', background: 'rgba(20,20,30,0.98)',
            borderTop: '1px solid rgba(255, 140, 77, 0.3)', borderLeft: '1px solid rgba(255, 140, 77, 0.3)',
          }} />

          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#ff8c4d' }}>{computedStreak} Day Streak</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Max Streak: {computedMaxStreak}</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
            {last7Days.map(day => {
              const isActive = activeDates[day.dateKey];
              return (
                <div key={day.dateKey} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    background: isActive ? '#ff8c4d' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isActive && <Flame size={12} fill="white" color="white" />}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: day.isToday ? '#ff8c4d' : 'rgba(255,255,255,0.5)', fontWeight: day.isToday ? 'bold' : 'normal' }}>
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>
          
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translate(50%, 10px); }
              to { opacity: 1; transform: translate(50%, 0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default StreakCounter;
