import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import RoadmapGenerator from "./RoadmapGenerator";
import ProjectGenerator from "./ProjectGenerator";
import ProjectSuggestions from "./ProjectSuggestions";
import FAQ from "./FAQ";
import Testimonials from "./testimonials";
import EmptyState from "./EmptyState";
import { FaBookOpen, FaHeart, FaSearch } from "react-icons/fa";
import { useDebounce } from '../hooks/useDebounce';
import { useSearch } from '../context/SearchContext.jsx';

// Images
import htmlLogo from '../assets/htmlLogo.png';
import cssLogo from '../assets/cssLogo.png';
import jsLogo from '../assets/jsLogo.png';
import cLogo from '../assets/cLogo.png';
import OOPLogo from '../assets/OOPLogo.png';
import dsaLogo from '../assets/dsaLogo.png';
import nodeLogo from '../assets/nodeLogo.png';
import reactLogo from '../assets/reactLogo.png';
import expressLogo from '../assets/expressLogo.png';
import mongoLogo from '../assets/mongoLogo.png';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Courses = () => {
  const { query, setQuery } = useSearch();
  const debouncedQuery = useDebounce(query, 350);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressData, setProgressData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      const token = localStorage.getItem('authToken');
      if (parsedUser.email && token) {
        axios.get(`${API_BASE_URL}/api/progress/${parsedUser.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            setCompletedLessons(res.data.completedLessons || []);
            setProgressData(res.data);
          })
          .catch(err => console.error(err));
      }
    }
    const savedWishlist = localStorage.getItem('codevibe_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (location.state?.scrollToFaq) {
      const element = document.querySelector('.faq-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (location.state?.scrollToRoadmap) {
      const element = document.getElementById('roadmap-generator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (location.state?.scrollToProjectGenerator) {
      const element = document.getElementById('project-generator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (location.state?.scrollToProjectSuggestions) {
      const element = document.getElementById('project-suggestions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (location.state?.scrollToCourses) {
      const element = document.getElementById('courses') || document.getElementById('courses-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (location.state?.scrollToContact) {
      const element = document.getElementById('contact-footer');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (
      location.state?.scrollToTop ||
      location.state?.scrollToFaq ||
      location.state?.scrollToRoadmap ||
      location.state?.scrollToProjectGenerator ||
      location.state?.scrollToProjectSuggestions ||
      location.state?.scrollToContact
    ) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleWishlist = (e, courseTitle) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimatingId(courseTitle);
    setTimeout(() => setAnimatingId(null), 400);
    setWishlist(prev => {
      const updated = prev.includes(courseTitle)
        ? prev.filter(t => t !== courseTitle)
        : [...prev, courseTitle];
      localStorage.setItem('codevibe_wishlist', JSON.stringify(updated));
      if (updated.length === 0) setShowWishlistOnly(false);
      return updated;
    });
  };

  const courses = [
    { title: 'HTML Basics', prefix: 'html', total: 15, desc: 'Start your web development journey with HTML.', img: htmlLogo, link: '/HtmlLesson', level: 'Beginner', duration: '15 lessons', time: '2h 30m', category: 'Frontend' },
    { title: 'CSS for Beginners', prefix: 'css', total: 14, desc: 'Learn how to style beautiful websites.', img: cssLogo, link: '/CssLesson', level: 'Beginner', duration: '14 lessons', time: '3h', category: 'Frontend' },
    { title: 'JS for Beginners', prefix: 'js', total: 29, desc: 'Learn how to give functionality to websites.', img: jsLogo, link: '/JsLesson', level: 'Intermediate', duration: '29 lessons', time: '6h 30m', category: 'Frontend' },
    { title: 'C Language for You!', prefix: 'c', total: 17, desc: 'Master the fundamentals of C programming.', img: cLogo, link: '/CLesson', level: 'Beginner', duration: '17 lessons', time: '4h', category: 'Programming' },
    { title: 'OOP Concepts', prefix: 'oop', total: 14, desc: 'Learn object-oriented programming concepts.', img: OOPLogo, link: '/OopLesson', level: 'Intermediate', duration: '14 lessons', time: '3h 30m' , category: 'Programming' },
    { title: 'Data Structures & Algorithms', prefix: 'dsa', total: 13, desc: 'Build strong problem-solving skills.', img: dsaLogo, link: '/DsaLesson', level: 'Advanced', duration: '12 lessons', time: '8h', category: 'Programming' },
    { title: 'Node.js', prefix: 'node', total: 12, desc: 'Learn backend development with Node.js.', img: nodeLogo, link: '/NodeLesson', level: 'Intermediate', duration: '12 lessons', time: '3h' , category: 'Backend' },
    { title: 'React.js', prefix: 'react', total: 13, desc: 'Build modern frontend applications.', img: reactLogo, link: '/ReactLesson', level: 'Intermediate', duration: '13 lessons', time: '5h' , category: 'Frontend' },
    { title: 'Express.js', prefix: 'express', total: 10, desc: 'Fast and minimal backend framework.', img: expressLogo, link: '/ExpressLesson', level: 'Intermediate', duration: '10 lessons', time: '2h 30m' , category: 'Backend' },
    { title: 'MongoDB', prefix: 'mongo', total: 8, desc: 'Learn modern NoSQL database concepts.', img: mongoLogo, link: '/MongoLesson', level: 'Beginner', duration: '8 lessons', time: '2h' , category: 'Database' },
  ];

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesWishlist = !showWishlistOnly || wishlist.includes(course.title);
    return matchesSearch && matchesCategory && matchesWishlist;
  });

  const getLevelBadge = (level) => {
    switch(level) {
      case 'Beginner': return { bg: '#2e7d32', text: '#fff' };
      case 'Intermediate': return { bg: '#ed6c02', text: '#fff' };
      case 'Advanced': return { bg: '#d32f2f', text: '#fff' };
      default: return { bg: '#1976d2', text: '#fff' };
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }} id='courses'>

      <style>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        .filter-btn {
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .filter-btn.active {
          background: rgba(255, 75, 110, 0.2);
          color: #ff4b6e;
          border: 1px solid rgba(255, 75, 110, 0.5);
          box-shadow: 0 0 12px rgba(255, 75, 110, 0.3);
        }
        .filter-btn.active:hover {
          background: rgba(255, 75, 110, 0.3);
          border-color: rgba(255, 75, 110, 0.7);
        }
      `}</style>

      {user && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '16px',
          padding: '20px 32px',
          marginTop: '20px',
          marginBottom: '32px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: '500' }}>
            Welcome back, {user.username || user.name || 'User'}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px', marginBottom: 0 }}>
            Continue your learning journey. Choose a course below.
          </p>
        </div>
      )}

      {/* Gamification Hook Banner */}
      {user && progressData && (() => {
        const currentXp = progressData.xp || 0;
        const currentLevel = progressData.level || 1;
        const xpAway = 100 - (currentXp % 100);
        const nextLevel = currentLevel + 1;
        const progressPercent = currentXp % 100;

        return (
          <div style={{
            background: 'linear-gradient(90deg, rgba(255, 77, 109, 0.15), rgba(255, 140, 77, 0.15))',
            borderRadius: '16px',
            padding: '24px 32px',
            marginBottom: '32px',
            border: '1px solid rgba(255, 77, 109, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 8px 32px rgba(255, 77, 109, 0.1)',
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))' }}>🏆</span> 
                Level {currentLevel} Developer
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                You currently have <strong style={{ color: '#ff4d4d' }}>{currentXp} XP</strong>. 
                You are only <strong style={{ color: '#ff8c4d' }}>{xpAway} XP</strong> away from reaching Level {nextLevel}! Complete a lesson to level up!
              </p>
            </div>
            
            <div style={{ flex: '1', minWidth: '250px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginBottom: '8px', fontWeight: '500' }}>
                <span>Level {currentLevel}</span>
                <span>Level {nextLevel}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', height: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{
                  background: 'linear-gradient(90deg, #ff4b6e, #ff8c4d)',
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: '6px',
                  transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 10px rgba(255,77,109,0.5)'
                }}></div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '6px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                {progressPercent} / 100 XP to next level
              </div>
            </div>
          </div>
        );
      })()}

      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px',
        marginTop: user ? '0' : '32px',
      }}>
        <h2 style={{ color: 'white', fontSize: '2rem', margin: 0, fontWeight: '600' }}>
          📚 Available Courses
        </h2>

        {wishlist.length > 0 && (
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: showWishlistOnly ? 'rgba(255,75,110,0.2)' : 'rgba(255,75,110,0.1)',
              border: '1px solid rgba(255,75,110,0.3)',
              borderRadius: '30px',
              padding: '8px 18px',
              color: '#ff4b6e',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <FaHeart size={14} color="#ff4b6e" />
            {showWishlistOnly ? 'Show All' : `Wishlist (${wishlist.length})`}
          </button>
        )}
      </div>

      {/* Category Filter Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '32px',
        justifyContent: 'center',
      }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="course-name" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
          marginTop: '20px',
          marginBottom: '60px',
        }}>
          {filteredCourses.map((course, index) => {
            const completedCount = completedLessons.filter(id => id && id.startsWith(course.prefix)).length;
            const progressPercent = Math.min(100, Math.round((completedCount / course.total) * 100));
            return (
            <Link
              to={course.link}
              className="course-box"
              key={index}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/login', { state: { from: { pathname: course.link } } });
                }
              }}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                padding: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: wishlist.includes(course.title) ? '1px solid rgba(255,75,110,0.4)' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = wishlist.includes(course.title) ? 'rgba(255,75,110,0.6)' : 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = wishlist.includes(course.title) ? 'rgba(255,75,110,0.4)' : 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Level Badge */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1 }}>
                <span style={{
                  background: getLevelBadge(course.level).bg,
                  color: getLevelBadge(course.level).text,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {course.level}
                </span>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => toggleWishlist(e, course.title)}
                title={wishlist.includes(course.title) ? "Remove from wishlist" : "Add to wishlist"}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '16px',
                  zIndex: 2,
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  cursor: 'pointer',
                  animation: animatingId === course.title ? 'heartPop 0.4s ease' : 'none',
                  filter: wishlist.includes(course.title) ? 'drop-shadow(0 2px 6px rgba(255,75,110,0.6))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="24" height="32" viewBox="0 0 24 32"
                  fill={wishlist.includes(course.title) ? "#ff4b6e" : "rgba(255,255,255,0.15)"}
                  stroke={wishlist.includes(course.title) ? "#ff4b6e" : "rgba(255,255,255,0.4)"}
                  strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 H22 V30 L12 22 L2 30 Z" />
                </svg>
              </button>

              {/* Image */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginTop: '8px' }}>
                <img src={course.img} alt={course.title} loading="lazy" className="course-img"
                  style={{ width: "100%", maxWidth: "80px", height: "80px", objectFit: "contain" }} />
              </div>

              <h3 style={{ color: 'white', fontSize: '1.4rem', margin: '0 0 8px 0', fontWeight: '600', textAlign: 'center' }}>
                {course.title}
              </h3>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '2px 10px', borderRadius: '15px', fontSize: '0.7rem' }}>
                  {course.category}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                  <span>📚 {course.duration}</span>
                  <span>⏱️ {course.time}</span>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center', margin: '0 0 20px 0', flex: 1 }}>
                {course.desc}
              </p>

              {completedCount > 0 && (
                <div style={{ marginBottom: '16px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                    <span>{completedCount}/{course.total} Lessons</span>
                    <span style={{ color: '#ff4d4d', fontWeight: 'bold' }}>{progressPercent}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(90deg, #ff4d4d, #ff8c4d)', width: `${progressPercent}%`, height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              )}

              <span className="start-btn" style={{
                display: 'inline-block', textAlign: 'center',
                background: progressPercent === 100 ? 'rgba(0, 184, 148, 0.2)' : 'rgba(255,255,255,0.1)', 
                color: progressPercent === 100 ? '#00b894' : 'white',
                padding: '10px 20px', borderRadius: '30px',
                fontSize: '0.9rem', fontWeight: '500',
                transition: 'all 0.3s ease',
                border: progressPercent === 100 ? '1px solid rgba(0, 184, 148, 0.4)' : '1px solid rgba(255,255,255,0.15)', marginTop: 'auto',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = progressPercent === 100 ? 'rgba(0, 184, 148, 0.3)' : 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = progressPercent === 100 ? 'rgba(0, 184, 148, 0.5)' : 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = progressPercent === 100 ? 'rgba(0, 184, 148, 0.2)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = progressPercent === 100 ? 'rgba(0, 184, 148, 0.4)' : 'rgba(255,255,255,0.15)'; }}
              >
                {progressPercent === 100 ? 'Review Course ✓' : (progressPercent > 0 ? 'Continue Lesson →' : 'Start Lesson →')}
              </span>
            </Link>
          )})}
        </div>
      ) : (
        <EmptyState
          icon={<FaBookOpen />}
          title={showWishlistOnly ? "No Wishlisted Courses" : "No Courses Found"}
          description={showWishlistOnly
            ? "You haven't bookmarked any courses yet. Click the bookmark icon on any course to save it!"
            : "We couldn't find any courses matching your selected category or search query."}
          buttonText="Show All Courses"
          onButtonClick={() => { setSelectedCategory("All"); setQuery(""); setShowWishlistOnly(false); }}
        />
      )}
      <RoadmapGenerator />
      <ProjectGenerator />
      <ProjectSuggestions />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Courses;