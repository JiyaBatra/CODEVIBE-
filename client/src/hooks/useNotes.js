import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";

export const useNotes = (lessonId) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  const fetchNotes = useCallback(async () => {
    if (!user?.email || !token || !lessonId) {
      setNotes([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_BASE_URL}/api/notes?lessonId=${encodeURIComponent(lessonId)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(response.data || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError(err.response?.data?.message || "Failed to load notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email, token, lessonId]);

  const createNote = async (content) => {
    if (!token || !lessonId) return null;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/notes`,
        { lessonId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error("Failed to create note:", err);
      setError(err.response?.data?.message || "Failed to create note");
      return null;
    }
  };

  const updateNote = async (id, content) => {
    if (!token) return null;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/notes/${id}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? response.data : n))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update note:", err);
      setError(err.response?.data?.message || "Failed to update note");
      return null;
    }
  };

  const deleteNote = async (id) => {
    if (!token) return false;
    try {
      await axios.delete(`${API_BASE_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError(err.response?.data?.message || "Failed to delete note");
      return false;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, createNote, updateNote, deleteNote, refreshNotes: fetchNotes };
};
