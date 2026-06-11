import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  const fetchBookmarks = useCallback(async () => {
    if (!user?.email || !token) {
      setBookmarks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(response.data || []);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      setError(err.response?.data?.message || "Failed to load bookmarks");
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  const toggleBookmark = async (lessonId) => {
    if (!token) return null;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/bookmarks`,
        { lessonId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { bookmarked } = response.data;
      if (bookmarked) {
        setBookmarks((prev) => [
          { email: user.email, lessonId, createdAt: new Date().toISOString() },
          ...prev,
        ]);
      } else {
        setBookmarks((prev) => prev.filter((b) => b.lessonId !== lessonId));
      }
      return bookmarked;
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
      return null;
    }
  };

  const removeBookmark = async (lessonId) => {
    if (!token) return false;
    try {
      await axios.delete(`${API_BASE_URL}/api/bookmarks/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks((prev) => prev.filter((b) => b.lessonId !== lessonId));
      return true;
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      return false;
    }
  };

  const isBookmarked = useCallback(
    (lessonId) => bookmarks.some((b) => b.lessonId === lessonId),
    [bookmarks]
  );

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return { bookmarks, loading, error, toggleBookmark, removeBookmark, isBookmarked, refreshBookmarks: fetchBookmarks };
};
