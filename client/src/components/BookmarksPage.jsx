import React from "react";
import { Link } from "react-router-dom";
import { BookmarkCheck, BookOpen, Loader, AlertCircle, ArrowLeft } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import { lessonGroups } from "../config/lessonRoutes";
import "./BookmarksPage.css";

const lessonPathMap = new Map();
lessonGroups.forEach((group) => {
  group.lessons.forEach((lesson) => {
    lessonPathMap.set(lesson.lessonId, {
      path: lesson.path,
      title: lesson.title,
      course: group.course,
    });
  });
});

const BookmarksPage = () => {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks();

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <Link to="/dashboard" className="bookmarks-back">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1>
          <BookmarkCheck size={28} />
          My Bookmarks
        </h1>
        <p className="bookmarks-subtitle">
          {bookmarks.length} bookmarked lesson{bookmarks.length !== 1 ? "s" : ""}
        </p>
      </div>

      {loading && (
        <div className="bookmarks-loading">
          <Loader className="bookmarks-spinner" size={32} />
          <p>Loading bookmarks...</p>
        </div>
      )}

      {error && (
        <div className="bookmarks-error">
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && bookmarks.length === 0 && (
        <div className="bookmarks-empty">
          <BookmarkCheck size={48} />
          <h2>No bookmarks yet</h2>
          <p>Start bookmarking lessons to see them here!</p>
          <Link to="/lessons" className="bookmarks-browse-btn">
            Browse Lessons
          </Link>
        </div>
      )}

      {!loading && !error && bookmarks.length > 0 && (
        <div className="bookmarks-grid">
          {bookmarks.map((bookmark) => {
            const info = lessonPathMap.get(bookmark.lessonId);
            return (
              <div key={bookmark.lessonId} className="bookmark-card">
                {info ? (
                  <Link to={info.path} className="bookmark-card-link">
                    <div className="bookmark-card-header">
                      <span className="bookmark-course-badge">{info.course}</span>
                    </div>
                    <h3 className="bookmark-card-title">{info.title}</h3>
                    <div className="bookmark-card-footer">
                      <BookOpen size={14} />
                      <span>Open lesson</span>
                    </div>
                  </Link>
                ) : (
                  <div className="bookmark-card-unknown">
                    <p>Lesson: {bookmark.lessonId}</p>
                  </div>
                )}
                <button
                  className="bookmark-remove-btn"
                  onClick={() => removeBookmark(bookmark.lessonId)}
                  title="Remove bookmark"
                >
                  <BookmarkCheck size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
