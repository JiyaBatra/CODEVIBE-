import React, { useState } from "react";
import YoutubeResources, { youtubeResources } from "./YoutubeResources";

const roadmapData = {
  "Web Development": {
    Beginner: [
      "HTML",
      "CSS",
      "JavaScript",
      "Git & GitHub",
    ],
    Intermediate: [
      "React.js",
      "APIs",
      "Node.js",
      "Express.js",
    ],
    Advanced: [
      "System Design",
      "Docker",
      "CI/CD",
      "Deployment",
    ],
  },

  "AI / ML": {
    Beginner: [
      "Python",
      "Math Basics",
      "Pandas",
      "NumPy",
    ],
    Intermediate: [
      "Machine Learning",
      "Scikit-learn",
      "Data Visualization",
    ],
    Advanced: [
      "Deep Learning",
      "Neural Networks",
      "Transformers",
    ],
  },

  Cybersecurity: {
    Beginner: [
      "Networking Basics",
      "Linux",
      "Cybersecurity Fundamentals",
    ],
    Intermediate: [
      "Ethical Hacking",
      "OWASP",
      "Burp Suite",
    ],
    Advanced: [
      "Penetration Testing",
      "Malware Analysis",
      "Security Auditing",
    ],
  },

  DevOps: {
    Beginner: [
      "Linux",
      "Git & GitHub",
      "Shell Scripting",
    ],
    Intermediate: [
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
    Advanced: [
      "AWS",
      "Terraform",
      "Monitoring & Scaling",
    ],
  },
  DSA: {
    Beginner: [
      "Arrays",
      "Strings",
      "Time Complexity",
      "Basic Recursion",
    ],
    Intermediate: [
      "Linked Lists",
      "Stack & Queue",
      "Trees",
      "Binary Search",
      "Sliding Window",
      "Sorting Algorithms",
    ],
    Advanced: [
      "Graphs",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Tries",
      "Backtracking",
      "Segment Trees",
    ],
  },
};

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  // activeTopic: { level, topic } — tracks which topic's YouTube panel is open
  const [activeTopic, setActiveTopic] = useState(null);

  const generateRoadmap = () => {
    setRoadmap(roadmapData[domain]);
    setActiveTopic(null);
  };

  /**
   * Toggle the YouTube resources panel for a topic.
   * Clicking the same topic again closes the panel.
   */
  const handleTopicClick = (level, topic) => {
    setActiveTopic((prev) =>
      prev && prev.level === level && prev.topic === topic ? null : { level, topic }
    );
  };

  const hasResources = (topic) => {
    return youtubeResources[topic] && youtubeResources[topic].length > 0;
  };

  return (
    <section
      style={{
        marginTop: "80px",
        marginBottom: "80px",
        padding: "40px",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg, rgba(20,20,40,0.95), rgba(10,10,30,0.95))",
        border: "1px solid rgba(255, 0, 128, 0.3)",
        boxShadow: "0 0 30px rgba(255, 0, 128, 0.15)",
      }}
    >
      <style>{`
        .topic-pill {
          transition: all 0.25s ease !important;
        }
        .topic-pill:hover {
          background: rgba(255,77,136,0.15) !important;
          border-color: rgba(255,77,136,0.4) !important;
          transform: translateX(4px);
        }
        .topic-pill.has-yt:hover .yt-hint {
          opacity: 1 !important;
        }
      `}</style>

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
          🚀 Personalized Roadmap Generator
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
          }}
        >
          Choose your domain and generate a structured learning path.
        </p>
        {roadmap && (
          <p style={{ color: "rgba(255,77,136,0.8)", fontSize: "0.85rem", marginTop: "8px" }}>
            💡 Click any topic to see recommended YouTube resources
          </p>
        )}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <select
          id="domain-select"
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          style={{
            padding: "14px 18px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            outline: "none",
            minWidth: "250px",
            fontSize: "1rem",
          }}
        >
          <option value="">Select Domain</option>
          {Object.keys(roadmapData).map((item) => (
            <option
              key={item}
              value={item}
              style={{ color: "black" }}
            >
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={generateRoadmap}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            background: "#ff4d88",
            color: "white",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e0336e"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#ff4d88"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          Generate Roadmap
        </button>
      </div>

      {/* Roadmap Grid */}
      {roadmap && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {Object.entries(roadmap).map(([level, topics]) => (
            <div
              key={level}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 20px rgba(255, 0, 128, 0.1)",
              }}
            >
              <h3
                style={{
                  color: "#ff4d88",
                  marginBottom: "20px",
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
              >
                {level}
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {topics.map((topic, index) => {
                  const isActive = activeTopic && activeTopic.level === level && activeTopic.topic === topic;
                  const hasYT = hasResources(topic);

                  return (
                    <li key={index} style={{ marginBottom: "10px" }}>
                      {/* Topic pill — clickable if has YT resources */}
                      <button
                        onClick={() => hasYT && handleTopicClick(level, topic)}
                        title={hasYT ? `Click to see YouTube resources for ${topic}` : topic}
                        className={`topic-pill${hasYT ? " has-yt" : ""}`}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          color: isActive ? "#ff4d88" : "rgba(255,255,255,0.85)",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: isActive
                            ? "rgba(255,77,136,0.12)"
                            : "rgba(255,255,255,0.04)",
                          border: isActive
                            ? "1px solid rgba(255,77,136,0.35)"
                            : "1px solid rgba(255,255,255,0.06)",
                          cursor: hasYT ? "pointer" : "default",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontWeight: isActive ? "600" : "400",
                          fontSize: "0.9rem",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "1rem" }}>{isActive ? "📖" : "✅"}</span>
                          {topic}
                        </span>

                        {/* YouTube badge indicator */}
                        {hasYT && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              background: isActive ? "rgba(255,0,0,0.15)" : "rgba(255,0,0,0.08)",
                              border: "1px solid rgba(255,0,0,0.2)",
                              borderRadius: "6px",
                              padding: "2px 7px",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="#ff0000">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: "500" }}>
                              {isActive ? "close" : "learn"}
                            </span>
                          </span>
                        )}
                      </button>

                      {/* YouTube Resources Panel — slides open below active topic */}
                      {isActive && (
                        <YoutubeResources
                          topic={topic}
                          onClose={() => setActiveTopic(null)}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoadmapGenerator;