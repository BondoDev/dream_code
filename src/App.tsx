import "./styles/components/home-hero.scss";
import "./styles/components/journey-steps.scss";
import "./styles/components/final-cta.scss";
import "./styles/components/navbar.scss";
import "./styles/components/footer.scss";

const journeySteps = [
  {
    step: "Step 1",
    title: "Questionnaire",
    description:
      "Answer 20 thoughtful questions designed to reveal your core archetypes, natural strengths, and deeper motivations.",
    image: "/images/home_images/questionnaire_card_img.png",
    imageAlt: "Questionnaire illustration",
    ctaLabel: "Start Questionnaire",
    ctaHref: "#questionnaire",
  },
  {
    step: "Step 2",
    title: "Personal Analysis",
    description:
      "Your talents, blocks, and potential life directions are analyzed through reflective systems that help you better understand yourself.",
    image: "/images/home_images/personal_analysis%20card_img.png",
    imageAlt: "Personal analysis illustration",
    ctaLabel: "View Analysis Details",
    ctaHref: "#analysis-details",
  },
  {
    step: "Step 3",
    title: "Learning Modules",
    description:
      "Five guided modules teach you how the mind works, how to build supportive habits, develop creativity, and transform dreams into goals.",
    image: "/images/home_images/learning_modules_card_img.png",
    imageAlt: "Learning modules illustration",
    ctaLabel: "Explore Modules",
    ctaHref: "#modules",
  },
  {
    step: "Step 4",
    title: "Nature Retreat",
    description:
      "A one-day retreat in nature with creative practices, reflection exercises, and a celebration of your personal journey.",
    image: "/images/home_images/nature_retreat_card_img.png",
    imageAlt: "Nature retreat illustration",
    ctaLabel: "Learn About Retreat",
    ctaHref: "#retreat",
  },
];

function App() {
  return (
    <main className="page-shell">
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <a className="logo" href="#top">
            Dream Code
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#steps">Journey</a>
            <a href="#about">Start</a>
            <a className="nav-button" href="#questionnaire">
              Start Questionnaire
            </a>
          </div>
        </div>
      </nav>

      <section
        className="home-hero"
        id="top"
        aria-labelledby="home-hero-title"
      >
        <div className="home-hero__inner">
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">Dream Code Map</span>
            <h1 id="home-hero-title" className="home-hero__title">
              Discover Your Natural Talents and Life Direction
            </h1>
            <p className="home-hero__description">
              A guided process that helps you discover your natural strengths,
              overcome inner blocks, and turn your dreams into a clear and
              meaningful life direction.
            </p>
            <a className="home-hero__button" href="#questionnaire">
              Start Questionnaire
            </a>
          </div>

          <div className="home-hero__media">
            <div className="home-hero__image-wrap">
              <img
                className="home-hero__image"
                src="/images/home_images/home_section_img.png"
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
                  <p className="journey-card__description">{item.description}</p>
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
              src="/images/home_images/home_section_img.png"
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
            <a href="#about">About</a>
            <a href="#steps">Contact</a>
            <a href="#about">Privacy</a>
          </div>
          <div className="footer-copy">&copy; 2026 Dream Code. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}

export default App;
