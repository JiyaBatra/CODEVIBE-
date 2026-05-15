import React from 'react';
import { Link } from 'react-router-dom';

// Images import (renamed to avoid spaces and ensure consistency)
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
  return (
    <div> 
      <h2>Available Courses</h2>
      <div className='course-name'>

        <div className="course-box">
          <img src={htmlLogo} alt="HTML Logo" height="300px" width="200px" />
          <h3>HTML Basics</h3>
          <p>Start your web development journey with HTML.</p>
          <Link to="/HtmlLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={cssLogo} alt="CSS Logo" height="300px" width="200px" />
          <h3>CSS for Beginner</h3>
          <p>Learn how to style beautiful websites.</p>
          <Link to="/CssLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={jsLogo} alt="JavaScript Logo" height="300px" width="200px"/>
          <h3>JS for Beginner</h3>
          <p>Learn how to give functionality to websites.</p>
          <Link to="/JsLesson">Start Lesson</Link>
        </div>

         {/* <div className="course-box">
          <img src={cLogo} alt="C Logo" height="300px" width="200px" />
          <h3>C Language for You!</h3>
          <p>Master the fundamentals of C — the base of all programming.</p>
          <Link to="/CLesson">Start Lesson</Link>
        </div>  */}

        <div className="course-box">
          <img src={OOPLogo} alt="OOP Logo" height="300px" width="200px" />
          <h3>OOP Concepts</h3>
          <p>“Think in objects, not just code.” Learn how real-world programming works.</p>
          <Link to="/OOPLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={dsaLogo} alt="DSA Logo" height="300px" width="200px" />
          <h3>Data Structures & Algorithms</h3>
          <p>“Code faster, run smarter.” Build the backbone of efficient programming.</p>
          <Link to="/DsaLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={nodeLogo} alt="Node.js Logo" height="300px" width="200px" />
          <h3>Node.js</h3>
          <p>“JavaScript, but on steroids.” Learn backend development with ease.</p>
          <Link to="/NodeLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={reactLogo} alt="React Logo" height="300px" width="200px" />
          <h3>React.js</h3>
          <p>“Build once, render everywhere.” Master the king of frontend frameworks.</p>
          <Link to="/ReactLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={expressLogo} alt="Express Logo" height="300px" width="200px" />
          <h3>Express.js</h3>
          <p>“Backend, but lightning fast.” Simplify server-side development.</p>
          <Link to="/ExpressLesson">Start Lesson</Link>
        </div>

        <div className="course-box">
          <img src={mongoLogo} alt="MongoDB Logo" height="300px" width="200px" />
          <h3>MongoDB</h3>
          <p>“Store data like a pro.” Learn the NoSQL database of the modern web.</p>
          <Link to="/MongoLesson">Start Lesson</Link>
        </div>

      </div>
    </div>
  )
}

export default Courses;
