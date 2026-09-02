import React from "react";

const testimonials = [
  {
    name: "Student A",
    role: "Frontend Learner",
    feedback:
      "This platform helped me understand React basics easily and practice coding without any setup.",
  },
  {
    name: "Student B",
    role: "Beginner Programmer",
    feedback:
      "Great structured learning experience for beginners. The lessons are simple and interactive.",
  },
  {
    name: "Student C",
    role: "Web Development Student",
    feedback:
      "I really liked the instant feedback system and progress tracking dashboard.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Learners Say</h2>
      <p className="testimonial-subtitle">
        Feedback from learners using CodeVibe to improve their coding skills.
      </p>

      <div className="testimonial-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="quote-icon">💬</div>

            <p className="testimonial-feedback">
              "{item.feedback}"
            </p>

            <h3>{item.name}</h3>
            <span>{item.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};



export default Testimonials;