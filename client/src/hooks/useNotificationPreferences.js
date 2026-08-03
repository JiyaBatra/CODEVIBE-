import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";

const NOTIFICATION_TYPES = [
  { key: "lesson_complete", label: "Lesson Completed" },
  { key: "exam_result", label: "Exam Results" },
  { key: "certificate_earned", label: "Certificate Earned" },
  { key: "streak_milestone", label: "Streak Milestones" },
  { key: "feedback_reply", label: "Feedback Replies" },
];

export const useNotificationPreferences = () => {
  const [mutedTypes, setMutedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  const fetchPreferences = useCallback(async () => {
    if (!user?.email || !token) {
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/notifications/preferences`);
      setMutedTypes(response.data.mutedTypes || []);
    } catch (err) {
      console.error("Failed to fetch notification preferences:", err);
      setError(err.response?.data?.message || "Failed to load preferences");
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const toggleType = async (typeKey) => {
    const isMuted = mutedTypes.includes(typeKey);
    const updated = isMuted
      ? mutedTypes.filter((t) => t !== typeKey)
      : [...mutedTypes, typeKey];

    setMutedTypes(updated);
    setSaving(true);
    try {
      await axios.patch(`${API_BASE_URL}/api/notifications/preferences`, {
        mutedTypes: updated,
      });
    } catch (err) {
      console.error("Failed to update notification preferences:", err);
      setMutedTypes(mutedTypes);
      setError(err.response?.data?.message || "Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  return { mutedTypes, notificationTypes: NOTIFICATION_TYPES, loading, saving, error, toggleType };
};