import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import CourseSidebar from './CourseSidebar';
import { getModuleByKey } from '../config/dsaModuleData';
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ModuleLessonPage = ({ moduleKey }) => {
  const { lessonNumber } = useParams();
  const navigate = useNavigate();
  const moduleData = getModuleByKey(moduleKey);
  const index = parseInt(lessonNumber, 10) - 1;
  const lesson = moduleData?.lessons?.[index];

  const [completed, setCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const nextLesson = moduleData?.lessons?.[index + 1];
  const previousLesson = moduleData?.lessons?.[index - 1];

  useEffect(() => {
    if (!moduleData || !lesson) {
      navigate(moduleData?.modulePath || '/lessons');
      return;
    }
    window.scrollTo(0, 0);
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/progress/${email}`)
      .then((res) => {
        const completedLessons = res.data.completedLessons || [];
        setCompleted(completedLessons.includes(lesson.lessonId));
      })
      .catch(() => {});
  }, [lesson, moduleData, navigate]);

  const lessonKey = useMemo(() => lesson?.lessonId || '', [lesson]);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions((current) => ({ ...current, [questionIndex]: option }));
  };

  const markLessonComplete = async (score = 100) => {
    if (!lesson) return;
    const email = localStorage.getItem('userEmail');
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/lesson/${lesson.lessonId}/complete`, {
        email,
        score,
        learningTime: 5,
        type: 'quiz',
      });
      setCompleted(true);
      window.dispatchEvent(new CustomEvent('codevibe-progress-updated', {
        detail: { lessonId: lesson.lessonId, score },
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const submitQuiz = () => {
    if (!lesson) return;
    const answers = lesson.quiz.map((item, index) => selectedOptions[index]);
    const correctCount = lesson.quiz.reduce((total, item, index) => {
      return total + (selectedOptions[index] === item.answer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / lesson.quiz.length) * 100);
    const passed = correctCount === lesson.quiz.length;
    setQuizResult({ passed, correctCount, total: lesson.quiz.length, score });
    if (passed) {
      markLessonComplete(score || 100);
    }
  };

  if (!lesson || !moduleData) {
    return null;
  }

  return (
    <div className="lesson-detail">
      <div className="lesson-detail__header">
        <div className="lesson-detail__title">
          <p className="lesson-breadcrumb">{moduleData.title} • Lesson {lesson.lessonNumber}</p>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <div className="lesson-meta">
            <span>{lesson.difficulty}</span>
            <span>{lesson.estimatedTime}</span>
            <span>{moduleData.total} lessons</span>
          </div>
        </div>
        <div className="lesson-action-box">
          {completed ? (
            <div className="completed-status"><FaCheckCircle /> Completed</div>
          ) : (
            <button className="mark-complete-btn" onClick={() => markLessonComplete(100)} disabled={submitting}>
              Mark Lesson Completed
            </button>
          )}
          <div className="lesson-progress-block">
            <strong>{moduleData.lessons.length - index - 1} lessons left</strong>
            <span>Keep going to finish the {moduleData.title} module.</span>
          </div>
        </div>
      </div>

      <div className="lesson-detail__content">
        <section>
          <h2>Theory</h2>
          <p>{lesson.theory}</p>
        </section>

        <section>
          <h2>Code Examples</h2>
          <div className="code-examples">
            {lesson.codeExamples.map((example, idx) => (
              <div key={`${lesson.lessonId}-code-${idx}`} className="code-card">
                <div className="code-card__header">
                  <span>{example.language}</span>
                </div>
                <pre>{example.code}</pre>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Key Concepts</h2>
          <ul>
            {lesson.keyConcepts.map((point) => <li key={`${lesson.lessonId}-concept-${point}`}>{point}</li>)}
          </ul>
        </section>

        <section>
          <h2>Complexity Analysis</h2>
          <p>{lesson.complexity}</p>
        </section>

        <section>
          <h2>Practice Questions</h2>
          <ol>
            {lesson.practiceQuestions.map((question) => <li key={`${lesson.lessonId}-practice-${question}`}>{question}</li>)}
          </ol>
        </section>

        <section>
          <h2>Quiz</h2>
          <div className="quiz-panel">
            {lesson.quiz.map((item, index) => (
              <div key={`${lesson.lessonId}-quiz-${index}`} className="quiz-question">
                <p><strong>{index + 1}. {item.question}</strong></p>
                <div className="quiz-options">
                  {item.options.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={`quiz-${lesson.lessonId}-${index}`}
                        value={option}
                        checked={selectedOptions[index] === option}
                        onChange={() => handleOptionChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="submit-quiz-btn" onClick={submitQuiz} disabled={submitting}>
              Submit Quiz
            </button>
            {quizResult && (
              <div className={`quiz-result ${quizResult.passed ? 'passed' : 'failed'}`}>
                {quizResult.passed ? (
                  <p>✅ All answers are correct! Lesson marked complete.</p>
                ) : (
                  <p>⚠️ {quizResult.correctCount}/{quizResult.total} correct. Review the theory and try again.</p>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="lesson-navigation">
          {previousLesson && (
            <Link to={`${moduleData.modulePath}/${previousLesson.lessonNumber}`} className="nav-link prev-link">
              <FaArrowLeft /> Previous Lesson
            </Link>
          )}
          {nextLesson && (
            <Link to={`${moduleData.modulePath}/${nextLesson.lessonNumber}`} className="nav-link next-link">
              Next Lesson <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
      <CourseSidebar coursePrefix={`${moduleData.prefix}-lesson`} totalLessons={moduleData.lessons.length} courseTitle={moduleData.title} />

      <style>{`
        .lesson-detail { display: grid; grid-template-columns: 1fr; gap: 28px; padding: 40px 24px 140px; min-height: 100vh; max-width: 1340px; margin: 0 auto; background: linear-gradient(135deg, #090b12 0%, #0f172a 100%); color: #e2e8f0; }
        .lesson-detail__header { grid-column: 1 / span 1; display: grid; grid-template-columns: 1.6fr 0.9fr; gap: 24px; margin-bottom: 32px; }
        .lesson-detail__title p.lesson-breadcrumb { font-size: 0.9rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px; }
        .lesson-detail__title h1 { margin: 0 0 16px; font-size: 2.65rem; color: #fff; }
        .lesson-detail__title p { margin: 0 0 20px; color: #cbd5e1; line-height: 1.8; max-width: 780px; }
        .lesson-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.95rem; color: #94a3b8; }
        .lesson-meta span { padding: 11px 14px; background: rgba(255,255,255,0.04); border-radius: 999px; border: 1px solid rgba(255,255,255,0.08); }
        .lesson-action-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 28px; display: flex; flex-direction: column; gap: 20px; justify-content: space-between; }
        .mark-complete-btn { background: linear-gradient(135deg, #f97316, #fb7185); border: none; color: white; padding: 16px 22px; border-radius: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s ease; }
        .mark-complete-btn:hover { transform: translateY(-1px); }
        .completed-status { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; color: #34d399; }
        .lesson-progress-block strong { display: block; font-size: 1.15rem; margin-bottom: 6px; }
        .lesson-progress-block span { color: #94a3b8; line-height: 1.65; }
        .lesson-detail__content section { margin-bottom: 28px; }
        .lesson-detail__content h2 { margin-bottom: 16px; color: #fff; font-size: 1.55rem; }
        .lesson-detail__content p, .lesson-detail__content li { line-height: 1.8; color: #cbd5e1; }
        .lesson-detail__content ul, .lesson-detail__content ol { margin: 0 0 0 1.25rem; padding: 0; }
        .code-examples { display: grid; gap: 18px; }
        .code-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; }
        .code-card__header { padding: 14px 18px; background: rgba(15,23,42,0.9); display: flex; justify-content: space-between; align-items: center; color: #e2e8f0; font-size: 0.95rem; }
        .code-card pre { margin: 0; padding: 20px; overflow-x: auto; background: #020617; color: #cbd5e1; font-size: 0.92rem; }
        .quiz-panel { display: grid; gap: 22px; }
        .quiz-question { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; }
        .quiz-options { display: grid; gap: 12px; margin-top: 12px; }
        .quiz-options label { display: flex; align-items: center; gap: 12px; background: rgba(15,23,42,0.95); padding: 12px 16px; border-radius: 14px; cursor: pointer; }
        .quiz-options input { accent-color: #fb7185; }
        .submit-quiz-btn { border: none; background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: white; padding: 14px 20px; border-radius: 16px; font-weight: 700; cursor: pointer; width: fit-content; }
        .quiz-result { border-radius: 18px; padding: 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .quiz-result.passed { border-color: #34d399; }
        .lesson-navigation { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-top: 22px; }
        .nav-link { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 16px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); }
        .prev-link { justify-content: flex-start; }
        .next-link { justify-content: flex-end; }
        .lesson-sidebar { display: none; }

        @media (max-width: 1100px) {
          .lesson-detail { grid-template-columns: 1fr; padding: 28px 20px; }
          .lesson-detail__header { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ModuleLessonPage;
