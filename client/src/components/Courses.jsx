import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      link: "/OOPLesson"
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

          <h3 style={{ color: "white", marginTop: "2rem" }}>
            No courses found.
          </h3>

        )}

      </div>

    </div>
  );
};

export default Courses;
