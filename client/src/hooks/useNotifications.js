import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";

const POLL_INTERVAL = 30000;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const intervalRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!user?.email || !token) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  const fetchUnreadCount = useCallback(async () => {
    if (!user?.email || !token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(response.data?.count || 0);
    } catch {
      // silently fail for count
    }
  }, [user?.email, token]);

  const markAsRead = async (id) => {
    if (!token) return;
    try {
      await axios.patch(
        `${API_BASE_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      await axios.patch(
        `${API_BASE_URL}/api/notifications/read-all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    intervalRef.current = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchNotifications, fetchUnreadCount]);

  return { notifications, unreadCount, loading, error, markAsRead, markAllAsRead, refresh: fetchNotifications };
};
