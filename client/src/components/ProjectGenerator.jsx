import React, { useState } from 'react';
import './ProjectGenerator.css';

const PROJECTS_DATABASE = {
  "html-css": [
    {
      title: "Personal Portfolio",
      buildTime: "Build Time: 3-4 hours",
      prerequisites: ["Semantic HTML5", "CSS Flexbox & Grid", "Media Queries for Mobile"],
      accentClass: "tier-pink",
      previewLabel: "Portfolio View"
    },
    {
      title: "Netflix Landing Page",
      buildTime: "Build Time: 4-5 hours",
      prerequisites: ["CSS Overlays & Positioning", "Custom Video Controls", "Flex Wrapping Layouts"],
      accentClass: "tier-pink",
      previewLabel: "Netflix Clone"
    },
    {
      title: "Simple Restaurant Page",
      buildTime: "Build Time: 2-3 hours",
      prerequisites: ["CSS Forms & Inputs", "Table Layout Configurations", "Google Fonts Typography"],
      accentClass: "tier-pink",
      previewLabel: "Restaurant Site"
    }
  ],
  "javascript": [
    {
      title: "Interactive Calculator",
      buildTime: "Build Time: 3-4 hours",
      prerequisites: ["JavaScript DOM Click Events", "String Evaluation Core", "CSS Grid Keyboard Interface"],
      accentClass: "tier-green",
      previewLabel: "Calculator App"
    },
    {
      title: "Interactive To-Do List",
      buildTime: "Build Time: 4-5 hours",
      prerequisites: ["Array Data Methods (push/filter)", "Local Storage Persistence", "DOM Node Creation"],
      accentClass: "tier-green",
      previewLabel: "To-Do Component"
    },
    {
      title: "Weather Dashboard App",
      buildTime: "Build Time: 5-6 hours",
      prerequisites: ["Fetch API / Axios Requests", "JSON Response Processing", "Dynamic Icon Injection"],
      accentClass: "tier-green",
      previewLabel: "Weather API Portal"
    }
  ],
  "react": [
    {
      title: "React To-Do Application",
      buildTime: "Build Time: 4-5 hours",
      prerequisites: ["React useState & useEffect Hooks", "Component Prop Drilling Rules", "Controlled Form Hooks"],
      accentClass: "tier-blue",
      previewLabel: "React Task Board"
    },
    {
      title: "Movie Database Search Engine",
      buildTime: "Build Time: 5-7 hours",
      prerequisites: ["Async REST API Integration", "Conditional Result Rendering", "State-based Debounce Functions"],
      accentClass: "tier-blue",
      previewLabel: "Movie Search Hub"
    },
    {
      title: "Personal Expense Tracker",
      buildTime: "Build Time: 6-8 hours",
      prerequisites: ["React Context API State", "Reduce Functional Array Operations", "Charts & Visual Graphics Data"],
      accentClass: "tier-blue",
      previewLabel: "Expense Charts"
    }
  ],
  "fullstack": [
    {
      title: "MERN To-Do Application",
      buildTime: "Build Time: 8-10 hours",
      prerequisites: ["Express.js REST API Design", "MongoDB/Mongoose Schemas", "Cross-Origin (CORS) Setups"],
      accentClass: "tier-purple",
      previewLabel: "Full Stack Dashboard"
    },
    {
      title: "Student Management System",
      buildTime: "Build Time: 12-15 hours",
      prerequisites: ["Relational Database Mapping", "JWT User Session Cryptography", "Admin Middleware Guards"],
      accentClass: "tier-purple",
      previewLabel: "SMS Portal"
    },
    {
      title: "Enterprise Job Portal",
      buildTime: "Build Time: 18-22 hours",
      prerequisites: ["File Multi-upload Cloud Pipelines", "Advanced Query Pagination Filters", "Cookie Authorization Profiles"],
      accentClass: "tier-purple",
      previewLabel: "Job Hub Engine"
    }
  ],
  "dsa-cpp": [
    {
      title: "Student Record Management System",
      buildTime: "Build Time: 6-8 hours",
      prerequisites: ["C++ File System Streams (fstream)", "Struct / Class Object Architecture", "Sequential Search Algorithms"],
      accentClass: "tier-orange",
      previewLabel: "Record Console DB"
    },
    {
      title: "Library Management Engine",
      buildTime: "Build Time: 8-10 hours",
      prerequisites: ["Linked List Pointer Nodes", "Dynamic Heap Memory Management", "Sorting System Keys"],
      accentClass: "tier-orange",
      previewLabel: "Library System API"
    },
    {
      title: "Bank Management Terminal",
      buildTime: "Build Time: 10-12 hours",
      prerequisites: ["Object Oriented (OOP) Inheritance", "Hash Map Transactions Indexing", "Data Vault Encapsulation Logic"],
      accentClass: "tier-orange",
      previewLabel: "Banking Main Core"
    }
  ]
};

