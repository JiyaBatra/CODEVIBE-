import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useDebounce } from "../hooks/useDebounce"; // added
import { FaSignInAlt, FaSignOutAlt, FaUserPlus, FaTachometerAlt, FaGamepad, FaSearch, FaTimes, FaHome, FaQuestionCircle, FaBook, FaEnvelope, FaTrophy, FaMedal } from "react-icons/fa";
import logo from "../assets/favicon.png";
import StreakCounter from "./StreakCounter.jsx";
import NotificationBell from "./common/NotificationBell.jsx";
import { FaChevronDown, FaTasks, FaLightbulb } from "react-icons/fa";

const COURSES = [
  { label: "HTML Basics", path: "/HtmlLesson" },
  { label: "CSS for Beginner", path: "/CssLesson" },
  { label: "JS for Beginner", path: "/JsLesson" },
  { label: "OOP Concepts", path: "/OOPLesson" },
  { label: "Data Structures & Algorithms", path: "/DsaLesson" },
  { label: "Node.js", path: "/NodeLesson" },
  { label: "React.js", path: "/ReactLesson" },
  { label: "Express.js", path: "/ExpressLesson" },
  { label: "MongoDB", path: "/MongoLesson" },
  { label: "DBMS", path: "/DbmsLesson" },
];

const Head = () => {
  const { query, setQuery } = useSearch();
  const debouncedQuery = useDebounce(query, 350); // added
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/lessons";

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

  const [showProjects, setShowProjects] = useState(false);

useEffect(() => {
  const closeDropdown = () => {
    setShowProjects(false);
  };

  document.addEventListener("click", closeDropdown);

  return () => {
    document.removeEventListener("click", closeDropdown);
  };
}, []);

  //  Filtering now runs only when debouncedQuery changes, not on every keystroke
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
  setError("");
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

  if (!query.trim()) {
    setError("Please enter a course name.");
    return;
  }

  setError("");

  const exactMatch = COURSES.find(
    (c) => c.label.toLowerCase() === query.trim().toLowerCase(),
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
        {/* Row 1: Logo + Nav + Hamburger */}
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

          {/* Desktop Nav */}
         <button
  type="button"
  className="nav-link"
  onClick={() => {
    navigate("/lessons");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }}
>
  <span>Home</span>
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => navigate("/lessons", { state: { scrollToCourses: true } })}
>
  <span>Courses</span>
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => navigate("/lessons", { state: { scrollToRoadmap: true } })}
>
  <span>Roadmap Generator</span>
</button>


<div
  className="dropdown"
  onClick={(e) => e.stopPropagation()}
>
  <button
    type="button"
    className="nav-link dropdown-btn"
    onClick={() => setShowProjects(!showProjects)}
  >
    <span>Projects</span>
    <FaChevronDown
      className={`dropdown-arrow ${
        showProjects ? "rotate-arrow" : ""
      }`}
    />
  </button>

  {showProjects && (
    <div className="dropdown-content">
      <button
        className="dropdown-item"
        onClick={() => {
          navigate("/lessons", {
            state: { scrollToProjectGenerator: true }
          });
          setShowProjects(false);
        }}
      >
        <FaTasks />
        <span>Project Milestone</span>
      </button>

      <button
        className="dropdown-item"
        onClick={() => {
          navigate("/lessons", {
            state: { scrollToProjectSuggestions: true }
          });
          setShowProjects(false);
        }}
      >
        <FaLightbulb />
        <span>Project Ideas</span>
      </button>
    </div>
  )}
</div>
<button
  type="button"
  className="nav-link"
  onClick={() => navigate("/lessons", { state: { scrollToFaq: true } })}
>
  <span>FAQ</span>
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => navigate("/contact")}
>
  <span>Contact Us</span>
</button>

<Link to="/glossary" className="nav-link">
  <span>Glossary</span>
</Link>

          {/* 2. Conditional Links based on Auth State */}
          <div className="header-navlink">

            {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' , color: 'white'}}>
              <NotificationBell />
              <StreakCounter />
              <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/leaderboard")}
             >
             <FaTrophy className="nav-icon" />
             <span>LeaderBoard</span>
            </button>

            <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/badges")}
            >
            <FaMedal className="nav-icon" />
            <span>Badges</span>
            </button>

            <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/dashboard")}
            >
           <FaTachometerAlt className="nav-icon" />
           <span>Dashboard</span>
           </button>
          <button
           type="button"
           className="nav-link"
           onClick={() => {
           handleLogout();
           navigate("/login");
           }}
>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
          </button>
              
            </div>
            ) : (
              <>

          <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/login")}
          >
          <FaSignInAlt className="nav-icon" />
          <span>Login</span>
          </button>

          <button 
            type="button"
            className="nav-link"
            onClick={() => navigate("/signup")}
          >
          <FaUserPlus className="nav-icon" />
          <span>Sign Up</span>
          </button>
              
              </>
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

    
              

      {/* Mobile Nav Drawer */}
<nav
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
      >
<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);

    navigate("/lessons");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }}
>
  Home
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);
    navigate("/lessons", {
      state: { scrollToCourses: true }
    });
  }}
>
  Courses
</button>
        {user ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }}>
              <StreakCounter />
            </div>
            <Link to="/leaderboard" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaTrophy className="nav-icon" /><span>Leaderboard</span>
            </Link>
            <Link to="/badges" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaMedal className="nav-icon" /><span>Badges</span>
            </Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaTachometerAlt className="nav-icon" /><span>Dashboard</span>
            </Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">
              <FaSignOutAlt className="nav-icon" />
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="nav-link"
            >
              <FaSignOutAlt className="nav-icon" />
              <span>Logout</span>
            </Link>
            <Link
              to="/signup"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserPlus className="nav-icon" />
              <span>Sign Up</span>
            </Link>
          </>
        )}

<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);
    navigate("/lessons", {
      state: { scrollToRoadmap: true }
    });
  }}
>
  Roadmap Generator
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);
    navigate("/lessons", {
      state: { scrollToProjectGenerator: true }
    });
  }}
>
  Project Milestone
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);
    navigate("/lessons", {
      state: { scrollToProjectSuggestions: true }
    });
  }}
>
  Project Ideas
</button>

<button
  type="button"
  className="nav-link"
  onClick={() => {
    setMenuOpen(false);
    navigate("/lessons", {
      state: { scrollToFaq: true }
    });
  }}
>
  FAQ
</button>
<Link
  to="/contact"
  className="nav-link"
  onClick={() => setMenuOpen(false)}
>
  Contact Us
</Link>
<Link
  to="/glossary"
  className="nav-link"
  onClick={() => setMenuOpen(false)}
>
  Glossary
</Link>
</nav>

      {isHomePage && (
        <div className="header-title-row">
          <h1>
            <FaGamepad className="title-icon" />
            CodeVibe
            <FaGamepad className="title-icon" />
          </h1>
          <p className="header-tagline">
            Learn &bull; Practice &bull; Master &bull; Code &mdash; Level Up
            Your Programming Skills
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
                <FaTimes size={15} />
              </button>
            )}
            <button type="submit" className="search-btn" aria-label="Search">
               Search
            </button>

            {error && (
              <div className="search-error">
            {error}
              </div>
            )}

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