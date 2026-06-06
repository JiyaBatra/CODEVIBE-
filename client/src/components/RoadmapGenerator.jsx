import React, { useState, useMemo } from "react";
import Dropdown from "./common/Dropdown";

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

const getIconForTopic = (topic) => {
  const lower = topic.toLowerCase();
  if (lower.includes("react") || lower.includes("javascript") || lower.includes("html") || lower.includes("css") || lower.includes("node") || lower.includes("express")) return "💻";
  if (lower.includes("docker") || lower.includes("ci/cd") || lower.includes("deployment") || lower.includes("kubernetes") || lower.includes("aws") || lower.includes("terraform")) return "☁️";
  if (lower.includes("python") || lower.includes("math") || lower.includes("pandas") || lower.includes("machine learning") || lower.includes("neural") || lower.includes("transformers")) return "🤖";
  if (lower.includes("cybersecurity") || lower.includes("hacking") || lower.includes("security") || lower.includes("malware") || lower.includes("owasp")) return "🛡️";
  if (lower.includes("arrays") || lower.includes("strings") || lower.includes("linked lists") || lower.includes("trees") || lower.includes("graphs")) return "🌲";
  if (lower.includes("git") || lower.includes("linux") || lower.includes("system") || lower.includes("networking")) return "⚙️";
  return "🎯";
};

