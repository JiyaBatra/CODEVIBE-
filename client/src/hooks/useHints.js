// src/hooks/useHints.js
// Manages progressive hint revelation and solution unlocking state.
import { useState, useCallback } from "react";

/**
 * @param {string[]} hints     – ordered array of hint strings (may be empty / undefined)
 * @param {string}   solution  – solution code string (may be empty / undefined)
 *
 * @returns {object} hint state + actions consumed by Compiler
 */
export function useHints(hints = [], solution = "") {
  const safeHints = Array.isArray(hints) ? hints : [];
  const hasSolution = typeof solution === "string" && solution.trim().length > 0;
  const totalHints = safeHints.length;

  // Index of the last *revealed* hint (0-based). -1 means none revealed yet.
  const [revealedIndex, setRevealedIndex] = useState(-1);

  // Which hint is currently displayed in the modal (0-based). null = modal closed.
  const [activeHintIndex, setActiveHintIndex] = useState(null);

  // Whether the solution confirmation modal is open
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);

  const allHintsRevealed = totalHints > 0 && revealedIndex >= totalHints - 1;
  const canShowSolution = hasSolution && (totalHints === 0 || allHintsRevealed);

  /**
   * Called when the user clicks "💡 Need a Hint?".
   * Reveals the next hint and opens the modal showing it.
   * If all hints are already shown, reopens the last hint.
   */
  const requestNextHint = useCallback(() => {
    if (totalHints === 0) return;

    if (revealedIndex < totalHints - 1) {
      // Reveal the next hint
      const nextIndex = revealedIndex + 1;
      setRevealedIndex(nextIndex);
      setActiveHintIndex(nextIndex);
    } else {
      // All hints already revealed — show the last one again
      setActiveHintIndex(revealedIndex);
    }
  }, [revealedIndex, totalHints]);

  /**
   * Closes the hint modal without changing the revealed index.
   */
  const closeHintModal = useCallback(() => {
    setActiveHintIndex(null);
  }, []);

  /**
   * Opens the solution confirmation modal.
   */
  const requestSolution = useCallback(() => {
    if (!canShowSolution) return;
    setSolutionModalOpen(true);
  }, [canShowSolution]);

  /**
   * Closes the solution confirmation modal.
   */
  const closeSolutionModal = useCallback(() => {
    setSolutionModalOpen(false);
  }, []);

  return {
    // Data
    totalHints,
    revealedIndex,
    allHintsRevealed,
    canShowSolution,
    hasSolution,

    // Modal state
    hintModalOpen: activeHintIndex !== null,
    activeHintText: activeHintIndex !== null ? safeHints[activeHintIndex] : "",
    activeHintNumber: activeHintIndex !== null ? activeHintIndex + 1 : 0,
    solutionModalOpen,

    // Actions
    requestNextHint,
    closeHintModal,
    requestSolution,
    closeSolutionModal,
  };
}
