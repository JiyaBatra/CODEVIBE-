import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaDiscord, FaLinkedin, FaGithub, FaYoutube,
  FaTwitter, FaHeart, FaArrowUp,
  FaEnvelope, FaCheckCircle,
} from 'react-icons/fa';


/* ─── helpers ─────────────────────────────────────────────────── */
const currentYear = new Date().getFullYear();

/* ─── data ────────────────────────────────────────────────────── */
const FOOTER_LINKS = {
  Learn: [
    { label: 'HTML Basics',      to: '/HtmlLesson',    internal: true },
    { label: 'CSS for Beginners',to: '/CssLesson',     internal: true },
    { label: 'JavaScript',       to: '/JsLesson',      internal: true },
    { label: 'React.js',         to: '/ReactLesson',   internal: true },
    { label: 'Node.js',          to: '/NodeLesson',    internal: true },
    { label: 'DSA',              to: '/DsaLesson',     internal: true },
  ],
  Platform: [
    { label: 'All Courses',      to: '/lessons',       internal: true },
    { label: 'Compiler',         to: '/Compiler',      internal: true },
    { label: 'Dashboard',        to: '/dashboard',     internal: true },
    { label: 'Certificate',      to: '/Certificate',   internal: true },
  ],
  Legal: [
    { label: 'Privacy Policy',   to: '/privacy-policy',  internal: true },
    { label: 'Terms of Service', to: '/terms-of-service',internal: true },
    {
      label: 'Contributor Guide',
      to: 'https://github.com/JiyaBatra/CODEVIBE-/blob/main/Contributing.md',
      internal: false,
    },
    {
      label: 'Report a Bug',
      to: 'https://github.com/JiyaBatra/CODEVIBE-/issues',
      internal: false,
    },
  ],
};

const SOCIALS = [
  {
    label: 'Join CodeVibe Discord',
    href: 'https://discord.com/channels/1503405091875455107/1503405094933237853',
    icon: <FaDiscord />,
    color: '#5865F2',
    name: 'Discord',
  },
  {
    label: 'Follow CodeVibe on LinkedIn',
    href: 'https://www.linkedin.com/in/jiya-batra-12b02b289',
    icon: <FaLinkedin />,
    color: '#0A66C2',
    name: 'LinkedIn',
  },
  {
    label: 'View CodeVibe on GitHub',
    href: 'https://github.com/JiyaBatra/CODEVIBE-',
    icon: <FaGithub />,
    color: '#e6edf3',
    name: 'GitHub',
  },
  {
    label: 'Watch CodeVibe on YouTube',
    href: 'http://www.youtube.com/@BEWITHMEIt',
    icon: <FaYoutube />,
    color: '#FF0000',
    name: 'YouTube',
  },
  {
    label: 'Follow CodeVibe on Twitter',
    href: 'https://twitter.com',
    icon: <FaTwitter />,
    color: '#1DA1F2',
    name: 'Twitter',
  },
];



