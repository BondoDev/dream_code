import { useEffect, useMemo, useState } from "react";

import "./styles/components/home-hero.scss";
import "./styles/components/journey-steps.scss";
import "./styles/components/final-cta.scss";
import "./styles/components/navbar.scss";
import "./styles/components/footer.scss";
import "./styles/components/questionnaire.scss";

type Question = {
  id: string;
  number: number;
  text: string;
  placeholder: string;
};

type QuestionnaireSection = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

const questionnaireSections: QuestionnaireSection[] = [
  {
    id: "childhood-dream-code",
    title: "Childhood Dream Code",
    description:
      "Look back at the interests, dreams, games, and activities that felt natural to you before external pressure became stronger.",
    questions: [
      {
        id: "q1",
        number: 1,
        text: "What did you want to be as a child, or what did you enjoy doing the most?",
        placeholder:
          "Write freely. You can mention dreams, games, hobbies, fantasies, or repeated interests from childhood.",
      },
      {
        id: "q2",
        number: 2,
        text: "Which activity made you lose track of time when you were a child?",
        placeholder:
          "Think about activities where hours passed quickly because you were deeply interested or absorbed.",
      },
      {
        id: "q3",
        number: 3,
        text: "Did you have a dream or idea that kept coming back to you at different ages?",
        placeholder:
          "Describe any recurring dream, idea, ambition, image, or interest that returned many times in your life.",
      },
      {
        id: "q4",
        number: 4,
        text: "If there were no criticism, fear, or financial limitations today, what activity would you choose?",
        placeholder:
          "Imagine you are fully free from judgment, pressure, and survival concerns. What would you naturally move toward?",
      },
    ],
  },
  {
    id: "inner-motivation",
    title: "Inner Motivation",
    description:
      "Explore what gives you energy, meaning, curiosity, and emotional connection in your current life.",
    questions: [
      {
        id: "q5",
        number: 5,
        text: "What activity gives you the most energy today, even when you are tired?",
        placeholder:
          "Write about something that wakes you up internally or makes you feel more alive.",
      },
      {
        id: "q6",
        number: 6,
        text: "What do you do in your free time just because you love it, even if you do not get paid for it?",
        placeholder:
          "Mention activities, topics, habits, creative work, learning, helping others, building things, or exploring ideas.",
      },
      {
        id: "q7",
        number: 7,
        text: "What topics can you think or talk about for hours?",
        placeholder:
          "Write the subjects you naturally return to, research, discuss, watch, read about, or imagine often.",
      },
      {
        id: "q8",
        number: 8,
        text: "When do you feel that your life is most meaningful?",
        placeholder:
          "Describe moments, situations, people, activities, or goals that make life feel significant to you.",
      },
    ],
  },
  {
    id: "natural-talents",
    title: "Natural Talents",
    description:
      "Notice what comes easily to you, what others recognize in you, and what kind of problems you naturally like solving.",
    questions: [
      {
        id: "q9",
        number: 9,
        text: "What comes most naturally and easily to you?",
        placeholder:
          "Think about skills, behaviors, ways of thinking, communication styles, creativity, leadership, analysis, care, or problem-solving.",
      },
      {
        id: "q10",
        number: 10,
        text: "What talent or skill have others noticed in you from childhood to today?",
        placeholder:
          "Write what people have repeatedly told you that you are good at, even if you did not take it seriously.",
      },
      {
        id: "q11",
        number: 11,
        text: "What type of problems do you most enjoy solving?",
        placeholder:
          "Examples: technical problems, emotional problems, creative problems, business problems, social problems, strategic problems, practical problems.",
      },
      {
        id: "q12",
        number: 12,
        text: "What role do you most often take in a group?",
        placeholder:
          "For example: leader, observer, helper, organizer, creator, analyst, protector, challenger, mediator, teacher, entertainer.",
      },
    ],
  },
  {
    id: "blocks-and-obstacles",
    title: "Blocks and Obstacles",
    description:
      "Reflect on the fears, doubts, internal resistance, and external pressures that may prevent you from following your natural direction.",
    questions: [
      {
        id: "q13",
        number: 13,
        text: "What most prevents you from choosing the path that attracts you?",
        placeholder:
          "Write about fear, money, confidence, family expectations, social pressure, lack of skills, uncertainty, or anything else.",
      },
      {
        id: "q14",
        number: 14,
        text: "What are you most afraid of if you follow this dream?",
        placeholder:
          "Be honest. You can write about failure, judgment, rejection, poverty, losing stability, wasting time, or disappointing others.",
      },
      {
        id: "q15",
        number: 15,
        text: "What thought or phrase repeats often in your mind when you think about this topic?",
        placeholder:
          "Examples: “I am too late,” “I am not good enough,” “This is unrealistic,” “People will laugh,” “I do not know where to start.”",
      },
      {
        id: "q16",
        number: 16,
        text: "What could you lose and what could you gain if you choose this path?",
        placeholder:
          "Write both sides honestly: possible risks, sacrifices, benefits, freedom, growth, identity, relationships, money, or meaning.",
      },
    ],
  },
  {
    id: "life-direction",
    title: "Life Direction",
    description:
      "Connect your answers to the kind of contribution, identity, lifestyle, and future that may feel meaningful to you.",
    questions: [
      {
        id: "q17",
        number: 17,
        text: "In helping or supporting whom do you feel special significance?",
        placeholder:
          "Think about the people, groups, communities, or types of individuals you naturally care about helping or influencing.",
      },
      {
        id: "q18",
        number: 18,
        text: "What change do you want to see in the world through your participation?",
        placeholder:
          "Describe the kind of improvement, impact, beauty, solution, justice, knowledge, support, or creation you would like to contribute.",
      },
      {
        id: "q19",
        number: 19,
        text: "How do you want people to feel after interacting with you?",
        placeholder:
          "Examples: inspired, understood, stronger, calmer, entertained, protected, guided, challenged, hopeful, confident, free.",
      },
      {
        id: "q20",
        number: 20,
        text: "Imagine that your dream is a reality. What does your ideal day look like?",
        placeholder:
          "Describe where you are, what you do, who you interact with, what kind of work you do, and how you feel during the day.",
      },
    ],
  },
];

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const questionnaireRoute = withBase("questionnaire");
const questionnaireStartRoute = withBase("questionnaire/start");

