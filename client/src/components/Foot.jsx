import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaLinkedin, FaGithub, FaYoutube, FaArrowUp, FaRocket, FaHeart } from 'react-icons/fa';


const Foot = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer lesson" role="contentinfo" aria-label="Site footer">
      <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
        <FaArrowUp />
      </button>

      <div className="footer-glow-orb" aria-hidden="true" />

      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-brand-title">
            <FaRocket className="footer-brand-icon" /> CodeVibe
          </p>
          <p className="footer-brand-copy">
            Open-source learning for HTML, CSS, JavaScript, backend skills, and real-world practice.
          </p>
          <div className="footer-tech-stack">
            <span className="tech-badge">HTML5</span>
            <span className="tech-badge">CSS3</span>
            <span className="tech-badge">JS</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node</span>
            <span className="tech-badge">Mongo</span>
          </div>
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
            >
              <FaDiscord aria-hidden="true" /> Discord
            </a>
            <a
              href="https://www.linkedin.com/in/jiya-batra-12b02b289"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow CodeVibe on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a
              href="https://github.com/JiyaBatra/CODEVIBE-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View CodeVibe on GitHub"
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>
            <a
              href="http://www.youtube.com/@BEWITHMEIt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch CodeVibe videos on YouTube"
            >
              <FaYoutube aria-hidden="true" /> YouTube
            </a>
          </div>
        </div>
      </div>

      <form className="footer-newsletter" onSubmit={handleSubscribe}>
        <label htmlFor="footer-email" className="footer-newsletter-label">
          Stay in the loop — get updates on new courses and features.
        </label>
        <div className="footer-newsletter-input-wrap">
          <input
            id="footer-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={subscribed ? 'subscribed' : ''}>
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>
      </form>

      <div className="footer-divider" aria-hidden="true" />

      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; 2026 CodeVibe. Built with <FaHeart className="footer-heart" aria-hidden="true" /> by community.
        </p>
        <p className="footer-note">
          Open source and accessible learning for everyone.
        </p>
      </div>
    </footer>
  )
}

export default Foot