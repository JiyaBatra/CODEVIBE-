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
    <div className="lesson">
      <h1>Lesson 5: HTML Media Tags</h1>
      <p>
        🔸 Media tags in HTML are used to add sound, video, and images to your webpage.
        They help make your website more interactive and engaging.
      </p>

      <h3>🔹 Common Media Tags</h3>
      <ul>
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
        <br/>
    <hr/>

      <h3>🔹 Example Code</h3>
      <pre>{`<img src="your-image-url.jpg" alt="Sample Image" width="200" />

<audio controls>
  <source src="your-audio.mp3" type="audio/mpeg" />
</audio>

<video width="320" height="240" controls>
  <source src="your-video.mp4" type="video/mp4" />
</video>`}
      </pre>
              <br/>
    <hr/>


      <h2>Try the Code Below</h2>
      <ul>
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
      <br/>
      <br/>
    <hr/>


      <h3>Expected Output:</h3>
      <pre>{expectedOutput}</pre>

      <Compiler
  LessonId="html-lesson5"
  expectedOutput={(output) => {
    const normalize = (s) => s.replace(/\s+/g, " ").trim();
    const expected = `<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="My Art" width="200">

<a href="https://www.instagram.com/jiya_the_coolartist/" target="_blank">Visit My Instagram</a>

<video width="320" height="240" controls="">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

<iframe width="695" height="391" src="https://www.youtube.com/embed/2ml3qRpp1Ws" title="MERN Stack Overview for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;
    return normalize(output) === normalize(expected);
  }}
  initialCode={`<h1>HELLO, From Code Vibe</h1>`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link to="/HtmlLesson6">⏭ NEXT LESSON</Link>
      )}
    </div>
  );
};

export default HtmlLesson5;
