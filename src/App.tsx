import { useEffect, useState } from "react";

import "./styles/components/home-hero.scss";
import "./styles/components/journey-steps.scss";
import "./styles/components/final-cta.scss";
import "./styles/components/navbar.scss";
import "./styles/components/footer.scss";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

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
      >
        <div className="final-cta__inner">
          <div className="final-cta__content">
            <h2 id="about-title" className="final-cta__title">
              DreamCodeMap - A System for Rediscovering Your Inner Direction
            </h2>

            <p className="final-cta__description">
              DreamCodeMap was created to help people reconnect with their
              natural direction, hidden talents, inner strengths, and forgotten
              dreams.
            </p>
            <p className="final-cta__description">
              This is not just a self-development course.
              <br />
              It is a space designed for deeper self-discovery, clarity,
              creative activation, and authentic transformation.
            </p>
            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">How It Began</h3>
            <figure className="final-cta__about-image final-cta__about-image--right">
              <img
                src={withBase("images/home_images/about_image-1.jpg")}
                alt="Reflective portrait symbolizing self-discovery and inner direction."
              />
            </figure>
            <p className="final-cta__description">
              This project slowly matured over many years.
            </p>
            <p className="final-cta__description">
              After more than 20 years of administrative and office work, I
              constantly felt that I was not truly in my place. I was doing
              what was necessary - what provided stability, responsibility, and
              security - but not what genuinely inspired me or made me feel
              alive.
            </p>
            <p className="final-cta__description">
              Although I performed my work professionally, I felt disconnected
              from my deeper potential because it was never aligned with my true
              interests or inner calling.
            </p>
            <p className="final-cta__description">
              At a turning point in my life, I began searching for a deeper
              understanding of myself, my purpose, and human potential. Along
              this journey, I explored psychology, behavioral patterns,
              creativity, astrology, numerology, and other systems as tools for
              self-discovery and personal insight.
            </p>
            <p className="final-cta__description">
              Over time, more and more people came to me for guidance. That is
              when I realized that helping others recognize their strengths,
              reconnect with their inspiration, and discover their hidden
              potential was one of my natural gifts.
            </p>
            <p className="final-cta__description">
              This is how DreamCodeMap was born.
            </p>

            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">What DreamCodeMap Combines</h3>
            <div className="final-cta__combine-layout">
              <div className="final-cta__combine-left">
                <figure className="final-cta__about-image final-cta__combine-image">
                  <img
                    src={withBase("images/home_images/about_image-2.jpg")}
                    alt="Calm nature-inspired scene representing clarity, growth, and life direction."
                  />
                </figure>
              </div>
              <div className="final-cta__combine-right">
                <p className="final-cta__description">DreamCodeMap brings together:</p>
                <ul className="final-cta__list">
                  <li>self-discovery questionnaires</li>
                  <li>the Dream Archetype system</li>
                  <li>psychology and habit mechanisms</li>
                  <li>creativity development practices</li>
                  <li>astrology, numerology, and Human Design tools</li>
                  <li>nature-based and embodiment practices</li>
                </ul>
                <p className="final-cta__description">
                  The system was designed to support growth on multiple levels
                  simultaneously:
                </p>
                <ul className="final-cta__list">
                  <li>physical</li>
                  <li>emotional</li>
                  <li>intellectual</li>
                  <li>creative</li>
                  <li>and inner/spiritual</li>
                </ul>
              </div>
            </div>
            <p className="final-cta__description">
              Because meaningful transformation often begins when we start
              seeing ourselves as a whole.
            </p>

            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">The Vision</h3>
            <p className="final-cta__description">
              I believe that many people are not lacking talent or potential -
              they simply were never given the tools, space, or guidance to
              recognize their inner patterns and authentic direction.
            </p>
            <p className="final-cta__description">
              DreamCodeMap exists to help people:
            </p>
            <ul className="final-cta__list">
              <li>understand themselves more deeply</li>
              <li>uncover their natural abilities</li>
              <li>recognize inner blocks</li>
              <li>activate creative energy</li>
              <li>
                and transform dreams into real direction and meaningful action
              </li>
            </ul>

            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">In the End</h3>
            <p className="final-cta__description">
              Sometimes people are not truly lost.
              <br />
              They have simply spent too much time living according to
              expectations that were never truly theirs.
            </p>
            <p className="final-cta__description">
              DreamCodeMap is an invitation to return to yourself. ✨
            </p>
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
