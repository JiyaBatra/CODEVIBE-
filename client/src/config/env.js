// Client environment verification utility
const validateClientEnv = () => {
  const isProd = import.meta.env.PROD;
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";

  if (isProd) {
    if (!apiBaseUrl) {
      console.error(
        "⚠️ [CodeVibe Client Config Alert]: VITE_API_URL is missing. Production API communication might fail!"
      );
    }
  } else {
    console.log(
      `ℹ️ [CodeVibe Config]: Running in Development. Base API URL resolved to: "${apiBaseUrl || "localhost default"}"`
    );
  }
};

try {
  validateClientEnv();
} catch (e) {
  console.error("Failed to run client configuration check:", e);
}

export const CLIENT_ENV = {
  VITE_API_URL: import.meta.env.VITE_API_URL || "http://localhost:5002",
  IS_PRODUCTION: import.meta.env.PROD,
};
