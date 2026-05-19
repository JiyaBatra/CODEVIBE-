import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaLinkedin, FaGithub, FaYoutube, FaArrowUp } from 'react-icons/fa';

const Foot = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site footer">
      {/* Glassmorphism inner panel */}
      <div className="footer-glass">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-brand-title">CodeVibe</p>
            <p className="footer-brand-copy">
              Open-source learning for HTML, CSS, JavaScript, backend skills, and real-world practice.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <Link to="/privacy-policy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="footer-link">
              Terms of Service
            </Link>
            <a
              href="https://github.com/JiyaBatra/CODEVIBE-/blob/main/Contributing.md"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Contributor Guidelines
            </a>
          </div>

          <div className="footer-social">
            <h3>Community</h3>
            <div className="social-grid">
              <a
                href="https://discord.com/channels/1503405091875455107/1503405094933237853"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join CodeVibe Discord"
                className="social-btn"
              >
                <FaDiscord aria-hidden="true" /> Discord
              </a>
              <a
                href="https://www.linkedin.com/in/jiya-batra-12b02b289"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodeVibe on LinkedIn"
                className="social-btn"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a
                href="https://github.com/JiyaBatra/CODEVIBE-"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View CodeVibe on GitHub"
                className="social-btn"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </a>
              <a
                href="http://www.youtube.com/@BEWITHMEIt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch CodeVibe videos on YouTube"
                className="social-btn"
              >
                <FaYoutube aria-hidden="true" /> YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 CodeVibe. Built with community, creativity, and accessible learning.
          </p>
          <p className="footer-note">
            Want to contribute? Open an issue or follow the contributor guidelines above.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        className={`back-to-top${showTop ? " back-to-top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Foot;
