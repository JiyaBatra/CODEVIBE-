// src/components/SolutionModal.jsx
// Confirmation modal before loading the solution into the editor.
import React, { useEffect, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

/**
 * @param {object}   props
 * @param {boolean}  props.isOpen     – whether the modal is visible
 * @param {Function} props.onClose    – cancel / close handler
 * @param {Function} props.onConfirm  – called when user confirms loading the solution
 */
const SolutionModal = ({ isOpen, onClose, onConfirm }) => {
  const confirmRef = useRef(null);
  const dialogRef = useRef(null);

  // Shared focus-trap + Escape handler
  useFocusTrap(dialogRef, isOpen, onClose);

  // Focus the confirm button when the modal opens so keyboard users can
  // quickly confirm (Enter/Space) or dismiss (Escape / Shift+Tab to Cancel).
  useEffect(() => {
    if (isOpen) {
      // Small delay so the DOM is painted before focus is set
      const id = setTimeout(() => confirmRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="hint-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="solution-modal-title"
      aria-describedby="solution-modal-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="hint-modal-card solution-modal-card" ref={dialogRef}>
        {/* Header */}
        <div className="hint-modal-header">
          <div className="hint-modal-title-row">
            <span className="hint-modal-bulb" aria-hidden="true">🔓</span>
            <h2 id="solution-modal-title" className="hint-modal-title">
              View Solution?
            </h2>
          </div>
          <button
            className="hint-modal-close"
            onClick={onClose}
            aria-label="Cancel and close"
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable if content is long */}
        <div id="solution-modal-desc" className="hint-modal-body">
          <p className="hint-modal-text solution-modal-warning">
            Loading the solution will replace your current code in the editor.
          </p>
          <p className="hint-modal-text solution-modal-subtext">
            Your original starter code is preserved — you can reset anytime with
            the <strong>↺ Reset</strong> button.
          </p>
        </div>

        {/* Footer */}
        <div className="hint-modal-footer solution-modal-footer">
          <button
            className="hint-modal-dismiss solution-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            className="hint-modal-dismiss solution-modal-confirm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, show solution
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
