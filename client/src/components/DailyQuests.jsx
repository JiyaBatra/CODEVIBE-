import React, { useState } from 'react';
import { CheckCircle2, Circle, Flame, Trophy, Star, BookOpen } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const DailyQuests = ({ xpEarnedToday = 0, lessonsCompletedToday = 0 }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevCompleted, setPrevCompleted] = useState(false);

  const quests = [
    { id: 1, title: 'Complete 1 Lesson', requirement: 1, current: lessonsCompletedToday, icon: <BookOpen size={16} /> },
    { id: 2, title: 'Earn 100 XP Today', requirement: 100, current: xpEarnedToday, icon: <Star size={16} /> },
    { id: 3, title: 'Keep the Streak Alive', requirement: 1, current: (lessonsCompletedToday > 0 || xpEarnedToday > 0) ? 1 : 0, icon: <Flame size={16} /> },
  ];

  const completedCount = quests.filter(q => q.current >= q.requirement).length;
  const isAllComplete = completedCount === quests.length;

  React.useEffect(() => {
    if (isAllComplete && !prevCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setPrevCompleted(isAllComplete);
  }, [isAllComplete, prevCompleted]);

  return (
    <article className="glass-card" style={{ 
      gridColumn: '1 / -1', 
      padding: '1.5rem',
      borderColor: isAllComplete ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255,255,255,0.05)',
      boxShadow: isAllComplete ? '0 0 20px rgba(255, 215, 0, 0.2)' : 'none',
      transition: 'all 0.5s ease'
    }}>
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: isAllComplete ? '#FFD700' : 'white', whiteSpace: 'nowrap' }}>
          <Trophy size={20} color={isAllComplete ? "#FFD700" : "currentColor"} style={{ flexShrink: 0 }} /> 
          <span>Daily Quests</span>
        </h3>
        <span style={{ fontSize: '0.9rem', color: isAllComplete ? '#FFD700' : 'rgba(255,255,255,0.6)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          {completedCount} / {quests.length} Completed
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {quests.map(quest => {
          const isDone = quest.current >= quest.requirement;
          return (
            <div 
              key={quest.id}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                background: isDone ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isDone ? 'rgba(46, 213, 115, 0.3)' : 'transparent'}`,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                opacity: isDone ? 0.8 : 1
              }}
            >
              <div style={{ color: isDone ? '#2ed573' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s ease' }}>
                {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '500', color: isDone ? '#2ed573' : '#fff', textDecoration: isDone ? 'line-through' : 'none' }}>
                  {quest.title}
                </p>
                <div style={{ background: 'rgba(0,0,0,0.3)', height: '4px', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                  <div style={{ 
                    background: isDone ? '#2ed573' : '#ff4b6e', 
                    height: '100%', 
                    width: `${Math.min(100, (quest.current / quest.requirement) * 100)}%`,
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default DailyQuests;
