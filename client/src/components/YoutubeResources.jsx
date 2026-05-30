import React, { useState } from "react";

// YouTube resource data mapped to roadmap topics
const youtubeResources = {
  // Web Development
  "HTML": [
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "HTML Crash Course", url: "https://www.youtube.com/watch?v=UB1O30fR-EE", avatar: "T" },
    { instructor: "Kevin Powell", channel: "Kevin Powell", playlist: "HTML for Beginners", url: "https://www.youtube.com/kepowob", avatar: "K" },
  ],
  "CSS": [
    { instructor: "Kevin Powell", channel: "Kevin Powell", playlist: "CSS Tutorials", url: "https://www.youtube.com/@KevinPowell", avatar: "K" },
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "CSS Crash Course", url: "https://www.youtube.com/watch?v=yfoY53QXEnI", avatar: "T" },
  ],
  "JavaScript": [
    { instructor: "Akshay Saini", channel: "Namaste JavaScript", playlist: "Namaste JavaScript", url: "https://www.youtube.com/@akshaymarch7", avatar: "A" },
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "JavaScript Tutorial", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "JavaScript Full Course", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Git & GitHub": [
    { instructor: "Kunal Kushwaha", channel: "Kunal Kushwaha", playlist: "Git & GitHub Tutorial", url: "https://www.youtube.com/@KunalKushwaha", avatar: "K" },
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "Git Crash Course", url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc", avatar: "T" },
  ],
  "React.js": [
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "React with Chai", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "React Crash Course", url: "https://www.youtube.com/watch?v=sBws8MSXN7A", avatar: "T" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "React Complete Course", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "APIs": [
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "REST API Tutorial", url: "https://www.youtube.com/watch?v=Q-BpqyOT3a8", avatar: "T" },
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "API Integration", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
  ],
  "Node.js": [
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "Node.js with Chai", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", avatar: "T" },
  ],
  "Express.js": [
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "Express.js Tutorial", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "Express Crash Course", url: "https://www.youtube.com/watch?v=L72fhGm1tfE", avatar: "T" },
  ],
  "System Design": [
    { instructor: "Gaurav Sen", channel: "Gaurav Sen", playlist: "System Design", url: "https://www.youtube.com/@gkcs", avatar: "G" },
    { instructor: "Striver", channel: "take U forward", playlist: "System Design Basics", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
  ],
  "Docker": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "Docker Tutorial", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
    { instructor: "Kunal Kushwaha", channel: "Kunal Kushwaha", playlist: "Docker for Beginners", url: "https://www.youtube.com/@KunalKushwaha", avatar: "K" },
  ],
  "CI/CD": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "CI/CD Pipeline", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
  ],
  "Deployment": [
    { instructor: "Traversy Media", channel: "Traversy Media", playlist: "Deploy MERN App", url: "https://www.youtube.com/watch?v=71wSzpLyW9k", avatar: "T" },
  ],

  // AI / ML
  "Python": [
    { instructor: "Tech With Tim", channel: "Tech With Tim", playlist: "Python Tutorials", url: "https://www.youtube.com/@TechWithTim", avatar: "T" },
    { instructor: "Hitesh Choudhary", channel: "Chai aur Code", playlist: "Python Tutorial", url: "https://www.youtube.com/@chaiaurcode", avatar: "H" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Python Full Course", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Math Basics": [
    { instructor: "3Blue1Brown", channel: "3Blue1Brown", playlist: "Essence of Linear Algebra", url: "https://www.youtube.com/@3blue1brown", avatar: "3" },
    { instructor: "StatQuest", channel: "StatQuest with Josh Starmer", playlist: "Statistics Fundamentals", url: "https://www.youtube.com/@statquest", avatar: "S" },
  ],
  "Pandas": [
    { instructor: "Corey Schafer", channel: "Corey Schafer", playlist: "Pandas Tutorial", url: "https://www.youtube.com/@coreyms", avatar: "C" },
  ],
  "NumPy": [
    { instructor: "Corey Schafer", channel: "Corey Schafer", playlist: "NumPy Tutorial", url: "https://www.youtube.com/@coreyms", avatar: "C" },
  ],
  "Machine Learning": [
    { instructor: "Krish Naik", channel: "Krish Naik", playlist: "Machine Learning Playlist", url: "https://www.youtube.com/@krishnaik06", avatar: "K" },
    { instructor: "CampusX", channel: "CampusX", playlist: "100 Days of ML", url: "https://www.youtube.com/@campusx-official", avatar: "C" },
  ],
  "Scikit-learn": [
    { instructor: "Krish Naik", channel: "Krish Naik", playlist: "Scikit-learn Tutorial", url: "https://www.youtube.com/@krishnaik06", avatar: "K" },
  ],
  "Data Visualization": [
    { instructor: "Krish Naik", channel: "Krish Naik", playlist: "Matplotlib & Seaborn", url: "https://www.youtube.com/@krishnaik06", avatar: "K" },
  ],
  "Deep Learning": [
    { instructor: "Andrej Karpathy", channel: "Andrej Karpathy", playlist: "Neural Networks: Zero to Hero", url: "https://www.youtube.com/@AndrejKarpathy", avatar: "A" },
    { instructor: "3Blue1Brown", channel: "3Blue1Brown", playlist: "Neural Networks", url: "https://www.youtube.com/@3blue1brown", avatar: "3" },
  ],
  "Neural Networks": [
    { instructor: "Andrej Karpathy", channel: "Andrej Karpathy", playlist: "Neural Networks: Zero to Hero", url: "https://www.youtube.com/@AndrejKarpathy", avatar: "A" },
    { instructor: "3Blue1Brown", channel: "3Blue1Brown", playlist: "Neural Networks Explained", url: "https://www.youtube.com/@3blue1brown", avatar: "3" },
  ],
  "Transformers": [
    { instructor: "Andrej Karpathy", channel: "Andrej Karpathy", playlist: "GPT from scratch", url: "https://www.youtube.com/@AndrejKarpathy", avatar: "A" },
  ],

  // Cybersecurity
  "Networking Basics": [
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Networking Course", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
    { instructor: "Professor Messer", channel: "Professor Messer", playlist: "CompTIA Network+", url: "https://www.youtube.com/@professormesser", avatar: "P" },
  ],
  "Linux": [
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Linux for Hackers", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
    { instructor: "Kunal Kushwaha", channel: "Kunal Kushwaha", playlist: "Linux Tutorial", url: "https://www.youtube.com/@KunalKushwaha", avatar: "K" },
  ],
  "Cybersecurity Fundamentals": [
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Cybersecurity Full Course", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
  ],
  "Ethical Hacking": [
    { instructor: "HackerSploit", channel: "HackerSploit", playlist: "Ethical Hacking Course", url: "https://www.youtube.com/@HackerSploit", avatar: "H" },
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Hacking Tutorials", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
  ],
  "OWASP": [
    { instructor: "HackerSploit", channel: "HackerSploit", playlist: "OWASP Top 10", url: "https://www.youtube.com/@HackerSploit", avatar: "H" },
  ],
  "Burp Suite": [
    { instructor: "PortSwigger", channel: "PortSwigger Web Security", playlist: "Burp Suite Tutorial", url: "https://www.youtube.com/@PortSwigger", avatar: "P" },
  ],
  "Penetration Testing": [
    { instructor: "TCM Security", channel: "TCM Security", playlist: "Practical Ethical Hacking", url: "https://www.youtube.com/@TCMSecurityAcademy", avatar: "T" },
  ],
  "Malware Analysis": [
    { instructor: "HackerSploit", channel: "HackerSploit", playlist: "Malware Analysis", url: "https://www.youtube.com/@HackerSploit", avatar: "H" },
  ],
  "Security Auditing": [
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Security Auditing", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
  ],

  // DevOps
  "Shell Scripting": [
    { instructor: "Network Chuck", channel: "NetworkChuck", playlist: "Shell Scripting", url: "https://www.youtube.com/@NetworkChuck", avatar: "N" },
    { instructor: "Kunal Kushwaha", channel: "Kunal Kushwaha", playlist: "Shell Scripting Tutorial", url: "https://www.youtube.com/@KunalKushwaha", avatar: "K" },
  ],
  "Kubernetes": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "Kubernetes Tutorial", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
    { instructor: "Kunal Kushwaha", channel: "Kunal Kushwaha", playlist: "Kubernetes for Beginners", url: "https://www.youtube.com/@KunalKushwaha", avatar: "K" },
  ],
  "AWS": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "AWS Tutorial", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
    { instructor: "Striver", channel: "take U forward", playlist: "Cloud Basics", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
  ],
  "Terraform": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "Terraform Tutorial", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
  ],
  "Monitoring & Scaling": [
    { instructor: "TechWorld with Nana", channel: "TechWorld with Nana", playlist: "Monitoring with Prometheus", url: "https://www.youtube.com/@TechWorldwithNana", avatar: "N" },
  ],

  // DSA
  "Arrays": [
    { instructor: "Striver", channel: "take U forward", playlist: "Arrays Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "DSA Sheet", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Algorithms", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Strings": [
    { instructor: "Striver", channel: "take U forward", playlist: "Strings Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "String Problems", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Time Complexity": [
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Algorithm Analysis", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
    { instructor: "Striver", channel: "take U forward", playlist: "Complexity Analysis", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
  ],
  "Basic Recursion": [
    { instructor: "Striver", channel: "take U forward", playlist: "Recursion Playlist", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Aditya Verma", channel: "Aditya Verma", playlist: "Recursion for Beginners", url: "https://www.youtube.com/@AdityaVermaTheProgrammingLord", avatar: "A" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Recursion & Backtracking", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Linked Lists": [
    { instructor: "Striver", channel: "take U forward", playlist: "Linked List Playlist", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Linked Lists", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Linked Lists", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Stack & Queue": [
    { instructor: "Striver", channel: "take U forward", playlist: "Stack & Queue Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Stack & Queue", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Stack & Queue", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Trees": [
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Trees Playlist", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
    { instructor: "Striver", channel: "take U forward", playlist: "Binary Trees Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Trees", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Binary Search": [
    { instructor: "Striver", channel: "take U forward", playlist: "Binary Search Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Binary Search", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Sliding Window": [
    { instructor: "Striver", channel: "take U forward", playlist: "Sliding Window & Two Pointers", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Aditya Verma", channel: "Aditya Verma", playlist: "Sliding Window Problems", url: "https://www.youtube.com/@AdityaVermaTheProgrammingLord", avatar: "A" },
  ],
  "Sorting Algorithms": [
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Sorting Algorithms", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
    { instructor: "Striver", channel: "take U forward", playlist: "Sorting", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
  ],
  "Graphs": [
    { instructor: "Striver", channel: "take U forward", playlist: "Graph Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Graph Algorithms", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Graph DSA", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Dynamic Programming": [
    { instructor: "Aditya Verma", channel: "Aditya Verma", playlist: "Dynamic Programming Playlist", url: "https://www.youtube.com/@AdityaVermaTheProgrammingLord", avatar: "A" },
    { instructor: "Striver", channel: "take U forward", playlist: "DP Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Dynamic Programming", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Greedy Algorithms": [
    { instructor: "Striver", channel: "take U forward", playlist: "Greedy Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Greedy Algorithms", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Tries": [
    { instructor: "Striver", channel: "take U forward", playlist: "Tries Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Love Babbar", channel: "Love Babbar", playlist: "Trie Data Structure", url: "https://www.youtube.com/@LoveBabbar", avatar: "L" },
  ],
  "Backtracking": [
    { instructor: "Aditya Verma", channel: "Aditya Verma", playlist: "Backtracking Problems", url: "https://www.youtube.com/@AdityaVermaTheProgrammingLord", avatar: "A" },
    { instructor: "Striver", channel: "take U forward", playlist: "Backtracking Series", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
    { instructor: "Abdul Bari", channel: "Abdul Bari", playlist: "Backtracking", url: "https://www.youtube.com/@abdul_bari", avatar: "A" },
  ],
  "Segment Trees": [
    { instructor: "Striver", channel: "take U forward", playlist: "Segment Trees", url: "https://www.youtube.com/@takeUforward", avatar: "S" },
  ],
};

// Color palette for instructor avatars
const avatarColors = {
  "S": "linear-gradient(135deg, #ff4d88, #c026d3)",
  "A": "linear-gradient(135deg, #f59e0b, #ef4444)",
  "L": "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  "H": "linear-gradient(135deg, #10b981, #0ea5e9)",
  "K": "linear-gradient(135deg, #ec4899, #f97316)",
  "T": "linear-gradient(135deg, #6366f1, #0ea5e9)",
  "N": "linear-gradient(135deg, #14b8a6, #6366f1)",
  "G": "linear-gradient(135deg, #84cc16, #22d3ee)",
  "C": "linear-gradient(135deg, #f43f5e, #fb923c)",
  "P": "linear-gradient(135deg, #a78bfa, #ec4899)",
  "3": "linear-gradient(135deg, #06b6d4, #3b82f6)",
};

/**
 * YoutubeResources component
 * Displays recommended YouTube channels/playlists for a given roadmap topic
 * @param {string} topic - The roadmap topic to show resources for
 * @param {function} onClose - Callback to close the panel
 */
const YoutubeResources = ({ topic, onClose }) => {
  const resources = youtubeResources[topic] || [];

  if (!topic) return null;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "16px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(255,77,136,0.08), rgba(30,10,60,0.5))",
        border: "1px solid rgba(255,77,136,0.25)",
        boxShadow: "0 4px 20px rgba(255,77,136,0.1)",
        animation: "slideDown 0.25s ease",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .yt-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(255,77,136,0.2) !important;
          border-color: rgba(255,77,136,0.4) !important;
        }
        .yt-link-btn:hover {
          background: rgba(255,77,136,0.25) !important;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* YouTube icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span style={{ color: "#fff", fontWeight: "600", fontSize: "0.9rem" }}>
            Recommended for: <span style={{ color: "#ff4d88" }}>{topic}</span>
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close YouTube resources"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: "1.1rem",
            lineHeight: 1,
            padding: "2px 6px",
            borderRadius: "6px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d88"; e.currentTarget.style.background = "rgba(255,77,136,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "none"; }}
        >
          ✕
        </button>
      </div>

      {resources.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {resources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {/* Avatar */}
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: avatarColors[res.avatar] || "linear-gradient(135deg,#ff4d88,#a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "1rem",
                color: "white",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}>
                {res.avatar}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "white", fontWeight: "600", fontSize: "0.85rem", marginBottom: "2px" }}>
                  {res.instructor}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {res.playlist}
                </div>
              </div>

              {/* YouTube play arrow */}
              <div
                className="yt-link-btn"
                style={{
                  background: "rgba(255,77,136,0.12)",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  color: "#ff4d88",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff4d88">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textAlign: "center", padding: "8px 0" }}>
          No resources mapped yet for this topic.
        </div>
      )}
    </div>
  );
};

export default YoutubeResources;
export { youtubeResources };
