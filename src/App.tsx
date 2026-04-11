import { useEffect, useState } from "react";

import "./styles/components/home-hero.scss";
import "./styles/components/journey-steps.scss";
import "./styles/components/final-cta.scss";
import "./styles/components/navbar.scss";
import "./styles/components/footer.scss";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const journeySteps = [
  {
    step: "Step 1",
    title: "Questionnaire",
    description:
      "Answer 20 thoughtful questions designed to reveal your core archetypes, natural strengths, and deeper motivations.",
    image: withBase("images/home_images/questionnaire_card_img.png"),
    imageAlt: "Questionnaire illustration",
    ctaLabel: "Start Questionnaire",
    ctaHref: "#questionnaire",
  },
  {
    step: "Step 2",
    title: "Personal Analysis",
    description:
      "Your talents, blocks, and potential life directions are analyzed through reflective systems that help you better understand yourself.",
    image: withBase("images/home_images/personal_analysis%20card_img.png"),
    imageAlt: "Personal analysis illustration",
    ctaLabel: "View Analysis Details",
    ctaHref: "#analysis-details",
  },
  {
    step: "Step 3",
    title: "Learning Modules",
    description:
      "Five guided modules teach you how the mind works, how to build supportive habits, develop creativity, and transform dreams into goals.",
    image: withBase("images/home_images/learning_modules_card_img.png"),
    imageAlt: "Learning modules illustration",
    ctaLabel: "Explore Modules",
    ctaHref: "#modules",
  },
  {
    step: "Step 4",
    title: "Nature Retreat",
    description:
      "A one-day retreat in nature with creative practices, reflection exercises, and a celebration of your personal journey.",
    image: withBase("images/home_images/nature_retreat_card_img.png"),
    imageAlt: "Nature retreat illustration",
    ctaLabel: "Learn About Retreat",
    ctaHref: "#retreat",
  },
];

function App() {
  const [isPastHalfway, setIsPastHalfway] = useState(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const halfwayPoint = Math.max(scrollableHeight / 2, 0);
      setIsPastHalfway(window.scrollY > halfwayPoint);
    };

    updateScrollDirection();
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    window.addEventListener("resize", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      window.removeEventListener("resize", updateScrollDirection);
    };
  }, []);

  const handleScrollToggle = () => {
    const scrollTarget = isPastHalfway
      ? 0
      : document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: Math.max(scrollTarget, 0),
      behavior: "smooth",
    });
  };

  return (
    <main className="page-shell">
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <button className="logo" type="button">
            Dream Code
          </button>

          <div className="nav-links">
            <button className="nav-link" type="button">
              About
            </button>
            <button className="nav-link" type="button">
              Journey
            </button>
            <button className="nav-link" type="button">
              Contact
            </button>
            <button className="nav-button" type="button">
              Start Your Path
            </button>
          </div>
        </div>
      </nav>

      <section className="home-hero" id="top" aria-labelledby="home-hero-title">
        <div className="home-hero__inner">
          <div className="home-hero__content">
            <span className="home-hero__label">DREAM CODE MAP</span>
            <h1 id="home-hero-title" className="home-hero__title">
              Discover Your Natural Talent and Life Direction
            </h1>
            <p className="home-hero__description">
              A guided process that helps you discover your natural strengths,
              overcome inner blocks, and turn your dreams into a clear and
              meaningful life direction.
            </p>
          </div>

          <div className="home-hero__media">
            <div className="home-hero__image-wrap">
              <img
                className="home-hero__image"
                src={withBase("images/home_images/home_section_img.png")}
                alt="Person standing at the beginning of a path, symbolizing personal discovery and growth."
              />
            </div>
          </div>
        </div>

        <div className="section-shell">
          <div className="journey-steps__header">
            <span className="journey-steps__eyebrow">C.T.A.</span>
            <h2 id="journey-steps-title" className="journey-steps__title">
              Your Journey in 4 Steps
            </h2>
            <p className="journey-steps__subtitle">
              A simple process designed to help you discover your natural
              direction and turn your dreams into a meaningful life path.
            </p>
          </div>

          <div className="journey-steps__grid">
            <div className="journey-step-card">
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/questionnaire_image.png")}
                alt="Questionnaire"
              />
              <span className="journey-step-card__label">Questionnaire</span>
            </div>
            <div className="journey-step-card">
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/consultation_image.png")}
                alt="Consultation"
              />
              <span className="journey-step-card__label">Consultation</span>
            </div>
            <div className="journey-step-card">
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/lectures_image.png")}
                alt="Lectures"
              />
              <span className="journey-step-card__label">Lectures</span>
            </div>
            <div className="journey-step-card">
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/retreat_image.png")}
                alt="Retreat"
              />
              <span className="journey-step-card__label">Retreat</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="final-cta"
        id="about"
        aria-labelledby="about-title"
      ></section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">Dream Code</div>
          <div className="footer-links">
            <button className="footer-link" type="button">
              About
            </button>
            <button className="footer-link" type="button">
              Contact
            </button>
            <button className="footer-link" type="button">
              Privacy
            </button>
          </div>
          <div className="footer-copy">
            &copy; 2026 Dream Code. All rights reserved.
          </div>
        </div>
      </footer>

      <button
        className="scroll-toggle"
        type="button"
        onClick={handleScrollToggle}
        aria-label={isPastHalfway ? "Scroll to top" : "Scroll to bottom"}
      >
        <span
          className={`scroll-toggle__chevrons ${isPastHalfway ? "scroll-toggle__chevrons--up" : ""}`}
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
      </button>
    </main>
  );
}

export default App;
