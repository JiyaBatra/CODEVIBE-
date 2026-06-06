import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import {
  FiMail,
  FiSend,
} from "react-icons/fi";

const Contact = () => {
  const handleSubmit = (e)=>{
    e.preventDefault();
    alert("Message Sent!");
    e.target.reser();
  };


  return (
    <div className='contact-page'>
      <div className='contact-header'>
        <h1 className='contact-heading'>
          <FiMail />
          <span>
            Contact Us
          </span>
        </h1>
        <p>We'd love to hear from you! Whether you have a question or feedback - we're here to help</p>
      </div>
      <div className='contact-main'>
        <div></div>
        <div className='message-box'>
          <h4>Send Us a message</h4>
          <p>Fill the form below and we'll get back to you as soon as possible</p>
          <form onSubmit={handleSubmit} className='message-input'>
            <div className='message-input-top'>
              <input type="text" placeholder='Enter your full name' required/>
              <input type="email" placeholder='Enter you email' required/>
            </div>
            <input type="text" placeholder='Subject' required/>
            <textarea type="text" placeholder='Message' required/>
            <button type='submit'>
              <FiSend />
              Send Message
            </button>
          </form>
        </div>
        <div className='other-contact'>
          <h4>Other ways to reach us</h4>
          <p>You can also contact us through the following platforms</p>
          <div className="social-flex">
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
            <div className='contact-feedback'>
              <h5>We value your feedback</h5>
              <p>Your suggestion help us improve CODEVIBE for everyone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
