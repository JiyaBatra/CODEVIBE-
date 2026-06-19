// src/components/HintModal.jsx
// Displays a single unlocked hint in an accessible modal overlay.
import React, { useEffect, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

/**
 * @param {object}   props
 * @param {boolean}  props.isOpen        – whether the modal is visible
 * @param {Function} props.onClose       – close handler
 * @param {string}   props.hint          – hint text to display
 * @param {number}   props.hintNumber    – 1-based index of current hint
 * @param {number}   props.totalHints    – total number of hints available
 */
const HintModal = ({ isOpen, onClose, hint, hintNumber, totalHints }) => {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  // Shared focus-trap + Escape handler
  useFocusTrap(dialogRef, isOpen, onClose);

  // Auto-focus the close button when the modal opens
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="hint-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hint-modal-title"
      aria-describedby="hint-modal-body"
      onClick={(e) => {
        // Close when clicking the backdrop (not the card itself)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="hint-modal-card" ref={dialogRef}>
        {/* Header */}
        <div className="hint-modal-header">
          <div className="hint-modal-title-row">
            <span className="hint-modal-bulb" aria-hidden="true">💡</span>
            <h2 id="hint-modal-title" className="hint-modal-title">
              Hint {hintNumber}
              {totalHints > 1 && (
                <span className="hint-modal-counter">
                  {hintNumber} / {totalHints}
                </span>
              )}
            </h2>
          </div>
          <button
            ref={closeRef}
            className="hint-modal-close"
            onClick={onClose}
            aria-label="Close hint"
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable for long hints */}
        <div id="hint-modal-body" className="hint-modal-body">
          <p className="hint-modal-text">{hint}</p>
        </div>

        {/* Footer */}
        <div className="hint-modal-footer">
          <button
            className="hint-modal-dismiss"
            onClick={onClose}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
