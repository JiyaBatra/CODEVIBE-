import React, { useState, useEffect, useRef } from 'react';

const sections = [
  {
    id: 1,
    icon: '📜',
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing and using <strong>CodeVibe</strong>, you accept and agree to be bound by the
          terms and provisions of this agreement. If you do not agree to abide by the above, please
          do not use this service.
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: '⚖️',
    title: 'Use License',
    content: (
      <>
        <p>
          Permission is granted to temporarily access the materials (information or software) on
          CodeVibe for personal, non-commercial transitory viewing only. This is the grant of a
          license — not a transfer of title — and under this license you may <strong>not</strong>:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or public display</li>
          <li>Attempt to decompile or reverse engineer any software on CodeVibe</li>
          <li>Remove any copyright or other proprietary notations</li>
          <li>Transfer or "mirror" the materials on any other server</li>
          <li>Engage in conduct that restricts anyone's use or enjoyment of CodeVibe</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: '⚠️',
    title: 'Disclaimer',
    content: (
      <>
        <p>
          The materials on CodeVibe are provided <strong>"as is"</strong>. CodeVibe makes no
          warranties, expressed or implied, and hereby disclaims all other warranties including,
          without limitation, implied warranties of merchantability, fitness for a particular
          purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </>
    ),
  },
  {
    id: 4,
    icon: '🚧',
    title: 'Limitations',
    content: (
      <>
        <p>
          In no event shall CodeVibe or its suppliers be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business interruption) arising
          out of the use or inability to use the materials on CodeVibe.
        </p>
      </>
    ),
  },
  {
    id: 5,
    icon: '🎯',
    title: 'Accuracy of Materials',
    content: (
      <>
        <p>
          The materials on CodeVibe could include technical, typographical, or photographic errors.
          CodeVibe does not warrant that any materials are accurate, complete, or current. CodeVibe
          may make changes to the materials at any time without notice.
        </p>
      </>
    ),
  },
  {
    id: 6,
    icon: '🔗',
    title: 'Materials and Content',
    content: (
      <>
        <p>
          CodeVibe has not reviewed all sites linked to its website and is not responsible for the
          contents of any such linked site. The inclusion of any link does not imply endorsement by
          CodeVibe. Use of any linked website is at the user's own risk.
        </p>
      </>
    ),
  },
  {
    id: 7,
    icon: '🔄',
    title: 'Modifications',
    content: (
      <>
        <p>
          CodeVibe may revise these terms of service at any time without notice. By using this
          website, you are agreeing to be bound by the then-current version of these terms of
          service.
        </p>
      </>
    ),
  },
  {
    id: 8,
    icon: '🏛️',
    title: 'Governing Law',
    content: (
      <>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of
          India, and you irrevocably submit to the exclusive jurisdiction of the courts in that
          State or location.
        </p>
      </>
    ),
  },
  {
    id: 9,
    icon: '🛡️',
    title: 'User Conduct',
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Upload, post, or transmit viruses or other malicious code</li>
          <li>Harass, threaten, or cause distress to any individual</li>
          <li>Disrupt the normal flow of dialogue within CodeVibe</li>
          <li>Engage in commercial activities without prior written permission</li>
          <li>Violate any laws or regulations applicable in your country</li>
        </ul>
      </>
    ),
  },
  {
    id: 10,
    icon: '🔐',
    title: 'Account Responsibility',
    content: (
      <>
        <p>
          You are responsible for maintaining the confidentiality of your account information and
          password, and for all activities that occur under your account. You agree to notify
          CodeVibe immediately of any unauthorized use of your account.
        </p>
      </>
    ),
  },
  {
    id: 11,
    icon: '💼',
    title: 'Limitation of Liability',
    content: (
      <>
        <p>
          CodeVibe shall not be liable to you in relation to the contents of, or use of, or
          otherwise in connection with any linked website for any indirect, special, or
          consequential loss, or for any business losses, loss of revenue, income, profits, or
          anticipated savings.
        </p>
      </>
    ),
  },
  {
    id: 12,
    icon: '📧',
    title: 'Contact Information',
    content: (
      <>
        <p>If you have questions about these Terms of Service, please contact us at:</p>
        <ul>
          <li>
            📧 Email:{' '}
            <a href="mailto:legal@codevibe.com" className="tos-link">
              legal@codevibe.com
            </a>
          </li>
          <li>
            🔗 GitHub:{' '}
            <a
              href="https://github.com/JiyaBatra/CODEVIBE-"
              target="_blank"
              rel="noopener noreferrer"
              className="tos-link"
            >
              JiyaBatra/CODEVIBE-
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

const TosSection = ({ section, index }) => {
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
      className={`tos-section-card ${visible ? 'tos-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="tos-card-header">
        <span className="tos-section-icon">{section.icon}</span>
        <h2 className="tos-section-title">
          <span className="tos-section-num">{String(section.id).padStart(2, '0')}.</span>{' '}
          {section.title}
        </h2>
      </div>
      <div className="tos-card-body">{section.content}</div>
    </div>
  );
};

const TermsOfService = () => {
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
        .tos-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff4d6d, #ff85a1, #00f0ff);
          z-index: 9999;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(255,77,109,0.8);
        }

        /* ---- Page Wrapper ---- */
        .tos-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #050710 100%);
          color: #e0e6ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 3rem 1.5rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* animated bg grid */
        .tos-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,77,109,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,109,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        /* ---- Hero ---- */
        .tos-hero {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 3.5rem;
          animation: fadeSlideDown 0.7s ease both;
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tos-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(255,77,109,0.15), rgba(255,133,161,0.15));
          border: 1px solid rgba(255,77,109,0.4);
          color: #ff85a1;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 0.35rem 1.1rem;
          border-radius: 20px;
          margin-bottom: 1.1rem;
        }

        .tos-hero-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ff4d6d, #ff85a1, #ff6b81);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.6rem;
          animation: titlePulse 3s ease-in-out infinite;
          line-height: 1.15;
        }
        @keyframes titlePulse {
          0%,100% { filter: brightness(1) drop-shadow(0 0 10px rgba(255,77,109,0.5)); }
          50%      { filter: brightness(1.15) drop-shadow(0 0 22px rgba(255,77,109,0.85)); }
        }

        .tos-hero-sub {
          color: #b0b8d4;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }
        .tos-hero-divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ff4d6d, #ff85a1);
          border: none;
          margin: 1.2rem auto 0;
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(255,77,109,0.6);
        }

        /* ---- Quick Nav ---- */
        .tos-quick-nav {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          justify-content: center;
          margin-bottom: 3rem;
          animation: fadeSlideDown 0.8s ease 0.15s both;
        }
        .tos-quick-nav a {
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          color: #b0b8d4;
          background: rgba(255,77,109,0.07);
          border: 1px solid rgba(255,77,109,0.25);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .tos-quick-nav a:hover {
          color: #fff;
          background: rgba(255,77,109,0.22);
          border-color: #ff4d6d;
          box-shadow: 0 0 10px rgba(255,77,109,0.4);
          transform: translateY(-2px);
        }

        /* ---- Grid of cards ---- */
        .tos-grid {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 1.4rem;
        }

        /* ---- Individual Section Card ---- */
        .tos-section-card {
          background: linear-gradient(135deg, rgba(26,31,58,0.9), rgba(10,14,39,0.9));
          border: 1px solid rgba(255,77,109,0.2);
          border-radius: 14px;
          padding: 1.6rem 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .tos-section-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(180deg, #ff4d6d, #ff85a1);
          border-radius: 4px 0 0 4px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .tos-section-card:hover {
          border-color: rgba(255,77,109,0.5);
          box-shadow: 0 0 25px rgba(255,77,109,0.2), inset 0 0 20px rgba(255,77,109,0.04);
          transform: translateY(-2px) !important;
        }
        .tos-section-card:hover::before { opacity: 1; }
        .tos-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tos-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .tos-section-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .tos-section-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.3px;
        }
        .tos-section-num {
          color: #ff4d6d;
          font-weight: 900;
          font-size: 0.95rem;
        }

        .tos-card-body p {
          color: #c0c8e0;
          line-height: 1.75;
          font-size: 0.93rem;
          margin: 0 0 0.7rem;
        }
        .tos-card-body ul {
          padding-left: 1.2rem;
          margin: 0.5rem 0 0;
        }
        .tos-card-body ul li {
          color: #b0b8d4;
          line-height: 1.75;
          font-size: 0.91rem;
          margin-bottom: 0.25rem;
          position: relative;
        }
        .tos-card-body ul li::marker {
          color: #ff4d6d;
        }
        .tos-card-body strong {
          color: #ff85a1;
        }
        .tos-link {
          color: #ff85a1;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,133,161,0.3);
          transition: color 0.2s, border-color 0.2s;
        }
        .tos-link:hover {
          color: #ff4d6d;
          border-color: #ff4d6d;
        }

        /* ---- Footer strip ---- */
        .tos-footer-strip {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,77,109,0.15);
          animation: fadeSlideUp 0.6s ease 0.5s both;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tos-footer-strip p {
          color: #6b7499;
          font-size: 0.85rem;
        }
        .tos-footer-strip span {
          color: #ff4d6d;
        }

        @media (max-width: 600px) {
          .tos-section-card { padding: 1.2rem 1.1rem; }
          .tos-hero-title  { font-size: 1.9rem; }
        }
      `}</style>

      {/* Reading progress bar */}
      <div className="tos-progress-bar" style={{ width: `${scrollPct}%` }} />

      <div className="tos-page">
        {/* Hero */}
        <div className="tos-hero">
          <div className="tos-badge">Legal Document</div>
          <h1 className="tos-hero-title">Terms of Service</h1>
          <p className="tos-hero-sub">Last Updated: May 2026 &nbsp;·&nbsp; Effective Immediately</p>
          <hr className="tos-hero-divider" />
        </div>

        {/* Quick-jump nav */}
        <nav className="tos-quick-nav" aria-label="Jump to section">
          {sections.map((s) => (
            <a key={s.id} href={`#tos-${s.id}`}>
              {s.icon} {s.title}
            </a>
          ))}
        </nav>

        {/* Cards */}
        <div className="tos-grid">
          {sections.map((section, i) => (
            <div id={`tos-${section.id}`} key={section.id}>
              <TosSection section={section} index={i} />
            </div>
          ))}
        </div>

        {/* Footer strip */}
        <div className="tos-footer-strip">
          <p>© 2026 <span>CodeVibe</span>. All rights reserved.</p>
          <p style={{ marginTop: '0.3rem' }}>
            Questions?{' '}
            <a href="mailto:legal@codevibe.com" className="tos-link">
              legal@codevibe.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;