import React from "react";
import { getPasswordStrength, validatePassword } from "../utils/validation";
import "./PasswordStrengthIndicator.css";

const PasswordStrengthIndicator = ({ password }) => {
  const validation = validatePassword(password);
  const strength = getPasswordStrength(password);

  if (!password) {
    return null;
  }

  const getStrengthColor = () => {
    switch (strength.strength) {
      case "weak":
        return "#ff4d6d";
      case "fair":
        return "#ffa500";
      case "good":
        return "#87ceeb";
      case "strong":
        return "#2ecc71";
      default:
        return "#666";
    }
  };

  const getStrengthLabel = () => {
    return strength.strength.charAt(0).toUpperCase() + strength.strength.slice(1);
  };

  return (
    <div className="password-strength-container">
      {/* Strength Bar */}
      <div className="strength-bar-wrapper">
        <div className="strength-bar-background">
          <div
            className="strength-bar-fill"
            style={{
              width: `${strength.percentage}%`,
              backgroundColor: getStrengthColor(),
            }}
          />
        </div>
        <span
          className="strength-label"
          style={{ color: getStrengthColor() }}
        >
          {getStrengthLabel()}
        </span>
      </div>

      {/* Requirements List */}
      <div className="requirements-checklist">
        <div className="requirement-item">
          <span className={password.length >= 8 ? "requirement-met" : "requirement-unmet"}>
            ✓
          </span>
          <span>At least 8 characters</span>
        </div>
        <div className="requirement-item">
          <span className={/[A-Z]/.test(password) ? "requirement-met" : "requirement-unmet"}>
            ✓
          </span>
          <span>One uppercase letter (A-Z)</span>
        </div>
        <div className="requirement-item">
          <span className={/[a-z]/.test(password) ? "requirement-met" : "requirement-unmet"}>
            ✓
          </span>
          <span>One lowercase letter (a-z)</span>
        </div>
        <div className="requirement-item">
          <span className={/[0-9]/.test(password) ? "requirement-met" : "requirement-unmet"}>
            ✓
          </span>
          <span>One numeric digit (0-9)</span>
        </div>
        <div className="requirement-item">
          <span
            className={
              '!@#$%^&*()_+-=[]{}|;:\'",.<>?/'.split("").some(char => password.includes(char))
                ? "requirement-met"
                : "requirement-unmet"
            }
          >
            ✓
          </span>
          <span>One special character (!@#$%^&*)</span>
        </div>
      </div>

      {/* Error Messages */}
      {!validation.isValid && validation.errors.length > 0 && (
        <div className="password-errors">
          <p className="error-title">Password must contain:</p>
          <ul className="error-list">
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
