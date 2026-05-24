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
    <section className="faq-section" > 
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


