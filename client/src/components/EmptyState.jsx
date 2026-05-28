import React from "react";
import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="empty-state flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-gray-700 bg-gray-900 shadow-lg" style={{ transition: "all 0.3s ease" }}>
      
      <div className="empty-state__icon text-6xl text-gray-500 mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>
        {icon || <FaInbox />}
      </div>

      <h2 className="empty-state__title text-2xl font-bold text-white mb-2">
        {title}
      </h2>

      <p className="empty-state__description text-gray-400 max-w-md mb-6">
        {description}
      </p>

      {buttonText && typeof onButtonClick === "function" && (
        <button
          onClick={onButtonClick}
          className="empty-state__btn px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105 duration-200"
          style={{ boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.4)" }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;