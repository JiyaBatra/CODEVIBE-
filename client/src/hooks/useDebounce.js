import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Delays updating the returned value until the user stops changing it
 * for `delay` milliseconds. Drop-in for any controlled input.
 *
 * @param {any} value - The value to debounce (e.g. search string)
 * @param {number} delay - Milliseconds to wait (default 350)
 * @returns {any} debounced value
 */
export function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on every change
  }, [value, delay]);

  return debounced;
}