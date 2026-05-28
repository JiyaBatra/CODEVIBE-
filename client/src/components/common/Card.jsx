import React from "react";
import "./Card.css";

const Card = ({
  children,
  title,
  headerActions,
  footer,
  elevation = "low", // "low", "medium", "high"
  interactive = false,
  className = "",
  onClick,
  ...props
}) => {
  const cardClassName = [
    "custom-card",
    `card-elevation-${elevation}`,
    interactive ? "card-interactive" : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClassName} onClick={onClick} {...props}>
      {(title || headerActions) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {headerActions && <div className="card-header-actions">{headerActions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
