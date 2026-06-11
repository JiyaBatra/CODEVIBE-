import { useEffect, useRef, useCallback } from "react";

const SCROLL_DEBOUNCE_MS = 300;

export default function useScrollRestore(lessonId, { containerRef, enabled = true } = {}) {
  const savedKey = `codevibe:scroll:${lessonId}`;
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!enabled || !lessonId) return;

    const savedPosition = localStorage.getItem(savedKey);
    if (savedPosition === null) return;

    const scrollTo = parseInt(savedPosition, 10);
    const frame = requestAnimationFrame(() => {
      if (containerRef?.current) {
        containerRef.current.scrollTop = scrollTo;
      } else {
        window.scrollTo({ top: scrollTo, behavior: "instant" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [lessonId, enabled, containerRef, savedKey]);

  const handleScroll = useCallback(() => {
    if (!enabled || !lessonId) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const position = containerRef?.current
        ? containerRef.current.scrollTop
        : window.scrollY;
      localStorage.setItem(savedKey, String(position));
    }, SCROLL_DEBOUNCE_MS);
  }, [lessonId, enabled, containerRef, savedKey]);

  const clearScroll = useCallback(() => {
    localStorage.removeItem(savedKey);
  }, [savedKey]);

  return { handleScroll, clearScroll };
}
