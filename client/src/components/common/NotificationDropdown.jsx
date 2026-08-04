import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Loader, BellOff, Settings, X } from "lucide-react";
import Pagination from "./Pagination";
import { useNotificationPreferences } from "../../hooks/useNotificationPreferences";

const TYPE_ROUTES = {
  lesson_complete: "/dashboard",
  exam_result: "/dashboard",
  certificate_earned: "/Certificate",
  streak_milestone: "/dashboard",
  feedback_reply: "/contact",
};

const NotificationDropdown = ({
  notifications,
  unreadCount,
  loading,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);
  const {
    mutedTypes,
    notificationTypes,
    loading: prefsLoading,
    saving,
    toggleType,
  } = useNotificationPreferences();

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
    } catch (error) {
      console.error("Error:", error);
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
        <div className="notification-header-actions">
          {unreadCount > 0 && !showPreferences && (
            <button className="notification-mark-all-btn" onClick={onMarkAllAsRead}>
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
          <button
            type="button"
            className="notification-settings-btn"
            onClick={() => setShowPreferences((v) => !v)}
            aria-label="Notification settings"
            title="Notification settings"
          >
            {showPreferences ? <X size={16} /> : <Settings size={16} />}
          </button>
        </div>
      </div>

      {showPreferences ? (
        <div className="notification-preferences-panel">
          <p className="notification-preferences-hint">
            Choose which notifications you want to receive
          </p>
          {prefsLoading && (
            <div className="notification-dropdown-loading">
              <Loader className="notification-spinner" size={18} />
              <span>Loading preferences...</span>
            </div>
          )}
          {!prefsLoading &&
            notificationTypes.map(({ key, label }) => (
              <label key={key} className="notification-preference-row">
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={!mutedTypes.includes(key)}
                  disabled={saving}
                  onChange={() => toggleType(key)}
                />
              </label>
            ))}
        </div>
      ) : (
        <>
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
          {!loading && total > limit && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;