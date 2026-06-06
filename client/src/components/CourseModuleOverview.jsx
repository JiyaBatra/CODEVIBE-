import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CourseSidebar from './CourseSidebar';
import API_BASE_URL from '../config/api';
import { FaCheckCircle, FaArrowRight, FaBookOpen, FaChartLine, FaLayerGroup } from 'react-icons/fa';

const featureIcons = {
  theory: <FaBookOpen />,
  practice: <FaLayerGroup />,
  quiz: <FaChartLine />,
  progress: <FaCheckCircle />,
};

const CourseModuleOverview = ({ moduleData }) => {
  const [completed, setCompleted] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then((res) => setCompleted(res.data.completedLessons || []))
      .catch(() => {});
  }, [moduleData.prefix]);

  const completedCount = moduleData.lessons.filter((lesson) => completed.includes(lesson.lessonId)).length;
  const progressPercent = moduleData.lessons.length ? Math.round((completedCount / moduleData.lessons.length) * 100) : 0;
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return { bg: '#16a34a14', color: '#4ade80', border: '#4ade80' };
      case 'Intermediate': return { bg: '#fb923c14', color: '#fb923c', border: '#fb923c' };
      case 'Advanced': return { bg: '#8b5cf614', color: '#a855f7', border: '#8b5cf6' };
      default: return { bg: '#64748b14', color: '#cbd5e1', border: '#64748b' };
    }
  };

  const isDone = (lessonId) => completed.includes(lessonId);

  return (
    <div className="module-overview">
      <div className="module-hero">
        <div className="module-hero__left">
          <div className="module-badge">{moduleData.icon}</div>
          <h1>{moduleData.title}</h1>
          <p>{moduleData.description}</p>
          <div className="module-meta">
            <span>{moduleData.level}</span>
            <span>{moduleData.total} Lessons</span>
            <span>{moduleData.duration}</span>
          </div>
          <div className="module-stats">
            <div>
              <strong>{completedCount}</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong>{progressPercent}%</strong>
              <span>Progress</span>
            </div>
            <div>
              <strong>{moduleData.lessons.length - completedCount}</strong>
              <span>Remaining</span>
            </div>
          </div>
        </div>
        <div className="module-hero__right">
          <div className="module-track">
            <small>Currently working on</small>
            <h3>{moduleData.lessons[completedCount]?.title || moduleData.lessons[0].title}</h3>
            <p>{moduleData.lessons[completedCount]?.description || moduleData.description}</p>
          </div>
        </div>
      </div>

      <div className="module-features">
        <div className="feature-card">
          {featureIcons.theory}
          <h4>Theory-led lessons</h4>
          <p>Each lesson includes detailed theory and examples.</p>
        </div>
        <div className="feature-card">
          {featureIcons.practice}
          <h4>Practice questions</h4>
          <p>Apply concepts with curated practice prompts.</p>
        </div>
        <div className="feature-card">
          {featureIcons.quiz}
          <h4>Built-in quizzes</h4>
          <p>Reinforce learning with quiz sections on every lesson.</p>
        </div>
        <div className="feature-card">
          {featureIcons.progress}
          <h4>XP earning</h4>
          <p>Complete lessons and watch XP and progress update automatically.</p>
        </div>
      </div>

      <div className="module-content-grid">
        <div className="module-lessons-grid">
          {moduleData.lessons.map((lesson) => {
            const difficultyStyle = getDifficultyColor(lesson.difficulty);
            const completedLesson = isDone(lesson.lessonId);
            const hover = hovered === lesson.lessonNumber;

            return (
              <Link
                to={`${moduleData.modulePath}/${lesson.lessonNumber}`}
                key={lesson.lessonId}
                className="module-lesson-card"
                onMouseEnter={() => setHovered(lesson.lessonNumber)}
                onMouseLeave={() => setHovered(null)}
                style={{ transform: hover ? 'translateY(-5px)' : 'translateY(0)' }}
              >
                <div className="module-lesson-card__head">
                  <span className="lesson-number">Lesson {lesson.lessonNumber}</span>
                  <span className="lesson-badge" style={{ background: difficultyStyle.bg, color: difficultyStyle.color, border: `1px solid ${difficultyStyle.border}` }}>
                    {lesson.difficulty}
                  </span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <div className="module-card-meta">
                  <span>{lesson.estimatedTime}</span>
                  {completedLesson && <span className="completed-pill"><FaCheckCircle /> Completed</span>}
                </div>
                <div className="module-card-cta">
                  <span>View lesson</span>
                  <FaArrowRight />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <CourseSidebar
        coursePrefix={`${moduleData.prefix}-lesson`}
        totalLessons={moduleData.lessons.length}
        courseTitle={moduleData.title}
      />

      <style>{`
        .module-overview { padding: 40px 24px 160px; min-height: 100vh; max-width: 1360px; margin: 0 auto; background: linear-gradient(135deg, #090b12 0%, #111827 100%); color: #e2e8f0; }
        .module-hero { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; margin-bottom: 32px; align-items: stretch; }
        .module-badge { width: 72px; height: 72px; border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; background: rgba(59,130,246,0.16); margin-bottom: 20px; }
        .module-hero h1 { font-size: 3rem; margin: 0 0 14px; letter-spacing: -0.04em; color: #fff; }
        .module-hero p { margin: 0 0 20px; max-width: 620px; color: #cbd5e1; line-height: 1.8; }
        .module-meta { display: flex; flex-wrap: wrap; gap: 14px; color: #94a3b8; font-size: 0.95rem; }
        .module-meta span { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 14px; border-radius: 14px; }
        .module-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 24px; }
        .module-stats div { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 18px; }
        .module-stats strong { display: block; font-size: 1.75rem; color: #fff; }
        .module-stats span { color: #94a3b8; margin-top: 6px; display: block; }
        .module-hero__right { display: flex; align-items: center; justify-content: center; }
        .module-track { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 28px; }
        .module-track small { color: #94a3b8; text-transform: uppercase; letter-spacing: 0.14em; }
        .module-track h3 { margin: 14px 0 10px; font-size: 1.5rem; color: #fff; }
        .module-track p { margin: 0; line-height: 1.8; color: #cbd5e1; }
        .module-features { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-bottom: 40px; }
        .feature-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 22px; min-height: 130px; display: flex; flex-direction: column; gap: 12px; }
        .feature-card h4 { margin: 0; color: #fff; font-size: 1rem; }
        .feature-card p { margin: 0; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; }
        .module-content-grid { display: grid; grid-template-columns: 1fr; gap: 28px; width: 100%; }
        .module-lessons-grid { display: grid; gap: 18px; }
        .module-lesson-card { display: block; text-decoration: none; padding: 26px; border-radius: 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: inherit; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .module-lesson-card:hover { border-color: rgba(59,130,246,0.4); box-shadow: 0 18px 52px rgba(30,58,138,0.15); }
        .module-lesson-card__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; gap: 16px; }
        .lesson-number { font-size: 0.9rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.12em; }
        .lesson-badge { padding: 8px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 700; }
        .module-lesson-card h3 { margin: 0 0 10px; font-size: 1.4rem; color: #f8fafc; }
        .module-lesson-card p { margin: 0 0 16px; color: #cbd5e1; line-height: 1.75; }
        .module-card-meta { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.92rem; color: #94a3b8; }
        .completed-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(34,197,94,0.12); color: #a7f3d0; padding: 6px 10px; border-radius: 999px; }
        .module-card-cta { display: inline-flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 22px; color: #60a5fa; font-weight: 600; }
        .module-card-cta svg { margin-left: 10px; }
        .module-sidebar { position: sticky; top: 26px; align-self: start; }

        @media (max-width: 1100px) {
          .module-hero { grid-template-columns: 1fr; }
          .module-content-grid { grid-template-columns: 1fr; }
          .module-sidebar { position: relative; top: 0; }
        }

        @media (max-width: 720px) {
          .module-overview { padding: 24px 18px; }
          .module-hero h1 { font-size: 2.2rem; }
          .module-stats { grid-template-columns: 1fr; }
          .module-features { grid-template-columns: 1fr; }
          .feature-card { min-height: auto; }
        }
      `}</style>
    </div>
  );
};

export default CourseModuleOverview;
