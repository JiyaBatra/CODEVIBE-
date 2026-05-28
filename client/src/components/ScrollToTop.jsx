import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        // Retain focus correctly for keyboard screen reader users at page top
        if (document.body) {
            document.body.tabIndex = -1;
            document.body.focus();
        }
    };

    return showButton ? (
        <button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    ) : null;
};

export default ScrollToTop;