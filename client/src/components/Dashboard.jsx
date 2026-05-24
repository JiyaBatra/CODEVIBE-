import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, FaUserCircle, FaEnvelope, FaUniversity, FaGraduationCap, 
  FaChartLine, FaTrophy, FaBookOpen, FaCode, FaDatabase, FaServer, 
  FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJs, FaArrowRight, 
  FaCalendarAlt, FaClock, FaFire, FaMedal, FaCertificate, FaStar,
  FaGithub, FaLinkedin, FaTwitter, FaArrowUp
} from "react-icons/fa";
import { useAuth } from "../AuthProvider.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  const handleViewReport = (course) => {
    const email = user?.email || user?.Email || "";
    navigate(`/report/${email}?course=${course}`);
  };

  const courses = [
    { name: "HTML", icon: <FaHtml5 />, color: "#ff4d4d", bgColor: "#ff4d4d20", progress: 75, lessons: 10, completed: 8 },
    { name: "CSS", icon: <FaCss3Alt />, color: "#2965f1", bgColor: "#2965f120", progress: 65, lessons: 14, completed: 9 },
    { name: "JavaScript", icon: <FaJs />, color: "#f7df1e", bgColor: "#f7df1e20", progress: 45, lessons: 29, completed: 13 },
    { name: "C Programming", icon: <FaCode />, color: "#2d6a4f", bgColor: "#2d6a4f20", progress: 30, lessons: 17, completed: 5 },
    { name: "OOP", icon: <FaCode />, color: "#e17055", bgColor: "#e1705520", progress: 20, lessons: 14, completed: 3 },
    { name: "DSA", icon: <FaChartLine />, color: "#00cec9", bgColor: "#00cec920", progress: 15, lessons: 12, completed: 2 },
    { name: "DBMS", icon: <FaDatabase />, color: "#6c5ce7", bgColor: "#6c5ce720", progress: 10, lessons: 12, completed: 1 },
    { name: "MongoDB", icon: <FaDatabase />, color: "#4db33d", bgColor: "#4db33d20", progress: 5, lessons: 8, completed: 0 },
    { name: "Node.js", icon: <FaNodeJs />, color: "#68a063", bgColor: "#68a06320", progress: 5, lessons: 12, completed: 0 },
    { name: "Express.js", icon: <FaServer />, color: "#ffffff", bgColor: "#ffffff20", progress: 0, lessons: 10, completed: 0 },
    { name: "React.js", icon: <FaReact />, color: "#61dafb", bgColor: "#61dafb20", progress: 0, lessons: 14, completed: 0 }
  ];

  const overallProgress = Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length);
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons, 0);
  const totalCompleted = courses.reduce((acc, c) => acc + c.completed, 0);
  const streakDays = 7;

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="login-prompt">
          <div className="prompt-icon">🚀</div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your learning journey and track your progress</p>
          <div className="prompt-buttons">
            <button onClick={() => navigate("/Login")} className="btn-login">
              <FaArrowRight /> Login to Dashboard
            </button>
            <button onClick={() => navigate("/Signup")} className="btn-signup">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="bg-pattern"></div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">👋</div>
            <h3>Ready to leave?</h3>
            <p>Your progress has been saved. Come back soon!</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="modal-confirm" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section - Centered */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="greeting-badge">
            <span className="greeting-time">{greeting}</span>
            <div className="current-time">
              <FaClock /> {currentTime}
            </div>
          </div>
          <div className="greeting-text">
            <h1>
              {user.username}!
              <span className="wave-emoji">👋</span>
            </h1>
            <p className="motivation-text">Ready to level up your coding skills today?</p>
          </div>
        </div>
        <div className="header-right">
          <div className="streak-card">
            <FaFire className="streak-icon" />
            <div className="streak-info">
              <span className="streak-days">{streakDays}</span>
              <span className="streak-label">Day Streak</span>
            </div>
          </div>
          <button className="logout-btn" onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Row - Centered */}
      <div className="stats-row">
        <div className="stat-card-horizontal">
          <div className="stat-icon-circle">
            <FaTrophy />
          </div>
          <div className="stat-info-horizontal">
            <h3>Overall Progress</h3>
            <div className="stat-value-progress">
              <span className="percentage">{overallProgress}%</span>
              <div className="progress-bar-small">
                <div className="progress-fill-small" style={{ width: `${overallProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card-horizontal">
          <div className="stat-icon-circle">
            <FaBookOpen />
          </div>
          <div className="stat-info-horizontal">
            <h3>Lessons Completed</h3>
            <div className="stat-value">
              <span className="number">{totalCompleted}</span>
              <span className="total">/{totalLessons}</span>
            </div>
          </div>
        </div>

        <div className="stat-card-horizontal">
          <div className="stat-icon-circle">
            <FaCertificate />
          </div>
          <div className="stat-info-horizontal">
            <h3>Certificates Earned</h3>
            <div className="stat-value">
              <span className="number">{Math.floor(totalCompleted / 5)}</span>
              <span className="total">🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn" onClick={() => navigate("/compiler")}>
          <FaCode /> Live Code Editor
        </button>
        <button className="action-btn" onClick={() => navigate("/leaderboard")}>
          <FaMedal /> Leaderboard
        </button>
        <button className="action-btn" onClick={() => navigate("/certificate")}>
          <FaCertificate /> My Certificates
        </button>
      </div>

      {/* User Info Card - Centered & Vertical Layout */}
      <div className="user-info-card">
        <div className="card-header">
          <div className="card-header-left">
            <FaUserCircle className="card-icon" />
            <h2>Profile Overview</h2>
          </div>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div className="info-vertical">
          <div className="info-item-vertical">
            <FaEnvelope className="info-icon" />
            <div className="info-content">
              <label>Email Address</label>
              <p>{user.email || user.Email}</p>
            </div>
          </div>
          <div className="info-item-vertical">
            <FaUniversity className="info-icon" />
            <div className="info-content">
              <label>Institution</label>
              <p>{user.college || "Not specified"}</p>
            </div>
          </div>
          <div className="info-item-vertical">
            <FaGraduationCap className="info-icon" />
            <div className="info-content">
              <label>Academic Year</label>
              <p>{user.year || "Not specified"}</p>
            </div>
          </div>
          <div className="info-item-vertical">
            <FaCalendarAlt className="info-icon" />
            <div className="info-content">
              <label>Member Since</label>
              <p>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <div className="section-header">
          <div className="header-badge">
            <FaArrowUp />
            <span>Learning Path</span>
          </div>
          <h2>Your Course Journey</h2>
          <p>Track your progress and continue where you left off</p>
        </div>

        <div className="courses-grid">
          {courses.map((course, index) => (
            <button
              key={course.name}
              onClick={() => handleViewReport(course.name)}
              className="course-card-btn"
              onMouseEnter={() => setHoveredCourse(index)}
              onMouseLeave={() => setHoveredCourse(null)}
              style={{
                transform: hoveredCourse === index ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              <div className="course-icon" style={{ background: course.bgColor }}>
                <span style={{ color: course.color }}>{course.icon}</span>
              </div>
              <div className="course-details">
                <div className="course-header">
                  <h3>{course.name}</h3>
                  <span className="course-progress-percent">{course.progress}%</span>
                </div>
                <div className="course-progress-bar">
                  <div className="course-progress-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
                </div>
                <div className="course-stats">
                  <span>{course.completed}/{course.lessons} lessons</span>
                  {course.progress > 0 && <FaStar className="star-icon" style={{ color: course.color }} />}
                </div>
              </div>
              <div className="course-arrow">
                <FaArrowRight />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <div className="footer-content">
          <p>© 2024 CodeVibe - Learn. Practice. Master.</p>
          <div className="social-links">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
          padding: 30px 50px;
          position: relative;
          overflow-x: hidden;
        }

        .bg-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: linear-gradient(135deg, #1e1e3f, #16162e);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.3s ease;
        }

        .modal-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .modal-content h3 {
          color: white;
          margin-bottom: 10px;
          font-size: 1.5rem;
        }

        .modal-content p {
          color: #a0a0a0;
          margin-bottom: 30px;
        }

        .modal-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .modal-cancel, .modal-confirm {
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .modal-cancel {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .modal-cancel:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-confirm {
          background: #ff4d4d;
          color: white;
        }

        .modal-confirm:hover {
          background: #ff3333;
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Login Prompt */
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-prompt {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          padding: 50px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 450px;
          animation: fadeInUp 0.6s ease;
        }

        .prompt-icon {
          font-size: 5rem;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .login-prompt h2 {
          color: white;
          margin-bottom: 15px;
          font-size: 2rem;
        }

        .login-prompt p {
          color: #a0a0a0;
          margin-bottom: 35px;
        }

        .prompt-buttons {
          display: flex;
          gap: 15px;
          flex-direction: column;
        }

        .btn-login, .btn-signup {
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-login {
          background: linear-gradient(135deg, #ff4d4d, #ff8c4d);
          color: white;
        }

        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 77, 77, 0.4);
        }

        .btn-signup {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-signup:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Dashboard Header - Centered */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
          position: relative;
          z-index: 1;
          background: rgba(0, 0, 0, 0.3);
          padding: 20px 25px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .header-left {
          flex: 1;
        }

        .greeting-badge {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .greeting-time {
          background: rgba(255, 77, 77, 0.2);
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 1rem;
          color: #ff4d4d;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .current-time {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 1rem;
          color: #ffffff;
          font-weight: 500;
        }

        .greeting-text h1 {
          font-size: 2.8rem;
          color: white;
          margin: 0 0 10px 0;
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .wave-emoji {
          display: inline-block;
          animation: wave 1s infinite;
          font-size: 2.5rem;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        .motivation-text {
          color: #c0c0c0;
          margin: 8px 0 0;
          font-size: 1.1rem;
          font-weight: 400;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .streak-card {
          background: linear-gradient(135deg, rgba(255, 77, 77, 0.2), rgba(255, 140, 77, 0.15));
          border-radius: 16px;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 77, 77, 0.3);
        }

        .streak-icon {
          font-size: 2rem;
          color: #ff8c4d;
        }

        .streak-info {
          display: flex;
          flex-direction: column;
        }

        .streak-days {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
          line-height: 1;
        }

        .streak-label {
          font-size: 0.8rem;
          color: #c0c0c0;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(255, 77, 77, 0.15);
          border: 1px solid rgba(255, 77, 77, 0.3);
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .logout-btn:hover {
          background: rgba(255, 77, 77, 0.3);
          border-color: #ff4d4d;
          transform: translateY(-2px);
        }

        /* Stats Row - Centered */
        .stats-row {
          display: flex;
          gap: 25px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stat-card-horizontal {
          flex: 0 1 280px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card-horizontal:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 77, 77, 0.3);
        }

        .stat-icon-circle {
          width: 55px;
          height: 55px;
          background: rgba(255, 77, 77, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          color: #ff4d4d;
        }

        .stat-info-horizontal {
          flex: 1;
        }

        .stat-info-horizontal h3 {
          color: #c0c0c0;
          font-size: 0.8rem;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .stat-value .number {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        .stat-value .total {
          font-size: 1rem;
          color: #c0c0c0;
        }

        .stat-value-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-value-progress .percentage {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        .progress-bar-small {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 6px;
          width: 100%;
          overflow: hidden;
        }

        .progress-fill-small {
          background: linear-gradient(90deg, #ff4d4d, #ff8c4d);
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        /* Quick Actions */
        .quick-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          justify-content: center;
        }

        .action-btn {
          background: linear-gradient(135deg, rgba(255, 77, 77, 0.15), rgba(255, 140, 77, 0.1));
          border: 1px solid rgba(255, 77, 77, 0.2);
          border-radius: 12px;
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .action-btn:hover {
          background: rgba(255, 77, 77, 0.25);
          transform: translateY(-2px);
          border-color: #ff4d4d;
        }

        /* User Info Card - Centered & Vertical Layout */
        .user-info-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 25px 30px;
          margin-bottom: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 15px;
        }

        .card-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-header-left h2 {
          color: white;
          margin: 0;
          font-size: 1.3rem;
        }

        .card-icon {
          font-size: 1.8rem;
          color: #ff4d4d;
        }

        .edit-profile {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 20px;
          border-radius: 8px;
          color: #c0c0c0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .edit-profile:hover {
          background: rgba(255, 77, 77, 0.1);
          color: #ff4d4d;
          border-color: #ff4d4d;
        }

        .info-vertical {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item-vertical {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .info-item-vertical:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateX(5px);
        }

        .info-icon {
          font-size: 1.3rem;
          color: #ff4d4d;
          width: 40px;
          text-align: center;
        }

        .info-content {
          flex: 1;
        }

        .info-content label {
          font-size: 0.7rem;
          color: #c0c0c0;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 4px;
        }

        .info-content p {
          color: white;
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
        }

        /* Courses Section */
        .courses-section {
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 77, 77, 0.15);
          padding: 8px 20px;
          border-radius: 25px;
          color: #ff4d4d;
          font-size: 0.9rem;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .section-header h2 {
          color: white;
          font-size: 2.2rem;
          margin: 0 0 10px;
        }

        .section-header p {
          color: #c0c0c0;
          margin: 0;
          font-size: 1rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 25px;
        }

        .course-card-btn {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .course-card-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transition: left 0.5s ease;
        }

        .course-card-btn:hover::before {
          left: 100%;
        }

        .course-icon {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .course-card-btn:hover .course-icon {
          transform: scale(1.05);
        }

        .course-details {
          flex: 1;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }

        .course-header h3 {
          color: white;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .course-progress-percent {
          font-size: 0.9rem;
          font-weight: bold;
          color: #ff4d4d;
        }

        .course-progress-bar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          height: 8px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .course-progress-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #c0c0c0;
        }

        .star-icon {
          font-size: 0.85rem;
        }

        .course-arrow {
          color: #c0c0c0;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(-10px);
          font-size: 1.2rem;
        }

        .course-card-btn:hover .course-arrow {
          opacity: 1;
          transform: translateX(0);
          color: #ff4d4d;
        }

        /* Footer */
        .dashboard-footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 1;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-content p {
          color: #c0c0c0;
          font-size: 0.9rem;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-links a {
          color: #c0c0c0;
          font-size: 1.3rem;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          color: #ff4d4d;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .stats-row {
            flex-direction: column;
            align-items: center;
          }
          
          .stat-card-horizontal {
            width: 100%;
            max-width: 300px;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .user-info-card {
            max-width: 90%;
            padding: 20px;
          }

          .dashboard-header {
            max-width: 95%;
            padding: 15px 20px;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 20px;
          }

          .greeting-text h1 {
            font-size: 2rem;
          }

          .motivation-text {
            font-size: 0.95rem;
          }

          .dashboard-header {
            padding: 15px;
          }

          .greeting-time, .current-time {
            font-size: 0.85rem;
            padding: 6px 15px;
          }

          .streak-card {
            padding: 8px 16px;
          }

          .streak-days {
            font-size: 1.3rem;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .quick-actions {
            flex-direction: column;
            align-items: center;
          }

          .action-btn {
            justify-content: center;
            width: 100%;
            max-width: 220px;
          }

          .info-item-vertical {
            padding: 10px 12px;
          }
          
          .info-icon {
            font-size: 1.1rem;
            width: 35px;
          }
          
          .info-content p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;