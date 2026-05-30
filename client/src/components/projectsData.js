// PROJECTS_DATABASE: Local data file for dynamic generation
const PROJECTS_DATABASE = [
  // === BEGINNER LEVEL: HTML & CSS ONLY ===
  {
    id: "b1",
    level: "html-css",
    title: "Personal Portfolio Page",
    description: "Build a single-page responsive layout to display a developer profile, biography, clean links to social media, and a working visual contact grid.",
    requiredKnowledge: ["Semantic HTML5 Tags", "CSS Flexbox layout models", "Media Queries for responsive break-points"],
    duration: "2-3 hours"
  },
  {
    id: "b2",
    level: "html-css",
    title: "Product Landing Page",
    description: "Create an attractive sales presentation page for a futuristic tech gadget. Must include a sticky header navigation bar, embedded showcase video container, and a pricing card table.",
    requiredKnowledge: ["CSS Grid positioning", "Sticky & Absolute positioning", "Form element inputs and labels"],
    duration: "3-4 hours"
  },

  // === INTERMEDIATE LEVEL: HTML, CSS & JAVASCRIPT ===
  {
    id: "i1",
    level: "html-css-js",
    title: "Interactive Digital Counter",
    description: "Develop a lightweight application containing dynamic increment, decrement, and reset mechanisms. The interface numbers should dynamically change color based on negative or positive value updates.",
    requiredKnowledge: ["DOM Query Selectors", "AddEventListener methods", "JavaScript Variables & Conditionals"],
    duration: "1-2 hours"
  },
  {
    id: "i2",
    level: "html-css-js",
    title: "Interactive Quiz Application",
    description: "Build a timed multi-choice quiz workspace. Tracks correct/incorrect user selections, shows a live progress step bar, and presents a customized point breakdown scorecard view at the end.",
    requiredKnowledge: ["Array Iteration & Loop structures", "Dynamic DOM HTML innerText rendering", "JavaScript SetTimeout / SetInterval clocks"],
    duration: "4-5 hours"
  },

  // === ADVANCED LEVEL: FRONTEND + WEB APIS ===
  {
    id: "a1",
    level: "frontend-apis",
    title: "Real-Time Weather Dashboard",
    description: "Engine a weather dashboard that interfaces with public APIs. Users can input city names to view immediate dynamic atmospheric forecasts, humidity stats, and custom icons depending on climate state.",
    requiredKnowledge: ["JavaScript Fetch API async/await", "JSON parsing mechanics", "Error validation handling (Try/Catch)"],
    duration: "4-6 hours"
  }
];

export default PROJECTS_DATABASE;