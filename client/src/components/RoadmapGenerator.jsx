import React, { useState } from "react";

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
};

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  const generateRoadmap = () => {
    setRoadmap(roadmapData[domain]);
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
              style={{
                color: "black",
              }}
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
        >
          Generate Roadmap
        </button>
      </div>

      {/* Roadmap */}
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
                {topics.map((topic, index) => (
                  <li
                    key={index}
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "14px",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    ✅ {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoadmapGenerator;