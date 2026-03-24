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
          <h1 id="home-hero-title" className="home-hero__title">
            Discover Your Natural Talents and Life Direction
          </h1>
          <div className="home-hero__content">
            <p className="home-hero__description">
              A guided journey that helps you understand your natural
              strengths, overcome inner blocks, and transform your dreams into
              a clear life direction.
            </p>
            <ul className="home-hero__highlights" aria-label="Program highlights">
              <li>20-question discovery questionnaire</li>
              <li>5 learning modules</li>
              <li>Nature retreat experience</li>
            </ul>
            <a className="home-hero__button" href="#questionnaire">
              Start Questionnaire
            </a>
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
      </section>

      <section
        className="journey-steps"
        id="steps"
        aria-labelledby="journey-steps-title"
      >
        <div className="section-shell">
          <div className="journey-steps__header">
            <span className="journey-steps__eyebrow">Course Process</span>
            <h2 id="journey-steps-title" className="journey-steps__title">
              Your Journey in 4 Steps
            </h2>
            <p className="journey-steps__subtitle">
              A simple process designed to help you discover your natural
              direction and turn your dreams into a meaningful life path.
            </p>
          </div>

          <div className="journey-steps__list">
            {journeySteps.map((item, index) => (
              <article
                className={`journey-card ${index % 2 === 1 ? "journey-card--reverse" : ""}`}
                key={item.step}
              >
                <div className="journey-card__content">
                  <p className="journey-card__step">{item.step}</p>
                  <h3 className="journey-card__title">{item.title}</h3>
                  <p className="journey-card__description">
                    {item.description}
                  </p>
                  <a className="journey-card__button" href={item.ctaHref}>
                    {item.ctaLabel}
                  </a>
                </div>
                <div className="journey-card__media">
                  <img
                    className="journey-card__image"
                    src={item.image}
                    alt={item.imageAlt}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" id="about" aria-labelledby="about-title">
        <div className="final-cta__inner">
          <div className="final-cta__media">
            <img
              className="final-cta__image"
              src={withBase("images/home_images/home_section_img.png")}
              alt="Founder of Dream Code"
            />
          </div>

          <div className="final-cta__content">
            <h2 id="about-title" className="final-cta__title">
              The Story Behind Dream Code
            </h2>
            <p className="final-cta__description">
              Dream Code was created from a personal journey of searching for
              clarity and direction in life. Like many people, I had ideas,
              dreams, and interests but struggled to understand how they could
              come together into a meaningful path.
            </p>
            <p className="final-cta__description">
              Through exploring psychology, creativity practices, and
              self-reflection methods, I began to see patterns in how people
              discover their natural talents and motivations.
            </p>
            <p className="final-cta__description">
              Dream Code became a way to organize these insights into a
              structured process that helps people understand themselves better
              and move forward with confidence.
            </p>
            <a className="final-cta__button" href="#about">
              Read the Full Story
            </a>
          </div>
        </div>
      </section>

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
