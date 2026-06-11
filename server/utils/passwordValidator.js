/**
 * Password Validation Utility
 * Enforces strong password requirements
 */

const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialChars: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/'
};

/**
 * Validates password against security requirements
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, errors: string[], strength: string }
 */
const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    return {
      isValid: false,
      errors: ["Password is required"],
      strength: "none"
    };
  }

  // Check minimum length
  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(`Password must be at least ${PASSWORD_RULES.minLength} characters long`);
  }

  // Check for uppercase letter
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter (A-Z)");
  }

  // Check for lowercase letter
  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter (a-z)");
  }

  // Check for numeric digit
  if (PASSWORD_RULES.requireNumbers && !/[0-9]/.test(password)) {
    errors.push("Password must contain at least one numeric digit (0-9)");
  }

  // Check for special character
  if (PASSWORD_RULES.requireSpecialChars) {
    const hasSpecialChar = PASSWORD_RULES.specialChars
      .split("")
      .some(char => password.includes(char));
    
    if (!hasSpecialChar) {
      errors.push(`Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:'",.)<>?/)`);
    }
  }

  // Determine password strength
  let strength = "weak";
  let strengthScore = 0;

  if (password.length >= PASSWORD_RULES.minLength) strengthScore++;
  if (/[A-Z]/.test(password)) strengthScore++;
  if (/[a-z]/.test(password)) strengthScore++;
  if (/[0-9]/.test(password)) strengthScore++;
  if (PASSWORD_RULES.specialChars.split("").some(char => password.includes(char))) strengthScore++;

  if (strengthScore >= 4) strength = "strong";
  else if (strengthScore >= 3) strength = "medium";

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    rules: PASSWORD_RULES
  };
};

module.exports = { validatePassword, PASSWORD_RULES };