const ANSWERS_STORAGE_KEY = "dreamCodeQuestionnaireAnswers";
const SECTION_INDEX_STORAGE_KEY = "dreamCodeQuestionnaireCurrentSection";

const normalizePath = (path: string) => path.replace(/\/+$/, "");

function App() {
  const [isPastHalfway, setIsPastHalfway] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const savedAnswers = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
      return savedAnswers ? (JSON.parse(savedAnswers) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(() => {
    try {
      const savedSectionIndex = window.localStorage.getItem(SECTION_INDEX_STORAGE_KEY);
      if (!savedSectionIndex) {
        return 0;
      }
      const parsedIndex = Number(savedSectionIndex);
      if (Number.isNaN(parsedIndex)) {
        return 0;
      }
      return Math.min(Math.max(parsedIndex, 0), questionnaireSections.length - 1);
    } catch {
      return 0;
    }
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [ownConclusion, setOwnConclusion] = useState("");

  const pathname = normalizePath(window.location.pathname);
  const isQuestionnairePage = pathname === normalizePath(questionnaireRoute);
  const isQuestionnaireStartPage = pathname === normalizePath(questionnaireStartRoute);

  const currentSection = questionnaireSections[currentSectionIndex];
  const isLastSection = currentSectionIndex === questionnaireSections.length - 1;
  const progressPercent = useMemo(
    () => Math.round(((currentSectionIndex + 1) / questionnaireSections.length) * 100),
    [currentSectionIndex],
  );

  useEffect(() => {
    window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    window.localStorage.setItem(SECTION_INDEX_STORAGE_KEY, String(currentSectionIndex));
  }, [currentSectionIndex]);

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

  const navigateTo = (path: string) => {
    window.location.assign(path);
  };

  const handleScrollToggle = () => {
    const scrollTarget = isPastHalfway
      ? 0
      : document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: Math.max(scrollTarget, 0),
      behavior: "smooth",
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((previousAnswers) => ({ ...previousAnswers, [questionId]: value }));
  };

  const handleBackSection = () => {
    setCurrentSectionIndex((index) => Math.max(index - 1, 0));
  };

  const handleSaveAndContinue = () => {
    if (isLastSection) {
      setIsCompleted(true);
      return;
    }
    setCurrentSectionIndex((index) =>
      Math.min(index + 1, questionnaireSections.length - 1),
    );
  };

  const handleRestartQuestionnaire = () => {
    setAnswers({});
    setOwnConclusion("");
    setCurrentSectionIndex(0);
    setIsCompleted(false);
    window.localStorage.removeItem(ANSWERS_STORAGE_KEY);
    window.localStorage.removeItem(SECTION_INDEX_STORAGE_KEY);
  };

  const renderNavbar = () => (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <button className="logo" type="button" onClick={() => navigateTo(withBase(""))}>
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
          <button
            className="nav-link"
            type="button"
            onClick={() => navigateTo(questionnaireRoute)}
          >
            Questionnaire
          </button>
          <button
            className="nav-button"
            type="button"
            onClick={() => navigateTo(questionnaireRoute)}
          >
            Start Your Path
          </button>
        </div>
      </div>
    </nav>
  );

  const renderFooter = () => (
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
        <div className="footer-copy">&copy; 2026 Dream Code. All rights reserved.</div>
      </div>
    </footer>
  );

  if (isQuestionnaireStartPage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="questionnaire-form-shell questionnaire-start-shell">
          <div className="questionnaire-section-shell">
            <button
              className="questionnaire-back-intro"
              type="button"
              onClick={() => navigateTo(questionnaireRoute)}
            >
              &larr; Back to Introduction
            </button>

            <div className="questionnaire-form-card questionnaire-start-card">
              <span className="questionnaire-badge">Dream Code Map</span>
              <h1 className="questionnaire-form-card__title">Questionnaire</h1>
              <p className="questionnaire-form-card__description">
                Answer slowly and honestly. There are no right or wrong answers.
              </p>

              {!isCompleted ? (
                <>
                  <div className="questionnaire-section-bar">
                    <p className="questionnaire-section-count">
                      Section {currentSectionIndex + 1} of {questionnaireSections.length}
                    </p>
                    <h2 className="questionnaire-section-title-start">{currentSection.title}</h2>
                  </div>
                  <div className="questionnaire-progress" aria-hidden="true">
                    <span
                      className="questionnaire-progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <p className="questionnaire-guide-note">{currentSection.description}</p>

                  {currentSection.questions.map((question) => (
                    <div className="question-block" key={question.id}>
                      <div className="question-heading">
                        <span className="question-number">{question.number}</span>
                        <h3>{question.text}</h3>
                      </div>
                      <p className="question-helper">{question.placeholder}</p>
                      <div className="answer-field">
                        <textarea
                          className="question-textarea"
                          id={question.id}
                          value={answers[question.id] ?? ""}
                          onChange={(event) =>
                            handleAnswerChange(question.id, event.target.value)
                          }
                          placeholder="Write your answer here..."
                        />
                      </div>
                    </div>
                  ))}

                  <div className="questionnaire-form-actions questionnaire-actions">
                    <button
                      className="questionnaire-secondary-button questionnaire-button-secondary"
                      type="button"
                      onClick={handleBackSection}
                      disabled={currentSectionIndex === 0}
                    >
                      Back
                    </button>
                    <button
                      className="questionnaire-primary-button questionnaire-button-primary"
                      type="button"
                      onClick={handleSaveAndContinue}
                    >
                      {isLastSection ? "Complete Questionnaire" : "Save & Continue"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="questionnaire-form-card__title">Your Dream Code Reflection</h2>
                  <p className="questionnaire-form-card__description">
                    Your answers are not final labels. They are reflection material. Read
                    them slowly and look for repeated patterns, emotional energy, fears,
                    strengths, and possible directions.
                  </p>

                  {questionnaireSections.map((section) => (
                    <article className="reflection-group" key={section.id}>
                      <h3>{section.title}</h3>
                      {section.questions.map((question) => (
                        <div className="reflection-answer" key={question.id}>
                          <h4>
                            {question.number}. {question.text}
                          </h4>
                          <p>{answers[question.id]?.trim() || "No answer provided yet."}</p>
                        </div>
                      ))}
                    </article>
                  ))}

                  <div className="questionnaire-field">
                    <label htmlFor="own-conclusion">Your Own Conclusion</label>
                    <p className="questionnaire-field__helper">
                      After reviewing your answers, write what you think your Dream Code
                      may be pointing toward.
                    </p>
                    <textarea
                      id="own-conclusion"
                      value={ownConclusion}
                      onChange={(event) => setOwnConclusion(event.target.value)}
                      placeholder="Write your personal conclusion here. What direction, role, lifestyle, work, creative path, or personal transformation feels most connected to your answers?"
                    />
                  </div>

                  <div className="questionnaire-form-actions">
                    <button
                      className="questionnaire-secondary-button"
                      type="button"
                      onClick={() => setIsCompleted(false)}
                    >
                      Edit Answers
                    </button>
                    <button
                      className="questionnaire-secondary-button"
                      type="button"
                      onClick={handleRestartQuestionnaire}
                    >
                      Restart Questionnaire
                    </button>
                    <button
                      className="questionnaire-primary-button"
                      type="button"
                      onClick={() => navigateTo(questionnaireRoute)}
                    >
                      Back to Introduction
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {renderFooter()}
      </main>
    );
  }

  if (isQuestionnairePage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="questionnaire-hero" aria-labelledby="questionnaire-hero-title">
          <div className="questionnaire-hero__inner">
            <h1 id="questionnaire-hero-title" className="questionnaire-hero__title">
              Dream Code Map - Core Questionnaire
            </h1>
            <p className="questionnaire-hero__intro">
              This is not just a personality test. It is a self-discovery tool designed
              to help you uncover your inner code, including the archetypal patterns that
              shape your motivations, interests, behavior, creativity, and life
              direction.
            </p>
            <div className="questionnaire-hero-signals">
              <div className="questionnaire-signal">
                <strong>The purpose of this questionnaire</strong>
                <p>
                  Reconnect with your natural interests, discover what gives you energy,
                  recognize your strengths, identify inner blocks, and create a clearer
                  direction for life, work, creativity, and your personal brand.
                </p>
              </div>
              <div className="questionnaire-signal">
                <strong>Your answers help reveal</strong>
                <p>
                  Which archetypes are most active in your personality, what drives your
                  decisions and desires, how you express creativity and purpose, and which
                  roles and environments resonate most deeply with you.
                </p>
              </div>
              <div className="questionnaire-signal">
                <strong>The questionnaire combines ideas from</strong>
                <p>
                  Neuroscience, behavioral psychology, archetype systems, intrinsic
                  motivation research, and creative and intuitive thinking models.
                </p>
              </div>
            </div>
            <p className="questionnaire-disclaimer">
              This process does not tell you who you should become. It helps you remember
              who you have always been. Answer honestly. There are no right or wrong
              answers.
            </p>
          </div>
        </section>

        <div className="questionnaire-hero-cta">
          <button
            className="questionnaire-primary-button"
            type="button"
            onClick={() => navigateTo(questionnaireStartRoute)}
          >
            Start Questionnaire
          </button>
        </div>

        <section className="questionnaire-explain" aria-labelledby="questionnaire-explain-title">
          <div className="questionnaire-section-shell">
            <h2 id="questionnaire-explain-title" className="questionnaire-section-title">
              This Is Not Just a Personality Test
            </h2>
            <p className="questionnaire-section-text">
              Many people live according to patterns created by fear, social
              expectations, survival mode, and external pressure instead of following the
              path that truly matches who they are.
            </p>
            <p className="questionnaire-section-text">
              The questionnaire is partially based on the 12 archetype system, where each
              person expresses a unique combination of psychological patterns and inner
              motivations.
            </p>
          </div>
        </section>

        <section className="questionnaire-explore" aria-labelledby="questionnaire-explore-title">
          <div className="questionnaire-section-shell">
            <h2 id="questionnaire-explore-title" className="questionnaire-section-title">
              The Purpose of This Questionnaire
            </h2>
            <div className="questionnaire-card-grid">
              <article className="questionnaire-card">
                <h3>Reconnect and rediscover</h3>
                <p>
                  Reconnect with your natural interests and childhood dream code, and
                  discover what genuinely gives you energy.
                </p>
              </article>
              <article className="questionnaire-card">
                <h3>Recognize your inner design</h3>
                <p>
                  Recognize your natural talents and strengths, and better understand your
                  dominant and secondary archetypes.
                </p>
              </article>
              <article className="questionnaire-card">
                <h3>Identify what holds you back</h3>
                <p>
                  Identify the internal blocks that may be limiting your growth, direction,
                  and ability to follow what feels true to you.
                </p>
              </article>
              <article className="questionnaire-card">
                <h3>Create clearer direction</h3>
                <p>
                  Create a clearer direction for your life, work, creativity, and personal
                  brand.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="questionnaire-how" aria-labelledby="questionnaire-how-title">
          <div className="questionnaire-section-shell">
            <h2 id="questionnaire-how-title" className="questionnaire-section-title">
              After Completing It, You Will Receive Insights Into
            </h2>
            <div className="questionnaire-steps">
              <article className="questionnaire-step">
                <h3>Your archetypes and motivation</h3>
                <p>
                  Discover your dominant and secondary archetypes along with the
                  motivational patterns that shape your decisions and desires.
                </p>
              </article>
              <article className="questionnaire-step">
                <h3>Your strengths and blocks</h3>
                <p>
                  Recognize your strengths and growth areas, as well as emotional blocks
                  and inner resistance that may be affecting your path.
                </p>
              </article>
              <article className="questionnaire-step">
                <h3>Your possible direction</h3>
                <p>
                  Clarify possible directions for your career, creativity, personal
                  development, and your authentic personal brand tendencies.
                </p>
              </article>
            </div>
            <div className="questionnaire-how-cta">
              <button
                className="questionnaire-primary-button"
                type="button"
                onClick={() => navigateTo(questionnaireStartRoute)}
              >
                Start Questionnaire
              </button>
            </div>
          </div>
        </section>

        {renderFooter()}
      </main>
    );
  }

  return (
    <main className="page-shell">
      {renderNavbar()}

      <section className="home-hero" id="top" aria-labelledby="home-hero-title">
        <div className="home-hero__inner">
          <div className="home-hero__content">
            <span className="home-hero__label">DREAM CODE MAP</span>
            <h1 id="home-hero-title" className="home-hero__title">
              Discover Your Natural Talent and Life Direction
            </h1>
            <p className="home-hero__description">
              A guided process that helps you discover your natural strengths, overcome inner
              blocks, and turn your dreams into a clear and meaningful life direction.
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
              A simple process designed to help you discover your natural direction and turn your
              dreams into a meaningful life path.
            </p>
          </div>

          <div className="journey-steps__grid">
            <button
              className="journey-step-card"
              type="button"
              onClick={() => navigateTo(questionnaireRoute)}
            >
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/questionnaire_image.png")}
                alt="Questionnaire"
              />
              <span className="journey-step-card__label">Questionnaire</span>
            </button>
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

      <section className="final-cta" id="about" aria-labelledby="about-title">
        <div className="final-cta__inner">
          <div className="final-cta__content">
            <h2 id="about-title" className="final-cta__title">
              DreamCodeMap - A System for Rediscovering Your Inner Direction
            </h2>

            <p className="final-cta__description">
              DreamCodeMap was created to help people reconnect with their natural direction,
              hidden talents, inner strengths, and forgotten dreams.
            </p>
            <p className="final-cta__description">
              This is not just a self-development course.
              <br />
              It is a space designed for deeper self-discovery, clarity, creative activation,
              and authentic transformation.
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
              After more than 20 years of administrative and office work, I constantly felt
              that I was not truly in my place. I was doing what was necessary - what provided
              stability, responsibility, and security - but not what genuinely inspired me or
              made me feel alive.
            </p>
            <p className="final-cta__description">
              Although I performed my work professionally, I felt disconnected from my deeper
              potential because it was never aligned with my true interests or inner calling.
            </p>
            <p className="final-cta__description">
              At a turning point in my life, I began searching for a deeper understanding of
              myself, my purpose, and human potential. Along this journey, I explored
              psychology, behavioral patterns, creativity, astrology, numerology, and other
              systems as tools for self-discovery and personal insight.
            </p>
            <p className="final-cta__description">
              Over time, more and more people came to me for guidance. That is when I realized
              that helping others recognize their strengths, reconnect with their inspiration,
              and discover their hidden potential was one of my natural gifts.
            </p>
            <p className="final-cta__description">This is how DreamCodeMap was born.</p>

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
                  The system was designed to support growth on multiple levels simultaneously:
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
              Because meaningful transformation often begins when we start seeing ourselves as a
              whole.
            </p>

            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">The Vision</h3>
            <p className="final-cta__description">
              I believe that many people are not lacking talent or potential - they simply were
              never given the tools, space, or guidance to recognize their inner patterns and
              authentic direction.
            </p>
            <p className="final-cta__description">DreamCodeMap exists to help people:</p>
            <ul className="final-cta__list">
              <li>understand themselves more deeply</li>
              <li>uncover their natural abilities</li>
              <li>recognize inner blocks</li>
              <li>activate creative energy</li>
              <li>and transform dreams into real direction and meaningful action</li>
            </ul>

            <hr className="final-cta__divider" />

            <h3 className="final-cta__subtitle">In the End</h3>
            <p className="final-cta__description">
              Sometimes people are not truly lost.
              <br />
              They have simply spent too much time living according to expectations that were
              never truly theirs.
            </p>
            <p className="final-cta__description">
              DreamCodeMap is an invitation to return to yourself.
            </p>
          </div>
        </div>
      </section>

      {renderFooter()}

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
