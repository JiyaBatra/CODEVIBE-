import React, { useState } from "react";
import "./RoadmapTimeline.css";

const roadmapData = {
  "Web Development": {
    Beginner: ["HTML", "CSS", "JavaScript", "Git & GitHub"],
    Intermediate: ["React.js", "APIs", "Node.js", "Express.js"],
    Advanced: ["System Design", "Docker", "CI/CD", "Deployment"],
  },
  "AI / ML": {
    Beginner: ["Python", "Math Basics", "Pandas", "NumPy"],
    Intermediate: ["Machine Learning", "Scikit-learn", "Data Visualization"],
    Advanced: ["Deep Learning", "Neural Networks", "Transformers"],
  },
  Cybersecurity: {
    Beginner: ["Networking Basics", "Linux", "Cybersecurity Fundamentals"],
    Intermediate: ["Ethical Hacking", "OWASP", "Burp Suite"],
    Advanced: ["Penetration Testing", "Malware Analysis", "Security Auditing"],
  },
  DevOps: {
    Beginner: ["Linux", "Git & GitHub", "Shell Scripting"],
    Intermediate: ["Docker", "Kubernetes", "CI/CD"],
    Advanced: ["AWS", "Terraform", "Monitoring & Scaling"],
  },
  DSA: {
    Beginner: ["Arrays", "Strings", "Time Complexity", "Basic Recursion"],
    Intermediate: ["Linked Lists", "Stack & Queue", "Trees", "Binary Search", "Sliding Window", "Sorting Algorithms"],
    Advanced: ["Graphs", "Dynamic Programming", "Greedy Algorithms", "Tries", "Backtracking", "Segment Trees"],
  },
};

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const generateRoadmap = () => {
    if (!domain) {
      setRoadmap(null); 
      setCompletedSteps([]);
      return;
    }
    const data = roadmapData[domain];
    setRoadmap([
      { id: 1, tier: "Beginner", title: "Foundation Level", topics: data.Beginner, icon: "🚀" },
      { id: 2, tier: "Intermediate", title: "Core Concepts", topics: data.Intermediate, icon: "⚡" },
      { id: 3, tier: "Advanced", title: "Mastery Level", topics: data.Advanced, icon: "🔥" }
    ]);
    setCompletedSteps([]);
  };

  const toggleStep = (id) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((stepId) => stepId !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  const calculateProgressHeight = () => {
    if (completedSteps.length === 0) return "0%";
    const maxId = Math.max(...completedSteps);
    if (maxId === 1) return "25%";
    if (maxId === 2) return "65%";
    return "100%";
  };

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <h2 className="timeline-main-title">🚀 Personalized Roadmap Generator</h2>
        <p className="timeline-subtitle">Choose your domain and generate a structured learning path.</p>
      </div>

      <div className="timeline-controls">
        <select
          id="domain-select"
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="timeline-select"
        >
          <option value="" style={{ color: "white", background: "#1a1a26" }}>Select Domain</option>
          {Object.keys(roadmapData).map((item) => (
            <option key={item} value={item} style={{ color: "white", background: "#1a1a26" }}>
              {item}
            </option>
          ))}
        </select>

        <button onClick={generateRoadmap} className="timeline-btn">
          Generate Roadmap
        </button>
      </div>

      {roadmap && (
        <div className="timeline-container">
          <div className="timeline-wrapper">
            <div className="timeline-axis" />
            <div
              className="timeline-progress-line"
              style={{ height: calculateProgressHeight() }}
            />

            {roadmap.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`timeline-item ${isLeft ? "left" : "right"} ${isCompleted ? "active" : ""}`}
                >
                  <div
                    className={`timeline-node ${isCompleted ? "glow" : ""}`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <span className="node-icon">{step.icon}</span>
                  </div>

                  <div className="timeline-card" onClick={() => toggleStep(step.id)}>
                    <span className={`tier-badge ${step.tier.toLowerCase()}`}>{step.tier}</span>
                    <h3 className="card-title">{step.title}</h3>
                    <ul className="topics-list">
                      {step.topics.map((topic, idx) => (
                        <li key={idx} className="topic-item">
                          <span className="checkmark">✓</span> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default RoadmapGenerator;