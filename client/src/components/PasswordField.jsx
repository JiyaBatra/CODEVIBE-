import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  required = true,
  hint = null,
  hasError = false,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="password-field">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={hasError ? "input-error" : ""}
          aria-invalid={hasError}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={id.includes("confirm") ? "new-password" : "current-password"}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((show) => !show)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <FaEye aria-hidden="true" /> : <FaEyeSlash aria-hidden="true" />}
        </button>
      </div>
      {hint}
    </>
  );
}