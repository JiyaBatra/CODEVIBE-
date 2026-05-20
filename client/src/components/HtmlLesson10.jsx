import React, { useState } from "react";
import Compiler from "./Compiler";
import { useNavigate, Link } from "react-router-dom";
const HtmlLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSuccess = () => {
    setIsCorrect(true);

    // Store student details for certificate
    const studentData = {
      name: "jia", // Yahan real login system se name lo
      email: "jia@gmail.com", // Login se email
      course: "HTML Beginner Course"
    };
    localStorage.setItem("certificateData", JSON.stringify(studentData));
  };

  return (
    <div className="lesson">
      <h1>Lesson 10: Simple Frontend Page</h1>
      <p>
        Build a simple webpage with header, main section, and footer. Write your
        code exactly like in expected output inside the &lt;pre&gt; tag.
      </p>

      <pre>{`<header>
  <h1>My Simple Site</h1>
  <nav>
    <a href="home.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>

<main>
  <h2>Welcome to My Simple Site</h2>
  <p>This is a cool place to learn frontend development.</p>
</main>

<footer>
  <p>© 2025 My Simple Site. All rights reserved.</p>
</footer>`}</pre>

<Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly." 
  LessonId="html-lesson10"
  expectedOutput={`<header> 
<h1>My Simple Site</h1> 
<nav> 
<a href="home.html">Home</a> 
<a href="about.html">About</a> 
<a href="contact.html">Contact</a> 
</nav> 
</header> 
<main> 
<h2>Welcome to My Simple Site</h2> 
<p>This is a cool place to learn frontend development.</p> 
</main> 
<footer> 
<p>© 2025 My Simple Site. All rights reserved.</p> 
</footer>`}
  initialCode={`<header>
  <h1>My Simple Site</h1>
  <nav>
    <a href="home.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>`}
  onSuccess={handleSuccess}
/>
     

      {isCorrect && (
        <div style={{ marginTop: 20 }}>
          <Link
            to="/Certificate"
            style={{ fontWeight: "bold", fontSize: 20, color: "green" }}
          >
            🎉 Congrats! Get Your Certificate Here
          </Link>
        </div>
      )}
    </div>
  );
};

export default HtmlLesson10;
