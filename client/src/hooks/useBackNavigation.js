import { useCallback, useMemo } from "react";
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

  const goBack = useCallback(() => {
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(HOME_FALLBACK_ROUTE, { replace: true });
  }, [navigate]);

  return { config, goBack };
}
