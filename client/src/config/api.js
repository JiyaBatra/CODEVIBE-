const DEFAULT_API_BASE_URL = "http://localhost:5002";

export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    return DEFAULT_API_BASE_URL;
  }

  return configured.replace(/\/$/, "");
}

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
