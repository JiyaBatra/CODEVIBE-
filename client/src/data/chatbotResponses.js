// ─────────────────────────────────────────────────────────────────────────────
// CodeVibe Chatbot Knowledge Base
// Every entry has SHORT + LONG keywords in English AND Hinglish so any phrasing
// ("explain X", "what is X", "X kya hai", "describe X", "tell me X") matches.
// ─────────────────────────────────────────────────────────────────────────────

export const chatbotResponses = [

  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ["hi", "hello", "hey", "namaste", "hola", "greetings", "wassup", "sup"],
    response: "Hello 👋 Welcome to CodeVibe! I'm your AI learning assistant.\n\nAsk me anything about:\n🌐 HTML & CSS\n⚡ JavaScript & React\n📦 Node.js & Express\n🍃 MongoDB\n🔁 DSA & OOP\n🐞 Debugging Errors"
  },
  {
    keywords: ["kaise ho", "how are you", "how are u", "how r u"],
    response: "Main bilkul ready hoon aapki coding help ke liye 😄 Let's learn something new today!"
  },
  {
    keywords: ["thanks", "thank you", "ty", "tysm", "shukriya", "dhanyawad"],
    response: "You're welcome! 🚀 Every expert was once a beginner. Keep coding!"
  },
  {
    keywords: ["bye", "goodbye", "cya", "see you", "alvida"],
    response: "Goodbye! 👋 Happy Coding! Come back anytime."
  },

  // ── HTML ───────────────────────────────────────────────────────────────────
  {
    keywords: [
      "html kya hai", "what is html", "html definition", "explain html",
      "describe html", "html intro", "html kya hota", "html ke baare",
      "hypertext markup", "html language", "html basics", "html kya"
    ],
    response: "🌐 **HTML (HyperText Markup Language)** webpage ka skeleton banata hai.\n\nHTML elements browser ko batate hain ki content (text, images, links) ko kaise display karna hai.\n\n```html\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n```\n\nHTML without CSS is like a body without clothes — it works but doesn't look great! 😄"
  },
  {
    keywords: [
      "html aur css difference", "html vs css", "difference between html and css",
      "html css difference", "html and css", "css vs html"
    ],
    response: "🆚 **HTML vs CSS**:\n\n- **HTML** → Structure/Skeleton (headings, paragraphs, images)\n- **CSS** → Style/Design (colors, fonts, layouts, animations)\n\nSimple analogy: HTML is the bones 🦴, CSS is the skin & clothes 👗!"
  },
  {
    keywords: [
      "html basic structure", "html structure", "html template", "html boilerplate",
      "basic html page", "html page structure", "html ka structure"
    ],
    response: "📄 **HTML Basic Structure**:\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n    <p>My first webpage.</p>\n  </body>\n</html>\n```\n\n- `<head>` → metadata, title, CSS links\n- `<body>` → visible content"
  },
  {
    keywords: [
      "div aur span", "div vs span", "difference between div and span",
      "div span difference", "div kya hai", "span kya hai"
    ],
    response: "📦 **`<div>` vs `<span>`**:\n\n| Feature | `<div>` | `<span>` |\n|---------|---------|----------|\n| Type | Block-level | Inline |\n| New line? | ✅ Yes | ❌ No |\n| Use | Layout sections | Style text inline |\n\n```html\n<div>I take full width</div>\n<p>I am <span style=\"color:red\">red</span> text</p>\n```"
  },
  {
    keywords: [
      "semantic tags", "semantic html", "semantic elements", "semantic kya hote",
      "what are semantic tags", "explain semantic", "semantic tag kya",
      "header footer nav article", "semantic"
    ],
    response: "🏷️ **Semantic HTML Tags** describe their own meaning:\n\n- ✅ Semantic: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`\n- ❌ Non-semantic: `<div>`, `<span>` (no meaning)\n\n**Why use them?**\n- Better SEO 🔍\n- Better Accessibility ♿\n- Cleaner, readable code ✨"
  },
  {
    keywords: [
      "css ko html me kaise add", "how to add css", "include css in html",
      "link css", "css add karna", "css ko html se kaise jodein",
      "ways to add css", "inline internal external css"
    ],
    response: "🎨 **3 Ways to add CSS in HTML**:\n\n1️⃣ **Inline** (not recommended)\n```html\n<p style=\"color: red;\">Text</p>\n```\n2️⃣ **Internal** (inside `<head>`)\n```html\n<style> p { color: red; } </style>\n```\n3️⃣ **External** ✅ (best practice)\n```html\n<link rel=\"stylesheet\" href=\"style.css\">\n```"
  },

  // ── CSS ────────────────────────────────────────────────────────────────────
  {
    keywords: [
      "flexbox kya hai", "what is flexbox", "explain flexbox", "css flexbox",
      "flexbox kya hota", "flexbox describe", "flexbox layout", "flex container",
      "justify-content", "align-items", "flexbox use"
    ],
    response: "📦 **CSS Flexbox** — 1D Layout System:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;  /* horizontal */\n  align-items: center;      /* vertical */\n  gap: 16px;\n}\n```\n\n**Key Properties:**\n- `flex-direction`: row / column\n- `justify-content`: center, space-between, flex-start\n- `align-items`: center, flex-start, stretch\n\n💡 Best for: Navigation bars, card rows, centering elements!"
  },
  {
    keywords: [
      "css grid kya hai", "what is css grid", "explain css grid", "grid layout",
      "css grid kya hota", "grid kya hai", "css grid describe", "grid-template"
    ],
    response: "🏁 **CSS Grid** — 2D Layout System (rows AND columns):\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\n💡 Best for: Page layouts, galleries, dashboards!\n\n**Flexbox vs Grid:**\n- Flexbox = 1D (row OR column)\n- Grid = 2D (row AND column)"
  },
  {
    keywords: [
      "responsive design", "how to make responsive", "responsive web design",
      "responsive kaise banate", "mobile responsive", "responsive website"
    ],
    response: "📱 **Responsive Design** — website har device par sahi dikhe:\n\n1. Viewport meta tag:\n```html\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n```\n2. Flexible units: `%`, `vw`, `vh`, `rem`, `em`\n3. Flexbox/Grid layouts\n4. Media Queries for breakpoints"
  },
  {
    keywords: [
      "media queries kya hoti", "what is media query", "explain media query",
      "media query kya hai", "css media query", "@media", "media queries"
    ],
    response: "🖥️ **Media Queries** — Apply styles based on screen size:\n\n```css\n/* Mobile first */\n.box { width: 100%; }\n\n/* Tablet (≥768px) */\n@media (min-width: 768px) {\n  .box { width: 50%; }\n}\n\n/* Desktop (≥1024px) */\n@media (min-width: 1024px) {\n  .box { width: 33%; }\n}\n```"
  },
  {
    keywords: [
      "margin aur padding difference", "margin vs padding", "margin padding difference",
      "margin kya hai", "padding kya hai", "explain margin padding",
      "what is margin", "what is padding"
    ],
    response: "📏 **Margin vs Padding**:\n\n```\n┌──────────────────────────┐\n│        MARGIN            │ ← Outside border (space between elements)\n│  ┌────────────────────┐  │\n│  │     PADDING        │  │ ← Inside border (space around content)\n│  │  ┌──────────────┐  │  │\n│  │  │   CONTENT    │  │  │\n│  │  └──────────────┘  │  │\n│  └────────────────────┘  │\n└──────────────────────────┘\n```\n\n- **Margin** = Space OUTSIDE the element\n- **Padding** = Space INSIDE the element"
  },
  {
    keywords: [
      "z-index kya hai", "what is z-index", "explain z-index", "z index",
      "z-index kya hota", "css z-index", "z index describe"
    ],
    response: "🥞 **z-index** controls which element appears ON TOP when elements overlap:\n\n```css\n.card { position: relative; z-index: 1; }\n.modal { position: fixed; z-index: 999; } /* appears on top */\n```\n\n⚠️ **Important**: z-index only works on positioned elements (`position: relative/absolute/fixed/sticky`)."
  },
  {
    keywords: [
      "position property", "css position", "relative absolute fixed sticky",
      "what is position in css", "explain position", "position kya hai",
      "absolute position", "fixed position", "relative position", "sticky position"
    ],
    response: "📍 **CSS Position Values**:\n\n| Value | Behavior |\n|-------|----------|\n| `static` | Default — normal flow |\n| `relative` | Offset from its normal position |\n| `absolute` | Positioned relative to nearest positioned ancestor |\n| `fixed` | Stays fixed to viewport (doesn't scroll) |\n| `sticky` | Switches between relative & fixed on scroll |\n\n```css\n.navbar { position: sticky; top: 0; }\n.modal  { position: fixed; top: 50%; left: 50%; }\n```"
  },
  {
    keywords: [
      "css animation kaise", "how to make css animation", "css animations",
      "keyframes kya hai", "@keyframes", "animation kaise banate",
      "explain css animation", "css animation"
    ],
    response: "🎬 **CSS Animations**:\n\n```css\n/* Step 1: Define animation */\n@keyframes bounce {\n  0%   { transform: translateY(0); }\n  50%  { transform: translateY(-20px); }\n  100% { transform: translateY(0); }\n}\n\n/* Step 2: Apply it */\n.ball {\n  animation: bounce 1s infinite ease-in-out;\n}\n```\n\nProperties: `animation-name`, `duration`, `timing-function`, `iteration-count`"
  },
  {
    keywords: [
      "center alignment", "how to center", "center a div", "center element css",
      "div ko center kaise", "element center karo", "centering in css",
      "center kaise karte", "center div"
    ],
    response: "🎯 **How to Center an Element** (Best ways):\n\n**Flexbox (Easiest ✅)**\n```css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n```\n\n**Grid**\n```css\n.parent {\n  display: grid;\n  place-items: center;\n}\n```"
  },

  // ── JavaScript ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "javascript kya hai", "what is javascript", "explain javascript",
      "js kya hai", "javascript intro", "js introduction",
      "javascript language", "describe javascript", "javascript kya"
    ],
    response: "⚡ **JavaScript** is the programming language of the web!\n\n- Runs in the browser (client-side)\n- Makes websites interactive (clicks, animations, API calls)\n- Also runs on server via Node.js\n\n```javascript\nconsole.log('Hello, World!');\ndocument.getElementById('btn').addEventListener('click', () => {\n  alert('Button clicked!');\n});\n```"
  },
  {
    keywords: [
      "var let const difference", "var let const", "let vs const", "var vs let",
      "difference between var let and const", "explain var let const",
      "var let aur const", "let const var kya"
    ],
    response: "📦 **var vs let vs const**:\n\n| | `var` | `let` | `const` |\n|--|-------|-------|--------|\n| Scope | Function | Block `{}` | Block `{}` |\n| Re-declare | ✅ | ❌ | ❌ |\n| Re-assign | ✅ | ✅ | ❌ |\n| Hoisted | ✅ (undefined) | ❌ | ❌ |\n\n💡 **Rule:** Always use `const` by default. Use `let` if value changes. Avoid `var`!"
  },
  {
    keywords: [
      "function kya hota", "what is function", "javascript function",
      "explain function", "function kya hai", "functions in js",
      "function describe", "function definition"
    ],
    response: "⚙️ **Functions** are reusable blocks of code:\n\n```javascript\n// Function Declaration\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Function Expression\nconst greet = function(name) {\n  return `Hello, ${name}!`;\n};\n\nconsole.log(greet('CodeVibe')); // Hello, CodeVibe!\n```\n\n💡 Functions reduce repetition and make code modular!"
  },
  {
    keywords: [
      "arrow function kya", "what is arrow function", "arrow function explain",
      "arrow functions js", "es6 arrow", "=> function", "fat arrow",
      "arrow function describe", "arrow function kya hota"
    ],
    response: "🏹 **Arrow Functions** (ES6+) — shorter syntax:\n\n```javascript\n// Traditional\nfunction add(a, b) { return a + b; }\n\n// Arrow Function\nconst add = (a, b) => a + b;\n\n// Single parameter — no brackets needed\nconst double = n => n * 2;\n\n// No parameters\nconst sayHi = () => 'Hi!';\n```\n\n⚠️ Arrow functions don't have their own `this` — important for OOP!"
  },
  {
    keywords: [
      "array aur object difference", "array vs object", "array object difference",
      "what is array", "what is object in js", "array kya hai",
      "object kya hai js", "explain array", "explain object js"
    ],
    response: "📊 **Array vs Object**:\n\n```javascript\n// Array — ordered list (indexed from 0)\nconst fruits = ['apple', 'mango', 'banana'];\nconsole.log(fruits[0]); // 'apple'\n\n// Object — key-value pairs\nconst user = { name: 'Rahul', age: 21, city: 'Delhi' };\nconsole.log(user.name); // 'Rahul'\n```\n\n- **Array** → use when ORDER matters\n- **Object** → use when you need NAMED properties"
  },
  {
    keywords: [
      "dom kya hai", "what is dom", "explain dom", "document object model",
      "dom manipulation", "dom kya hota", "dom describe",
      "javascript dom", "dom in js"
    ],
    response: "🌳 **DOM (Document Object Model)** is a tree representation of HTML:\n\n```javascript\n// Select elements\nconst btn = document.getElementById('myBtn');\nconst para = document.querySelector('.text');\n\n// Modify content\npara.textContent = 'Updated!';\nbtn.style.color = 'red';\n\n// Create elements\nconst div = document.createElement('div');\ndocument.body.appendChild(div);\n```\n\nJS uses the DOM to dynamically change HTML/CSS!"
  },
  {
    keywords: [
      "event listener kya hota", "what is event listener", "addeventlistener",
      "event listener explain", "events in js", "javascript events",
      "event listener describe", "event handling", "onclick addeventlistener"
    ],
    response: "👂 **Event Listeners** respond to user actions:\n\n```javascript\nconst btn = document.getElementById('btn');\n\n// Click event\nbtn.addEventListener('click', () => {\n  console.log('Button clicked!');\n});\n\n// Keyboard event\ndocument.addEventListener('keydown', (e) => {\n  console.log('Key pressed:', e.key);\n});\n```\n\nCommon events: `click`, `submit`, `keydown`, `mouseover`, `change`"
  },
  {
    keywords: [
      "promise kya hota", "what is promise", "javascript promises",
      "explain promise", "promise kya hai", "promises in js",
      "promise describe", ".then .catch"
    ],
    response: "🤝 **Promise** handles async operations:\n\n```javascript\nconst fetchData = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) resolve('Data fetched! ✅');\n  else reject('Error occurred! ❌');\n});\n\nfetchData\n  .then(data => console.log(data))   // Success\n  .catch(err => console.log(err));   // Failure\n```\n\n**States:** Pending → Fulfilled / Rejected"
  },
  {
    keywords: [
      "async await kya hai", "async/await", "explain async await",
      "async await describe", "asynchronous javascript", "async function",
      "what is async", "await kya hai", "async kya hota"
    ],
    response: "⏳ **Async/Await** — cleaner way to handle Promises:\n\n```javascript\nasync function loadUser() {\n  try {\n    const res = await fetch('https://api.example.com/user');\n    const data = await res.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n\nloadUser();\n```\n\n💡 `async` makes a function return a Promise. `await` pauses execution until Promise resolves!"
  },
  {
    keywords: [
      "closure kya hota", "what is closure", "explain closure",
      "closure in javascript", "closure describe", "closures js",
      "closure kya hai"
    ],
    response: "🔒 **Closure** — inner function remembers outer function's variables:\n\n```javascript\nfunction counter() {\n  let count = 0;          // outer variable\n  return function() {     // inner function\n    count++;              // remembers 'count'!\n    console.log(count);\n  };\n}\n\nconst increment = counter();\nincrement(); // 1\nincrement(); // 2\nincrement(); // 3\n```\n\n💡 The inner function \"closes over\" the outer scope — even after outer function finishes!"
  },
  {
    keywords: [
      "hoisting kya hai", "what is hoisting", "explain hoisting",
      "hoisting in javascript", "hoisting describe", "hoisting kya hota",
      "variable hoisting"
    ],
    response: "🎈 **Hoisting** — declarations moved to top before execution:\n\n```javascript\n// This works! (function hoisted)\ngreet(); // 'Hello!'\nfunction greet() { console.log('Hello!'); }\n\n// This FAILS! (var hoisted but not initialized)\nconsole.log(x); // undefined\nvar x = 5;\n\n// This FAILS! (let/const NOT hoisted)\nconsole.log(y); // ReferenceError!\nlet y = 10;\n```\n\n💡 Only `function` declarations and `var` are hoisted!"
  },

  // ── React ──────────────────────────────────────────────────────────────────
  {
    keywords: [
      "react kya hai", "what is react", "explain react", "reactjs",
      "react library", "react intro", "react js kya", "react describe",
      "react framework", "what is reactjs"
    ],
    response: "⚛️ **React.js** is a JavaScript library for building UIs:\n\n- Created by Facebook\n- Component-based architecture\n- Uses Virtual DOM for fast updates\n- Industry standard for frontend development\n\n```jsx\nfunction App() {\n  return <h1>Welcome to CodeVibe! 🚀</h1>;\n}\n```"
  },
  {
    keywords: [
      "react component kya", "what is react component", "component kya hai",
      "explain component", "react components", "component describe",
      "functional component", "reusable component"
    ],
    response: "🧱 **React Components** are reusable UI building blocks:\n\n```jsx\n// Functional Component (Modern way ✅)\nfunction Button({ label, onClick }) {\n  return (\n    <button onClick={onClick}>\n      {label}\n    </button>\n  );\n}\n\n// Usage\n<Button label=\"Click Me\" onClick={() => alert('Hi!')} />\n```\n\nComponents make UI modular, reusable, and maintainable!"
  },
  {
    keywords: [
      "functional vs class component", "functional aur class component",
      "class component vs functional", "difference between functional and class",
      "class component kya hai", "functional component kya hai"
    ],
    response: "🆚 **Functional vs Class Components**:\n\n| Feature | Functional | Class |\n|---------|-----------|-------|\n| Syntax | Simple function | ES6 class |\n| Hooks | ✅ useState, useEffect | ❌ (uses lifecycle) |\n| `this` keyword | ❌ Not needed | ✅ Required |\n| Modern? | ✅ Recommended | ❌ Old way |\n\n```jsx\n// Functional (Modern ✅)\nfunction Hello() { return <h1>Hello!</h1>; }\n\n// Class (Old way)\nclass Hello extends React.Component {\n  render() { return <h1>Hello!</h1>; }\n}\n```"
  },
  {
    keywords: [
      "jsx kya hai", "what is jsx", "explain jsx", "jsx describe",
      "javascript xml", "jsx syntax", "jsx kya hota"
    ],
    response: "⚛️ **JSX (JavaScript XML)** — write HTML inside JavaScript:\n\n```jsx\n// JSX\nconst element = <h1 className=\"title\">Hello World!</h1>;\n\n// JSX compiles to:\nconst element = React.createElement('h1', \n  { className: 'title' }, \n  'Hello World!'\n);\n```\n\n**JSX Rules:**\n- Use `className` instead of `class`\n- All tags must be closed: `<img />`, `<br />`\n- Return only ONE parent element"
  },
  {
    keywords: [
      "props kya hote", "what are props", "explain props", "props in react",
      "props kya hai", "props describe", "react props", "props pass karna"
    ],
    response: "🎁 **Props** pass data from parent to child component:\n\n```jsx\n// Parent\nfunction App() {\n  return <Welcome name=\"Rahul\" age={21} />;\n}\n\n// Child receives props\nfunction Welcome({ name, age }) {\n  return <p>{name} is {age} years old</p>;\n}\n```\n\n💡 **Props are READ-ONLY** — child cannot modify them!\nFor changing data, use **State** instead."
  },
  {
    keywords: [
      "state kya hoti", "what is state", "explain state", "state in react",
      "state kya hai", "state describe", "react state", "component state"
    ],
    response: "💾 **State** is component's internal memory that triggers re-render:\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0); // initial value = 0\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+1</button>\n    </div>\n  );\n}\n```\n\n💡 When state changes → component re-renders automatically!"
  },
  {
    keywords: [
      "usestate hook kya", "what is usestate", "explain usestate",
      "usestate hook", "usestate describe", "useState in react",
      "usestate kya hota", "use state"
    ],
    response: "🎣 **useState Hook** adds state to functional components:\n\n```jsx\nconst [value, setValue] = useState(initialValue);\n//     ↑ state    ↑ setter    ↑ starting value\n\n// Examples:\nconst [name, setName] = useState('');\nconst [count, setCount] = useState(0);\nconst [isOpen, setIsOpen] = useState(false);\nconst [items, setItems] = useState([]);\n\n// Update state:\nsetCount(count + 1);\nsetName('CodeVibe');\n```"
  },
  {
    keywords: [
      "useeffect hook kya", "what is useeffect", "explain useeffect",
      "useeffect hook", "useeffect describe", "useEffect in react",
      "useeffect kya hota", "side effects react", "use effect"
    ],
    response: "🎣 **useEffect Hook** runs side effects:\n\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction Profile() {\n  const [user, setUser] = useState(null);\n\n  // Runs after every render\n  useEffect(() => {\n    fetch('/api/user').then(r => r.json()).then(setUser);\n  }, []); // ← empty array = run ONCE on mount\n\n  return <div>{user?.name}</div>;\n}\n```\n\n**Dependency array:**\n- `[]` = run once\n- `[count]` = run when `count` changes\n- No array = run every render"
  },
  {
    keywords: [
      "react router kya", "what is react router", "explain react router",
      "react routing", "react router describe", "routing in react",
      "react navigation", "react routes"
    ],
    response: "🚦 **React Router** handles navigation in Single Page Apps:\n\n```jsx\nimport { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n```"
  },

  // ── Node.js ────────────────────────────────────────────────────────────────
  {
    keywords: [
      "nodejs kya hai", "what is nodejs", "explain nodejs", "node js",
      "node.js kya hai", "node kya hai", "nodejs intro", "node describe",
      "what is node"
    ],
    response: "📦 **Node.js** runs JavaScript on the SERVER:\n\n- Built on Chrome's V8 engine\n- Non-blocking, event-driven I/O\n- Perfect for APIs, real-time apps, CLI tools\n\n```javascript\nconst http = require('http');\n\nhttp.createServer((req, res) => {\n  res.end('Hello from Node.js! 🚀');\n}).listen(3000);\n```\n\n💡 Before Node.js, JavaScript only ran in browsers!"
  },
  {
    keywords: [
      "node vs javascript", "node.js aur javascript difference",
      "difference between node and javascript", "nodejs javascript difference"
    ],
    response: "🆚 **Node.js vs JavaScript**:\n\n| | JavaScript | Node.js |\n|--|-----------|--------|\n| Runs in | Browser | Server/Terminal |\n| DOM access | ✅ Yes | ❌ No |\n| File system | ❌ No | ✅ Yes (`fs` module) |\n| Purpose | Frontend interactivity | Backend servers, APIs |\n\nSame language — different environments!"
  },
  {
    keywords: [
      "npm kya hai", "what is npm", "explain npm", "node package manager",
      "npm kya hota", "npm describe", "what is npm in node"
    ],
    response: "📦 **NPM (Node Package Manager)**:\n\n```bash\nnpm install express        # Install a package\nnpm install -D nodemon     # Install dev dependency\nnpm uninstall lodash       # Remove package\nnpm run dev                # Run script\n```\n\n- World's largest software registry\n- 1.3+ million packages available\n- Manages project dependencies via `package.json`"
  },
  {
    keywords: [
      "package.json kya", "what is package.json", "explain package.json",
      "package json kya hota", "package.json describe", "package json file"
    ],
    response: "📄 **package.json** — project's configuration file:\n\n```json\n{\n  \"name\": \"my-app\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"dev\": \"nodemon index.js\",\n    \"start\": \"node index.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.0\"\n  },\n  \"devDependencies\": {\n    \"nodemon\": \"^3.0.0\"\n  }\n}\n```"
  },
  {
    keywords: [
      "express kya hai", "what is express", "explain express", "expressjs",
      "express.js kya hai", "express framework", "express describe",
      "what is expressjs"
    ],
    response: "🚂 **Express.js** — minimal Node.js web framework:\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Welcome to my API!' });\n});\n\napp.listen(5000, () => console.log('Server running on port 5000'));\n```\n\nExpress makes it easy to create REST APIs, handle routes, and use middleware!"
  },
  {
    keywords: [
      "api kya hoti", "what is api", "explain api", "application programming interface",
      "api kya hai", "api describe", "apis in programming"
    ],
    response: "🔌 **API (Application Programming Interface)** — how software talks to each other:\n\n```\n[Frontend App] ←→ [API] ←→ [Database]\n   (React)      (Express)  (MongoDB)\n```\n\n**Real-world analogy:**\nAPI is like a **waiter** in a restaurant 🍽️\n- You (client) give order to waiter (API)\n- Waiter gets food from kitchen (server/DB)\n- Waiter brings food back to you"
  },
  {
    keywords: [
      "rest api kya", "what is rest api", "explain rest api",
      "restful api", "rest api describe", "rest api kya hoti",
      "what is restful"
    ],
    response: "🌐 **REST API** follows these HTTP methods:\n\n| Method | Action | Example |\n|--------|--------|---------|\n| GET | Read data | Get all users |\n| POST | Create data | Create new user |\n| PUT/PATCH | Update data | Update user info |\n| DELETE | Delete data | Remove user |\n\n```javascript\napp.get('/users', getUsers);\napp.post('/users', createUser);\napp.put('/users/:id', updateUser);\napp.delete('/users/:id', deleteUser);\n```"
  },
  {
    keywords: [
      "get vs post", "get aur post difference", "difference between get and post",
      "get post request", "http methods difference", "get post kya"
    ],
    response: "🆚 **GET vs POST**:\n\n| | GET | POST |\n|--|-----|------|\n| Purpose | Fetch/Read data | Send/Create data |\n| Data in | URL params | Request body |\n| Visible? | ✅ URL visible | ❌ Body hidden |\n| Cacheable | ✅ Yes | ❌ No |\n| Example | Search, fetch users | Login, register |\n\n```javascript\n// GET request\nconst res = await axios.get('/api/users');\n\n// POST request\nconst res = await axios.post('/api/users', { name: 'Rahul' });\n```"
  },
  {
    keywords: [
      "middleware kya hota", "what is middleware", "explain middleware",
      "middleware in express", "middleware describe", "middleware kya hai",
      "express middleware"
    ],
    response: "🧱 **Middleware** runs between request and response:\n\n```javascript\n// Custom middleware\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // ← must call next() to continue!\n};\n\napp.use(logger); // Apply to ALL routes\n\n// Built-in middleware\napp.use(express.json());          // Parse JSON body\napp.use(express.urlencoded());    // Parse form data\napp.use(cors());                  // Handle CORS\n```"
  },
  {
    keywords: [
      "route kya hota", "what is route", "explain route", "routing in express",
      "express routing", "route describe", "routes kya hain"
    ],
    response: "🚦 **Routes** define URL endpoints and their handlers:\n\n```javascript\n// Basic routes\napp.get('/about', (req, res) => res.send('About page'));\napp.post('/login', handleLogin);\n\n// Route with parameters\napp.get('/users/:id', (req, res) => {\n  const { id } = req.params;\n  res.json({ userId: id });\n});\n\n// Router (for organized code)\nconst router = express.Router();\nrouter.get('/', getUsers);\napp.use('/api/users', router);\n```"
  },
  {
    keywords: [
      "json kya hai", "what is json", "explain json",
      "javascript object notation", "json describe", "json kya hota",
      "json format"
    ],
    response: "📄 **JSON (JavaScript Object Notation)**:\n\n```json\n{\n  \"name\": \"Rahul\",\n  \"age\": 21,\n  \"skills\": [\"React\", \"Node.js\", \"MongoDB\"],\n  \"address\": {\n    \"city\": \"Delhi\",\n    \"country\": \"India\"\n  },\n  \"isActive\": true\n}\n```\n\n- Lightweight data format\n- Used for API responses\n- Supported by all languages\n- Key-value pairs like JS objects"
  },
  {
    keywords: [
      "environment variables kya", "what are environment variables",
      "explain env variables", ".env file", "dotenv kya hai",
      "env kya hota", "process.env"
    ],
    response: "🔑 **Environment Variables** store secret config:\n\n```bash\n# .env file\nDB_URL=mongodb://localhost:27017/mydb\nJWT_SECRET=mysupersecretkey123\nPORT=5000\n```\n\n```javascript\n// Usage in Node.js\nrequire('dotenv').config();\n\nconst port = process.env.PORT;\nconst dbUrl = process.env.DB_URL;\n```\n\n⚠️ **NEVER** commit `.env` to GitHub! Add to `.gitignore`."
  },
  {
    keywords: [
      "authentication kya hoti", "what is authentication", "explain authentication",
      "auth kya hai", "authentication describe", "user authentication",
      "login authentication"
    ],
    response: "🔐 **Authentication** verifies WHO you are:\n\n**Common Flow:**\n```\n1. User submits email + password\n2. Server verifies credentials against DB\n3. Server generates JWT token\n4. Client stores token (localStorage)\n5. Client sends token with each request\n6. Server verifies token on protected routes\n```\n\n**Authentication vs Authorization:**\n- 🔐 Auth**enti**cation = Who are you? (Login)\n- 🛡️ Auth**ori**zation = What can you do? (Permissions)"
  },
  {
    keywords: [
      "jwt kya hota", "what is jwt", "explain jwt", "json web token",
      "jwt describe", "jwt kya hai", "jwt token"
    ],
    response: "🎫 **JWT (JSON Web Token)** — secure token for authentication:\n\n```\nHeader.Payload.Signature\n  ↓        ↓         ↓\nAlgorithm  Data   Verification\n```\n\n```javascript\nconst jwt = require('jsonwebtoken');\n\n// Create token\nconst token = jwt.sign(\n  { userId: user._id },\n  process.env.JWT_SECRET,\n  { expiresIn: '7d' }\n);\n\n// Verify token\nconst decoded = jwt.verify(token, process.env.JWT_SECRET);\n```"
  },
  {
    keywords: [
      "server kaise create", "how to create server", "create node server",
      "express server banana", "server banana node"
    ],
    response: "💻 **Create Express Server**:\n\n```javascript\nconst express = require('express');\nconst cors = require('cors');\nconst app = express();\n\n// Middleware\napp.use(cors());\napp.use(express.json());\n\n// Routes\napp.get('/', (req, res) => {\n  res.json({ message: 'Server is running! 🚀' });\n});\n\n// Start server\napp.listen(5000, () => {\n  console.log('✅ Server running on port 5000');\n});\n```"
  },

  // ── MongoDB ────────────────────────────────────────────────────────────────
  {
    keywords: [
      "mongodb kya hai", "what is mongodb", "explain mongodb",
      "mongo kya hai", "mongodb describe", "mongodb intro",
      "what is mongo", "mongodb database"
    ],
    response: "🍃 **MongoDB** — NoSQL document database:\n\n- Stores data in **flexible JSON-like documents** (not tables!)\n- No fixed schema — fields can vary per document\n- Scales horizontally (great for big apps)\n\n```json\n// A MongoDB Document (like a JS object)\n{\n  \"_id\": \"64abc123\",\n  \"name\": \"Rahul\",\n  \"skills\": [\"React\", \"Node\"],\n  \"joined\": \"2024-01-15\"\n}\n```"
  },
  {
    keywords: [
      "database kya hota", "what is database", "explain database",
      "database kya hai", "database describe", "db kya hai"
    ],
    response: "🗄️ **Database** is an organized collection of data:\n\n| Type | Examples | Best For |\n|------|---------|----------|\n| **SQL** (Relational) | MySQL, PostgreSQL | Structured, related data |\n| **NoSQL** | MongoDB, Redis | Flexible, big data |\n\n```\nSQL:     Table → Row → Column\nMongoDB: Collection → Document → Field\n```"
  },
  {
    keywords: [
      "collection kya hoti", "what is collection", "explain collection",
      "collection in mongodb", "collection describe", "mongo collection"
    ],
    response: "📂 **Collection** in MongoDB = Table in SQL:\n\n```\nSQL Database:\n  📁 users (table)\n    📄 row 1: {id:1, name:'Rahul'}\n    📄 row 2: {id:2, name:'Priya'}\n\nMongoDB:\n  📂 users (collection)\n    📄 document 1: {_id:'...', name:'Rahul'}\n    📄 document 2: {_id:'...', name:'Priya'}\n```"
  },
  {
    keywords: [
      "document kya hota mongo", "what is document in mongodb",
      "explain document", "mongo document", "document describe mongodb"
    ],
    response: "📄 **Document** in MongoDB = Row in SQL:\n\nA document is a JSON-like object stored in a collection:\n```json\n{\n  \"_id\": ObjectId(\"64abc123\"),\n  \"name\": \"Rahul\",\n  \"age\": 21,\n  \"courses\": [\"React\", \"Node.js\"],\n  \"address\": { \"city\": \"Delhi\" }\n}\n```\n\nDocuments in same collection can have different fields (flexible schema)!"
  },
  {
    keywords: [
      "mongodb vs sql", "mongodb aur sql difference", "nosql vs sql",
      "difference between mongodb and sql", "sql vs mongodb",
      "relational vs nosql"
    ],
    response: "🆚 **MongoDB vs SQL**:\n\n| Feature | SQL | MongoDB |\n|---------|-----|---------|\n| Data format | Tables & rows | Documents (JSON) |\n| Schema | Fixed ✅ | Flexible ✅ |\n| Relations | JOINs | Embedding/referencing |\n| Query | SQL language | MongoDB query |\n| Best for | Banking, ERP | Social apps, content |\n\n```sql\n-- SQL\nSELECT * FROM users WHERE age > 18;\n```\n```javascript\n// MongoDB\ndb.users.find({ age: { $gt: 18 } });\n```"
  },
  {
    keywords: [
      "crud operations kya", "what is crud", "explain crud",
      "crud kya hai", "crud describe", "create read update delete"
    ],
    response: "🔄 **CRUD** — 4 basic database operations:\n\n| Operation | MongoDB | HTTP Method |\n|-----------|---------|------------|\n| **C**reate | `insertOne()` | POST |\n| **R**ead | `find()` | GET |\n| **U**pdate | `updateOne()` | PUT/PATCH |\n| **D**elete | `deleteOne()` | DELETE |\n\n```javascript\n// Mongoose CRUD\nawait User.create({ name: 'Rahul' });           // Create\nconst users = await User.find({ age: 21 });     // Read\nawait User.updateOne({ _id }, { name: 'Raj' }); // Update\nawait User.deleteOne({ _id });                  // Delete\n```"
  },
  {
    keywords: [
      "insert operation", "mongodb insert", "insertone", "insertmany",
      "mongo insert query", "data insert karna"
    ],
    response: "➕ **MongoDB Insert**:\n\n```javascript\n// Mongoose\nawait User.create({ name: 'Rahul', age: 21 });\n\n// Insert many\nawait User.insertMany([\n  { name: 'Rahul', age: 21 },\n  { name: 'Priya', age: 22 }\n]);\n\n// Native MongoDB\ndb.users.insertOne({ name: 'Rahul', age: 21 });\n```"
  },
  {
    keywords: [
      "find query", "mongodb find", "mongo find", "search query mongodb",
      "how to search in mongodb", "mongodb read data", "data find karna"
    ],
    response: "🔍 **MongoDB Find/Read**:\n\n```javascript\n// Find ALL\nconst users = await User.find();\n\n// Find with filter\nconst adults = await User.find({ age: { $gte: 18 } });\n\n// Find ONE\nconst user = await User.findById(id);\nconst user2 = await User.findOne({ email: 'test@mail.com' });\n\n// Select specific fields\nconst names = await User.find().select('name email -_id');\n```"
  },
  {
    keywords: [
      "update query", "mongodb update", "updateone", "findbyidandupdate",
      "mongo update", "data update karna"
    ],
    response: "✏️ **MongoDB Update**:\n\n```javascript\n// Update one document\nawait User.updateOne(\n  { _id: userId },\n  { $set: { name: 'New Name' } }\n);\n\n// Find and update (returns updated doc)\nconst updated = await User.findByIdAndUpdate(\n  userId,\n  { $set: { age: 22 } },\n  { new: true } // return updated doc\n);\n\n// Update many\nawait User.updateMany({ age: 0 }, { $set: { active: false } });\n```"
  },
  {
    keywords: [
      "delete query", "mongodb delete", "deleteone", "findbyidanddelete",
      "mongo delete", "data delete karna"
    ],
    response: "🗑️ **MongoDB Delete**:\n\n```javascript\n// Delete one\nawait User.deleteOne({ _id: userId });\n\n// Find and delete\nconst deleted = await User.findByIdAndDelete(userId);\n\n// Delete many\nawait User.deleteMany({ active: false });\n```"
  },
  {
    keywords: [
      "indexing kya hoti", "what is indexing", "explain indexing",
      "mongodb indexing", "database index", "index in mongodb"
    ],
    response: "⚡ **Indexing** speeds up database queries:\n\n```javascript\n// Without index: MongoDB scans ALL documents (slow 🐌)\n// With index: MongoDB uses index map (fast 🚀)\n\n// Create index in Mongoose Schema\nconst userSchema = new Schema({\n  email: { type: String, index: true, unique: true },\n  name: String\n});\n\n// Create index manually\nawait db.users.createIndex({ email: 1 }); // 1=ascending\n```\n\n💡 Always index fields you frequently search/filter by!"
  },
  {
    keywords: [
      "mongoose kya hai", "what is mongoose", "explain mongoose",
      "mongoose kya hota", "mongoose describe", "mongoose library",
      "mongoose odm"
    ],
    response: "🍃 **Mongoose** — ODM (Object Data Modeling) for MongoDB:\n\n```javascript\nconst mongoose = require('mongoose');\n\n// Connect to MongoDB\nawait mongoose.connect('mongodb://localhost:27017/mydb');\n\n// Define Schema\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true },\n  age: { type: Number, min: 0 }\n});\n\n// Create Model\nconst User = mongoose.model('User', userSchema);\n```"
  },
  {
    keywords: [
      "schema kya hota", "what is schema", "explain schema",
      "mongoose schema", "schema describe", "schema kya hai"
    ],
    response: "📐 **Schema** defines the structure of MongoDB documents:\n\n```javascript\nconst courseSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  description: String,\n  price: { type: Number, default: 0 },\n  tags: [String],                        // Array\n  instructor: {\n    name: String,\n    email: String\n  },\n  createdAt: { type: Date, default: Date.now }\n});\n```"
  },
  {
    keywords: [
      "objectid kya hota", "what is objectid", "explain objectid",
      "_id in mongodb", "mongo objectid", "objectid describe"
    ],
    response: "🆔 **ObjectId** — MongoDB's unique identifier:\n\n```javascript\n// Auto-generated _id\n{ _id: ObjectId('64abc1234567890abc123456') }\n//              ↑ 24-char hex string = 12 bytes\n//  [timestamp][machine][process][counter]\n\n// Query by ID in Mongoose\nconst user = await User.findById('64abc1234567890abc123456');\n\n// Check if valid ObjectId\nmongoose.Types.ObjectId.isValid(id);\n```"
  },

  // ── DSA ────────────────────────────────────────────────────────────────────
  {
    keywords: [
      "data structure kya", "what is data structure", "explain data structure",
      "data structures kya hai", "dsa data structure", "ds kya hai"
    ],
    response: "📊 **Data Structure** organizes data for efficient access:\n\n| Structure | Use Case |\n|-----------|----------|\n| Array | Store ordered list |\n| Stack | Undo/Redo, backtracking |\n| Queue | BFS, task scheduling |\n| HashMap | Fast lookup O(1) |\n| Tree | Hierarchical data |\n| Graph | Networks, paths |\n\n💡 Right data structure = faster, cleaner code!"
  },
  {
    keywords: [
      "algorithm kya hota", "what is algorithm", "explain algorithm",
      "algorithm kya hai", "algorithm describe", "algorithms in programming"
    ],
    response: "🔁 **Algorithm** — step-by-step problem-solving instructions:\n\n```\nAlgorithm to make chai ☕:\n1. Boil water\n2. Add tea leaves\n3. Add milk & sugar\n4. Filter and serve\n```\n\n**Key properties:**\n- ✅ Input & Output defined\n- ✅ Finite steps\n- ✅ Correct result\n- ✅ Efficient (Time & Space)\n\nGood algorithm = correct + efficient!"
  },
  {
    keywords: [
      "array kya hai dsa", "array in data structure", "explain array dsa",
      "array data structure", "what is array in programming"
    ],
    response: "📊 **Array** — contiguous memory storage:\n\n```javascript\nconst arr = [10, 20, 30, 40, 50];\n//           0    1   2   3   4   ← indices\n\nconsole.log(arr[0]);  // 10\nconsole.log(arr.length); // 5\n\narr.push(60);     // Add to end\narr.pop();        // Remove from end\narr.unshift(5);   // Add to start\narr.shift();      // Remove from start\n```\n\n- Access: O(1) ⚡\n- Search: O(n)\n- Insert/Delete: O(n)"
  },
  {
    keywords: [
      "linked list kya", "what is linked list", "explain linked list",
      "linked list describe", "linkedlist kya hai"
    ],
    response: "🔗 **Linked List** — nodes connected by pointers:\n\n```\nHead\n  ↓\n[10|→] → [20|→] → [30|→] → null\n  ↑           ↑          ↑\nNode 1    Node 2    Node 3\n```\n\n**vs Array:**\n- ✅ Dynamic size\n- ✅ Fast insert/delete: O(1)\n- ❌ Random access: O(n) (no index!)"
  },
  {
    keywords: [
      "stack kya hai", "what is stack", "explain stack",
      "stack data structure", "stack describe", "stack in dsa",
      "lifo stack"
    ],
    response: "🥞 **Stack** — Last In, First Out (LIFO):\n\n```\n[30] ← TOP (Last In, First Out)\n[20]\n[10] ← BOTTOM\n```\n\n```javascript\nconst stack = [];\nstack.push(10);  // [10]\nstack.push(20);  // [10, 20]\nstack.push(30);  // [10, 20, 30]\nstack.pop();     // 30 removed → [10, 20]\n```\n\n**Real uses:** Browser back button, Undo/Redo, Call stack"
  },
  {
    keywords: [
      "queue kya hai", "what is queue", "explain queue",
      "queue data structure", "queue describe", "queue in dsa",
      "fifo queue"
    ],
    response: "🚶 **Queue** — First In, First Out (FIFO):\n\n```\nEnqueue → [10, 20, 30] → Dequeue\n  (rear)                  (front)\n```\n\n```javascript\nconst queue = [];\nqueue.push(10);    // Enqueue → [10]\nqueue.push(20);    // Enqueue → [10, 20]\nqueue.shift();     // Dequeue → 10 removed → [20]\n```\n\n**Real uses:** Print queue, BFS algorithm, Request handling"
  },
  {
    keywords: [
      "tree kya hai", "what is tree", "explain tree",
      "tree data structure", "tree describe", "tree in dsa"
    ],
    response: "🌳 **Tree** — hierarchical data structure:\n\n```\n        Root\n       /    \\\n     Node   Node\n    /    \\\n  Leaf   Leaf\n```\n\n**Types:**\n- Binary Tree (max 2 children)\n- BST (Binary Search Tree)\n- AVL Tree (self-balancing)\n- Heap (priority queue)\n\n**Real uses:** File systems, HTML DOM, databases"
  },
  {
    keywords: [
      "binary tree kya", "what is binary tree", "explain binary tree",
      "binary tree describe", "btree"
    ],
    response: "🌳 **Binary Tree** — each node has max 2 children:\n\n```\n        1         ← Root\n       / \\\n      2   3       ← Level 1\n     / \\   \\\n    4   5   6    ← Level 2 (Leaf nodes)\n```\n\n**Traversal methods:**\n- **InOrder**: Left → Root → Right (gives sorted output in BST)\n- **PreOrder**: Root → Left → Right\n- **PostOrder**: Left → Right → Root"
  },
  {
    keywords: [
      "bst kya hai", "binary search tree", "explain bst",
      "what is bst", "bst describe"
    ],
    response: "🔍 **BST (Binary Search Tree)**:\n\n```\n        8\n       / \\\n      3   10\n     / \\    \\\n    1   6   14\n```\n\n**Rule:** Left child < Parent < Right child\n\n```javascript\n// Search in BST — O(log n)!\nfunction search(node, target) {\n  if (!node) return null;\n  if (node.val === target) return node;\n  if (target < node.val) return search(node.left, target);\n  return search(node.right, target);\n}\n```"
  },
  {
    keywords: [
      "graph kya hai", "what is graph", "explain graph",
      "graph data structure", "graph describe", "graph in dsa"
    ],
    response: "🕸️ **Graph** — vertices connected by edges:\n\n```\nA ─── B\n|  \\  |\n|   \\ |\n C ─── D\n```\n\n**Types:**\n- Directed / Undirected\n- Weighted / Unweighted\n- Cyclic / Acyclic\n\n**Traversal:**\n- **BFS** (Breadth First Search) — Level by level\n- **DFS** (Depth First Search) — Go deep first\n\n**Real uses:** Google Maps, Social Networks, Web crawlers"
  },
  {
    keywords: [
      "hash table kya", "what is hash table", "explain hash table",
      "hashmap kya hai", "hash map", "hash table describe"
    ],
    response: "🗝️ **Hash Table / HashMap** — O(1) key-value lookup:\n\n```javascript\n// JavaScript object = built-in hash table\nconst map = new Map();\nmap.set('name', 'Rahul');    // Store\nmap.get('name');              // Retrieve — O(1)!\nmap.has('name');              // Check — O(1)!\nmap.delete('name');           // Delete — O(1)!\n\n// Use case: Count frequencies\nconst freq = {};\n[1,2,1,3,2,1].forEach(n => freq[n] = (freq[n] || 0) + 1);\n// freq = { 1:3, 2:2, 3:1 }\n```"
  },
  {
    keywords: [
      "recursion kya hai", "what is recursion", "explain recursion",
      "recursion describe", "recursive function", "recursion in programming"
    ],
    response: "🔄 **Recursion** — function calling itself:\n\n```javascript\n// Factorial using recursion\nfunction factorial(n) {\n  if (n <= 1) return 1;          // ← Base case (STOP!)\n  return n * factorial(n - 1);   // ← Recursive case\n}\n\nfactorial(5);\n// = 5 * factorial(4)\n// = 5 * 4 * factorial(3)\n// = 5 * 4 * 3 * 2 * 1 = 120\n```\n\n⚠️ Always have a **base case** to stop recursion!"
  },
  {
    keywords: [
      "time complexity kya", "what is time complexity", "explain time complexity",
      "time complexity describe", "time complexity in dsa"
    ],
    response: "⏱️ **Time Complexity** — how runtime grows with input size:\n\n| Complexity | Name | Example |\n|-----------|------|--------|\n| O(1) | Constant | Array access |\n| O(log n) | Logarithmic | Binary search |\n| O(n) | Linear | Loop through array |\n| O(n log n) | Linearithmic | Merge sort |\n| O(n²) | Quadratic | Nested loops |\n| O(2ⁿ) | Exponential | Recursion without memo |\n\n💡 Lower is better! O(1) < O(log n) < O(n) < O(n²)"
  },
  {
    keywords: [
      "space complexity kya", "what is space complexity", "explain space complexity",
      "space complexity describe", "memory complexity"
    ],
    response: "💾 **Space Complexity** — how much memory algorithm uses:\n\n```javascript\n// O(1) Space — constant memory\nfunction sum(arr) {\n  let total = 0;           // only 1 variable\n  for (let x of arr) total += x;\n  return total;\n}\n\n// O(n) Space — stores n elements\nfunction double(arr) {\n  return arr.map(x => x * 2); // new array of size n\n}\n```\n\n💡 Aim for least memory usage, especially for large datasets!"
  },
  {
    keywords: [
      "big o notation", "what is big o", "explain big o",
      "big o notation describe", "o notation", "big-o"
    ],
    response: "🧮 **Big O Notation** — measures algorithm efficiency:\n\n```\nBest → Worst performance:\n\nO(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2ⁿ)\n```\n\n**Examples:**\n```javascript\narr[0]              // O(1)  — Constant\nbinarySearch(arr)   // O(log n) — Logarithmic\nfor(let x of arr)   // O(n)  — Linear\nfor(i) for(j)       // O(n²) — Quadratic\n```\n\nBig O describes WORST CASE scenario!"
  },
  {
    keywords: [
      "binary search kya", "what is binary search", "explain binary search",
      "binary search describe", "binary search algorithm"
    ],
    response: "🔍 **Binary Search** — O(log n) search in sorted array:\n\n```javascript\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;      // Found!\n    if (arr[mid] < target) left = mid + 1;   // Go right\n    else right = mid - 1;                     // Go left\n  }\n  return -1; // Not found\n}\n\nbinarySearch([1,3,5,7,9,11], 7); // Returns index 3\n```\n\n⚠️ Only works on **sorted** arrays!"
  },
  {
    keywords: [
      "sorting algorithms", "types of sorting", "explain sorting",
      "sorting kya hai", "bubble sort", "merge sort", "quick sort"
    ],
    response: "📊 **Sorting Algorithms**:\n\n| Algorithm | Time (Avg) | Space | Stable |\n|-----------|-----------|-------|--------|\n| Bubble Sort | O(n²) | O(1) | ✅ |\n| Selection Sort | O(n²) | O(1) | ❌ |\n| Insertion Sort | O(n²) | O(1) | ✅ |\n| Merge Sort | O(n log n) | O(n) | ✅ |\n| Quick Sort | O(n log n) | O(log n) | ❌ |\n| Heap Sort | O(n log n) | O(1) | ❌ |\n\n```javascript\n// JS built-in sort (Timsort)\n[3,1,4,1,5].sort((a, b) => a - b); // [1,1,3,4,5]\n```"
  },

  // ── OOP ────────────────────────────────────────────────────────────────────
  {
    keywords: [
      "oop kya hai", "what is oop", "explain oop",
      "object oriented programming", "oop describe", "oops kya hai"
    ],
    response: "🧱 **OOP (Object-Oriented Programming)** — code organized as objects:\n\n**4 Pillars:**\n1. 🔒 **Encapsulation** — hide internal details\n2. 🧬 **Inheritance** — child inherits from parent\n3. 🎭 **Polymorphism** — same method, different behavior\n4. 🧱 **Abstraction** — show only what's necessary\n\n```javascript\nclass Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound.`; }\n}\n```"
  },
  {
    keywords: [
      "class kya hai", "what is class", "explain class",
      "class in oop", "class describe", "class definition"
    ],
    response: "📐 **Class** — blueprint for creating objects:\n\n```javascript\nclass Car {\n  constructor(brand, model, year) {\n    this.brand = brand;\n    this.model = model;\n    this.year = year;\n  }\n\n  describe() {\n    return `${this.year} ${this.brand} ${this.model}`;\n  }\n}\n\nconst myCar = new Car('Toyota', 'Camry', 2024);\nconsole.log(myCar.describe()); // '2024 Toyota Camry'\n```"
  },
  {
    keywords: [
      "object kya hai oop", "what is object in oop", "explain object oop",
      "object instance", "object kya hota"
    ],
    response: "📦 **Object** — instance of a class:\n\n```javascript\nclass Dog {\n  constructor(name, breed) {\n    this.name = name;\n    this.breed = breed;\n  }\n  bark() { return `${this.name} says: Woof! 🐶`; }\n}\n\n// Creating objects (instances)\nconst dog1 = new Dog('Tommy', 'Labrador');\nconst dog2 = new Dog('Buddy', 'Poodle');\n\nconsole.log(dog1.bark()); // Tommy says: Woof!\nconsole.log(dog2.bark()); // Buddy says: Woof!\n```"
  },
  {
    keywords: [
      "constructor kya", "what is constructor", "explain constructor",
      "constructor describe", "constructor function", "constructor in class"
    ],
    response: "🛠️ **Constructor** — runs automatically when object is created:\n\n```javascript\nclass Person {\n  constructor(name, age) { // ← Called with 'new'\n    this.name = name;      // Initialize properties\n    this.age = age;\n    console.log(`${name} created!`);\n  }\n}\n\nconst p = new Person('Rahul', 21);\n// Logs: 'Rahul created!' automatically!\n// p.name = 'Rahul', p.age = 21\n```"
  },
  {
    keywords: [
      "inheritance kya", "what is inheritance", "explain inheritance",
      "inheritance describe", "inheritance in oop", "class inheritance"
    ],
    response: "🧬 **Inheritance** — child class inherits from parent:\n\n```javascript\nclass Animal {\n  constructor(name) { this.name = name; }\n  eat() { return `${this.name} is eating.`; }\n}\n\nclass Dog extends Animal {  // Dog inherits Animal\n  bark() { return `${this.name} says Woof!`; }\n}\n\nconst dog = new Dog('Tommy');\ndog.eat();   // 'Tommy is eating.'  ← from Animal!\ndog.bark();  // 'Tommy says Woof!' ← from Dog!\n```\n\n💡 DRY principle — Don't Repeat Yourself!"
  },
  {
    keywords: [
      "encapsulation kya", "what is encapsulation", "explain encapsulation",
      "encapsulation describe", "encapsulation in oop"
    ],
    response: "🔒 **Encapsulation** — hide internal data, expose only needed parts:\n\n```javascript\nclass BankAccount {\n  #balance = 0;  // ← Private field (can't access outside!)\n\n  deposit(amount) {\n    if (amount > 0) this.#balance += amount;\n  }\n\n  getBalance() {\n    return this.#balance; // ← Controlled access\n  }\n}\n\nconst acc = new BankAccount();\nacc.deposit(1000);\nacc.getBalance();    // 1000 ✅\nacc.#balance;        // Error! ❌ Private!\n```"
  },
  {
    keywords: [
      "polymorphism kya", "what is polymorphism", "explain polymorphism",
      "polymorphism describe", "polymorphism in oop"
    ],
    response: "🎭 **Polymorphism** — same method, different behavior:\n\n```javascript\nclass Shape {\n  area() { return 0; }\n}\n\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; } // ← Override!\n}\n\nclass Square extends Shape {\n  constructor(s) { super(); this.s = s; }\n  area() { return this.s ** 2; }           // ← Override!\n}\n\n// Same method name, different results!\nnew Circle(5).area();  // 78.53\nnew Square(5).area();  // 25\n```"
  },
  {
    keywords: [
      "abstraction kya", "what is abstraction", "explain abstraction",
      "abstraction describe", "abstraction in oop"
    ],
    response: "🧱 **Abstraction** — hide complexity, show only essentials:\n\n```javascript\nclass Car {\n  // Complex internal methods (hidden)\n  #startEngine() { /* 200 lines of engine code */ }\n  #checkFuel() { /* fuel check logic */ }\n  #applyBrakes() { /* brake system */ }\n\n  // Simple public interface\n  drive() {\n    this.#checkFuel();\n    this.#startEngine();\n    console.log('🚗 Car is driving!');\n  }\n}\n\n// User only sees drive() — not the complexity!\nconst car = new Car();\ncar.drive(); // Simple! ✅\n```"
  },
  {
    keywords: [
      "method overloading kya", "what is method overloading", "explain overloading",
      "overloading describe", "compile time polymorphism"
    ],
    response: "🎭 **Method Overloading** — same name, different parameters:\n\n```java\n// Java example (JS doesn't natively support this)\nclass Calculator {\n  int add(int a, int b) { return a + b; }\n  double add(double a, double b) { return a + b; }\n  int add(int a, int b, int c) { return a + b + c; }\n}\n```\n\n**In JavaScript** (simulate overloading):\n```javascript\nfunction add(...args) {\n  return args.reduce((sum, n) => sum + n, 0);\n}\nadd(1, 2);     // 3\nadd(1, 2, 3);  // 6\n```"
  },
  {
    keywords: [
      "method overriding kya", "what is method overriding", "explain overriding",
      "overriding describe", "runtime polymorphism"
    ],
    response: "🔄 **Method Overriding** — child class redefines parent method:\n\n```javascript\nclass Animal {\n  sound() { return 'Some sound...'; }\n}\n\nclass Dog extends Animal {\n  sound() { return 'Woof! 🐶'; }  // ← Overrides parent!\n}\n\nclass Cat extends Animal {\n  sound() { return 'Meow! 🐱'; }  // ← Overrides parent!\n}\n\nnew Animal().sound(); // 'Some sound...'\nnew Dog().sound();    // 'Woof!'\nnew Cat().sound();    // 'Meow!'\n```"
  },
  {
    keywords: [
      "access modifiers", "public private protected", "explain access modifiers",
      "access modifiers kya hote", "private public protected"
    ],
    response: "🚦 **Access Modifiers**:\n\n| Modifier | Same Class | Subclass | Anywhere |\n|----------|-----------|----------|----------|\n| `public` | ✅ | ✅ | ✅ |\n| `protected` | ✅ | ✅ | ❌ |\n| `private` | ✅ | ❌ | ❌ |\n\n```javascript\nclass Person {\n  name = 'Rahul';      // public ✅\n  #password = '1234';  // private ❌ (JS #)\n}\n```"
  },

  // ── Debugging Errors ───────────────────────────────────────────────────────
  {
    keywords: [
      "syntax error kya", "what is syntax error", "explain syntax error",
      "syntax error fix", "syntax error describe", "syntaxerror",
      "syntax error in js", "syntax error kaise fix"
    ],
    response: "🐞 **SyntaxError** — broken grammar/structure of code:\n\n**Common causes:**\n```javascript\n// ❌ Missing closing bracket\nfunction greet() {\n  console.log('Hi')\n// ← Missing }\n\n// ❌ Missing comma in object\nconst user = { name: 'Rahul' age: 21 }; // ← Missing comma!\n\n// ❌ Unclosed string\nconst msg = 'Hello world;  // ← Missing closing quote!\n```\n\n**Fix:** Check for missing `}`, `)`, `,`, `'`, `\"` in error line!"
  },
  {
    keywords: [
      "runtime error kya", "what is runtime error", "explain runtime error",
      "runtime error describe", "runtime error fix", "runtime errors"
    ],
    response: "💥 **Runtime Error** — code runs but crashes during execution:\n\n```javascript\n// ❌ Division by zero\nconst result = 10 / 0;  // Infinity (JS doesn't crash)\n\n// ❌ Accessing property of null\nconst user = null;\nconsole.log(user.name);  // TypeError: Cannot read property!\n\n// ❌ Stack overflow (infinite recursion)\nfunction infinite() { return infinite(); }\ninfinity(); // RangeError: Maximum call stack exceeded!\n```\n\n**Fix:** Use try-catch blocks for error handling!"
  },
  {
    keywords: [
      "logical error kya", "what is logical error", "explain logical error",
      "logical error describe", "logic error", "wrong output bug"
    ],
    response: "🧠 **Logical Error** — code runs fine but gives WRONG result:\n\n```javascript\n// ❌ Wrong comparison (= instead of ==)\nif (x = 5) { ... }   // Always true! Should be x === 5\n\n// ❌ Off-by-one error\nfor (let i = 0; i <= arr.length; i++) // ← should be < not <=\n\n// ❌ Wrong formula\nfunction celsius(f) {\n  return (f - 32) * 5 / 9;  // ✅ Correct\n  // return (f + 32) * 5 / 9; // ❌ Wrong!\n}\n```\n\n**Fix:** Use console.log() to trace values step by step!"
  },
  {
    keywords: [
      "undefined error kyu", "undefined in javascript", "why undefined",
      "undefined kya hota", "undefined error fix"
    ],
    response: "🔍 **undefined vs not defined**:\n\n```javascript\n// undefined — variable declared but no value\nlet x;\nconsole.log(x);  // undefined\n\n// ReferenceError — variable never declared\nconsole.log(y);  // ReferenceError: y is not defined!\n\n// Common causes of undefined:\nconst user = {};\nconsole.log(user.name);  // undefined (property missing)\n\nfunction greet() { }  // no return\nconsole.log(greet());  // undefined\n```"
  },
  {
    keywords: [
      "cannot read property of undefined", "cannot read properties",
      "typeerror undefined", "reading property of null",
      "cannot read property fix"
    ],
    response: "🐞 **Fix 'Cannot read property of undefined'**:\n\n```javascript\n// ❌ Problem\nconst user = null;\nconsole.log(user.name); // TypeError!\n\n// ✅ Fix 1: Optional Chaining (Best!)\nconsole.log(user?.name);          // undefined (no crash!)\nconsole.log(user?.address?.city); // undefined\n\n// ✅ Fix 2: Check before accessing\nif (user && user.name) {\n  console.log(user.name);\n}\n\n// ✅ Fix 3: Default value\nconst name = user?.name ?? 'Guest';\n```"
  },
  {
    keywords: [
      "react component render nahi", "react not rendering",
      "component not showing", "react render problem",
      "react component fix"
    ],
    response: "⚛️ **React Component Not Rendering — Debug Checklist:**\n\n```jsx\n// ✅ Check 1: Is it exported?\nexport default MyComponent; // ← Must export!\n\n// ✅ Check 2: Is JSX returned?\nfunction MyComp() {\n  return <div>Hello</div>; // ← Must return JSX!\n}\n\n// ✅ Check 3: Capital first letter\n<MyComponent />  // ✅ Correct\n<mycomponent />  // ❌ Wrong (treated as HTML tag)\n\n// ✅ Check 4: Check Console for errors\n```\n\nOpen browser DevTools (F12) → Console tab for error details!"
  },
  {
    keywords: [
      "css apply nahi ho", "css not working", "css not applying",
      "styles not working", "css problem fix", "css nahi lag raha"
    ],
    response: "🎨 **CSS Not Working — Debug Checklist:**\n\n1. **Link correct?**\n```html\n<link rel=\"stylesheet\" href=\"style.css\">\n```\n2. **Check specificity** (inline > id > class > tag)\n```css\n/* High specificity wins! */\n#myId { color: red; }     /* wins over */\n.myClass { color: blue; }\n```\n3. **Use DevTools** (F12 → Elements → Computed Styles)\n4. **Hard refresh**: Ctrl + Shift + R (clears cache)\n5. **!important** (last resort): `color: red !important;`"
  },
  {
    keywords: [
      "api call fail", "api not working", "axios error",
      "fetch error", "api request fail", "network error api"
    ],
    response: "🔌 **API Call Failed — Debug Steps:**\n\n```javascript\n// Always use try-catch!\ntry {\n  const res = await axios.get('/api/users');\n  console.log(res.data);\n} catch (error) {\n  console.error('Status:', error.response?.status);\n  console.error('Message:', error.response?.data);\n}\n```\n\n**Checklist:**\n1. ✅ Is backend server running?\n2. ✅ Correct URL and port? (`localhost:5002`)\n3. ✅ CORS configured in backend?\n4. ✅ Check Network tab in DevTools (F12)"
  },
  {
    keywords: [
      "mongodb connection error", "mongo connection error",
      "econnrefused mongodb", "mongodb not connecting",
      "mongodb connection fix"
    ],
    response: "🍃 **MongoDB Connection Error Fix:**\n\n```\nError: connect ECONNREFUSED 127.0.0.1:27017\n```\n\n**Solutions:**\n1. **Start MongoDB service:**\n```bash\n# Windows\nnet start MongoDB\n# or\nmongod\n```\n2. **Check connection string in .env:**\n```\nDB_URL=mongodb://127.0.0.1:27017/mydb\n```\n3. **Use MongoDB Atlas** (cloud DB — no local install needed!)\n```\nDB_URL=mongodb+srv://user:pass@cluster.mongodb.net/mydb\n```"
  },
  {
    keywords: [
      "node server start nahi", "node server crash", "server not starting",
      "node error fix", "express server start nahi hota"
    ],
    response: "📦 **Node.js Server Not Starting — Fix:**\n\n```bash\n# Common errors:\nError: EADDRINUSE: address already in use :::5000\n# Fix: Kill process using that port\nnetstat -ano | findstr :5000\ntaskkill /PID <pid> /F\n\n# Or use different port in .env:\nPORT=5001\n```\n\n**Checklist:**\n1. ✅ Run `npm install` first\n2. ✅ Check `.env` file exists\n3. ✅ Check for syntax errors in index.js\n4. ✅ Check MongoDB is running"
  },
  {
    keywords: [
      "cors error kya", "what is cors", "explain cors",
      "cors fix", "cors error describe", "cors problem",
      "access control allow origin"
    ],
    response: "🌐 **CORS Error** — browser blocks cross-origin requests:\n\n```\nAccess to fetch 'http://localhost:5002' from \n'http://localhost:5173' has been blocked by CORS policy\n```\n\n**Fix in Express backend:**\n```javascript\nconst cors = require('cors');\n\napp.use(cors({\n  origin: 'http://localhost:5173', // Allow your frontend\n  methods: ['GET', 'POST', 'PUT', 'DELETE'],\n  credentials: true\n}));\n```\n\nInstall: `npm install cors`"
  },
  {
    keywords: [
      "404 error kya", "what is 404", "explain 404 error",
      "404 not found", "404 describe", "page not found error"
    ],
    response: "🚫 **404 Not Found** — requested resource doesn't exist:\n\n**Causes:**\n- Wrong URL path (`/users` vs `/user`)\n- Route not defined in backend\n- File deleted or renamed\n- Typo in URL\n\n```javascript\n// Add catch-all 404 handler in Express:\napp.use((req, res) => {\n  res.status(404).json({\n    error: 'Route not found',\n    path: req.path\n  });\n});\n```\n\n**Fix:** Check the exact URL and ensure route is defined!"
  },
  {
    keywords: [
      "500 error kya", "what is 500 error", "explain 500 error",
      "internal server error", "500 describe", "server error 500"
    ],
    response: "💥 **500 Internal Server Error** — server-side crash:\n\n**Causes:**\n- Unhandled exception in route handler\n- Database connection failed\n- Null/undefined access in controller\n- Missing environment variable\n\n```javascript\n// Always wrap route handlers with try-catch!\napp.get('/users', async (req, res) => {\n  try {\n    const users = await User.find();\n    res.json(users);\n  } catch (error) {\n    console.error(error);\n    res.status(500).json({ error: 'Server error' });\n  }\n});\n```"
  },
  {
    keywords: [
      "console.log debugging", "how to debug", "debugging kaise karte",
      "debug karna", "debugging tips", "fix bugs"
    ],
    response: "🐞 **Debugging with console.log — Pro Tips:**\n\n```javascript\n// 1. Label your logs\nconsole.log('📍 Step 1 - User:', user);\nconsole.log('📍 Step 2 - API response:', res.data);\n\n// 2. console.table() for arrays\nconsole.table([{name:'Rahul'}, {name:'Priya'}]);\n\n// 3. console.error() for errors\nconsole.error('❌ Failed:', error.message);\n\n// 4. console.time() to measure speed\nconsole.time('myFunc');\nmyFunction();\nconsole.timeEnd('myFunc');\n\n// 5. Debugger statement\ndebugger; // Pauses in DevTools!\n```"
  },

  // ── Learning FAQs ──────────────────────────────────────────────────────────
  {
    keywords: [
      "web development roadmap", "roadmap web dev", "web dev roadmap",
      "how to learn web development", "web development kaise seekhe",
      "web development path"
    ],
    response: "🗺️ **Web Development Roadmap 2024:**\n\n**Phase 1 — Frontend Basics (2-3 months)**\n✅ HTML5 → CSS3 → JavaScript (ES6+)\n\n**Phase 2 — Frontend Framework (2 months)**\n✅ React.js + React Router + Hooks\n\n**Phase 3 — Backend (2-3 months)**\n✅ Node.js → Express.js → REST APIs\n\n**Phase 4 — Database (1 month)**\n✅ MongoDB + Mongoose\n\n**Phase 5 — DevOps (ongoing)**\n✅ Git + GitHub → Deploy (Netlify/Vercel/Render)\n\n🎯 **Total:** ~6-9 months to full-stack!"
  },
  {
    keywords: [
      "frontend developer kaise bane", "how to become frontend developer",
      "frontend developer kaise", "frontend career", "frontend developer banna"
    ],
    response: "🎨 **Frontend Developer Roadmap:**\n\n1. **HTML5** — semantic tags, forms, accessibility\n2. **CSS3** — flexbox, grid, animations, responsive\n3. **JavaScript** — ES6+, DOM, fetch API, async/await\n4. **React.js** — components, hooks, state management\n5. **Version Control** — Git & GitHub\n6. **Build Tools** — Vite, webpack basics\n7. **Portfolio** — 3-5 real projects on GitHub\n\n**Time:** ~4-6 months of consistent learning! 💪"
  },
  {
    keywords: [
      "backend developer kaise bane", "how to become backend developer",
      "backend developer kaise", "backend career", "backend developer banna"
    ],
    response: "📦 **Backend Developer Roadmap:**\n\n1. **JavaScript/Python** — strong fundamentals\n2. **Node.js + Express.js** — servers, APIs, middleware\n3. **Databases** — MongoDB (NoSQL) + SQL basics\n4. **Authentication** — JWT, OAuth, bcrypt\n5. **REST APIs** — design, versioning, documentation\n6. **Git + GitHub** — version control\n7. **Deployment** — Render, Railway, AWS EC2\n\n**Bonus:** Docker basics, system design concepts"
  },
  {
    keywords: [
      "full stack developer kaise bane", "how to become full stack",
      "fullstack developer kaise", "full stack career", "mern stack"
    ],
    response: "🚀 **Full Stack (MERN) Developer Path:**\n\n```\nM — MongoDB    (Database)\nE — Express.js (Backend framework)\nR — React.js   (Frontend library)\nN — Node.js    (Runtime environment)\n```\n\n**Journey:**\n1. HTML + CSS + JavaScript basics\n2. React.js (Frontend)\n3. Node.js + Express.js (Backend)\n4. MongoDB + Mongoose (Database)\n5. Connect Frontend ↔ Backend ↔ Database\n6. Deploy full app online\n\n**Time:** ~8-12 months to job-ready!"
  },
  {
    keywords: [
      "react seekhne ke liye prerequisites", "react prerequisites",
      "react ke liye kya chahiye", "before learning react",
      "react sikhne se pehle"
    ],
    response: "⚛️ **Before Learning React — Must Know:**\n\n✅ **HTML & CSS** — basic structure & styling\n\n✅ **JavaScript (ES6+):**\n- Variables (let, const)\n- Arrow functions `=>`\n- Array methods (map, filter, reduce)\n- Destructuring `{ name, age } = user`\n- Spread operator `...arr`\n- Template literals `` `Hello ${name}` ``\n- Promises & Async/Await\n- Import/Export modules\n\n💡 Strong JS = Easy React learning!"
  },
  {
    keywords: [
      "dsa kaha se start", "where to start dsa", "dsa start kaise kare",
      "how to start dsa", "dsa for beginners", "dsa roadmap"
    ],
    response: "🔁 **DSA Learning Path for Beginners:**\n\n**Month 1 — Basics**\n- Arrays & Strings (patterns, sliding window)\n- Time & Space Complexity (Big O)\n- Recursion basics\n\n**Month 2 — Linear Structures**\n- Linked Lists, Stack, Queue\n- HashMap & HashSet\n\n**Month 3 — Non-linear**\n- Trees (Binary Tree, BST)\n- Graphs (BFS, DFS)\n\n**Month 4+ — Practice**\n- LeetCode Easy → Medium\n- Sorting algorithms\n\n🎯 **Goal:** 100-150 problems before interviews!"
  },
  {
    keywords: [
      "interview preparation kaise", "how to prepare for interview",
      "job interview prep", "coding interview", "technical interview kaise",
      "interview tips"
    ],
    response: "💼 **Interview Preparation Guide:**\n\n**DSA (50% of interview)**\n- Arrays, Strings, HashMap\n- Trees, Graphs, DP basics\n- Practice on LeetCode\n\n**CS Fundamentals**\n- OOP concepts\n- DBMS & SQL basics\n- OS concepts (process, thread)\n\n**Projects (Portfolio)**\n- 2-3 full-stack projects\n- Deployed & working\n- GitHub with clean commits\n\n**Soft Skills**\n- Practice explaining code\n- Mock interviews\n\n⏰ **Timeline:** 3-6 months dedicated prep"
  },
  {
    keywords: [
      "beginner projects kya", "projects to build", "beginner project ideas",
      "coding projects", "web dev projects", "kya project banau"
    ],
    response: "💡 **Top Projects to Build (Beginner → Advanced):**\n\n**🟢 Beginner:**\n1. Personal Portfolio Website\n2. Todo List (with localStorage)\n3. Weather App (free API)\n\n**🟡 Intermediate:**\n4. Quiz App with score tracking\n5. E-commerce product page\n6. Blog platform (CRUD)\n\n**🔴 Advanced:**\n7. Full-stack MERN app\n8. Real-time chat (Socket.io)\n9. Clone of popular app (YouTube, Amazon)\n\n🏆 Build → Deploy → Add to GitHub → Portfolio!"
  },
  {
    keywords: [
      "portfolio website kaise", "how to build portfolio", "portfolio kaise banau",
      "portfolio website banana", "developer portfolio"
    ],
    response: "💼 **Build a Stunning Developer Portfolio:**\n\n**Must-have sections:**\n1. 🙋 **Hero** — Name, role, CTA button\n2. 🛠️ **Skills** — Tech stack icons\n3. 🚀 **Projects** — 3-5 best with live links\n4. 📜 **Certifications/Education**\n5. 📞 **Contact** — Email form / LinkedIn\n\n**Tech Stack:**\n- React + CSS / TailwindCSS\n- Deploy FREE on GitHub Pages or Netlify\n\n**Tips:**\n- Mobile responsive\n- Fast loading\n- Professional domain (yourname.dev)"
  },
  {
    keywords: [
      "git aur github kya", "git vs github", "difference between git and github",
      "git kya hai", "github kya hai", "explain git", "what is git",
      "what is github"
    ],
    response: "🐙 **Git vs GitHub:**\n\n| | Git | GitHub |\n|--|-----|--------|\n| Type | Software tool | Cloud platform |\n| Works | Locally (your PC) | Online (web) |\n| Purpose | Track code changes | Host & share code |\n| Made by | Linus Torvalds | Microsoft |\n\n```bash\n# Common Git commands\ngit init               # Start tracking\ngit add .              # Stage changes\ngit commit -m 'msg'    # Save snapshot\ngit push origin main   # Upload to GitHub\ngit pull               # Download updates\ngit clone <url>        # Copy repo\n```"
  },

  // ── General coding help ────────────────────────────────────────────────────
  {
    keywords: ["html", "tags", "hypertext"],
    response: "🌐 **HTML (HyperText Markup Language)** is the backbone of webpages. It uses **tags** to structure content like headings, paragraphs, images, and links.\n\nAsk me specifically:\n- 'What is HTML?'\n- 'HTML basic structure'\n- 'Semantic tags kya hote'\n- 'div vs span'"
  },
  {
    keywords: ["css", "cascading", "stylesheet", "style"],
    response: "🎨 **CSS (Cascading Style Sheets)** makes webpages beautiful!\n\nAsk me specifically:\n- 'What is Flexbox?'\n- 'CSS Grid kya hai?'\n- 'Margin vs Padding'\n- 'CSS animation kaise banate'\n- 'How to center a div?'"
  },
  {
    keywords: ["javascript", "js"],
    response: "⚡ **JavaScript** is the programming language of the web!\n\nAsk me specifically:\n- 'var let const difference'\n- 'What is closure?'\n- 'Explain async await'\n- 'What is hoisting?'\n- 'Promise kya hota?'"
  },
  {
    keywords: ["react", "reactjs"],
    response: "⚛️ **React.js** is the most popular frontend library!\n\nAsk me specifically:\n- 'React component kya hai?'\n- 'Explain useState hook'\n- 'What is useEffect?'\n- 'Props vs State'\n- 'What is JSX?'"
  },
  {
    keywords: ["node", "nodejs", "backend"],
    response: "📦 **Node.js** lets JavaScript run on the server!\n\nAsk me specifically:\n- 'What is Express.js?'\n- 'What is middleware?'\n- 'REST API kya hoti?'\n- 'JWT kya hota?'\n- 'How to create server?'"
  },
  {
    keywords: ["mongodb", "mongo", "nosql", "mongoose", "database"],
    response: "🍃 **MongoDB** is a flexible NoSQL database!\n\nAsk me specifically:\n- 'MongoDB vs SQL'\n- 'What is Mongoose?'\n- 'CRUD operations kya hote?'\n- 'What is Schema?'\n- 'MongoDB find query'"
  },
  {
    keywords: ["dsa", "data structures", "algorithms"],
    response: "🔁 **DSA** is key for coding interviews!\n\nAsk me specifically:\n- 'What is Big O notation?'\n- 'Binary search explain'\n- 'Stack vs Queue'\n- 'What is recursion?'\n- 'Sorting algorithms'"
  },
  {
    keywords: ["oop", "object oriented", "oops"],
    response: "🧱 **OOP** organizes code using objects and classes!\n\nAsk me specifically:\n- 'Explain inheritance'\n- 'What is encapsulation?'\n- 'Polymorphism kya hai?'\n- 'Method overriding'\n- 'What is abstraction?'"
  },
  {
    keywords: ["quiz", "test", "hints"],
    response: "📝 **Quiz Tips:**\n1. Read all options carefully\n2. Eliminate wrong answers first\n3. Don't guess — think logically\n4. Review the lesson if stuck\n\nNeed help with a specific topic? Just ask! 😊"
  },
  {
    keywords: ["navigate", "codevibe", "help", "how to use"],
    response: "🧭 **Navigating CodeVibe:**\n\n• **Courses** → Browse HTML, CSS, JS, React, Node, MongoDB\n• **Compiler** → Built-in code editor to test your code\n• **Dashboard** → Track progress & certificates\n• **Chatbot** → Ask me anything! 😄\n\nClick any course card to start learning!"
  },
  {
    keywords: ["infinite loop", "browser crash", "page frozen"],
    response: "🔄 **Infinite Loop Warning!**\n\n```javascript\n// ❌ Infinite loop — will crash browser!\nwhile (true) {\n  console.log('help!');\n}\n\n// ❌ Missing i++ in for loop\nfor (let i = 0; i < 10; ) { // ← forgot i++!\n  console.log(i);\n}\n```\n\n**Fix:** Always ensure loop has a working exit condition!"
  },
  {
    keywords: ["import error", "module not found", "compilation failed"],
    response: "❌ **Module Not Found Fix:**\n\n```javascript\n// Check 1: File path correct?\nimport Button from './Button';      // ✅\nimport Button from './button';      // ❌ case-sensitive!\n\n// Check 2: File extension\nimport Button from './Button.jsx';  // Try adding .jsx\n\n// Check 3: Package not installed?\nnpm install react-router-dom       // Install missing package\n```"
  }
];

export const fallbackResponse = "I'm still learning! 🤔 I didn't quite catch that. Could you try rephrasing?\n\nTry asking about:\n- \"Explain Flexbox\" / \"Flexbox kya hai\"\n- \"What is closure?\" / \"Closure explain karo\"\n- \"Syntax error fix kaise kare\"\n- \"React hooks kya hote hain\"\n- \"MongoDB vs SQL difference\"";
