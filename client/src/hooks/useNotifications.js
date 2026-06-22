import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";
import { EVENTS } from "../socket/socketEvents";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  
  const socketRef = useRef(null);

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
      setUnreadCount(response.data.filter(n => !n.read).length);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  useEffect(() => {
    fetchNotifications();

    if (!token || !user?.email) return;

    // Initialize Socket.io connection
    const socket = io(API_BASE_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Socket] Connected for notifications");
      // We can't access latest notifications directly here reliably due to closure,
      // but we can request a sync from a safe past timestamp if needed.
      // A more complex sync logic could go here.
      socket.emit(EVENTS.NOTIFICATION_SYNC_REQUEST, { since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }); // Last 24 hours fallback
    });

    socket.on(EVENTS.NOTIFICATION_NEW, (payload) => {
      const newNotif = payload.data;
      setNotifications((prev) => {
        // Prevent duplicates if already added
        if (prev.find(n => n._id === newNotif.id || n._id === newNotif._id)) return prev;
        
        // Normalize id mapping (socket payload uses id instead of _id sometimes)
        const normalizedNotif = { ...newNotif, _id: newNotif.id || newNotif._id };
        return [normalizedNotif, ...prev];
      });
      setUnreadCount((prev) => prev + 1);
    });

    socket.on(EVENTS.NOTIFICATION_READ, (payload) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === payload.data.id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    });

    socket.on(EVENTS.NOTIFICATION_BULK_READ, () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    });

    socket.on(EVENTS.NOTIFICATION_SYNC, (payload) => {
      if (payload.data?.notifications?.length > 0) {
        setNotifications((prev) => {
          const merged = [...payload.data.notifications, ...prev];
          const unique = Array.from(new Map(merged.map(n => [n._id, n])).values());
          unique.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          return unique;
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("[Socket] Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchNotifications, token, user?.email]);

  const markAsRead = async (id) => {
    if (!token) return;
    try {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await axios.patch(
        `${API_BASE_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      fetchNotifications();
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);

      await axios.patch(
        `${API_BASE_URL}/api/notifications/read-all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      fetchNotifications();
    }
  };

  return { notifications, unreadCount, loading, error, markAsRead, markAllAsRead, refresh: fetchNotifications };
};
