import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";
import { EVENTS } from "../socket/socketEvents";

const LIMIT = 50;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { user, token } = useAuth();

  const socketRef = useRef(null);

  const fetchNotifications = useCallback(async (pageToFetch = 1) => {
    if (!user?.email || !token) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
        params: { page: pageToFetch, limit: LIMIT },
      });

      const data = Array.isArray(response.data)
        ? { notifications: response.data, pagination: { page: 1, totalPages: 1, total: response.data.length, limit: LIMIT } }
        : response.data;

      setNotifications(data.notifications);
      setPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);

      if (pageToFetch === 1) {
        setUnreadCount(data.notifications.filter((n) => !n.read).length);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  const goToPage = useCallback((newPage) => {
    fetchNotifications(newPage);
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications(1);

    if (!token || !user?.email) return;

    const socket = io(API_BASE_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Socket] Connected for notifications");
      socket.emit(EVENTS.NOTIFICATION_SYNC_REQUEST, {
        since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      });
    });

    socket.on(EVENTS.NOTIFICATION_NEW, (payload) => {
      const newNotif = payload.data;
      setNotifications((prev) => {
        if (page !== 1) return prev;
        if (prev.find((n) => n._id === newNotif.id || n._id === newNotif._id)) return prev;
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
      if (payload.data?.notifications?.length > 0 && page === 1) {
        setNotifications((prev) => {
          const merged = [...payload.data.notifications, ...prev];
          const unique = Array.from(new Map(merged.map((n) => [n._id, n])).values());
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
  }, [fetchNotifications, token, user?.email, page]);

  const markAsRead = async (id) => {
    if (!token) return;
    try {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await axios.patch(`${API_BASE_URL}/api/notifications/${id}/read`, {}, {});
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      fetchNotifications(page);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);

      await axios.patch(`${API_BASE_URL}/api/notifications/read-all`, {}, {});
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      fetchNotifications(page);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    page,
    totalPages,
    total,
    limit: LIMIT,
    goToPage,
    refresh: () => fetchNotifications(page),
  };
};