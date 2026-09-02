// Custom hook to fetch user mistakes data
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useAuth } from "../AuthProvider";

export const useMistakes = () => {
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchMistakes = async () => {
      if (!user?.email || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `${API_BASE_URL}/api/mistakes/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.mistakes)) {
          setMistakes(response.data.mistakes);
        } else {
          setMistakes([]);
        }
      } catch (err) {
        console.error("Failed to fetch mistakes:", err);
        setError(err.response?.data?.message || "Failed to load mistakes");
        setMistakes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMistakes();

    // Listen for progress updates to refresh mistakes
    const handleProgressUpdate = () => {
      fetchMistakes();
    };

    window.addEventListener("codevibe-progress-updated", handleProgressUpdate);
    return () => {
      window.removeEventListener("codevibe-progress-updated", handleProgressUpdate);
    };
  }, [user?.email, token]);

  return { mistakes, loading, error };
};