export default function ProjectGenerator() {
  const [tempSelection, setTempSelection] = useState("");
  const [renderedTier, setRenderedTier] = useState("");

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setTempSelection(value);
    
    // Instantly collapse the lower results view if toggled back to 'Select Domain'
    if (value === "") {
      setRenderedTier("");
    }
  };

  const handleGetProjects = () => {
    setRenderedTier(tempSelection);
  };

  return (
    <section className="cv-reference-master-section">
      
      {/* Synchronized Header Container */}
      <div className="cv-reference-header-block">
        <h2 className="cv-reference-main-heading">
          🚀 Project Milestone Generator
        </h2>
        <p className="cv-reference-subtext-desc">
          Choose your domain and generate structured projects and knowledge milestones.
        </p>
      </div>

      {/* Symmetrical Controls Input Row */}
      <div className="cv-reference-controls-row">
        <select 
          className="cv-reference-native-select"
          value={tempSelection}
          onChange={handleDropdownChange}
        >
          <option value="">Select Domain</option>
          <option value="html-css">HTML & CSS Styling Projects</option>
          <option value="javascript">HTML, CSS & Core JS Apps</option>
          <option value="react">React Component Frameworks</option>
          <option value="fullstack">Full Stack MERN Architectures</option>
          <option value="dsa-cpp">C++ Systems & DSA Tools</option>
        </select>

        <button 
          className="cv-reference-action-btn"
          onClick={handleGetProjects}
          disabled={!tempSelection}
        >
          Generate Projects
        </button>
      </div>

      {/* Symmetrical Output Results Display Area */}
      {renderedTier && PROJECTS_DATABASE[renderedTier] && (
        <div className="cv-reference-dynamic-results-view">
          <div className="cv-reference-cards-responsive-grid">
            {PROJECTS_DATABASE[renderedTier].map((project, index) => (
              <div className="cv-reference-project-tile" key={index}>
                
                {/* Content Details Left Box */}
                <div className="cv-reference-tile-content-left">
                  <h3 className="cv-reference-project-title">{project.title}</h3>
                  <div className="cv-reference-build-time">{project.buildTime}</div>
                  
                  <div className="cv-reference-requirements-wrapper">
                    <span className="cv-reference-requirements-headline">Required Knowledge</span>
                    <ul className="cv-reference-clean-ul">
                      {project.prerequisites.map((req, idx) => (
                        <li key={idx} className="cv-reference-li-item">
                          ✅ {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Symmetrical Viewport Graphic Right Box */}
                <div className="cv-reference-tile-graphic-right">
                  <div className={`cv-reference-micro-browser ${project.accentClass}`}>
                    <div className="cv-reference-browser-header-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="cv-reference-browser-canvas">
                      <div className="cv-reference-canvas-title">{project.previewLabel}</div>
                      <div className="cv-reference-canvas-wirelines">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}