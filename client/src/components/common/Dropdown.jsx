import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ value, onChange, options, placeholder, style, dropdownStyle, triggerStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => {
    if (typeof opt === "object") {
      return opt.value === value;
    }
    return opt === value;
  });

  const displayLabel = selectedOption
    ? typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption
    : placeholder;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "inline-block",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <style>{`
        .custom-dropdown-list::-webkit-scrollbar {
          width: 6px;
        }
        .custom-dropdown-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-dropdown-list::-webkit-scrollbar-thumb {
          background: rgba(255, 75, 110, 0.4);
          border-radius: 10px;
        }
        .custom-dropdown-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 75, 110, 0.7);
        }
      `}</style>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "14px 18px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.08)",
          color: value ? "#fff" : "rgba(255, 255, 255, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          outline: "none",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
          margin: 0,
          ...triggerStyle,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#ff4d88";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 77, 136, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = triggerStyle?.border || "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <span>{displayLabel}</span>
        <FaChevronDown
          style={{
            marginLeft: "10px",
            fontSize: "0.85rem",
            color: "#ff4d88",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {isOpen && (
        <ul
          className="custom-dropdown-list"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            width: "100%",
            background: "rgba(20, 20, 40, 0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 77, 136, 0.4)",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 77, 136, 0.15)",
            padding: "6px 0",
            margin: 0,
            listStyle: "none",
            maxHeight: "260px",
            overflowY: "auto",
            zIndex: 1000,
            textAlign: "left",
            boxSizing: "border-box",
            ...dropdownStyle,
          }}
        >
          <li
            onClick={() => handleSelect("")}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "0.95rem",
              color: "rgba(255, 255, 255, 0.5)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {placeholder}
          </li>

          {options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            const isSelected = val === value;

            return (
              <li
                key={val}
                onClick={() => handleSelect(val)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  color: isSelected ? "#ff4d88" : "rgba(255, 255, 255, 0.9)",
                  background: isSelected ? "rgba(255, 75, 110, 0.15)" : "transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isSelected
                    ? "rgba(255, 75, 110, 0.25)"
                    : "rgba(255, 75, 110, 0.12)";
                  e.currentTarget.style.color = "#ff4d88";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isSelected
                    ? "rgba(255, 75, 110, 0.15)"
                    : "transparent";
                  e.currentTarget.style.color = isSelected
                    ? "#ff4d88"
                    : "rgba(255, 255, 255, 0.9)";
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
