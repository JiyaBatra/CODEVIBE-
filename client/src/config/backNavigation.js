import { getLessonBackNavigation } from "./lessonRoutes";

/** Routes where back navigation should not appear (top-level hubs). */
const HIDDEN_PATHS = new Set(["/", "/lessons"]);

/** Static fallbacks for direct URL access when there is no in-app history. */
const STATIC_ROUTE_CONFIG = {
  "/login": { fallbackTo: "/lessons", label: "Back", variant: "auth" },
  "/signup": { fallbackTo: "/lessons", label: "Back", variant: "auth" },
  "/ForgetPassword": { fallbackTo: "/login", label: "Back", variant: "auth" },
  "/ResetPassword": { fallbackTo: "/login", label: "Back", variant: "auth" },
  "/dashboard": { fallbackTo: "/lessons", label: "Back", variant: "default" },
  "/privacy-policy": { fallbackTo: "/lessons", label: "Back", variant: "default" },
  "/terms-of-service": { fallbackTo: "/lessons", label: "Back", variant: "default" },
  "/Certificate": { fallbackTo: "/dashboard", label: "Back", variant: "default" },
  "/Compiler": { fallbackTo: "/lessons", label: "Back", variant: "default" },
};

function normalizePath(pathname) {
  if (!pathname) return "/";
  const path = pathname.replace(/\/$/, "");
  return path || "/";
}

/**
 * Returns back-navigation config for a path, or null if back should be hidden.
 */
export function resolveBackNavigation(pathname) {
  const path = normalizePath(pathname);

  if (HIDDEN_PATHS.has(path)) {
    return null;
  }

  const lessonNav = getLessonBackNavigation(path);
  if (lessonNav) {
    return {
      fallbackTo: lessonNav.to,
      label: lessonNav.label,
      variant: lessonNav.variant,
    };
  }

  if (STATIC_ROUTE_CONFIG[path]) {
    return STATIC_ROUTE_CONFIG[path];
  }

  if (path.startsWith("/report/")) {
    return {
      fallbackTo: "/dashboard",
      label: "Back to Dashboard",
      variant: "default",
    };
  }

  return null;
}

/** Whether a path is a known in-app route that supports back navigation. */
export function isNavigableAppPath(pathname) {
  return resolveBackNavigation(pathname) !== null || HIDDEN_PATHS.has(normalizePath(pathname));
}
