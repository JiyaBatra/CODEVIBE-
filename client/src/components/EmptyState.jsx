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
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-gray-700 bg-gray-900 shadow-lg">
      
      <div className="text-6xl text-gray-500 mb-4">
        {icon || <FaInbox />}
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        {title}
      </h2>

      <p className="text-gray-400 max-w-md mb-6">
        {description}
      </p>

      {buttonText && typeof onButtonClick === "function" && (
        <button
          onClick={onButtonClick}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;