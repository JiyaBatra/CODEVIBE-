import React, { useState } from "react";
import Compiler from "./Compiler";
import { useNavigate, Link } from "react-router-dom";
const HtmlLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  

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

  // Social Share Handlers
  const shareOnTwitter = () => {
    const text = encodeURIComponent("🎯 Just completed the HTML Beginner Course on CodeVibe! 🌐🚀 Excited to start building amazing responsive webpages!");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
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
        <div style={{ marginTop: 20 }} className="success-action-container">
          <div>
            <Link
              to="/Certificate"
              style={{ fontWeight: "bold", fontSize: 20, color: "green", display: "block", marginBottom: "15px" }}
            >
              🎉 Congrats! Get Your Certificate Here
            </Link>
          </div>
          
          {/* Social Share Buttons Block */}
          <div className="share-buttons-block" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={shareOnTwitter} 
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1a91da"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1DA1F2"}
            >
              Share on Twitter 🐦
            </button>
            <button 
              onClick={shareOnLinkedIn} 
              style={{
                backgroundColor: "#0077B5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#00669b"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0077B5"}
            >
              Share on LinkedIn 💼
            </button>
          </div>
        </div>
      )}
   
<div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/HtmlLesson9')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>
</div>
    </div>
  );
};

export default HtmlLesson10;