const RoadmapGenerator = () => {
  const [domain, setDomain] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const generateRoadmap = () => {
    setRoadmap(roadmapData[domain]);
    setActiveIndex(0);
  };

  const processedLevels = useMemo(() => {
    if (!roadmap) return [];
    let globalIdx = 0;
    const activeLevels = ["Beginner", "Intermediate", "Advanced"].filter(lvl => roadmap[lvl] && roadmap[lvl].length > 0);

    return activeLevels.map((level, index) => {
      const startIdx = globalIdx;
      const nodes = roadmap[level].map(topic => ({
        id: globalIdx++,
        title: topic,
        icon: getIconForTopic(topic),
      }));
      return {
        level,
        nodes,
        startIndex: startIdx,
        endIndex: globalIdx - 1,
        isLeft: index % 2 === 0 
      };
    });
  }, [roadmap]);

  return (
    <section
      id="roadmap-generator"
      style={{
        marginTop: "80px",
        marginBottom: "80px",
        padding: "40px",
        borderRadius: "24px",
        background: "linear-gradient(135deg, rgba(20,20,40,0.95), rgba(10,10,30,0.95))",
        border: "1px solid rgba(255, 0, 128, 0.3)",
        boxShadow: "0 0 30px rgba(255, 0, 128, 0.15)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "white",
        position: "relative"
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d88" />
            <stop offset="100%" stopColor="#9b51e0" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        /* Shared CSS */
        .z-timeline-wrapper {
          position: relative;
          max-width: 900px;
          margin: 40px auto 0;
          display: flex;
          flex-direction: column;
        }
        
        .level-column {
          position: relative;
          padding-bottom: 0px; 
        }

        .vert-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 4px;
          border-radius: 4px;
          z-index: 1;
        }
        .vert-line.bg-line { background: rgba(255,255,255,0.05); }
        .vert-line.fill-line {
          background: linear-gradient(to bottom, #ff4d88, #9b51e0);
          box-shadow: 0 0 15px rgba(255,77,136,0.6);
          transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .node-row {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          z-index: 2;
        }
        .node-row:last-child { margin-bottom: 0; }

        .icon-box {
          width: 50px; height: 50px;
          background: #1a1a2e; border: 3px solid rgba(255,255,255,0.1); border-radius: 50%;
          display: flex; justify-content: center; align-items: center; font-size: 20px;
          transition: all 0.4s ease; flex-shrink: 0; cursor: pointer;
          position: absolute;
        }
        .node-row:hover .icon-box { border-color: rgba(255,255,255,0.4); }
        .node-row.active .icon-box {
          border-color: #ff4d88; box-shadow: 0 0 20px rgba(255,77,136,0.6);
          transform: scale(1.15); background: #2d1b36;
        }
        .icon-emoji { opacity: 0.4; transition: opacity 0.3s; }
        .node-row:hover .icon-emoji, .node-row.active .icon-emoji { opacity: 1; }

        .card-box {
          background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08); padding: 24px; border-radius: 16px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; box-sizing: border-box; cursor: pointer;
        }
        .node-row:hover .card-box { transform: translateY(-4px); border-color: rgba(255, 255, 255, 0.2); }
        .node-row.active .card-box {
          border-color: rgba(255,77,136,0.5); box-shadow: 0 8px 32px 0 rgba(255,77,136,0.2); background: rgba(255, 255, 255, 0.06);
        }

        .lvl-badge { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; display: block; }
        .lvl-Beginner { color: #4ade80; } .lvl-Intermediate { color: #facc15; } .lvl-Advanced { color: #f87171; }
        .card-title { font-size: 1.25rem; font-weight: 600; color: #a1a1aa; margin: 0; transition: color 0.3s; }
        .node-row.active .card-title { color: #ffffff; }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .diagonal-container { display: none !important; }
          .vert-line { left: 23px; }
          
          .node-row { 
            display: block;
            padding-left: 65px; 
            margin-bottom: 30px; 
            min-height: 60px;
          }
          
          .icon-box { 
            left: 0; 
            top: 50%; 
            transform: translateY(-50%);
            position: absolute;
          }
          
          .card-box { 
            width: 100%; 
            margin: 0; 
            padding: 20px 15px; 
            box-sizing: border-box;
            height: auto !important;
            word-wrap: break-word; 
            overflow-wrap: break-word;
            word-break: break-word;
            white-space: normal;
          }
          
          .card-title {
            font-size: 1.1rem;
            line-height: 1.4;
          }
        }

        /* PC Z-Pattern */
        @media (min-width: 769px) {
          .level-column { padding: 20px 0; }
          .pc-left .vert-line { left: 40px; }
          .pc-right .vert-line { right: 40px; }
          
          .pc-left .node-row { flex-direction: row; }
          .pc-right .node-row { flex-direction: row-reverse; }
          
          .pc-left .icon-box { left: 17px; }
          .pc-right .icon-box { right: 17px; }

          .card-box { width: calc(100% - 100px); max-width: 450px; }
          .pc-left .card-box { margin-left: 100px; margin-right: auto; text-align: left; }
          .pc-right .card-box { margin-right: 100px; margin-left: auto; text-align: right; }
          
          .diagonal-container {
            height: 100px;
            position: relative;
            margin: 0 42px; 
            z-index: 0;
          }
          .svg-diagonal {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            overflow: visible;
          }
          .svg-diagonal line { stroke-width: 4; stroke-linecap: round; }
          .svg-diagonal.bg-line line { stroke: rgba(255,255,255,0.05); }
          .svg-diagonal.fill-line {
            transition: clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .svg-diagonal.fill-line line {
            stroke: url(#glow-gradient);
            filter: drop-shadow(0 0 8px rgba(255,77,136,0.6));
          }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#ff4d88", fontSize: "2.3rem", marginBottom: "12px", fontWeight: "700" }}>
          🚀 Personalized Roadmap Generator
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
          Choose your domain and start your interactive learning journey.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <Dropdown
          value={domain}
          onChange={setDomain}
          options={Object.keys(roadmapData)}
          placeholder="Select Domain"
          style={{ minWidth: "280px" }}
          triggerStyle={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            border: "1px solid rgba(255, 20, 147, 0.35)",
            boxShadow: "0 0 18px rgba(255, 20, 147, 0.18), inset 0 0 8px rgba(255,255,255,0.04)",
          }}
        />
        <button
          onClick={generateRoadmap}
          disabled={!domain}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            background: domain ? "#ff4d88" : "rgba(255, 77, 136, 0.4)",
            color: "white",
            border: "none",
            fontWeight: "600",
            cursor: domain ? "pointer" : "not-allowed",
            transition: "0.3s ease",
          }}
        >
          Generate Roadmap
        </button>
      </div>

      {processedLevels.length > 0 && (
        <div className="z-timeline-wrapper">
          {processedLevels.map((section, levelIdx) => {
            const isLeft = section.isLeft;
            const isLastLevel = levelIdx === processedLevels.length - 1;
            
            const isFullyPassed = activeIndex > section.endIndex;
            const isActiveHere = activeIndex >= section.startIndex && activeIndex <= section.endIndex;
            
            let vertFill = 0;
            if (isFullyPassed) {
              vertFill = 100;
            } else if (isActiveHere) {
              vertFill = ((activeIndex - section.startIndex + 1) / section.nodes.length) * 100;
            }

            let clipPathStyle;
            if (isFullyPassed) {
               clipPathStyle = "inset(0 0 0 0)"; 
            } else {
               clipPathStyle = isLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)"; 
            }

            return (
              <React.Fragment key={section.level}>
                <div className={`level-column ${isLeft ? "pc-left" : "pc-right"}`}>
                  <div className="vert-line bg-line"></div>
                  <div className="vert-line fill-line" style={{ height: `${vertFill}%` }}></div>

                  {section.nodes.map((node) => {
                    const isActive = node.id <= activeIndex;
                    return (
                      <div 
                        key={node.id} 
                        className={`node-row ${isActive ? "active" : ""}`}
                        onClick={() => setActiveIndex(node.id)}
                      >
                        <div className="icon-box">
                          <span className="icon-emoji">{node.icon}</span>
                        </div>
                        <div className="card-box">
                          <span className={`lvl-badge lvl-${section.level}`}>{section.level}</span>
                          <h3 className="card-title">{node.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isLastLevel && (
                  <div className="diagonal-container">
                    <svg className="svg-diagonal bg-line">
                      <line x1={isLeft ? "0%" : "100%"} y1="0%" x2={isLeft ? "100%" : "0%"} y2="100%" />
                    </svg>
                    <svg className="svg-diagonal fill-line" style={{ clipPath: clipPathStyle }}>
                      <line x1={isLeft ? "0%" : "100%"} y1="0%" x2={isLeft ? "100%" : "0%"} y2="100%" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RoadmapGenerator;