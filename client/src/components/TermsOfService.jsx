import React, { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | CodeVibe";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read the official Terms of Service for CodeVibe. Learn about user responsibilities, licenses, limitations, privacy, and legal conditions for using the CodeVibe platform."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Read the official Terms of Service for CodeVibe. Learn about user responsibilities, licenses, limitations, privacy, and legal conditions for using the CodeVibe platform.";
      document.head.appendChild(meta);
    }
  }, []);

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using CodeVibe, you agree to comply with these Terms of Service and all applicable laws and regulations.",
    },
    {
      title: "Use License",
      content:
        "Users are granted a limited, non-commercial license to access and use CodeVibe materials and services.",
    },
    {
      title: "Disclaimer",
      content:
        "All materials and services on CodeVibe are provided 'as is' without warranties of any kind.",
    },
    {
      title: "User Conduct",
      content:
        "Users must not upload malicious code, disrupt services, harass others, or violate any applicable laws.",
    },
    {
      title: "Account Responsibility",
      content:
        "Users are responsible for maintaining account security and confidentiality of credentials.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms of Service are governed by the laws of India and applicable jurisdictions.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#e5e7eb",
      }}
    >
      <article
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* SEO Optimized Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              marginBottom: "15px",
              background: "linear-gradient(to right, #38bdf8, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CodeVibe Terms of Service
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              lineHeight: "1.8",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Read the official legal terms and conditions for using the
            CodeVibe platform, including user rights, account security,
            acceptable use, and service limitations.
          </p>

          <p
            style={{
              marginTop: "20px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Last Updated: May 2026
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >
          {sections.map((section, index) => (
            <section
              key={index}
              aria-labelledby={`section-${index}`}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "28px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                transition: "0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.border =
                  "1px solid rgba(56,189,248,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.1)";
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#fff",
                  marginBottom: "20px",
                  boxShadow: "0 4px 15px rgba(56,189,248,0.35)",
                }}
              >
                {index + 1}
              </div>

              <h2
                id={`section-${index}`}
                style={{
                  color: "#ffffff",
                  marginBottom: "15px",
                  fontSize: "24px",
                  lineHeight: "1.4",
                }}
              >
                {section.title}
              </h2>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#cbd5e1",
                  fontSize: "15px",
                }}
              >
                {section.content}
              </p>

              {section.list && (
                <ul
                  style={{
                    marginTop: "18px",
                    paddingLeft: "18px",
                    color: "#94a3b8",
                  }}
                >
                  {section.list.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "10px",
                        lineHeight: "1.6",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section
          aria-labelledby="contact-heading"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "35px",
            marginTop: "40px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            id="contact-heading"
            style={{
              fontSize: "34px",
              marginBottom: "15px",
              color: "#a855f7",
            }}
          >
            Contact CodeVibe
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "25px",
              lineHeight: "1.7",
            }}
          >
            For legal inquiries or questions related to the CodeVibe Terms of
            Service, contact our support team.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <a
              href="mailto:legal@codevibe.com"
              aria-label="Email CodeVibe Legal Team"
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                background: "#0f172a",
                color: "#38bdf8",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              📧 legal@codevibe.com
            </a>

            <a
              href="https://github.com/JiyaBatra/CODEVIBE-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit CodeVibe GitHub Repository"
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                background: "#0f172a",
                color: "#a855f7",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              🔗 GitHub Repository
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          © 2026 CodeVibe. All rights reserved.
        </footer>
      </article>
    </main>
  );
};

export default TermsOfService;