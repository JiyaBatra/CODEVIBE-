import React from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkCheck, Loader, AlertCircle, BookOpen } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import "./BookmarksWidget.css";

const BookmarksWidget = () => {
  const { bookmarks, loading, error } = useBookmarks();
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="bookmarks-widget glass-card">
        <div className="bookmarks-widget-header">
          <h2>My Bookmarks</h2>
        </div>
        <div className="bookmarks-widget-loading">
          <Loader className="bookmarks-spinner" size={20} />
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bookmarks-widget glass-card">
        <div className="bookmarks-widget-header">
          <h2>My Bookmarks</h2>
        </div>
        <div className="bookmarks-widget-message">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <section className="bookmarks-widget glass-card">
        <div className="bookmarks-widget-header">
          <h2>My Bookmarks</h2>
          <span className="bookmarks-widget-subtitle">Save lessons for quick access</span>
        </div>
        <div className="bookmarks-widget-message">
          <BookmarkCheck size={24} />
          <p>No bookmarks yet</p>
          <small>Bookmark lessons while studying to find them easily.</small>
        </div>
        <button
          className="bookmarks-widget-browse"
          onClick={() => navigate("/lessons")}
        >
          Browse Lessons
        </button>
      </section>
    );
  }

  return (
    <section className="bookmarks-widget glass-card">
      <div className="bookmarks-widget-header">
        <h2>My Bookmarks</h2>
        <span className="bookmarks-widget-count">{bookmarks.length}</span>
      </div>
      <div className="bookmarks-widget-list">
        {bookmarks.slice(0, 5).map((bookmark) => (
          <div
            key={bookmark.lessonId}
            className="bookmarks-widget-item"
            onClick={() => navigate(bookmark.path || "/bookmarks")}
          >
            <BookOpen size={14} />
            <span>{bookmark.lessonId}</span>
          </div>
        ))}
      </div>
      {bookmarks.length > 5 && (
        <button
          className="bookmarks-widget-view-all"
          onClick={() => navigate("/bookmarks")}
        >
          View all {bookmarks.length} bookmarks
        </button>
      )}
      {bookmarks.length <= 5 && bookmarks.length > 0 && (
        <button
          className="bookmarks-widget-view-all"
          onClick={() => navigate("/bookmarks")}
        >
          View all bookmarks
        </button>
      )}
    </section>
  );
};

export default BookmarksWidget;
