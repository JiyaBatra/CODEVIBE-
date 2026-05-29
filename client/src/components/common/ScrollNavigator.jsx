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

    setShowNavigator(scrollY > SCROLL_THRESHOLD);
    setAtBottom(scrollHeight - scrollY - clientHeight < BOTTOM_THRESHOLD);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
