import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    },
    {
      title: 'CSS for Beginners',
      desc: 'Learn how to style beautiful websites.',
      img: cssLogo,
      link: '/CssLesson',
    },
    {
      title: 'JS for Beginners',
      desc: 'Learn how to give functionality to websites.',
      img: jsLogo,
      link: '/JsLesson',
    },
    {
      title: 'C Language for You!',
      desc: 'Master the fundamentals of C programming.',
      img: cLogo,
      link: '/CLesson',
    },
    {
      title: 'OOP Concepts',
      desc: 'Learn object-oriented programming concepts.',
      img: OOPLogo,
      link: '/OopLesson',
    },
    {
      title: 'Data Structures & Algorithms',
      desc: 'Build strong problem-solving skills.',
      img: dsaLogo,
      link: '/DsaLesson',
    },
    {
      title: 'Node.js',
      desc: 'Learn backend development with Node.js.',
      img: nodeLogo,
      link: '/NodeLesson',
    },
    {
      title: 'React.js',
      desc: 'Build modern frontend applications.',
      img: reactLogo,
      link: '/ReactLesson',
    },
    {
      title: 'Express.js',
      desc: 'Fast and minimal backend framework.',
      img: expressLogo,
      link: '/ExpressLesson',
    },
    {
      title: 'MongoDB',
      desc: 'Learn modern NoSQL database concepts.',
      img: mongoLogo,
      link: '/MongoLesson',
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="course-name">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Link
              to={course.link}
              className="course-box"
              key={index}
            >
              <img
                src={course.img}
                alt={course.title}
                className="course-img"
              />

              <h3>{course.title}</h3>

              <p>{course.desc}</p>

              <span className="start-btn">
                Start Lesson
              </span>
            </Link>
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