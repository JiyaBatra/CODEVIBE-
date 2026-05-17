export function getUserEmail() {
  const stored = localStorage.getItem("userEmail");
  if (stored) {
    return stored;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.Email || user?.email || "";
  } catch {
    return "";
  }
}

export function persistUserEmail(email) {
  if (email) {
    localStorage.setItem("userEmail", email);
  }
}
