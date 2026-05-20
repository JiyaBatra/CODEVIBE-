import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Images import
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

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  const courseMetadata = {
    html: { totalLessons: 10, prefix: 'html-lesson' },
    css: { totalLessons: 14, prefix: 'css-lesson' },
    js: { totalLessons: 29, prefix: 'js-lesson-' },
    c: { totalLessons: 17, prefix: 'c-lesson-' },
    oop: { totalLessons: 14, prefix: 'oop-lesson-' },
    dsa: { totalLessons: 12, prefix: 'dsa-lesson-' },
    node: { totalLessons: 12, prefix: 'node-lesson-' },
    react: { totalLessons: 13, prefix: 'react-lesson-' },
    express: { totalLessons: 10, prefix: 'express-lesson-' },
    mongo: { totalLessons: 8, prefix: 'mongo-lesson-' },
  };

  const getCourseKey = (link) => {
    const normalized = link.replace(/\//g, '').toLowerCase();
    if (normalized.startsWith('html')) return 'html';
    if (normalized.startsWith('css')) return 'css';
    if (normalized.startsWith('js')) return 'js';
    if (normalized.startsWith('clesson') || normalized.startsWith('c')) return 'c';
    if (normalized.startsWith('oop')) return 'oop';
    if (normalized.startsWith('dsa')) return 'dsa';
    if (normalized.startsWith('node')) return 'node';
    if (normalized.startsWith('react')) return 'react';
    if (normalized.startsWith('express')) return 'express';
    if (normalized.startsWith('mongo')) return 'mongo';
    return null;
  };

  const getCourseProgress = (courseKey) => {
    const meta = courseMetadata[courseKey];
    if (!meta) return { completed: 0, total: 0, percent: 0 };

    const lessonIds = Array.from({ length: meta.totalLessons }, (_, index) =>
      `${meta.prefix}${index + 1}`
    );

    const completed = completedLessons.filter((lessonId) => lessonIds.includes(lessonId)).length;
    const percent = meta.totalLessons ? Math.round((completed / meta.totalLessons) * 100) : 0;

    return { completed, total: meta.totalLessons, percent };
  };

  const getProgressColor = (percent) => {
    if (percent === 100) return '#22c55e';
    if (percent >= 60) return '#38bdf8';
    if (percent > 0) return '#facc15';
    return '#9ca3af';
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
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
      title: "HTML Basics",
      desc: "Start your web development journey with HTML.",
      img: htmlLogo,
      link: "/HtmlLesson"
    },
    {
      title: "CSS for Beginner",
      desc: "Learn how to style beautiful websites.",
      img: cssLogo,
      link: "/CssLesson"
    },
    {
      title: "JS for Beginner",
      desc: "Learn how to give functionality to websites.",
      img: jsLogo,
      link: "/JsLesson"
    },
    {
      title: "C Language for You!",
      desc: "Master the fundamentals of C — the base of all programming.",
      img: cLogo,
      link: "/CLesson"
    },
    {
      title: "OOP Concepts",
      desc: "Think in objects, not just code. Learn how real-world programming works.",
      img: OOPLogo,
      link: "/OopLesson"
    },
    {
      title: "Data Structures & Algorithms",
      desc: "Code faster, run smarter. Build the backbone of efficient programming.",
      img: dsaLogo,
      link: "/DsaLesson"
    },
    {
      title: "Node.js",
      desc: "JavaScript, but on steroids. Learn backend development with ease.",
      img: nodeLogo,
      link: "/NodeLesson"
    },
    {
      title: "React.js",
      desc: "Build once, render everywhere. Master the king of frontend frameworks.",
      img: reactLogo,
      link: "/ReactLesson"
    },
    {
      title: "Express.js",
      desc: "Backend, but lightning fast. Simplify server-side development.",
      img: expressLogo,
      link: "/ExpressLesson"
    },
    {
      title: "MongoDB",
      desc: "Store data like a pro. Learn the NoSQL database of the modern web.",
      img: mongoLogo,
      link: "/MongoLesson"
    }
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {user && (
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          Welcome back, {user.username || user.name || "User"}!
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

      <div className='course-name'>

        {filteredCourses.length > 0 ? (

          filteredCourses.map((course, index) => {
            const courseKey = getCourseKey(course.link);
            const progress = getCourseProgress(courseKey);
            const progressColor = getProgressColor(progress.percent);

            return (
              <div className="course-box" key={index}>
                <div
                  className="progress-ring"
                  title={`${progress.completed} of ${progress.total} lessons completed`}
                  style={{
                    background: `conic-gradient(${progressColor} ${progress.percent * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                  }}
                >
                  <div className="progress-ring__inner">
                    <div>
                      <div className="progress-ring__label">{progress.percent}%</div>
                      <div className="progress-ring__subtext">
                        {progress.completed}/{progress.total}
                      </div>
                    </div>
                  </div>
                </div>

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
            );
          })

        ) : (

          <h3 style={{ color: "white", marginTop: "2rem" }}>
            No courses found.
          </h3>

        )}

      </div>

    </div>
  );
};

export default Courses;