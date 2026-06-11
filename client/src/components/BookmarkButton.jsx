import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import "./BookmarkButton.css";

const BookmarkButton = ({ lessonId, className = "", size = 20, onToggle }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(lessonId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await toggleBookmark(lessonId);
    if (onToggle) onToggle(result);
  };

  return (
    <button
      className={`bookmark-btn ${bookmarked ? "bookmark-btn--active" : ""} ${className}`}
      onClick={handleClick}
      title={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
    >
      {bookmarked ? <BookmarkCheck size={size} /> : <Bookmark size={size} />}
    </button>
  );
};

export default BookmarkButton;
