import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useBackNavigation } from "../../hooks/useBackNavigation";
import "./GlobalBackNav.css";

const GlobalBackNav = () => {
  const { config, goBack } = useBackNavigation();

  if (!config) {
    return null;
  }

  return (
    <nav
      className={`global-back-nav global-back-nav--${config.variant}`}
      aria-label="Back navigation"
    >
      <div className="global-back-nav__inner">
        <button
          type="button"
          onClick={goBack}
          className="global-back-nav__button"
          aria-label={config.label}
          title={config.label}
        >
          <FaArrowLeft className="global-back-nav__icon" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default GlobalBackNav;
