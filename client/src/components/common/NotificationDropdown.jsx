import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Loader, AlertCircle, BellOff } from "lucide-react";

const TYPE_ROUTES = {
  lesson_complete: "/dashboard",
  exam_result: "/dashboard",
  certificate_earned: "/Certificate",
  streak_milestone: "/dashboard",
  feedback_reply: "/contact",
};

const NotificationDropdown = ({ notifications, unreadCount, loading, onMarkAsRead, onMarkAllAsRead, onClose }) => {
  const navigate = useNavigate();

  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      onMarkAsRead(notif._id);
    }
    const route = TYPE_ROUTES[notif.type] || "/dashboard";
    navigate(route);
    onClose();
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now - date;
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-dropdown-header">
        <h4>
          <Bell size={16} />
          Notifications
        </h4>
        {unreadCount > 0 && (
          <button className="notification-mark-all-btn" onClick={onMarkAllAsRead}>
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      <div className="notification-dropdown-body">
        {loading && (
          <div className="notification-dropdown-loading">
            <Loader className="notification-spinner" size={20} />
            <span>Loading...</span>
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="notification-dropdown-empty">
            <BellOff size={24} />
            <p>No notifications yet</p>
          </div>
        )}

        {!loading && notifications.length > 0 && (
          <>
            {notifications.map((notif) => (
              <button
                key={notif._id}
                className={`notification-item ${!notif.read ? "notification-item--unread" : ""}`}
                onClick={() => handleNotificationClick(notif)}
              >
                <div className="notification-item-dot">
                  {!notif.read && <span className="unread-dot" />}
                </div>
                <div className="notification-item-content">
                  <p className="notification-item-message">{notif.message}</p>
                  <span className="notification-item-time">{formatDate(notif.createdAt)}</span>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
