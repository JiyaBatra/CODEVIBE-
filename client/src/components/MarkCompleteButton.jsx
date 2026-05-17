import React, { useState } from "react";

import { markLessonComplete } from "../utils/markLessonComplete";

const MarkCompleteButton = ({ lessonId, completed = [], onComplete }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isDone = completed.includes(lessonId);

  const handleClick = async () => {
    setBusy(true);
    setError("");

    try {
      await markLessonComplete(lessonId, 0);
      onComplete?.(lessonId);
    } catch (err) {
      setError(err.message || "Could not mark lesson complete.");
    } finally {
      setBusy(false);
    }
  };

  if (isDone) {
    return null;
  }

  return (
    <div className="mark-complete-wrap">
      <button
        type="button"
        className="mark-complete-btn"
        onClick={handleClick}
        disabled={busy}
      >
        {busy ? "Saving..." : "Mark Complete"}
      </button>
      {error && <p className="mark-complete-error">{error}</p>}
    </div>
  );
};

export default MarkCompleteButton;
