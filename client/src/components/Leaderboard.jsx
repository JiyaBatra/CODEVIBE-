import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, UserCircle } from 'lucide-react';
import './Dashboard.css';
import API_BASE_URL from '../config/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/progress/leaderboard`);
        const data = await response.json();
        setLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading Leaderboard...</div>;
  }

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <section className="dashboard-shell">
      <header className="dashboard-hero">
        <div>
          <p className="dashboard-subtitle">Global Rankings</p>
          <h1>Leaderboard</h1>
        </div>
      </header>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        <main className="dashboard-main glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Trophy size={32} color="#ffb8d9" />
            <h2 style={{ margin: 0 }}>Top Learners</h2>
          </div>

          {leaders.length === 0 ? (
            <div className="empty-state-card">No users have earned XP yet!</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Podium for Top 3 */}
              {top3.length > 0 && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'flex-end', 
                  gap: '1rem', 
                  minHeight: '200px',
                  marginBottom: '2rem' 
                }}>
                  {/* 2nd Place */}
                  {top3[1] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                      <UserCircle size={48} color="#c0c0c0" style={{ marginBottom: '0.5rem' }} />
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem', textAlign: 'center' }}>{top3[1].username}</div>
                      <div style={{ background: 'linear-gradient(to top, rgba(192,192,192,0.2), transparent)', width: '100%', height: '120px', borderRadius: '12px 12px 0 0', borderTop: '4px solid #c0c0c0', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <Medal color="#c0c0c0" size={32} />
                          <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{top3[1].xp} XP</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {top3[0] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '35%', zIndex: 10 }}>
                      <Trophy size={64} color="#ffd700" style={{ marginBottom: '0.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' }} />
                      <div style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '0.5rem', textAlign: 'center', color: '#ffd700' }}>{top3[0].username}</div>
                      <div style={{ background: 'linear-gradient(to top, rgba(255,215,0,0.2), transparent)', width: '100%', height: '160px', borderRadius: '12px 12px 0 0', borderTop: '4px solid #ffd700', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '1rem', boxShadow: '0 -10px 20px rgba(255, 215, 0, 0.1)' }}>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '2rem' }}>🥇</span>
                          <div style={{ fontWeight: 'bold', marginTop: '0.5rem', color: '#ffd700' }}>{top3[0].xp} XP</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {top3[2] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                      <UserCircle size={48} color="#cd7f32" style={{ marginBottom: '0.5rem' }} />
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem', textAlign: 'center' }}>{top3[2].username}</div>
                      <div style={{ background: 'linear-gradient(to top, rgba(205,127,50,0.2), transparent)', width: '100%', height: '100px', borderRadius: '12px 12px 0 0', borderTop: '4px solid #cd7f32', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <Medal color="#cd7f32" size={32} />
                          <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{top3[2].xp} XP</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Rest of the List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {rest.map((user, index) => (
                  <div 
                    key={index + 3} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '1rem 1.5rem', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(255,184,217,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,184,217,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    <div style={{ width: '40px', fontWeight: 'bold', color: '#888', fontSize: '1.1rem' }}>
                      #{index + 4}
                    </div>
                    
                    <div style={{ marginRight: '1rem' }}>
                       <UserCircle color="#555" size={28} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#eee' }}>{user.username}</div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                        {(user.badges || []).map(badge => (
                          <span key={badge} style={{ fontSize: '0.7rem', background: 'linear-gradient(45deg, rgba(255,184,217,0.1), rgba(195,134,255,0.1))', border: '1px solid rgba(255,184,217,0.2)', padding: '2px 8px', borderRadius: '12px', color: '#ffb8d9', textTransform: 'capitalize' }}>
                            🏆 {badge.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: '#ffb8d9', fontSize: '1.1rem' }}>Level {user.level || 1}</div>
                      <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '0.2rem' }}>{user.xp || 0} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Leaderboard;
