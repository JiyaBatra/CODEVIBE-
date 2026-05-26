import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoadmapGenerator from "./RoadmapGenerator";
import FAQ from "./FAQ";
import Testimonials from "./testimonials";
import EmptyState from "./EmptyState";
import { FaBookOpen } from "react-icons/fa";

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

const Courses = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const courses = [
    {
      title: 'HTML Basics',
      desc: 'Start your web development journey with HTML.',
      img: htmlLogo,
      link: '/HtmlLesson',
      level: 'Beginner',
      duration: '15 lessons',
      category: 'Frontend',
    },
    {
      title: 'CSS for Beginners',
      desc: 'Learn how to style beautiful websites.',
      img: cssLogo,
      link: '/CssLesson',
      level: 'Beginner',
      duration: '14 lessons',
      category: 'Frontend',
    },
    {
      title: 'JS for Beginners',
      desc: 'Learn how to give functionality to websites.',
      img: jsLogo,
      link: '/JsLesson',
      level: 'Intermediate',
      duration: '29 lessons',
      category: 'Frontend',
    },
    {
      title: 'C Language for You!',
      desc: 'Master the fundamentals of C programming.',
      img: cLogo,
      link: '/CLesson',
      level: 'Beginner',
      duration: '17 lessons',
      category: 'Programming',
    },
    {
      title: 'OOP Concepts',
      desc: 'Learn object-oriented programming concepts.',
      img: OOPLogo,
      link: '/OopLesson',
      level: 'Intermediate',
      duration: '14 lessons',
      category: 'Programming',
    },
    {
      title: 'Data Structures & Algorithms',
      desc: 'Build strong problem-solving skills.',
      img: dsaLogo,
      link: '/DsaLesson',
      level: 'Advanced',
      duration: '12 lessons',
      category: 'Programming',
    },
    {
      title: 'Node.js',
      desc: 'Learn backend development with Node.js.',
      img: nodeLogo,
      link: '/NodeLesson',
      level: 'Intermediate',
      duration: '12 lessons',
      category: 'Backend',
    },
    {
      title: 'React.js',
      desc: 'Build modern frontend applications.',
      img: reactLogo,
      link: '/ReactLesson',
      level: 'Intermediate',
      duration: '13 lessons',
      category: 'Frontend',
    },
    {
      title: 'Express.js',
      desc: 'Fast and minimal backend framework.',
      img: expressLogo,
      link: '/ExpressLesson',
      level: 'Intermediate',
      duration: '10 lessons',
      category: 'Backend',
    },
    {
      title: 'MongoDB',
      desc: 'Learn modern NoSQL database concepts.',
      img: mongoLogo,
      link: '/MongoLesson',
      level: 'Beginner',
      duration: '8 lessons',
      category: 'Database',
    },
  ];

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get level badge color
  const getLevelBadge = (level) => {
    switch(level) {
      case 'Beginner':
        return { bg: '#2e7d32', text: '#fff' };
      case 'Intermediate':
        return { bg: '#ed6c02', text: '#fff' };
      case 'Advanced':
        return { bg: '#d32f2f', text: '#fff' };
      default:
        return { bg: '#1976d2', text: '#fff' };
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
      {/* Welcome Banner */}
      {user && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '16px',
            padding: '20px 32px',
            marginTop: '20px',
            marginBottom: '32px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2
            style={{
              color: 'white',
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: '500',
            }}
          >
            Welcome back, {user.username || user.name || 'User'}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px', marginBottom: 0 }}>
            Continue your learning journey. Choose a course below.
          </p>
        </div>
      )}

      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          marginTop: user ? '0' : '32px',
        }}
      >
        <h2
          style={{
            color: 'white',
            fontSize: '2rem',
            margin: 0,
            fontWeight: '600',
          }}
        >
          📚 Available Courses
        </h2>
      </div>

      {/* Category Filter Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '32px',
          justifyContent: 'center',
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 20px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: selectedCategory === category ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
              color: 'white',
              border: selectedCategory === category ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div
          className="course-name"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
            marginTop: '20px',
            marginBottom: '60px',
          }}
        >
          {filteredCourses.map((course, index) => (
            <Link
              to={course.link}
              className="course-box"
              key={index}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                padding: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Level Badge - Moved to top-right corner of card, away from logo */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    background: getLevelBadge(course.level).bg,
                    color: getLevelBadge(course.level).text,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {course.level}
                </span>
              </div>

              {/* Image - Now without overlapping badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                  marginTop: '8px',
                }}
              >
               <img
  src={course.img}
  alt={course.title}
  loading="lazy"
  className="course-img"
  style={{
    width: "100%",
    maxWidth: "80px",
    height: "80px",
    objectFit: "contain",
  }}
/>
              </div>

              {/* Title */}
              <h3
                style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  margin: '0 0 8px 0',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {course.title}
              </h3>

              {/* Category Chip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                    padding: '2px 10px',
                    borderRadius: '15px',
                    fontSize: '0.7rem',
                  }}
                >
                  {course.category}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                  📖 {course.duration}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  margin: '0 0 20px 0',
                  flex: 1,
                }}
              >
                {course.desc}
              </p>

              {/* Start Button */}
              <span
                className="start-btn"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.15)',
                  marginTop: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
              >
                Start Lesson →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
  icon={<FaBookOpen />}
  title="No Courses Found"
  description="We couldn't find any courses matching your selected category or search query. Try exploring other categories to continue learning."
  buttonText="Show All Courses"
  onButtonClick={() => {
    setSelectedCategory("All");
    setSearch("");
  }}
/>
      )}
      <RoadmapGenerator />
      <Testimonials />
      <FAQ />
    </div>
    
  );
};

export default Courses;