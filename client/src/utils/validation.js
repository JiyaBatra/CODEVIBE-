export const validateEmail = (email) => {
  if (!email) return "Email is required";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  const errors = [];

  // Length check
  if (password.length < 8) {
    errors.push("At least 8 characters");
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    errors.push("One uppercase letter (A-Z)");
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    errors.push("One lowercase letter (a-z)");
  }

  // Numeric check
  if (!/[0-9]/.test(password)) {
    errors.push("One numeric digit (0-9)");
  }

  // Special character check
  const specialChars = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/';
  if (!specialChars.split("").some(char => password.includes(char))) {
    errors.push("One special character (!@#$%^&*()_+-=[]{}|;:'\",.<>?/)");
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors,
      message: "Password must contain: " + errors.join(", ")
    };
  }

  return { isValid: true, errors: [], message: "" };
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: "none", percentage: 0 };

  let score = 0;

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character types
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;

  const specialChars = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/';
  if (specialChars.split("").some(char => password.includes(char))) score++;

  let strength = "weak";
  let percentage = 0;

  if (score <= 2) {
    strength = "weak";
    percentage = 25;
  } else if (score <= 3) {
    strength = "fair";
    percentage = 50;
  } else if (score <= 4) {
    strength = "good";
    percentage = 75;
  } else {
    strength = "strong";
    percentage = 100;
  }

  return { strength, percentage, score };
};

export const validateUsername = (username) => {
  if (!username) return "Username is required";

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  return "";
};
export const validateCollege = (college) => {
  if (!college) return "College is required";

  if (college.length < 2) {
    return "College name must be at least 2 characters";
  }

  return "";
};

export const validateYear = (year) => {
  if (!year) return "Year is required";

  const validYears = ["1", "2", "3", "4"];

  if (!validYears.includes(year)) {
    return "Please enter a valid academic year";
  }

  return "";
};