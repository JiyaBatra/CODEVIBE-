import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SCROLL_THRESHOLD = 250;
const BOTTOM_THRESHOLD = 100;

const ScrollNavigator = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    // Show up button if user scrolled past threshold (optimized to avoid redundant renders)
    setShowUp((prev) => {
      const next = scrollY > SCROLL_THRESHOLD;
      return prev === next ? prev : next;
    });

    // Show down button if page is scrollable and user is not near the bottom (optimized to avoid redundant renders)
    setShowDown((prev) => {
      const isScrollable = scrollHeight - clientHeight > 50;
      const nearBottom = scrollHeight - scrollY - clientHeight < BOTTOM_THRESHOLD;
      const next = isScrollable && !nearBottom;
      return prev === next ? prev : next;
    });
  }, []);

  const handleScrollRaf = useCallback(() => {
    // Store RAF id on the function object to avoid extra renders/refs.
    // (Using a property is safe here because this component instance owns it.)
    if (handleScrollRaf.rafId) return;

    handleScrollRaf.rafId = window.requestAnimationFrame(() => {
      handleScroll();
      handleScrollRaf.rafId = null;
    });
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScrollRaf, { passive: true });
    window.addEventListener("resize", handleScrollRaf, { passive: true });

    // Handle dynamic loading of content by recalculating after a short delay
    const timer = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScrollRaf);
      window.removeEventListener("resize", handleScrollRaf);
      clearTimeout(timer);
    };
  }, [handleScroll, handleScrollRaf]);

  // Recalculate scroll navigation when location/route changes
  useEffect(() => {
    handleScroll();
  }, [location, handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-navigator" aria-label="Scroll navigation">
      <button
        className={`scroll-navigator__btn scroll-navigator__btn--up ${!showUp ? "scroll-navigator__btn--hidden" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        disabled={!showUp}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>
          <FaArrowUp aria-hidden="true" />
        </span>
      </button>
      <button
        className={`scroll-navigator__btn scroll-navigator__btn--down ${!showDown ? "scroll-navigator__btn--hidden" : ""}`}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        disabled={!showDown}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>
          <FaArrowDown aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};

export default ScrollNavigator;
