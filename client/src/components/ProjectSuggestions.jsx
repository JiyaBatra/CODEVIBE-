import React, { useState } from "react";

const projectData = {
  Beginner: [
    {
      name: "Personal Portfolio Page",
      description: "A responsive personal website to showcase your skills and projects to potential employers.",
      knowledge: ["HTML Semantics", "CSS Flexbox", "Media Queries"],
      time: "⏱️ 3 hours",
    },
    {
      name: "Interactive Quiz App",
      description: "A fun quiz game that asks multiple-choice questions, tracks the score, and shows the result at the end.",
      knowledge: ["JavaScript Variables", "DOM Manipulation", "Event Listeners"],
      time: "⏱️ 4 hours",
    },
    {
      name: "Weather Dashboard",
      description: "A dashboard that fetches and displays the current weather data for a city using a public API.",
      knowledge: ["Fetch API", "Promises", "JSON Parsing"],
      time: "⏱️ 5 hours",
    },
  ],
  Intermediate: [
    {
      name: "Task Manager App",
      description: "A full CRUD application to manage daily tasks, complete with filtering and local storage persistence.",
      knowledge: ["React Hooks", "State Management", "Local Storage"],
      time: "⏱️ 8 hours",
    },
    {
      name: "Movie Search Engine",
      description: "An app that allows users to search for movies, view details, and save their favorites.",
      knowledge: ["React Router", "API Integration", "Component Lifecycle"],
      time: "⏱️ 10 hours",
    },
  ],
  Advanced: [
    {
      name: "E-Commerce Storefront",
      description: "A complete storefront with product listings, a shopping cart, and a mock checkout process.",
      knowledge: ["Global State (Redux/Context)", "Authentication", "Payment Integration Basics"],
      time: "⏱️ 15 hours",
    },
    {
      name: "Real-time Chat Application",
      description: "A chat app where multiple users can join rooms and send messages in real-time.",
      knowledge: ["WebSockets (Socket.io)", "Node.js", "Express.js"],
      time: "⏱️ 20 hours",
    },
  ],
};

const ProjectSuggestions = () => {
  const [level, setLevel] = useState("");

  const selectedProjects = level ? projectData[level] : [];

  return (
    <section
      style={{
        marginTop: "40px",
        marginBottom: "80px",
        padding: "40px",
        borderRadius: "24px",
        background: "linear-gradient(135deg, rgba(20,20,40,0.95), rgba(10,10,30,0.95))",
        border: "1px solid rgba(255, 0, 128, 0.3)",
        boxShadow: "0 0 30px rgba(255, 0, 128, 0.15)",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{
            color: "#ff4d88",
            fontSize: "2.3rem",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          💡 Project Suggestion Component
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Select your current skill level to see actionable projects you can build along with their structural prerequisites.
        </p>
      </div>

      {/* Dropdown Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{
            padding: "14px 18px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.08)",
            color: level === "" ? "rgba(255,255,255,0.7)" : "white",
            border: "1px solid rgba(255,255,255,0.15)",
            outline: "none",
            minWidth: "250px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          <option value="" style={{ color: "black" }}>Select Level</option>
          <option value="Beginner" style={{ color: "black" }}>Beginner</option>
          <option value="Intermediate" style={{ color: "black" }}>Intermediate</option>
          <option value="Advanced" style={{ color: "black" }}>Advanced</option>
        </select>
      </div>

      {/* Project Cards Grid */}
      {selectedProjects.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {selectedProjects.map((project, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 20px rgba(255, 0, 128, 0.1)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 0, 128, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 128, 0.1)";
              }}
            >
              <h3
                style={{
                  color: "#ff4d88",
                  marginBottom: "12px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                }}
              >
                {project.name}
              </h3>
              
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                  flexGrow: 1,
                }}
              >
                {project.description}
              </p>

              <div style={{ marginBottom: "16px" }}>
                <h4
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px",
                  }}
                >
                  Required Knowledge:
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {project.knowledge.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.9rem",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#ff4d88", marginRight: "8px" }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  color: "#ff4d88",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {project.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectSuggestions;
