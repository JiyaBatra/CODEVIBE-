import { useState } from "react";

const faqData = [
  {
    question: "Are certificates free?",
    answer:
      "Yes, certificates provided through the platform are completely free for eligible participants.",
  },
  {
    question: "Do I need prior coding experience?",
    answer:
      "No. Beginners are welcome, and many projects are designed for first-time contributors.",
  },
  {
    question: "How can I contribute?",
    answer:
      "You can start by exploring open issues, reading the contribution guidelines, and submitting pull requests.",
  },
  {
    question: "Can I track my progress across multiple courses simultaneously?",
    answer:
      "Yes! Your progress is saved dynamically to your user profile dashboard, allowing you to jump between frontend, backend, and database tracks at your own pace.",
  },
  {
    question: "How does the Personalized Roadmap Generator work?",
    answer:
      "You can select a domain (like Web Development or DevOps) from the drop-down menu, and our tool dynamically generates a structured learning path categorized into Beginner, Intermediate, and Advanced milestones.",
  },
  {
    question: "How do I fix common MongoDB connection errors during local setup?",
    answer:
      "Ensure your local MongoDB community server is running, or verify that your .env file contains the correct MONGODB_URI fallback secret string."
  },
  {
    question: "What should I do if my pull request has a merge conflict?",
    answer:
      "Please check out our dedicated guide on How to solve MERGE CONFLICT in the repository documentation (Issue #81) to safely rebase your changes."
  }



];

const FAQItem = ({ item, index, activeIndex, setActiveIndex }) => {
  const isOpen = activeIndex === index;

  const toggleAccordion = () => {
    setActiveIndex(isOpen ? null : index);
  };

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={toggleAccordion}>
        <span>{item.question}</span>

        <span className="faq-icon">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section" id ="faq"> 
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
}


