import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import "./BookmarkButton.css";

const BookmarkButton = ({ lessonId, className = "", size = 20, onToggle }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(lessonId);

  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return; // prevent double click

    setLoading(true);

    try {
      const result = await toggleBookmark(lessonId);
      if (onToggle) onToggle(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bookmark-btn ${
        bookmarked ? "bookmark-btn--active" : ""
      } ${className} ${loading ? "bookmark-btn--loading" : ""}`}
      onClick={handleClick}
      disabled={loading}
      title={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
      aria-busy={loading}
    >
      {loading ? (
        <span className="bookmark-spinner" />
      ) : bookmarked ? (
        <BookmarkCheck size={size} />
      ) : (
        <Bookmark size={size} />
      )}
    </button>
  );
};

export default BookmarkButton;