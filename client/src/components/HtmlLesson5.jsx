import React, { useState } from "react";
import Compiler from "./Compiler";
import { useNavigate, Link } from "react-router-dom";

const HtmlLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate("/html/lesson6");
  };

  const expectedOutput = `<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="My Art" width="200">

<a href="https://www.instagram.com/jiya_the_coolartist/" target="_blank">Visit My Instagram</a>

<video width="320" height="240" controls="">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

<iframe width="695" height="391" src="https://www.youtube.com/embed/2ml3qRpp1Ws" title="MERN Stack Overview for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;

  return (
    <div className="lesson-content" style={{padding: "20px"}}>
      <h1 className="lesson-title">
        Lesson 5: HTML Media Tags
      </h1>

      {/*SECTION 1*/}
      <section className="lesson-section">
        <p className="lesson-text">
          Media tags in HTML are used to add sound, video, and images to your webpage.
        </p>

        <p className="lesson-text">
          They help make your website more interactive and engaging.
        </p>
      </section>

      {/*SECTION 2 */}
      <section className="lesson-section">
        <h2 className="section-title">
          Common Media Tags
        </h2>

        <ul className="lesson-list">
          <li><code>&lt;img&gt;</code> — Display images.</li>
          <li><code>&lt;audio&gt;</code> — Play audio files.</li>
          <li><code>&lt;video&gt;</code> — Play video files.</li>
          <li><code>&lt;iframe&gt;</code> — Embed web pages like YouTube or Maps.</li>
          <li><code>&lt;source&gt;</code> — Define multiple media formats.</li>
          <li><code>&lt;track&gt;</code> — Add subtitles or captions.</li>
          <li><code>&lt;embed&gt;</code> — Embed external multimedia (PDF, Flash).</li>
          <li><code>&lt;object&gt;</code> — Embed other documents like PDFs.</li>
          <li><code>&lt;picture&gt;</code> — Load responsive images.</li>          
        </ul>
      </section>

      {/*SECTION 3 */}
      <section className="lesson-section">
        <h2 className="section-title">
          Example Code
        </h2>

        <pre className="code-block">{`<img src="your-image-url.jpg" alt="Sample Image" width="200" />

<audio controls>
  <source src="your-audio.mp3" type="audio/mpeg" />
</audio>

<video width="320" height="240" controls>
  <source src="your-video.mp4" type="video/mp4" />
</video>`}
        </pre>
      </section>

      {/*SECTION 4*/}
      <section className="lesson-section">
        <h2 className="section-title">
          Try Yourself, Follow Instructions!
        </h2>

        <ul className="lesson-list">
          <li><strong>Image:</strong> https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg</li>
          <li><strong>Instagram:</strong> https://www.instagram.com/jiya_the_coolartist/</li>
          <li><strong>Video:</strong> https://www.w3schools.com/html/mov_bbb.mp4</li>
          <li><strong>YouTube Embed:</strong> Below iframe</li>          
        </ul>

        <iframe
          width="695"
          height="391"
          src="https://www.youtube.com/embed/2ml3qRpp1Ws"
          title="MERN Stack Overview for Beginners"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <h2 className="section-title">
          Expected Output:
        </h2>      

        <pre className="code-block">
          {expectedOutput}
        </pre>

        <Compiler
        hint="💡 Review the lesson instructions carefully. Make sure your output matches exactly."
  LessonId="html-lesson5"
  expectedOutput={`<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="My Art" width="200">

<a href="https://www.instagram.com/jiya_the_coolartist/" target="_blank">Visit My Instagram</a>

<video width="320" height="240" controls="">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

<iframe width="695" height="391" src="https://www.youtube.com/embed/2ml3qRpp1Ws" title="MERN Stack Overview for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`}
  initialCode={`<h1>HELLO, From Code Vibe</h1>`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link to="/HtmlLesson6">⏭ NEXT LESSON</Link>
      )}  
      </section>
       {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/HtmlLesson4')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  <button
    onClick={() => navigate('/HtmlLesson6')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button>
</div>
    </div>
  );
};

export default HtmlLesson5;
