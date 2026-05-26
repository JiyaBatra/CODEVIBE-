import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resolveBackNavigation } from "../config/backNavigation";

const HOME_FALLBACK_ROUTE = "/lessons";

/**
 * Tracks in-app previous path (memory only — resets on refresh) and
 * navigates back via history or a meaningful fallback route.
 */
export function useBackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = useMemo(
    () => resolveBackNavigation(location.pathname),
    [location.pathname]
  );
  const navigationStackRef = useRef([location.pathname]);

  useEffect(() => {
    const currentPath = location.pathname;
    const stack = navigationStackRef.current;

    if (stack[stack.length - 1] !== currentPath) {
      stack.push(currentPath);
    }
  }, [location.pathname]);

  const canGoBack = navigationStackRef.current.length > 1;
  const fallbackTo = config?.fallbackTo || HOME_FALLBACK_ROUTE;

  const goBack = useCallback(() => {
    if (canGoBack) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo, { replace: true });
  }, [navigate, canGoBack, fallbackTo]);

  return { config, goBack };
}
