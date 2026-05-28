import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  required = true,
  hint = null,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="password-field">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={id.includes("confirm") ? "new-password" : "current-password"}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((show) => !show)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
        </button>
      </div>
      {hint && (
        <span id={`${id}-hint`} className="password-field__hint" style={{ display: "block", fontSize: "0.85rem", marginTop: "4px" }}>
          {hint}
        </span>
      )}
    </>
  );
}