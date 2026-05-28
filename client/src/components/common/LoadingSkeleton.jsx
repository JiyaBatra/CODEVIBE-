import React from "react";
import "./LoadingSkeleton.css";

const LoadingSkeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  variant = "text", // "text", "circle", "rect"
  className = "",
  style = {}
}) => {
  const customStyle = {
    width,
    height,
    borderRadius: variant === "circle" ? "50%" : borderRadius,
    ...style
  };

  return (
    <div
      className={`skeleton-loader skeleton-${variant} ${className}`}
      style={customStyle}
    />
  );
};

export default LoadingSkeleton;
