import React, { useState, useEffect, useRef } from 'react';

const sections = [
  {
    id: 1,
    icon: '👋',
    title: 'Introduction',
    content: (
      <p>
        <strong>CodeVibe</strong> ("we," "us," "our," or "Company") is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
        information when you visit our website and use our learning platform.
      </p>
    ),
  },
  {
    id: 2,
    icon: '📦',
    title: 'Information We Collect',
    content: (
      <>
        <h3 className="pp-sub-title">2.1 Personal Information</h3>
        <p>When you register for an account, we collect:</p>
        <ul>
          <li>Username</li>
          <li>Email address</li>
          <li>College / Institution name</li>
          <li>Year of study</li>
          <li>Password (encrypted)</li>
        </ul>
        <h3 className="pp-sub-title">2.2 Usage Information</h3>
        <p>We automatically collect information about your interaction with the Service:</p>
        <ul>
          <li>Pages visited</li>
          <li>Lessons completed</li>
          <li>Progress and achievements</li>
          <li>Time spent on lessons</li>
          <li>Feedback and certificates generated</li>
        </ul>
        <h3 className="pp-sub-title">2.3 Device Information</h3>
        <p>We collect technical information about your device:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address (anonymized)</li>
          <li>Device type (mobile, tablet, desktop)</li>
          <li>Screen resolution</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: '🎯',
    title: 'How We Use Your Information',
    content: (
      <>
        <p>We use collected information for:</p>
        <ul>
          <li>Creating and maintaining your account</li>
          <li>Providing learning services and tracking progress</li>
          <li>Sending service-related notifications</li>
          <li>Improving our platform through analytics</li>
          <li>Responding to inquiries and support requests</li>
          <li>Generating certificates and performance reports</li>
          <li>Compliance with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    icon: '🍪',
    title: 'Cookies and Tracking Technologies',
    content: (
      <>
        <h3 className="pp-sub-title">4.1 Cookies</h3>
        <p>
          We use cookies to enhance your browsing experience. Cookies are small files stored on
          your device that help us remember your preferences and login status.
        </p>
        <h3 className="pp-sub-title">4.2 Types of Cookies</h3>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for login and basic functionality
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand how you use the platform
          </li>
          <li>
            <strong>Preference Cookies:</strong> Remember your settings and preferences
          </li>
        </ul>
        <h3 className="pp-sub-title">4.3 Controlling Cookies</h3>
        <p>
          You can control cookies through your browser settings. However, disabling cookies may
          affect the functionality of the platform.
        </p>
      </>
    ),
  },
  {
    id: 5,
    icon: '🌐',
    title: 'Third-Party Services',
    content: (
      <>
        <p>We use the following third-party services:</p>
        <h3 className="pp-sub-title">5.1 Analytics</h3>
        <ul>
          <li>
            <strong>Purpose:</strong> Understanding user behavior and improving the platform
          </li>
          <li>
            <strong>Data Shared:</strong> Anonymized usage data, device information
          </li>
          <li>
            <strong>Provider:</strong> Google Analytics (or similar)
          </li>
        </ul>
        <h3 className="pp-sub-title">5.2 Authentication</h3>
        <ul>
          <li>
            <strong>Purpose:</strong> Secure user authentication
          </li>
          <li>
            <strong>Data Shared:</strong> Email, username, encrypted password
          </li>
        </ul>
        <h3 className="pp-sub-title">5.3 Deployment &amp; Hosting</h3>
        <ul>
          <li>
            <strong>Provider:</strong> Render, GitHub Pages, or similar
          </li>
          <li>
            <strong>Data Stored:</strong> All user data and platform content
          </li>
        </ul>
        <p>
          These third-party services have their own privacy policies. We encourage you to review
          them to understand their practices.
        </p>
      </>
    ),
  },
  {
    id: 6,
    icon: '🔒',
    title: 'Data Security',
    content: (
      <>
        <p>
          We implement industry-standard security measures to protect your information, including:
        </p>
        <ul>
          <li>Password encryption (bcrypt or similar)</li>
          <li>HTTPS protocol for data transmission</li>
          <li>Regular security audits</li>
          <li>Limited access to personal information</li>
        </ul>
        <p>
          However, no security system is impenetrable. We cannot guarantee absolute security of
          information transmitted over the internet.
        </p>
      </>
    ),
  },
  {
    id: 7,
    icon: '🗂️',
    title: 'Data Retention',
    content: (
      <p>
        We retain your personal information for as long as your account is active and for 90 days
        after account deletion for backup and legal compliance purposes. You can request deletion of
        your data at any time.
      </p>
    ),
  },
  {
    id: 8,
    icon: '✅',
    title: 'Your Rights and Choices',
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of your personal data
          </li>
          <li>
            <strong>Rectification:</strong> Correct inaccurate or incomplete information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your account and data
          </li>
          <li>
            <strong>Portability:</strong> Download your data in a portable format
          </li>
          <li>
            <strong>Opt-out:</strong> Unsubscribe from non-essential communications
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 9,
    icon: '👶',
    title: "Children's Privacy",
    content: (
      <p>
        CodeVibe is not intended for children under 13 years old. We do not knowingly collect
        personal information from children under 13. If we learn that we have collected such
        information, we will delete it immediately.
      </p>
    ),
  },
  {
    id: 10,
    icon: '🔄',
    title: 'Changes to This Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
      </p>
    ),
  },
  {
    id: 11,
    icon: '📬',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have questions about this Privacy Policy or our privacy practices:</p>
        <ul>
          <li>
            📧 Email:{' '}
            <a href="mailto:privacy@codevibe.com" className="pp-link">
              privacy@codevibe.com
            </a>
          </li>
          <li>
            🔗 GitHub:{' '}
            <a
              href="https://github.com/JiyaBatra/CODEVIBE-"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              JiyaBatra/CODEVIBE-
            </a>
          </li>
          <li>
            💬 Discord:{' '}
            <a
              href="https://discord.com/channels/1503405091875455107/1503405094933237853"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              Join our community
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 12,
    icon: '🌍',
    title: 'GDPR and Regional Compliance',
    content: (
      <p>
        If you are located in the European Union or other regions with data protection regulations,
        we comply with GDPR and similar laws. Your data is processed with your consent, and you
        have the rights outlined in Section 8 above.
      </p>
    ),
  },
];

const PPSection = ({ section, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`pp-card ${visible ? 'pp-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="pp-card-header">
        <span className="pp-icon">{section.icon}</span>
        <h2 className="pp-card-title">
          <span className="pp-num">{String(section.id).padStart(2, '0')}.</span> {section.title}
        </h2>
      </div>
      <div className="pp-card-body">{section.content}</div>
    </div>
  );
};

const PrivacyPolicy = () => {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ---- Progress Bar ---- */
        .pp-progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f0ff, #ff4d6d, #ff85a1);
          z-index: 9999;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(0,240,255,0.7);
        }

        /* ---- Page ---- */
        .pp-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #050710 100%);
          color: #e0e6ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 3rem 1.5rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* animated bg dots */
        .pp-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(0,240,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
          animation: dotDrift 25s linear infinite;
        }
        @keyframes dotDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 28px 28px; }
        }

        /* ---- Hero ---- */
        .pp-hero {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 3.5rem;
          animation: ppFadeDown 0.7s ease both;
        }
        @keyframes ppFadeDown {
          from { opacity: 0; transform: translateY(-28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pp-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,240,255,0.05));
          border: 1px solid rgba(0,240,255,0.35);
          color: #00f0ff;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 0.35rem 1.1rem;
          border-radius: 20px;
          margin-bottom: 1.1rem;
        }

        .pp-hero-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          background: linear-gradient(135deg, #00f0ff, #ff4d6d, #ff85a1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.6rem;
          animation: ppTitlePulse 3.5s ease-in-out infinite;
          line-height: 1.15;
        }
        @keyframes ppTitlePulse {
          0%,100% { filter: brightness(1) drop-shadow(0 0 10px rgba(0,240,255,0.4)); }
          50%      { filter: brightness(1.15) drop-shadow(0 0 22px rgba(0,240,255,0.7)); }
        }

        .pp-hero-sub {
          color: #b0b8d4;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }
        .pp-hero-divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #00f0ff, #ff4d6d);
          border: none;
          margin: 1.2rem auto 0;
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(0,240,255,0.5);
        }

        /* ---- Quick Nav ---- */
        .pp-quick-nav {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          justify-content: center;
          margin-bottom: 3rem;
          animation: ppFadeDown 0.8s ease 0.15s both;
        }
        .pp-quick-nav a {
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          color: #b0b8d4;
          background: rgba(0,240,255,0.06);
          border: 1px solid rgba(0,240,255,0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .pp-quick-nav a:hover {
          color: #fff;
          background: rgba(0,240,255,0.14);
          border-color: #00f0ff;
          box-shadow: 0 0 10px rgba(0,240,255,0.3);
          transform: translateY(-2px);
        }

        /* ---- Grid ---- */
        .pp-grid {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 1.4rem;
        }

        /* ---- Card ---- */
        .pp-card {
          background: linear-gradient(135deg, rgba(26,31,58,0.9), rgba(10,14,39,0.9));
          border: 1px solid rgba(0,240,255,0.15);
          border-radius: 14px;
          padding: 1.6rem 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .pp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(180deg, #00f0ff, #ff4d6d);
          border-radius: 4px 0 0 4px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pp-card:hover {
          border-color: rgba(0,240,255,0.4);
          box-shadow: 0 0 25px rgba(0,240,255,0.15), inset 0 0 20px rgba(0,240,255,0.03);
          transform: translateY(-2px) !important;
        }
        .pp-card:hover::before { opacity: 1; }
        .pp-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pp-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .pp-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .pp-card-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .pp-num {
          color: #00f0ff;
          font-weight: 900;
          font-size: 0.95rem;
        }

        .pp-sub-title {
          color: #ff85a1;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin: 1rem 0 0.4rem;
          text-transform: uppercase;
        }

        .pp-card-body p {
          color: #c0c8e0;
          line-height: 1.75;
          font-size: 0.93rem;
          margin: 0 0 0.7rem;
        }
        .pp-card-body ul {
          padding-left: 1.2rem;
          margin: 0.4rem 0;
        }
        .pp-card-body ul li {
          color: #b0b8d4;
          line-height: 1.75;
          font-size: 0.91rem;
          margin-bottom: 0.25rem;
        }
        .pp-card-body ul li::marker {
          color: #00f0ff;
        }
        .pp-card-body strong {
          color: #ff85a1;
        }
        .pp-link {
          color: #00f0ff;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,240,255,0.3);
          transition: color 0.2s, border-color 0.2s;
        }
        .pp-link:hover {
          color: #ff4d6d;
          border-color: #ff4d6d;
        }

        /* ---- Footer strip ---- */
        .pp-footer-strip {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,240,255,0.12);
          animation: ppFadeUp 0.6s ease 0.5s both;
        }
        @keyframes ppFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pp-footer-strip p {
          color: #6b7499;
          font-size: 0.85rem;
        }
        .pp-footer-strip span { color: #00f0ff; }

        @media (max-width: 600px) {
          .pp-card { padding: 1.2rem 1.1rem; }
          .pp-hero-title { font-size: 1.9rem; }
        }
      `}</style>

      <div className="pp-progress-bar" style={{ width: `${scrollPct}%` }} />

      <div className="pp-page">
        {/* Hero */}
        <div className="pp-hero">
          <div className="pp-badge">Legal Document</div>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-sub">Last Updated: May 2026 &nbsp;·&nbsp; Effective Immediately</p>
          <hr className="pp-hero-divider" />
        </div>

        {/* Quick Nav */}
        <nav className="pp-quick-nav" aria-label="Jump to section">
          {sections.map((s) => (
            <a key={s.id} href={`#pp-${s.id}`}>
              {s.icon} {s.title}
            </a>
          ))}
        </nav>

        {/* Cards */}
        <div className="pp-grid">
          {sections.map((section, i) => (
            <div id={`pp-${section.id}`} key={section.id}>
              <PPSection section={section} index={i} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pp-footer-strip">
          <p>© 2026 <span>CodeVibe</span>. All rights reserved.</p>
          <p style={{ marginTop: '0.3rem' }}>
            Questions?{' '}
            <a href="mailto:privacy@codevibe.com" className="pp-link">
              privacy@codevibe.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;