/* ─── component ───────────────────────────────────────────────── */
const Foot = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  /* Show scroll-to-top button after scrolling 400px */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <style>{`
        /* ── Footer keyframes ── */
        @keyframes footerFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBtnPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,136,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(255,77,136,0); }
        }

        /* ── Footer base ── */
        .site-footer {
          position: relative;
          background: linear-gradient(180deg,
            rgba(10,5,25,0) 0%,
            rgba(10,5,25,0.97) 6%,
            #0a0519 100%);
          padding: 0;
          margin-top: 0;
          border-top: 1px solid rgba(255,77,136,0.18);
          font-family: 'Inter', 'Segoe UI', sans-serif;
          animation: footerFadeUp 0.6s ease both;
        }

        /* ── Newsletter strip ── */
        .footer-newsletter {
          background: linear-gradient(135deg,
            rgba(255,77,136,0.12) 0%,
            rgba(168,85,247,0.08) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 36px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-newsletter-text h3 {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .footer-newsletter-text p {
          color: rgba(255,255,255,0.55);
          font-size: 0.88rem;
          margin: 0;
        }
        .footer-newsletter-form {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .footer-nl-input {
          padding: 10px 16px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07);
          color: #fff;
          font-size: 0.9rem;
          min-width: 240px;
          outline: none;
          transition: border-color 0.3s;
        }
        .footer-nl-input:focus {
          border-color: rgba(255,77,136,0.6);
        }
        .footer-nl-input::placeholder { color: rgba(255,255,255,0.35); }
        .footer-nl-btn {
          padding: 10px 22px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(135deg, #ff4d88, #a855f7);
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.25s;
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }
        .footer-nl-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .footer-nl-error {
          color: #ff6b6b;
          font-size: 0.78rem;
          margin-top: 5px;
          padding-left: 6px;
        }
        .footer-nl-success {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4ade80;
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* ── Main grid ── */
        .footer-main {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 48px;
          padding: 56px 48px 40px;
        }

        /* ── Brand column ── */
        .footer-brand-title {
          font-size: 1.9rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff4d88, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
        }
        .footer-brand-copy {
          color: rgba(255,255,255,0.55);
          font-size: 0.9rem;
          line-height: 1.7;
          margin: 0;
          max-width: 280px;
        }



        /* ── Link columns ── */
        .footer-col h4 {
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin: 0 0 18px;
          position: relative;
          padding-bottom: 10px;
        }
        .footer-col h4::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 28px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff4d88, #a855f7);
        }
        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col-links li a,
        .footer-col-links li .f-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.25s, padding-left 0.25s;
          display: inline-block;
        }
        .footer-col-links li a:hover,
        .footer-col-links li .f-link:hover {
          color: #ff4d88;
          padding-left: 4px;
        }
        .footer-col-links li a:focus-visible,
        .footer-col-links li .f-link:focus-visible {
          outline: 2px solid #ff4d88;
          outline-offset: 2px;
          border-radius: 3px;
        }

        /* ── Divider ── */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,77,136,0.3) 30%,
            rgba(168,85,247,0.3) 70%,
            transparent 100%);
          margin: 0 48px;
        }

        /* ── Socials + bottom ── */
        .footer-bottom {
          padding: 28px 48px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-bottom-left p {
          color: rgba(255,255,255,0.4);
          font-size: 0.82rem;
          margin: 0;
          line-height: 1.6;
        }
        .footer-bottom-left p span {
          color: #ff4d88;
        }
        .footer-socials {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.28s ease;
        }
        .social-icon-btn:hover {
          transform: translateY(-4px);
          border-color: transparent;
        }
        .social-icon-btn:focus-visible {
          outline: 2px solid #ff4d88;
          outline-offset: 3px;
        }

        /* ── Scroll-to-top ── */
        .scroll-top-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #ff4d88, #a855f7);
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(255,77,136,0.45);
          transition: opacity 0.35s, transform 0.35s;
          animation: pulseDot 2.5s ease-in-out infinite;
        }
        .scroll-top-btn:hover {
          animation: scrollBtnPop 0.4s ease;
          transform: scale(1.1);
        }
        .scroll-top-btn:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }
        .scroll-top-btn.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
        }

        /* ── Responsive: Tablet ── */
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
            padding: 44px 32px 32px;
          }
          .footer-newsletter { padding: 28px 32px; }
          .footer-divider, .footer-bottom { padding-left: 32px; padding-right: 32px; }
        }

        /* ── Responsive: Mobile ── */
        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 36px 20px 24px;
          }
          .footer-newsletter { padding: 24px 20px; flex-direction: column; }
          .footer-nl-input { min-width: unset; width: 100%; }
          .footer-newsletter-form { width: 100%; flex-direction: column; }
          .footer-nl-btn { width: 100%; justify-content: center; }
          .footer-divider { margin: 0 20px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; padding: 24px 20px; }
          .footer-brand-copy { max-width: 100%; }
          .scroll-top-btn { bottom: 18px; right: 18px; width: 42px; height: 42px; }
        }
      `}</style>

      <footer
        className="site-footer"
        role="contentinfo"
        aria-label="Site footer"
      >
        {/* ── Newsletter strip ── */}
        <div className="footer-newsletter">
          <div className="footer-newsletter-text">
            <h3>📬 Stay in the loop</h3>
            <p>Get notified when new courses and features drop.</p>
          </div>

          {subscribed ? (
            <div className="footer-nl-success" aria-live="polite">
              <FaCheckCircle color="#4ade80" />
              You're subscribed! Thanks 🎉
            </div>
          ) : (
            <form
              className="footer-newsletter-form"
              onSubmit={handleSubscribe}
              noValidate
              aria-label="Newsletter signup"
            >
              <div>
                <input
                  id="footer-email"
                  type="email"
                  className="footer-nl-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                  aria-label="Email address for newsletter"
                  aria-describedby={emailError ? 'footer-email-error' : undefined}
                  autoComplete="email"
                />
                {emailError && (
                  <p id="footer-email-error" className="footer-nl-error" role="alert">
                    {emailError}
                  </p>
                )}
              </div>
              <button type="submit" className="footer-nl-btn">
                <FaEnvelope aria-hidden="true" />
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* ── Main grid ── */}
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-col">
            <p className="footer-brand-title">CodeVibe</p>
            <p className="footer-brand-copy">
              Open-source learning for HTML, CSS, JavaScript, backend skills,
              and real-world practice. Built with community, creativity, and
              accessible education.
            </p>

          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <nav key={heading} className="footer-col" aria-label={`${heading} links`}>
              <h4>{heading}</h4>
              <ul className="footer-col-links">
                {links.map(({ label, to, internal }) => (
                  <li key={label}>
                    {internal ? (
                      <Link to={to} className="f-link">
                        {label}
                      </Link>
                    ) : (
                      <a href={to} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="footer-divider" aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              © {currentYear} CodeVibe. Made with{' '}
              <FaHeart
                aria-label="love"
                style={{ color: '#ff4d88', display: 'inline', verticalAlign: 'middle' }}
              />{' '}
              by the open-source community.
            </p>
            <p>
              Want to contribute?{' '}
              <a
                href="https://github.com/JiyaBatra/CODEVIBE-/blob/main/Contributing.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#a855f7', textDecoration: 'none' }}
              >
                Read the contributor guide ↗
              </a>
            </p>
          </div>

          {/* Social icons */}
          <div className="footer-socials" aria-label="Social media links">
            {SOCIALS.map(({ label, href, icon, color, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon-btn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.background = `${color}22`;
                  e.currentTarget.style.borderColor = `${color}55`;
                  e.currentTarget.style.boxShadow = `0 4px 18px ${color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-top button ── */}
      <button
        className={`scroll-top-btn${showScrollTop ? '' : ' hidden'}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        tabIndex={showScrollTop ? 0 : -1}
        title="Back to top"
      >
        <FaArrowUp aria-hidden="true" />
      </button>
    </>
  );
};

export default Foot;