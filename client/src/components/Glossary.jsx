import { useState, useMemo } from "react";
import "./Glossary.css";

const glossaryData = [
  // A
  {
    term: "Algorithm",
    category: "CS Fundamentals",
    definition:
      "A step-by-step set of instructions designed to solve a problem or accomplish a task. Like a recipe — it tells the computer exactly what to do and in what order.",
  },
  {
    term: "API",
    category: "Web Development",
    definition:
      "Application Programming Interface. A way for two programs to talk to each other. For example, a weather app uses a weather API to fetch current weather data from a remote server.",
  },
  {
    term: "Array",
    category: "JavaScript",
    definition:
      "A list of values stored in a single variable. Example: const fruits = ['apple', 'banana', 'cherry']; Arrays are zero-indexed, meaning the first item is at position 0.",
  },
  {
    term: "Attribute",
    category: "HTML",
    definition:
      "Extra information added inside an HTML tag to modify its behaviour. For example, in <img src='photo.jpg' alt='A photo'>, both src and alt are attributes.",
  },
  // B
  {
    term: "Boolean",
    category: "JavaScript",
    definition:
      "A data type that can only be one of two values: true or false. Used heavily in conditions — for example, isLoggedIn = true.",
  },
  {
    term: "Box Model",
    category: "CSS",
    definition:
      "The CSS concept that wraps every HTML element in invisible boxes: content → padding → border → margin. Understanding this is key to controlling spacing and layout.",
  },
  {
    term: "Browser",
    category: "Web Development",
    definition:
      "A program (like Chrome, Firefox, or Safari) that reads HTML, CSS, and JavaScript files and displays web pages visually on your screen.",
  },
  // C
  {
    term: "Callback",
    category: "JavaScript",
    definition:
      "A function passed as an argument to another function, to be called later. Example: setTimeout(function() { alert('Hi!'); }, 1000); — the inner function is a callback.",
  },
  {
    term: "Class",
    category: "CSS",
    definition:
      "A reusable name given to HTML elements using the class attribute. CSS can then style all elements sharing that class using a dot selector: .card { background: white; }",
  },
  {
    term: "Compiler",
    category: "CS Fundamentals",
    definition:
      "A program that translates source code written in one language (like C) into machine code the computer can execute. CODEVIBE's built-in compiler lets you run code right in the browser.",
  },
  {
    term: "Console",
    category: "JavaScript",
    definition:
      "A developer tool in browsers used for debugging. console.log('Hello') prints output to it. Press F12 → Console tab to see it in any browser.",
  },
  {
    term: "CSS",
    category: "CSS",
    definition:
      "Cascading Style Sheets. The language used to style HTML pages — controlling colours, fonts, spacing, layout, animations, and more.",
  },
  // D
  {
    term: "Data Type",
    category: "CS Fundamentals",
    definition:
      "The kind of value a variable holds. Common types include: string (text), number, boolean (true/false), array (list), and object.",
  },
  {
    term: "Declaration",
    category: "CSS",
    definition:
      "A single CSS rule inside a block. For example, color: red; is a declaration — it has a property (color) and a value (red).",
  },
  {
    term: "DOM",
    category: "JavaScript",
    definition:
      "Document Object Model. A tree-like representation of your HTML page in memory. JavaScript uses the DOM to read, add, change, or remove elements dynamically.",
  },
  // E
  {
    term: "Element",
    category: "HTML",
    definition:
      "A single building block of a web page, consisting of an opening tag, optional content, and a closing tag. Example: <p>Hello World</p> is a paragraph element.",
  },
  {
    term: "Event",
    category: "JavaScript",
    definition:
      "Something that happens in the browser — a click, keypress, scroll, or page load. You can write JavaScript to 'listen' for events and respond to them.",
  },
  {
    term: "Event Listener",
    category: "JavaScript",
    definition:
      "A function that waits for a specific event to happen on an element. Example: button.addEventListener('click', doSomething); — runs doSomething when the button is clicked.",
  },
  // F
  {
    term: "Flexbox",
    category: "CSS",
    definition:
      "A CSS layout model that makes it easy to align and distribute space among items in a container. Use display: flex on a parent element to activate it.",
  },
  {
    term: "Float",
    category: "CSS",
    definition:
      "A CSS property that pushes an element to the left or right, allowing text or other elements to wrap around it. Largely replaced by Flexbox and Grid for layouts.",
  },
  {
    term: "Function",
    category: "JavaScript",
    definition:
      "A reusable block of code that performs a specific task. You define it once and can call it many times. Example: function greet(name) { return 'Hello, ' + name; }",
  },
  // G
  {
    term: "Grid",
    category: "CSS",
    definition:
      "A powerful CSS layout system that divides a page into rows and columns. Use display: grid on a container to place elements precisely anywhere on the grid.",
  },
  // H
  {
    term: "HTML",
    category: "HTML",
    definition:
      "HyperText Markup Language. The standard language used to create the structure of web pages. It uses tags like <h1>, <p>, <div>, and <img> to define content.",
  },
  {
    term: "HTTP",
    category: "Web Development",
    definition:
      "HyperText Transfer Protocol. The set of rules that governs how data is sent between a browser and a web server. HTTPS is the secure, encrypted version.",
  },
  // I
  {
    term: "ID",
    category: "HTML",
    definition:
      "A unique name given to a single HTML element using the id attribute. In CSS, you target it with a hash: #header { font-size: 24px; }. Each ID must be unique on the page.",
  },
  {
    term: "Inheritance",
    category: "CSS",
    definition:
      "When CSS properties (like font-family or color) are automatically passed from a parent element down to its children, unless overridden.",
  },
  // J
  {
    term: "JavaScript",
    category: "JavaScript",
    definition:
      "The programming language of the web. While HTML gives structure and CSS gives style, JavaScript adds interactivity — like buttons that respond to clicks, forms that validate input, and content that loads dynamically.",
  },
  {
    term: "JSON",
    category: "Web Development",
    definition:
      "JavaScript Object Notation. A lightweight text format for storing and transferring data between a server and a browser. It looks like a JavaScript object: { 'name': 'Alice', 'age': 25 }",
  },
  // L
  {
    term: "Loop",
    category: "CS Fundamentals",
    definition:
      "A way to repeat a block of code multiple times. A for loop runs a set number of times; a while loop runs as long as a condition is true.",
  },
  // M
  {
    term: "Margin",
    category: "CSS",
    definition:
      "The transparent space outside an element's border. Use it to create gaps between elements. Example: margin: 16px adds 16px of space on all four sides.",
  },
  {
    term: "Media Query",
    category: "CSS",
    definition:
      "A CSS rule that applies styles only when certain conditions are met — most commonly used to make layouts responsive: @media (max-width: 768px) { ... }",
  },
  // N
  {
    term: "Null",
    category: "JavaScript",
    definition:
      "A special value that means 'intentionally empty' or 'no value'. Different from undefined — null is deliberately assigned, while undefined means a variable was declared but never given a value.",
  },
  // O
  {
    term: "Object",
    category: "JavaScript",
    definition:
      "A collection of key-value pairs used to represent real-world things. Example: const user = { name: 'Alice', age: 25, isAdmin: false }; Properties are accessed with user.name or user['name'].",
  },
  {
    term: "Operator",
    category: "CS Fundamentals",
    definition:
      "A symbol that performs an operation on values. Examples: + (add), - (subtract), === (strict equal), && (AND), || (OR), ! (NOT).",
  },
  // P
  {
    term: "Padding",
    category: "CSS",
    definition:
      "The space between an element's content and its border. Unlike margin, it is inside the element and takes its background color.",
  },
  {
    term: "Parameter",
    category: "JavaScript",
    definition:
      "A named variable in a function definition that acts as a placeholder for values passed in when the function is called. In function add(a, b), a and b are parameters.",
  },
  {
    term: "Property",
    category: "CSS",
    definition:
      "The CSS attribute you want to change, like color, font-size, or margin. A declaration is always: property: value;",
  },
  // R
  {
    term: "Responsive Design",
    category: "CSS",
    definition:
      "An approach to web design where layouts automatically adapt to fit different screen sizes — desktop, tablet, and mobile. Achieved using flexible grids, fluid images, and media queries.",
  },
  // S
  {
    term: "Selector",
    category: "CSS",
    definition:
      "The part of a CSS rule that identifies which HTML elements to style. Examples: p targets all paragraphs, .card targets elements with class 'card', #hero targets the element with id 'hero'.",
  },
  {
    term: "Semantic HTML",
    category: "HTML",
    definition:
      "Using HTML tags that describe the meaning of content, not just its appearance. For example, using <nav>, <article>, <footer> instead of generic <div> tags helps browsers and screen readers understand the page.",
  },
  {
    term: "String",
    category: "JavaScript",
    definition:
      "A sequence of characters (text) enclosed in quotes. Examples: 'Hello', \"World\", `My name is ${name}`. Strings have built-in methods like .toUpperCase(), .trim(), and .includes().",
  },
  // T
  {
    term: "Tag",
    category: "HTML",
    definition:
      "The code marker that defines an HTML element. Most elements have an opening tag <p> and closing tag </p>. Some are self-closing, like <img /> or <br />.",
  },
  {
    term: "Template Literal",
    category: "JavaScript",
    definition:
      "A modern JavaScript string syntax using backticks (`) that allows embedding expressions: `Hello, ${name}!`. Much cleaner than string concatenation.",
  },
  // U
  {
    term: "Undefined",
    category: "JavaScript",
    definition:
      "A value automatically assigned to a variable that has been declared but not yet given a value. Example: let x; — x is undefined until you assign something.",
  },
  // V
  {
    term: "Variable",
    category: "JavaScript",
    definition:
      "A named container for storing data. In modern JavaScript, use const for values that won't change and let for values that will. Example: const pi = 3.14;",
  },
  // W
  {
    term: "Web Server",
    category: "Web Development",
    definition:
      "A computer (or software) that stores website files and sends them to browsers when requested. When you visit a URL, your browser sends a request to a web server, which responds with the HTML, CSS, and JS files.",
  },
];

