import React from "react";

const Spinner = ({ text = "Submitting...", size = "md", className = "" }) => {
  const sizeMap = { sm: "spinner-sm", md: "spinner", lg: "spinner-lg" };
  return (
    <span className={`${sizeMap[size] || "spinner"} ${className}`}>
      <span className="spinner-icon"></span>
      {text}
    </span>
  );
};

export default Spinner;