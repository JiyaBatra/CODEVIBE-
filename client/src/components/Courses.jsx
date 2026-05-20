import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const fetchProgress = () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        return;
      }

      axios
        .get(`http://localhost:5002/api/progress/${email}`)
        .then((res) => {
          setCompletedLessons(res.data.completedLessons || []);
        })
        .catch((err) => {
          console.error('Failed to load course progress:', err);
        });
    };

    fetchProgress();

    const handleProgressUpdated = () => fetchProgress();
    window.addEventListener('codevibe-progress-updated', handleProgressUpdated);

    return () => {
      window.removeEventListener('codevibe-progress-updated', handleProgressUpdated);
    };
  }, []);

  const courses = [
    {
      title: 'HTML Basics',
      desc: 'Start your web development journey with HTML.',
      img: htmlLogo,
      link: '/HtmlLesson',
      category: 'Frontend',
    },
    {
      title: 'CSS for Beginners',
      desc: 'Learn how to style beautiful websites.',
      img: cssLogo,
      link: '/CssLesson',
      category: 'Frontend',
    },
    {
      title: 'JS for Beginners',
      desc: 'Learn how to give functionality to websites.',
      img: jsLogo,
      link: '/JsLesson',
      category: 'Frontend',
    },
    {
      title: 'C Language for You!',
      desc: 'Master the fundamentals of C programming.',
      img: cLogo,
      link: '/CLesson',
      category: 'Programming',
    },
    {
      title: 'OOP Concepts',
      desc: 'Learn object-oriented programming concepts.',
      img: OOPLogo,
      link: '/OopLesson',
      category: 'Programming',
    },
    {
      title: 'Data Structures & Algorithms',
      desc: 'Build strong problem-solving skills.',
      img: dsaLogo,
      link: '/DsaLesson',
      category: 'Programming',
    },
    {
      title: 'Node.js',
      desc: 'Learn backend development with Node.js.',
      img: nodeLogo,
      link: '/NodeLesson',
      category: 'Backend',
    },
    {
      title: 'React.js',
      desc: 'Build modern frontend applications.',
      img: reactLogo,
      link: '/ReactLesson',
      category: 'Frontend',
    },
    {
      title: 'Express.js',
      desc: 'Fast and minimal backend framework.',
      img: expressLogo,
      link: '/ExpressLesson',
      category: 'Backend',
    },
    {
      title: 'MongoDB',
      desc: 'Learn modern NoSQL database concepts.',
      img: mongoLogo,
      link: '/MongoLesson',
      category: 'Database',
    },
  ];

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {user && (
        <h2
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Welcome back, {user.username || user.name || 'User'}!
        </h2>
      )}

      <h2>Available Courses</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-filter-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="course-name">
        {filteredCourses.length > 0 ? (

          filteredCourses.map((course, index) => (

            <div className="course-box" key={index}>

              <img
                src={course.img}
                alt={course.title}
                height="300px"
                width="200px"
              />

                <h3>{course.title}</h3>

                <p>{course.desc}</p>

              <Link to={course.link}>Start Lesson</Link>

            </div>

          ))

        ) : (
          <h3 style={{ color: 'white' }}>
            No courses found.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Courses;