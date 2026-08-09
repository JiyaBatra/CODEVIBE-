import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";
import "./NotificationBell.css";

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    loading,
    page,
    totalPages,
    total,
    limit,
    goToPage,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-bell-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="nav-link"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        title="Notifications"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Bell className="nav-icon" size={16} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
          )}
        </div>
        <span>NotificationBell</span>
      </button>
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          loading={loading}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClose={() => setIsOpen(false)}
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default NotificationBell;