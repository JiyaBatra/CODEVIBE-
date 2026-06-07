import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useDebounce } from "../hooks/useDebounce";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaGamepad,
  FaSearch,
  FaTimes,
  FaHome,
  FaQuestionCircle,
  FaBook,
  FaEnvelope,
  FaTrophy,
  FaChevronDown,
  FaTasks,
  FaLightbulb
} from "react-icons/fa";
import logo from "../assets/favicon.png";
import StreakCounter from "./StreakCounter.jsx";

const COURSES = [
  { label: "HTML Basics", path: "/HtmlLesson" },
  { label: "CSS for Beginner", path: "/CssLesson" },
  { label: "JS for Beginner", path: "/JsLesson" },
  { label: "OOP Concepts", path: "/OopLesson" },
  { label: "Data Structures & Algorithms", path: "/DsaLesson" },
  { label: "Node.js", path: "/NodeLesson" },
  { label: "React.js", path: "/ReactLesson" },
  { label: "Express.js", path: "/ExpressLesson" },
  { label: "MongoDB", path: "/MongoLesson" },
  { label: "DBMS", path: "/DbmsLesson" },
];

const Head = () => {
  const { query, setQuery } = useSearch();
  const debouncedQuery = useDebounce(query, 350);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHomePage = location.pathname === "/" || location.pathname === "/lessons";

  // Check if a NavLink pointing to '/lessons' matches a specific custom state criteria
  const isLessonsSubRouteActive = (stateKey) => {
    return location.pathname === "/lessons" && location.state?.[stateKey] === true;
  };

  // Handles closing dropdowns and menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Project Dropdown closer
  useEffect(() => {
    const closeDropdown = () => {
      setShowProjects(false);
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  // Filtering runs when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = COURSES.filter((c) =>
      c.label.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
    );
    setSuggestions(filtered);
  }, [debouncedQuery]);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length === 0) {
      setSuggestions([]);
    }
  };

  const handleSelect = (course) => {
    setQuery(course.label);
    setSuggestions([]);
    setFocused(false);
    if (!user) {
      navigate("/login", { state: { from: { pathname: course.path } } });
    } else {
      navigate(course.path);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exactMatch = COURSES.find(
      (c) => c.label.toLowerCase() === query.trim().toLowerCase()
    );
    if (exactMatch) {
      handleSelect(exactMatch);
    } else {
      setSuggestions([]);
    }
  };

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <header className="site-header" ref={wrapperRef}>
      <nav className="header-nav" aria-label="Main navigation">
        {/* Row 1: Logo + Nav */}
        <div className="header-top">
          <div className="header-logo-wrapper">
            <Link to="/" aria-label="Go to homepage" className="logo-link">
              <img
                src={logo}
                alt="CodeVibe Logo"
                title="CodeVibe - Learn. Practice. Master."
              />
            </Link>
          </div>

          {/* Desktop Nav - Cleaned inline variables to align with dark theme variables */}
          <div className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <NavLink
              to="/lessons"
              state={{ scrollToTop: true }}
              className={() => `nav-link ${isHomePage && !location.state?.scrollToCourses && !location.state?.scrollToRoadmap && !location.state?.scrollToProjectGenerator && !location.state?.scrollToProjectSuggestions && !location.state?.scrollToFaq ? "active-link" : ""}`}
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/lessons"
              state={{ scrollToCourses: true }}
              className={() => `nav-link ${isLessonsSubRouteActive("scrollToCourses") ? "active-link" : ""}`}
            >
              <span>Courses</span>
            </NavLink>

            <NavLink
              to="/lessons"
              state={{ scrollToRoadmap: true }}
              className={() => `nav-link ${isLessonsSubRouteActive("scrollToRoadmap") ? "active-link" : ""}`}
            >
              <span>Roadmap Generator</span>
            </NavLink>

            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`nav-link dropdown-btn ${isLessonsSubRouteActive("scrollToProjectGenerator") || isLessonsSubRouteActive("scrollToProjectSuggestions") ? "active-link" : ""}`}
                onClick={() => setShowProjects(!showProjects)}
              >
                <span>Projects</span>
                <FaChevronDown className={`dropdown-arrow ${showProjects ? "rotate-arrow" : ""}`} />
              </button>

              {showProjects && (
                <div className="dropdown-content">
                  <NavLink
                    to="/lessons"
                    state={{ scrollToProjectGenerator: true }}
                    className="dropdown-item"
                    onClick={() => setShowProjects(false)}
                  >
                    <FaTasks />
                    <span>Project Milestone</span>
                  </NavLink>

                  <NavLink
                    to="/lessons"
                    state={{ scrollToProjectSuggestions: true }}
                    className="dropdown-item"
                    onClick={() => setShowProjects(false)}
                  >
                    <FaLightbulb />
                    <span>Project Ideas</span>
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/lessons"
              state={{ scrollToFaq: true }}
              className={() => `nav-link ${isLessonsSubRouteActive("scrollToFaq") ? "active-link" : ""}`}
            >
              <span>FAQ</span>
            </NavLink>

            <NavLink
              to="/contact"
              state={{ scrollToContact: true }}
              className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
            >
              <span>Contact Us</span>
            </NavLink>
          </div>

          {/* Conditional Auth Links */}
          <div className="header-navlink">
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "var(--text-primary)" }}>
                <StreakCounter />
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                >
                  <FaTrophy className="nav-icon" />
                  <span>LeaderBoard</span>
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                >
                  <FaTachometerAlt className="nav-icon" />
                  <span>Dashboard</span>
                </NavLink>

                <button
                  type="button"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="nav-icon" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                >
                  <FaSignInAlt className="nav-icon" />
                  <span>Login</span>
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                >
                  <FaUserPlus className="nav-icon" />
                  <span>Sign Up</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hamburger for mobile */}
      <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={`ham-bar ${menuOpen ? "open" : ""}`} />
        <span className={`ham-bar ${menuOpen ? "open" : ""}`} />
        <span className={`ham-bar ${menuOpen ? "open" : ""}`} />
      </button>

      {/* Unified Mobile Nav Drawer */}
      <nav
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
      >
        <NavLink
          to="/lessons"
          state={{ scrollToTop: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaHome className="nav-icon" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/lessons"
          state={{ scrollToCourses: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaBook className="nav-icon" />
          <span>Courses</span>
        </NavLink>

        <NavLink
          to="/lessons"
          state={{ scrollToRoadmap: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaTasks className="nav-icon" />
          <span>Roadmap Generator</span>
        </NavLink>

        <NavLink
          to="/lessons"
          state={{ scrollToProjectGenerator: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaTasks className="nav-icon" />
          <span>Project Milestone</span>
        </NavLink>

        <NavLink
          to="/lessons"
          state={{ scrollToProjectSuggestions: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaLightbulb className="nav-icon" />
          <span>Project Suggestions</span>
        </NavLink>

        <NavLink
          to="/lessons"
          state={{ scrollToFaq: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaQuestionCircle className="nav-icon" />
          <span>FAQ</span>
        </NavLink>

        <NavLink
          to="/contact"
          state={{ scrollToContact: true }}
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaEnvelope className="nav-icon" />
          <span>Contact Us</span>
        </NavLink>

        <NavLink to="/glossary" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaBook className="nav-icon" />
          <span>Glossary</span>
        </NavLink>

        {/* Auth specific mobile options */}
        {user ? (
          <>
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "8px" }}>
              <StreakCounter />
            </div>
            <NavLink to="/leaderboard" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaTrophy className="nav-icon" /><span>Leaderboard</span>
            </NavLink>
            <NavLink to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaTachometerAlt className="nav-icon" /><span>Dashboard</span>
            </NavLink>
            <button onClick={handleLogout} className="nav-link" style={{ textAlign: "left", width: "100%" }}>
              <FaSignOutAlt className="nav-icon" /><span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt className="nav-icon" /><span>Login</span>
            </NavLink>
            <NavLink to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaUserPlus className="nav-icon" /><span>Sign Up</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Row 2: Header title display */}
      {isHomePage && (
        <div className="header-title-row">
          <h1>
            <FaGamepad className="title-icon" />
            CodeVibe
            <FaGamepad className="title-icon" />
          </h1>
          <p className="header-tagline">
            Learn &bull; Practice &bull; Master &bull; Code &mdash; Level Up Your Programming Skills
          </p>
        </div>
      )}

      {/* Row 3: Search Bar */}
      {isHomePage && (
        <div className="header-search-row">
          <form
            className={`search-form ${focused ? "search-form--focused" : ""}`}
            onSubmit={handleSubmit}
            role="search"
            aria-label="Search courses"
          >
            <input
              ref={inputRef}
              type="text"
              id="search-courses"
              name="searchCourses"
              className="search-input"
              placeholder="Search courses — HTML, DSA, React..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded={suggestions.length > 0}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <button type="submit" className="search-btn" aria-label="Search">
              Search
            </button>

            {/* Suggestions Dropdown */}
            {focused && suggestions.length > 0 && (
              <ul
                id="search-suggestions"
                className="search-suggestions"
                role="listbox"
                aria-label="Course suggestions"
              >
                {suggestions.map((course) => (
                  <li
                    key={course.path}
                    role="option"
                    className="suggestion-item"
                    onMouseDown={() => handleSelect(course)}
                  >
                    <FaSearch className="suggestion-icon" aria-hidden="true" />
                    {course.label}
                  </li>
                ))}
              </ul>
            )}

            {/* No results */}
            {focused && query.trim().length > 0 && suggestions.length === 0 && (
              <div className="search-no-results" role="status">
                No courses found for &ldquo;{query}&rdquo;
              </div>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default Head;