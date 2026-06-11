import { useEffect, useState, useCallback } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SCROLL_THRESHOLD = 250;
const BOTTOM_THRESHOLD = 100;

const ScrollNavigator = () => {
  const [showNavigator, setShowNavigator] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    // Avoid triggering React state updates on every scroll tick.
    setShowNavigator((prev) => (scrollY > SCROLL_THRESHOLD ? true : false) || prev);
    setAtBottom((prev) => {
      const next = scrollHeight - scrollY - clientHeight < BOTTOM_THRESHOLD;
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
    return () => window.removeEventListener("scroll", handleScrollRaf);
  }, [handleScroll, handleScrollRaf]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!showNavigator) return null;

  return (
    <div className="scroll-navigator" aria-label="Scroll navigation">
      <button
        className="scroll-navigator__btn scroll-navigator__btn--up"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FaArrowUp aria-hidden="true" />
      </button>
      <button
        className={`scroll-navigator__btn scroll-navigator__btn--down ${atBottom ? "scroll-navigator__btn--hidden" : ""}`}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        disabled={atBottom}
      >
        <FaArrowDown aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollNavigator;