const CATEGORIES = [
  "All",
  "HTML",
  "CSS",
  "JavaScript",
  "Web Development",
  "CS Fundamentals",
];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLetter, setActiveLetter] = useState(null);
  const [expandedTerm, setExpandedTerm] = useState(null);

  const filtered = useMemo(() => {
    return glossaryData.filter((item) => {
      const matchSearch =
        search === "" ||
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.definition.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchLetter =
        activeLetter === null || item.term[0].toUpperCase() === activeLetter;
      return matchSearch && matchCategory && matchLetter;
    });
  }, [search, activeCategory, activeLetter]);

  const availableLetters = useMemo(
    () => new Set(glossaryData.map((i) => i.term[0].toUpperCase())),
    [],
  );

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((item) => {
      const letter = item.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(item);
    });
    return map;
  }, [filtered]);

  const categoryColors = {
    HTML: "#e85d04",
    CSS: "#3a86ff",
    JavaScript: "#ffbe0b",
    "Web Development": "#8338ec",
    "CS Fundamentals": "#06d6a0",
  };

  return (
    <div className="glossary-page">
      {/* Header */}
      <div className="glossary-hero">
        <div className="glossary-hero-bg" />
        <div className="glossary-hero-content">
          <span className="glossary-tag">Reference Guide</span>
          <h1 className="glossary-title">
            Programming
            <br />
            <span className="glossary-title-accent">Glossary</span>
          </h1>
          <p className="glossary-subtitle">
            Every term explained in plain English — no jargon, no confusion.
          </p>
          {/* Search */}
          <div className="glossary-search-wrap">
            <span className="glossary-search-icon">⌕</span>
            <input
              className="glossary-search"
              type="text"
              placeholder="Search terms or definitions…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveLetter(null);
              }}
            />
            {search && (
              <button className="glossary-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
          <p className="glossary-count">{filtered.length} terms found</p>
        </div>
      </div>

      <div className="glossary-body">
        {/* Sidebar */}
        <aside className="glossary-sidebar">
          {/* Categories */}
          <div className="glossary-sidebar-section">
            <h3 className="glossary-sidebar-heading">Category</h3>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`glossary-cat-btn ${activeCategory === cat ? "active" : ""}`}
                style={
                  activeCategory === cat && cat !== "All"
                    ? {
                        borderColor: categoryColors[cat],
                        color: categoryColors[cat],
                      }
                    : {}
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat !== "All" && (
                  <span
                    className="glossary-cat-dot"
                    style={{ background: categoryColors[cat] }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* A–Z Nav */}
          <div className="glossary-sidebar-section">
            <h3 className="glossary-sidebar-heading">Jump to Letter</h3>
            <div className="glossary-az">
              <button
                className={`glossary-az-btn ${activeLetter === null ? "active" : ""}`}
                onClick={() => setActiveLetter(null)}
              >
                All
              </button>
              {ALPHABET.map((l) => (
                <button
                  key={l}
                  className={`glossary-az-btn ${activeLetter === l ? "active" : ""} ${!availableLetters.has(l) ? "disabled" : ""}`}
                  onClick={() =>
                    availableLetters.has(l) &&
                    setActiveLetter(activeLetter === l ? null : l)
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="glossary-main">
          {filtered.length === 0 ? (
            <div className="glossary-empty">
              <span className="glossary-empty-icon">🔍</span>
              <p>No terms match your search.</p>
              <button
                className="glossary-reset-btn"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setActiveLetter(null);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            Object.keys(grouped)
              .sort()
              .map((letter) => (
                <section
                  key={letter}
                  className="glossary-letter-group"
                  id={`letter-${letter}`}
                >
                  <div className="glossary-letter-header">
                    <span className="glossary-letter-label">{letter}</span>
                    <span className="glossary-letter-count">
                      {grouped[letter].length} term
                      {grouped[letter].length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="glossary-terms">
                    {grouped[letter].map((item) => (
                      <div
                        key={item.term}
                        className={`glossary-card ${expandedTerm === item.term ? "expanded" : ""}`}
                        onClick={() =>
                          setExpandedTerm(
                            expandedTerm === item.term ? null : item.term,
                          )
                        }
                      >
                        <div className="glossary-card-header">
                          <div className="glossary-card-left">
                            <h3 className="glossary-term">{item.term}</h3>
                            <span
                              className="glossary-badge"
                              style={{
                                background:
                                  categoryColors[item.category] + "22",
                                color: categoryColors[item.category],
                                borderColor:
                                  categoryColors[item.category] + "44",
                              }}
                            >
                              {item.category}
                            </span>
                          </div>
                          <span
                            className={`glossary-chevron ${expandedTerm === item.term ? "open" : ""}`}
                          >
                            ›
                          </span>
                        </div>
                        <p className="glossary-definition">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))
          )}
        </main>
      </div>
    </div>
  );
}
