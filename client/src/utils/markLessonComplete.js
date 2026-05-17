import axios from "axios";

import { getUserEmail } from "./getUserEmail";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://codevibe-3.onrender.com";

export async function markLessonComplete(lessonId, score = 0) {
  const email = getUserEmail();
  if (!email) {
    throw new Error("Please log in to save lesson progress.");
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/lesson/${lessonId}/complete`,
    { email, score }
  );

  window.dispatchEvent(
    new CustomEvent("codevibe-progress-updated", {
      detail: { lessonId, score },
    })
  );

  return response.data;
}
