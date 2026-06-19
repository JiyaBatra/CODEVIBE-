// src/hooks/useFocusTrap.js
// Traps keyboard focus inside a dialog container and closes on Escape.
// Also locks body scroll while open and returns focus on close (WCAG 2.1 SC 3.2.2).
import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * @param {React.RefObject} containerRef – ref attached to the modal card element
 * @param {boolean}         isOpen       – whether the modal is currently visible
 * @param {Function}        onClose      – called when Escape is pressed
 */
export function useFocusTrap(containerRef, isOpen, onClose) {
  // Remember which element had focus before the modal opened so we can
  // restore it when the modal closes (WCAG 2.1 SC 3.2.2 — focus management).
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement;
    } else {
      // Modal just closed — return focus to the trigger element
      if (returnFocusRef.current && typeof returnFocusRef.current.focus === "function") {
        returnFocusRef.current.focus();
        returnFocusRef.current = null;
      }
    }
  }, [isOpen]);

  // Body scroll lock — prevents the page from scrolling behind the modal
  // on mobile devices where the overlay doesn't fully block scroll events.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Keyboard: Escape to close, Tab to trap focus inside the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // containerRef is intentionally omitted: React guarantees useRef objects
  // are stable (same reference for the component's lifetime), so including
  // it would only suppress an exhaustive-deps warning without adding value.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);
}
