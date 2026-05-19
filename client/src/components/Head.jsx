import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaTachometerAlt, FaGamepad, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../assets/websitelogo.png";

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

const NAV_LINKS = [
  { to: "/Login",     icon: <FaSignInAlt className="nav-icon" />,       label: "Login"     },
  { to: "/Signup",    icon: <FaUserPlus className="nav-icon" />,         label: "Sign Up"   },
  { to: "/Dashboard", icon: <FaTachometerAlt className="nav-icon" />,    label: "Dashboard" },
];

const Head = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = COURSES.filter((c) =>
      c.label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (course) => {
    setQuery(course.label);
    setSuggestions([]);
    setFocused(false);
    navigate(course.path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) handleSelect(suggestions[0]);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      {/* Row 1: Logo + Nav + Hamburger */}
      <div className="header-top">
        <div className="header-logo-wrapper">
          <Link to="/" aria-label="Go to homepage" className="logo-link">
            <img src={logo} alt="CodeVibe Logo" title="CodeVibe - Learn. Practice. Master." />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? " nav-link--active" : ""}`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`ham-bar ham-bar--1${menuOpen ? " open" : ""}`} />
          <span className={`ham-bar ham-bar--2${menuOpen ? " open" : ""}`} />
          <span className={`ham-bar ham-bar--3${menuOpen ? " open" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <nav
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link${isActive(to) ? " nav-link--active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {icon}<span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Row 2: Title */}
      <div className="header-title-row">
        <h1>
          <FaGamepad className="title-icon" />
          CodeVibe
          <FaGamepad className="title-icon" />
        </h1>
        <p className="header-tagline">Learn &bull; Practice &bull; Master &bull; Code &mdash; Level Up Your Programming Skills</p>
      </div>

      {/* Row 3: Search Bar */}
      <div className="header-search-row" ref={wrapperRef}>
        <form
          className={`search-form${focused ? " search-form--focused" : ""}`}
          onSubmit={handleSubmit}
          role="search"
          aria-label="Search courses"
        >
          <input
            ref={inputRef}
            type="text"
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
    </header>
  );
};

export default Head;
