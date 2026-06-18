import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import "./styles/components/home-hero.scss";
import "./styles/components/journey-steps.scss";
import "./styles/components/final-cta.scss";
import "./styles/components/navbar.scss";
import "./styles/components/footer.scss";
import "./styles/components/questionnaire.scss";
import "./styles/components/lectures.scss";
import "./styles/components/consultation.scss";
import "./styles/components/retreat.scss";

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

type LectureModule = {
  id: string;
  number: string;
  title: string;
  summary: string;
  intro: string;
  keyPoints: string[];
  practicalWork?: string[];
  outcome: string;
};

type ConsultationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  purpose: string;
  description: string;
};

type RetreatGainItem = {
  label: string;
  title: string;
};

type RetreatInfoItem = {
  label: string;
  value: string;
};

type RetreatFormValues = {
  fullName: string;
  email: string;
  phone: string;
  purpose: string;
  expectations: string;
  description: string;
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

const lectureFoundations = [
  "Neuroscience",
  "Psychology",
  "Creative thinking",
  "Habit systems",
  "Archetype models",
  "Personal branding strategies",
  "Practical self-discovery tools",
];

const lectureAudience = [
  "People who feel lost in direction",
  "People who sense inner potential but cannot activate it",
  "People searching for their own path",
  "People who want creative or professional self-realization",
  "People who want to build an authentic brand and meaningful work",
  "People who simply want to understand themselves better",
  "Creative individuals",
  "Entrepreneurs",
  "Brand creators",
  "People seeking career changes",
  "Those who feel they are meant for something more but cannot find direction",
];

const lectureGains = [
  "Better understand your psychological and creative profile",
  "Identify your main archetypes and inner motivations",
  "Recognize what prevents you from taking real action",
  "Learn how habits, motivation, and the brain work",
  "Develop creativity and idea-generation skills",
  "Reduce procrastination and perfectionism",
  "Create your personal strategy",
  "Define your brand and ideal audience",
  "Build a realistic and sustainable planning system",
  "Create a more authentic and conscious life",
];

const lectureMainIdea = [
  "Habits",
  "Neural patterns",
  "Inner beliefs",
  "Environment",
  "The story you tell yourself about who you are",
];

const lectureModules: LectureModule[] = [
  {
    id: "module-01",
    number: "01",
    title: "Brain, Motivation, and Neuroscience",
    summary:
      "Understand how the brain, nervous system, stress, dopamine, and motivation influence behavior and change.",
    intro:
      "In this module, you will learn how the brain, nervous system, stress, dopamine, and motivation influence your behavior, energy, and ability to change.",
    keyPoints: [
      "How the brain works",
      "How dopamine, stress, and the nervous system function",
      "Why change is difficult",
      "How motivation works on a biological level",
      "Why the brain sometimes blocks action",
    ],
    outcome:
      "You will understand the biological foundation behind motivation, resistance, stress, and change.",
  },
  {
    id: "module-02",
    number: "02",
    title: "Habits and Behavioral Change",
    summary:
      "Learn how habits are formed, why old patterns return, and how to build systems for real behavioral change.",
    intro:
      "In this module, you will study how habits are formed, why old patterns return, and how to build systems that support real behavioral change.",
    keyPoints: [
      "How habits are formed in the brain",
      "Why change feels difficult",
      "How dopamine, motivation, and reward systems work",
      "How environment affects behavior",
      "Why we return to old patterns",
      "How the habit loop works",
      "The cue -> behavior -> reward system",
      "Why change is not only about willpower",
      "How stress affects habits",
    ],
    practicalWork: [
      "Systems for reducing bad habits",
      "Building new habits",
      "Identity-based habit approaches",
      "Environment design",
      "Behavior tracking",
      "Habit stacking techniques",
      "Reducing procrastination",
      "Starting with small actions",
      "Creating a sustainable daily system",
      "Making change natural rather than forced",
    ],
    outcome:
      "You will gain a conscious map of your habits, practical tools for behavioral change, a stable progress system, and greater control over your daily life.",
  },
  {
    id: "module-03",
    number: "03",
    title: "Creativity Development",
    summary:
      "Explore how ideas are born, why creativity gets blocked, and how to build a practical creative system.",
    intro:
      "In this module, you will explore how creativity works, why the brain blocks ideas, and how to develop a practical creative system.",
    keyPoints: [
      "Why the brain blocks creativity",
      "How the flow state works",
      "How ideas are born",
      "How insight and intuition function",
    ],
    practicalWork: [
      "Visualization techniques",
      "Idea-generation systems",
      "Creative exercises",
      "Open loops and incubation processes",
    ],
    outcome:
      "You will learn to increase creative energy, overcome self-judgment and perfectionism, generate ideas systematically, and use creativity as a practical tool.",
  },
  {
    id: "module-04",
    number: "04",
    title: "Blocks and Energy Management",
    summary:
      "Recognize procrastination, fear, perfectionism, emotional exhaustion, and learn how to restore energy and focus.",
    intro:
      "In this module, you will explore the inner blocks that stop action and learn how to manage emotional energy, focus, and resistance.",
    keyPoints: [
      "Procrastination",
      "Fear",
      "Demotivation",
      "Emotional exhaustion",
      "Perfectionism",
      "Why the brain stops action",
      "How emotional defense mechanisms work",
      "How environment affects behavior",
      "How to restore energy and focus",
    ],
    practicalWork: [
      "Nervous system regulation",
      "Breathing techniques",
      "Emotional regulation",
      "Systems for managing energy and attention",
    ],
    outcome:
      "You will learn how to recognize resistance, restore energy, regulate emotions, and create better conditions for focused action.",
  },
  {
    id: "module-05",
    number: "05",
    title: "From Dream to Goal",
    summary:
      "Transform unclear dreams into goals, personal strategy, positioning, and a practical development plan.",
    intro:
      "This module helps you transform unclear dreams into goals, personal strategy, positioning, and a practical development plan.",
    keyPoints: [
      "Clearly defining your dreams",
      "Transforming dreams into goals",
      "Building a personal strategy",
      "Creating your own brand",
      "Understanding your ideal audience",
      "Competitor analysis",
      "Positioning",
      "Planning and system building",
    ],
    outcome:
      "You will gain a clear structure for your vision, an action system, the foundation of your brand, and a practical development plan.",
  },
];

const consultationExplorationItems = [
  "Discovering your direction and genuine interests",
  "Archetype analysis and self-discovery",
  "Understanding your inner motivations",
  "Identifying blocks, fears, and internal resistance",
  "Reflecting on the next stage of your life or work",
  "Gaining clarity in decision-making",
  "Uncovering your unique potential and strengths",
];

const consultationOutcomeItems = [
  "A deeper understanding of yourself",
  "Individual feedback",
  "New perspective and clarity",
  "Better awareness of your strengths and internal blocks",
  "Personalized directions for further development",
];

const consultationOutcomeLabels = [
  "Insight",
  "Feedback",
  "Clarity",
  "Awareness",
  "Direction",
];

const consultationFormatItems = [
  {
    title: "Online",
    text: "The consultation is held online, so you can join from wherever you are.",
  },
  {
    title: "30–45 minutes",
    text: "A focused session designed for reflection, clarity, and practical next steps.",
  },
  {
    title: "Georgian / English / Russian",
    text: "Choose the language that feels most natural for you.",
  },
];

const consultationPurposeOptions = [
  "Discovering direction",
  "Understanding inner blocks",
  "Career or work clarity",
  "Creative self-realization",
  "Personal brand direction",
  "General self-discovery",
  "Other",
];

const consultationPreviewAvailability = [
  {
    day: "Monday",
    times: ["10:00", "12:30", "16:00"],
  },
  {
    day: "Wednesday",
    times: ["11:00", "15:30"],
  },
  {
    day: "Friday",
    times: ["13:00", "17:00"],
  },
];

const retreatExperienceItems = [
  "Self-discovery",
  "Archetype-based practices",
  "Creative exercises",
  "Reflection",
  "Nature and intentional space",
  "Dialogue and inner observation",
];

const retreatExploreItems = [
  "Understanding your personal direction",
  "Exploring your archetypal profile",
  "Discovering inner resources and interests",
  "Creative and intuitive practices",
  "Reducing emotional overload",
  "Shaping your personal vision and next chapter",
];

const retreatGainItems: RetreatGainItem[] = [
  {
    label: "Insight",
    title: "Deeper self-understanding",
  },
  {
    label: "Space",
    title: "Temporary distance from everyday overload",
  },
  {
    label: "Inspiration",
    title: "New perspectives and inspiration",
  },
  {
    label: "Connection",
    title: "Stronger connection with your authentic desires",
  },
  {
    label: "Direction",
    title: "Practical insights for your next steps",
  },
];

const retreatForItems = [
  "You feel emotionally or mentally exhausted",
  "You are going through a period of change",
  "You are searching for a new direction",
  "You want deeper connection with yourself",
  "You want to create intentional time and space for reflection",
];

const upcomingRetreatInfo: RetreatInfoItem[] = [
  {
    label: "Location",
    value: "Coming soon",
  },
  {
    label: "Date",
    value: "Coming soon",
  },
  {
    label: "Duration",
    value: "Coming soon",
  },
  {
    label: "Number of participants",
    value: "Limited small group",
  },
];

const retreatPurposeOptions = [
  "Self-discovery",
  "New direction",
  "Emotional reset",
  "Creative inspiration",
  "Personal vision",
  "Life or work transition",
  "Other",
];

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const questionnaireRoute = withBase("questionnaire");
const questionnaireStartRoute = withBase("questionnaire/start");
const lecturesRoute = withBase("lectures");
const consultationRoute = withBase("consultation");
const contactRoute = withBase("contact");
const retreatRoute = withBase("retreat");
const GOOGLE_CALENDAR_BOOKING_URL = "";
// Later, replace the placeholder calendar with a Google Calendar Appointment Schedule embed or external booking link.

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
  const [openModuleId, setOpenModuleId] = useState<string>("module-01");
  const [consultationFormValues, setConsultationFormValues] = useState<ConsultationFormValues>({
    fullName: "",
    email: "",
    phone: "",
    purpose: consultationPurposeOptions[0],
    description: "",
  });
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [activeBookingStep, setActiveBookingStep] = useState<"time" | "details">("time");
  const [retreatFormValues, setRetreatFormValues] = useState<RetreatFormValues>({
    fullName: "",
    email: "",
    phone: "",
    purpose: retreatPurposeOptions[0],
    expectations: "",
    description: "",
  });
  const [retreatSubmitted, setRetreatSubmitted] = useState(false);

  const pathname = normalizePath(window.location.pathname);
  const isQuestionnairePage = pathname === normalizePath(questionnaireRoute);
  const isQuestionnaireStartPage = pathname === normalizePath(questionnaireStartRoute);
  const isLecturesPage = pathname === normalizePath(lecturesRoute);
  const isConsultationPage = pathname === normalizePath(consultationRoute);
  const isContactPage = pathname === normalizePath(contactRoute);
  const isRetreatPage = pathname === normalizePath(retreatRoute);

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

  const navigateToHomeSection = (sectionId: string) => {
    window.location.assign(`${withBase("")}#${sectionId}`);
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

  const handleToggleModule = (moduleId: string) => {
    setOpenModuleId((current) => (current === moduleId ? "" : moduleId));
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToBookingForm = () => {
    scrollToSection("booking-form");
  };

  const scrollToRetreatRegistration = () => {
    scrollToSection("retreat-registration");
  };

  const handleConsultationFieldChange = (
    field: keyof ConsultationFormValues,
    value: string,
  ) => {
    setConsultationFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleConsultationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConsultationSubmitted(true);
  };

  const handleRetreatFieldChange = (
    field: keyof RetreatFormValues,
    value: string,
  ) => {
    setRetreatFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (retreatSubmitted) {
      setRetreatSubmitted(false);
    }
  };

  const handleRetreatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRetreatSubmitted(true);
  };

  const renderNavbar = () => (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <button className="logo" type="button" onClick={() => navigateTo(withBase(""))}>
          Dream Code
        </button>

        <div className="nav-links">
          <button className="nav-link" type="button" onClick={() => navigateToHomeSection("about")}>
            About
          </button>
          <button className="nav-link" type="button" onClick={() => navigateToHomeSection("journey")}>
            Journey
          </button>
          <button className="nav-link" type="button" onClick={() => navigateTo(contactRoute)}>
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
          <button className="footer-link" type="button" onClick={() => navigateToHomeSection("about")}>
            About
          </button>
          <button className="footer-link" type="button" onClick={() => navigateTo(contactRoute)}>
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

  if (isLecturesPage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="lectures-hero" aria-labelledby="lectures-hero-title">
          <div className="lectures-shell lectures-hero__inner">
            <div className="lectures-hero__content">
              <span className="lectures-badge">Dream Code Map Lectures</span>
              <h1 id="lectures-hero-title" className="lectures-hero__title">
                Discover Your Inner Code, Direction, and Real Potential
              </h1>
              <p className="lectures-hero__text">
                Dream Code Map Lectures are a structured personal development course
                designed to help you understand your inner patterns, discover what gives
                you energy, recognize what blocks you, and transform your ideas into
                clear direction and practical systems.
              </p>
              <div className="lectures-hero__actions">
                <button
                  className="questionnaire-primary-button"
                  type="button"
                  onClick={() => navigateTo(questionnaireRoute)}
                >
                  Start with Questionnaire
                </button>
                <button
                  className="questionnaire-secondary-button"
                  type="button"
                  onClick={() => navigateTo(contactRoute)}
                >
                  Contact About Lectures
                </button>
              </div>
              <p className="lectures-quiet-note">
                This course is for self-discovery and personal development. It is not a
                medical, psychological, or diagnostic service.
              </p>
            </div>

            <aside className="lectures-hero__panel" aria-label="Lecture course focus">
              <div className="lectures-hero__panel-card">
                <span className="lectures-panel-label">Structured next step</span>
                <h2>From reflection to direction</h2>
                <p>
                  This page is designed as a deeper continuation after the questionnaire:
                  a calm, layered program that turns insight into clearer habits,
                  creativity, focus, and personal strategy.
                </p>
                <ul className="lectures-panel-list">
                  <li>Inner patterns</li>
                  <li>Motivation and habits</li>
                  <li>Creative direction</li>
                  <li>Practical personal systems</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="lectures-section" aria-labelledby="lectures-course-title">
          <div className="lectures-shell">
            <div className="lectures-section-heading">
              <span className="lectures-section-kicker">Course Overview</span>
              <h2 id="lectures-course-title">What This Course Is</h2>
            </div>
            <div className="lectures-editorial">
              <div className="lectures-editorial__text">
                <p>
                  Dream Code Map is an integrated lecture course inspired by
                  neuroscience, psychology, creative thinking, habit systems,
                  archetype models, personal branding strategies, and practical
                  self-discovery tools.
                </p>
                <p>
                  This course is designed to help people move from confusion, inner
                  resistance, and unrealized potential toward clearer direction,
                  stronger self-understanding, and more conscious action.
                </p>
                <p>
                  This is not just a motivational course. It is a structured process
                  that helps you understand how your brain works, discover what gives
                  you energy, recognize what blocks you, and transform your ideas into
                  real direction and systems.
                </p>
              </div>
              <div className="lectures-foundation-card" aria-label="Course foundations">
                <div className="lectures-tag-grid">
                  {lectureFoundations.map((foundation) => (
                    <span className="lectures-tag" key={foundation}>
                      {foundation}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lectures-section lectures-section--soft" aria-labelledby="lectures-audience-title">
          <div className="lectures-shell">
            <div className="lectures-section-heading">
              <span className="lectures-section-kicker">Audience</span>
              <h2 id="lectures-audience-title">Who This Course Is For</h2>
              <p>
                This course is designed for people who want to understand themselves
                more deeply and create a clearer path forward.
              </p>
            </div>
            <div className="lectures-checklist-grid">
              {lectureAudience.map((item) => (
                <div className="lectures-checklist-item" key={item}>
                  <span className="lectures-checklist-marker" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lectures-section" aria-labelledby="lectures-gains-title">
          <div className="lectures-shell">
            <div className="lectures-section-heading">
              <span className="lectures-section-kicker">Outcomes</span>
              <h2 id="lectures-gains-title">What You Will Gain From This Course</h2>
            </div>
            <div className="lectures-gain-grid">
              {lectureGains.map((gain, index) => (
                <article className="lectures-gain-item" key={gain}>
                  <span className="lectures-gain-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{gain}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lectures-section lectures-section--modules" aria-labelledby="lectures-modules-title">
          <div className="lectures-shell">
            <div className="lectures-section-heading">
              <span className="lectures-section-kicker">Modules</span>
              <h2 id="lectures-modules-title">Course Modules</h2>
            </div>
            <div className="lectures-module-accordion">
              {lectureModules.map((module) => (
                <article
                  className={`lectures-module-card ${openModuleId === module.id ? "lectures-module-card--open is-open" : ""}`}
                  key={module.id}
                >
                  <button
                    className="lectures-module-toggle"
                    type="button"
                    onClick={() => handleToggleModule(module.id)}
                    aria-expanded={openModuleId === module.id}
                    aria-controls={`${module.id}-panel`}
                  >
                    <div className="lectures-module-card__top">
                      <span className="lectures-module-number">Module {module.number}</span>
                      <div className="lectures-module-heading">
                        <h3>{module.title}</h3>
                        <p className="lectures-module-summary">{module.summary}</p>
                      </div>
                    </div>
                    <span
                      className={`lectures-module-indicator ${openModuleId === module.id ? "lectures-module-indicator--open" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {openModuleId === module.id ? (
                    <div className="lectures-module-panel" id={`${module.id}-panel`}>
                      <div className="lectures-module-panel-inner">
                        <p className="lectures-module-intro">{module.intro}</p>
                        <div className="lectures-module-block">
                          <h4>Key learning points</h4>
                          <ul>
                            {module.keyPoints.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {module.practicalWork ? (
                          <div className="lectures-module-block">
                            <h4>Practical work</h4>
                            <ul>
                              {module.practicalWork.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        <div className="lectures-module-outcome">
                          <h4>Practical outcome</h4>
                          <p>{module.outcome}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lectures-section lectures-section--soft" aria-labelledby="lectures-idea-title">
          <div className="lectures-shell">
            <div className="lectures-section-heading">
              <span className="lectures-section-kicker">Core Idea</span>
              <h2 id="lectures-idea-title">The Main Idea</h2>
            </div>
            <div className="lectures-main-idea">
              <div className="lectures-main-idea__text">
                <p>
                  Your life is not created only by goals. It is shaped by habits,
                  neural patterns, inner beliefs, environment, and the story you tell
                  yourself about who you are.
                </p>
                <p>
                  Dream Code Map helps you become aware of these patterns and transform
                  your inner potential into real direction.
                </p>
              </div>
              <div className="lectures-main-idea__terms" aria-label="Core forces shaping direction">
                {lectureMainIdea.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lectures-final-cta" aria-labelledby="lectures-cta-title">
          <div className="lectures-shell">
            <div className="lectures-final-card">
              <span className="lectures-section-kicker">Next Step</span>
              <h2 id="lectures-cta-title">Start With Your Own Dream Code</h2>
              <p>
                The best way to begin is by answering the Dream Code Map
                Questionnaire. It helps you reflect on your natural interests,
                motivations, talents, blocks, and possible life direction before
                going deeper into the lecture course.
              </p>
              <div className="lectures-hero__actions">
                <button
                  className="questionnaire-primary-button"
                  type="button"
                  onClick={() => navigateTo(questionnaireRoute)}
                >
                  Take the Questionnaire
                </button>
                <button
                  className="questionnaire-secondary-button"
                  type="button"
                  onClick={() => navigateTo(contactRoute)}
                >
                  Contact About Lectures
                </button>
              </div>
            </div>
          </div>
        </section>

        {renderFooter()}
      </main>
    );
  }

  if (isConsultationPage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="consultation-hero" aria-labelledby="consultation-hero-title">
          <div className="consultation-shell">
            <div className="consultation-hero-card">
              <div className="consultation-hero-card__content">
                <span className="consultation-badge">Dream Code Map Consultation</span>
                <h1 id="consultation-hero-title" className="consultation-hero__title">
                  A Personal Space to Understand Yourself Better
                </h1>
                <p className="consultation-hero__lead">
                  Gain clarity about your direction, inner resources, behavioral
                  patterns, and possible next steps.
                </p>
                <p className="consultation-hero__text">
                  Sometimes the answers are not outside of us. Sometimes we simply
                  need space to pause, observe ourselves, and notice what remains
                  invisible in everyday life.
                </p>
                <div className="consultation-hero__actions">
                  <button
                    className="questionnaire-primary-button"
                    type="button"
                    onClick={scrollToBookingForm}
                  >
                    Book a Consultation
                  </button>
                  <button
                    className="questionnaire-secondary-button"
                    type="button"
                    onClick={() => navigateTo(questionnaireRoute)}
                  >
                    Start with Questionnaire
                  </button>
                </div>
                <p className="consultation-quiet-note">
                  Personal consultation · Self-discovery · Direction clarity
                </p>
              </div>

              <aside className="session-glance-card" aria-label="Session at a glance">
                <span className="consultation-section-kicker">Session at a Glance</span>
                <h2>Consultation Format</h2>
                <ul className="session-glance-list">
                  <li className="session-glance-item">
                    <span className="session-glance-marker" aria-hidden="true" />
                    <span>Online consultation</span>
                  </li>
                  <li className="session-glance-item">
                    <span className="session-glance-marker" aria-hidden="true" />
                    <span>30–45 minutes</span>
                  </li>
                  <li className="session-glance-item">
                    <span className="session-glance-marker" aria-hidden="true" />
                    <span>Georgian / English / Russian</span>
                  </li>
                  <li className="session-glance-item">
                    <span className="session-glance-marker" aria-hidden="true" />
                    <span>Self-discovery and direction clarity</span>
                  </li>
                </ul>
                <p className="session-glance-note">
                  A calm one-to-one space to pause, understand your patterns, and
                  clarify your next step.
                </p>
                <button
                  className="session-glance-link"
                  type="button"
                  onClick={scrollToBookingForm}
                >
                  View booking form
                </button>
                <p className="session-glance-hint">
                  Start with a short form below, or begin with the questionnaire
                  first.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="consultation-section" aria-labelledby="consultation-why-title">
          <div className="consultation-shell consultation-editorial">
            <div className="consultation-section-heading">
              <span className="consultation-section-kicker">Personal Clarity</span>
              <h2 id="consultation-why-title">Why This Consultation Exists</h2>
              <p>
                This consultation is designed to help us explore together your inner
                resources, interests, behavioral patterns, archetypal tendencies, and
                possible next steps.
              </p>
              <p>
                This is not about receiving ready-made advice. It is an individual
                process that helps you recognize your unique strengths and discover
                possible directions for moving forward.
              </p>
            </div>
            <aside className="consultation-highlight-card">
              <span className="consultation-highlight-card__line" aria-hidden="true" />
              <p>
                Sometimes the answers are not outside of us. Sometimes we simply need
                space to pause, observe ourselves, and notice what remains invisible
                in everyday life.
              </p>
            </aside>
          </div>
        </section>

        <section
          className="consultation-section consultation-section--soft"
          aria-labelledby="consultation-explore-title"
        >
          <div className="consultation-shell">
            <div className="consultation-section-heading">
              <span className="consultation-section-kicker">Exploration Areas</span>
              <h2 id="consultation-explore-title">
                During the Consultation We May Explore
              </h2>
            </div>
            <div className="compact-check-panel">
              <div className="compact-check-grid">
                {consultationExplorationItems.map((item) => (
                  <div className="compact-check-item" key={item}>
                    <span className="compact-check-marker" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="consultation-section consultation-section--outcomes"
          aria-labelledby="consultation-outcomes-title"
        >
          <div className="consultation-shell">
            <div className="consultation-section-heading consultation-section-heading--narrow">
              <span className="consultation-section-kicker">Outcomes</span>
              <h2 id="consultation-outcomes-title">What You Will Receive</h2>
              <p>
                The goal of the consultation is to help you leave with more clarity,
                self-awareness, and a better sense of possible next steps.
              </p>
            </div>
            <div className="outcome-grid">
              {consultationOutcomeItems.map((item, index) => (
                <article className="outcome-card" key={item}>
                  <div className="outcome-card__top">
                    <span className="consultation-outcome-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="outcome-card__label">
                      {consultationOutcomeLabels[index]}
                    </span>
                  </div>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="consultation-section consultation-section--soft"
          aria-labelledby="consultation-format-title"
        >
          <div className="consultation-shell">
            <div className="consultation-section-heading consultation-section-heading--narrow">
              <span className="consultation-section-kicker">Format</span>
              <h2 id="consultation-format-title">Consultation Format</h2>
            </div>
            <div className="format-strip">
              {consultationFormatItems.map((item) => (
                <article className="format-strip-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="consultation-section consultation-booking"
          id="booking-form"
          aria-labelledby="consultation-booking-title"
        >
          <div className="consultation-shell">
            <div className="consultation-section-heading consultation-section-heading--narrow">
              <span className="consultation-section-kicker">Booking</span>
              <h2 id="consultation-booking-title">Book a Consultation</h2>
              <p>
                Choose an available consultation time first. Then share a few
                details so the session can be more focused.
              </p>
            </div>

            <div className="consultation-booking-card">
              <div
                className="consultation-booking-tabs"
                role="tablist"
                aria-label="Consultation booking steps"
              >
                <button
                  className={`consultation-booking-tab ${activeBookingStep === "time" ? "is-active" : ""}`}
                  type="button"
                  role="tab"
                  id="booking-tab-time"
                  aria-selected={activeBookingStep === "time"}
                  aria-controls="booking-panel-time"
                  onClick={() => setActiveBookingStep("time")}
                >
                  Step 1 — Choose Time
                </button>
                <button
                  className={`consultation-booking-tab ${activeBookingStep === "details" ? "is-active" : ""}`}
                  type="button"
                  role="tab"
                  id="booking-tab-details"
                  aria-selected={activeBookingStep === "details"}
                  aria-controls="booking-panel-details"
                  onClick={() => setActiveBookingStep("details")}
                >
                  Step 2 — Details
                </button>
              </div>

              <p className="consultation-booking-progress" aria-hidden="true">
                1 Choose Time → 2 Details
              </p>

              {activeBookingStep === "time" ? (
                <div
                  className="consultation-booking-step"
                  id="booking-panel-time"
                  role="tabpanel"
                  aria-labelledby="booking-tab-time"
                >
                  <div className="consultation-step-heading">
                    <span className="consultation-step-number">Step 1</span>
                    <h3>Choose Your Time</h3>
                  </div>

                  <div className="calendar-preview-card">
                    <div className="calendar-preview-card__header">
                      <p>
                        Available consultation times will appear here through Google
                        Calendar. For now, this is a preview of the booking area.
                      </p>
                    </div>

                    <div className="calendar-preview-grid" aria-label="Preview consultation times">
                      {consultationPreviewAvailability.map((day) => (
                        <article className="calendar-preview-day" key={day.day}>
                          <h4>{day.day}</h4>
                          <div className="calendar-preview-slots">
                            {day.times.map((time) => (
                              <button
                                className="calendar-preview-slot"
                                key={`${day.day}-${time}`}
                                type="button"
                                disabled
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </article>
                      ))}
                    </div>

                    <button
                      className="calendar-preview-select-button"
                      type="button"
                      disabled={!GOOGLE_CALENDAR_BOOKING_URL}
                    >
                      Select time
                    </button>

                    <p className="calendar-preview-note">
                      Google Calendar integration coming soon. You will be able to choose
                      a real free time and receive a calendar invitation.
                    </p>

                    <div className="consultation-booking-actions consultation-booking-actions--end">
                      <button
                        className="questionnaire-primary-button"
                        type="button"
                        onClick={() => setActiveBookingStep("details")}
                      >
                        Continue to Details
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="consultation-booking-step"
                  id="booking-panel-details"
                  role="tabpanel"
                  aria-labelledby="booking-tab-details"
                >
                  <div className="consultation-step-heading">
                    <span className="consultation-step-number">Step 2</span>
                    <h3>Tell Me What You Want to Explore</h3>
                  </div>

                  <div className="consultation-form-card">
                    <p className="consultation-form-intro">
                      After choosing a time, share what you would like to explore during
                      the consultation.
                    </p>
                    <p className="consultation-form-helper">
                      For now, you can describe your preferred time in the message if
                      needed.
                    </p>
                    <form className="consultation-form" onSubmit={handleConsultationSubmit}>
                      <div className="consultation-form-grid consultation-form-grid--two">
                        <div className="consultation-field">
                          <label htmlFor="consultation-full-name">Full name</label>
                          <input
                            id="consultation-full-name"
                            name="fullName"
                            type="text"
                            required
                            placeholder="Your full name"
                            value={consultationFormValues.fullName}
                            onChange={(event) =>
                              handleConsultationFieldChange("fullName", event.target.value)
                            }
                          />
                        </div>

                        <div className="consultation-field">
                          <label htmlFor="consultation-email">Email</label>
                          <input
                            id="consultation-email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={consultationFormValues.email}
                            onChange={(event) =>
                              handleConsultationFieldChange("email", event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="consultation-form-grid consultation-form-grid--two">
                        <div className="consultation-field">
                          <label htmlFor="consultation-phone">Phone number</label>
                          <input
                            id="consultation-phone"
                            name="phone"
                            type="tel"
                            placeholder="Your phone number"
                            value={consultationFormValues.phone}
                            onChange={(event) =>
                              handleConsultationFieldChange("phone", event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="consultation-form-grid">
                        <div className="consultation-field">
                          <label htmlFor="consultation-purpose">Purpose of consultation</label>
                          <select
                            id="consultation-purpose"
                            name="purpose"
                            required
                            value={consultationFormValues.purpose}
                            onChange={(event) =>
                              handleConsultationFieldChange("purpose", event.target.value)
                            }
                          >
                            {consultationPurposeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="consultation-form-grid">
                        <div className="consultation-field">
                          <label htmlFor="consultation-description">
                            Short description — what question or topic would you like to
                            explore?
                          </label>
                          <textarea
                            id="consultation-description"
                            name="description"
                            required
                            rows={6}
                            placeholder="Write a few sentences about what you would like to understand, clarify, or explore during the consultation."
                            value={consultationFormValues.description}
                            onChange={(event) =>
                              handleConsultationFieldChange("description", event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="consultation-form__footer">
                        <p className="consultation-disclaimer">
                          This consultation is for self-discovery and personal development.
                          It is not a medical, psychological, or diagnostic service.
                        </p>
                        <div className="consultation-booking-actions">
                          <button
                            className="questionnaire-secondary-button"
                            type="button"
                            onClick={() => setActiveBookingStep("time")}
                          >
                            Back to Time Selection
                          </button>
                          <button className="questionnaire-primary-button" type="submit">
                            Send Consultation Details
                          </button>
                        </div>
                      </div>

                      {consultationSubmitted ? (
                        <p
                          className="consultation-success-message"
                          role="status"
                          aria-live="polite"
                        >
                          Thank you. Your consultation details have been prepared.
                          Calendar booking will be connected soon.
                        </p>
                      ) : null}
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="consultation-final-cta" aria-labelledby="consultation-cta-title">
          <div className="consultation-shell">
            <div className="consultation-final-card consultation-final-card--compact">
              <h2 id="consultation-cta-title">Not Sure Where to Begin?</h2>
              <p>
                If you are unsure what to ask, start with the Dream Code Map
                Questionnaire. It can help you reflect on your natural interests,
                motivations, strengths, blocks, and possible life direction before
                the consultation.
              </p>
              <div className="consultation-hero__actions consultation-hero__actions--center">
                <button
                  className="questionnaire-primary-button"
                  type="button"
                  onClick={() => navigateTo(questionnaireRoute)}
                >
                  Take the Questionnaire
                </button>
                <button
                  className="questionnaire-secondary-button"
                  type="button"
                  onClick={() => navigateTo(withBase(""))}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>

        {renderFooter()}
      </main>
    );
  }

  if (isRetreatPage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="retreat-hero" aria-labelledby="retreat-hero-title">
          <div className="retreat-shell">
            <div className="retreat-hero-card">
              <div className="retreat-hero__content">
                <span className="retreat-badge">Dream Code Map Retreat</span>
                <h1 id="retreat-hero-title" className="retreat-hero__title">
                  Pause. Listen. Discover Your Next Direction.
                </h1>
                <p className="retreat-hero__subtitle">
                  Step away from noise, routine, and constant movement to reconnect with
                  yourself from a different perspective.
                </p>
                <p className="retreat-hero__text">
                  Sometimes answers are not born from receiving more information. They
                  appear when we create space - away from noise, routine, and constant
                  movement.
                </p>
                <div className="retreat-hero__actions">
                  <button
                    className="questionnaire-primary-button"
                    type="button"
                    onClick={scrollToRetreatRegistration}
                  >
                    Register for Retreat
                  </button>
                  <button
                    className="questionnaire-secondary-button"
                    type="button"
                    onClick={() => navigateTo(questionnaireRoute)}
                  >
                    Start with Questionnaire
                  </button>
                </div>
                <p className="retreat-quiet-note">
                  Small-group experience | Reflection | Nature | Direction clarity
                </p>
              </div>

              <aside className="retreat-hero-panel" aria-label="Retreat at a glance">
                <span className="retreat-section-kicker">Retreat at a Glance</span>
                <h2>Retreat Format</h2>
                <ul className="retreat-glance-list">
                  <li>A few hours or a few days</li>
                  <li>Small-group experience</li>
                  <li>Nature and intentional space</li>
                  <li>Creative and reflective practices</li>
                  <li>Personal vision and next steps</li>
                </ul>
                <div className="retreat-hero-panel__reflection">
                  <p>
                    A retreat is not simply rest. It is a guided space to pause,
                    observe yourself, and notice what everyday life often hides.
                  </p>
                </div>
                <button
                  className="retreat-hero-panel__link"
                  type="button"
                  onClick={() => scrollToSection("retreat-upcoming-title")}
                >
                  View upcoming retreat
                </button>
              </aside>
            </div>
          </div>
        </section>

        <section className="retreat-section" id="retreat-overview" aria-labelledby="retreat-overview-title">
          <div className="retreat-shell">
            <div className="retreat-editorial">
              <div className="retreat-editorial__content">
                <div className="retreat-section-heading">
                  <span className="retreat-section-kicker">Intentional Space</span>
                  <h2 id="retreat-overview-title">What This Retreat Is</h2>
                </div>
                <div className="retreat-editorial__text">
                  <p>
                    Dream Code Map retreats are designed to help you step out of
                    everyday life for a few hours or a few days and reconnect with
                    yourself from a different perspective.
                  </p>
                  <p>
                    This is not simply rest. It is an experience that combines
                    self-discovery, archetype-based practices, creative exercises,
                    reflection, nature, intentional space, dialogue, and inner
                    observation.
                  </p>
                </div>
              </div>
              <aside className="retreat-foundation-card" aria-label="The experience combines">
                <h3>The Experience Combines</h3>
                <div className="retreat-tag-grid">
                  {retreatExperienceItems.map((item) => (
                    <span className="retreat-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="retreat-section retreat-section--soft"
          id="retreat-exploration"
          aria-labelledby="retreat-exploration-title"
        >
          <div className="retreat-shell">
            <div className="retreat-section-heading retreat-section-heading--exploration">
              <span className="retreat-section-kicker">Retreat Exploration</span>
              <h2 id="retreat-exploration-title">What We Explore During the Retreat</h2>
            </div>
            <div className="retreat-check-panel">
              <div className="retreat-check-grid">
                {retreatExploreItems.map((item) => (
                  <div className="retreat-check-item" key={item}>
                    <span className="retreat-check-marker" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="retreat-section" aria-labelledby="retreat-gains-title">
          <div className="retreat-shell">
            <div className="retreat-section-heading retreat-section-heading--narrow">
              <span className="retreat-section-kicker">Outcomes</span>
              <h2 id="retreat-gains-title">What You Will Gain</h2>
            </div>
            <div className="retreat-gain-grid">
              {retreatGainItems.map((item) => (
                <article className="retreat-gain-card" key={item.title}>
                  <span className="retreat-gain-card__label">{item.label}</span>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="retreat-section retreat-section--band"
          aria-labelledby="retreat-for-title"
        >
          <div className="retreat-shell">
            <div className="retreat-section-heading retreat-section-heading--wide">
              <span className="retreat-section-kicker">For Whom</span>
              <h2 id="retreat-for-title">Who This Retreat Is For</h2>
              <p>
                This experience may be especially valuable if you are looking for
                space, reflection, and a deeper connection with yourself.
              </p>
            </div>
            <div className="retreat-check-grid retreat-check-grid--simple">
              {retreatForItems.map((item) => (
                <div className="retreat-check-item" key={item}>
                  <span className="retreat-check-marker" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="retreat-section" aria-labelledby="retreat-upcoming-title">
          <div className="retreat-shell">
            <div className="retreat-section-heading retreat-section-heading--wide">
              <span className="retreat-section-kicker">Upcoming Retreat</span>
              <h2 id="retreat-upcoming-title">Upcoming Retreat</h2>
              <p>
                A calm, small-group retreat format is being prepared. Details for the
                next edition will be added here when confirmed.
              </p>
            </div>
            <div className="retreat-upcoming-card">
              <div className="retreat-upcoming-card__content">
                <div className="retreat-info-grid">
                  {upcomingRetreatInfo.map((item) => (
                    <article className="retreat-info-item" key={item.label}>
                      <span className="retreat-info-item__label">{item.label}</span>
                      <h3>{item.value}</h3>
                    </article>
                  ))}
                </div>
                <div className="retreat-upcoming-card__actions">
                  <button
                    className="questionnaire-primary-button"
                    type="button"
                    onClick={scrollToRetreatRegistration}
                  >
                    Register
                  </button>
                  <button
                    className="questionnaire-secondary-button"
                    type="button"
                    onClick={() => scrollToSection("retreat-overview")}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="retreat-section retreat-section--soft"
          id="retreat-registration"
          aria-labelledby="retreat-registration-title"
        >
          <div className="retreat-shell">
            <div className="retreat-section-heading retreat-section-heading--full">
              <span className="retreat-section-kicker">Registration</span>
              <h2 id="retreat-registration-title">How Registration Works</h2>
              <p>
                Choose your preferred retreat and complete a short registration form.
                Share what question, topic, or expectation you are bringing with you.
              </p>
              <p className="retreat-registration-note">
                Places are limited to preserve a small-group and more personal
                experience.
              </p>
            </div>

            <div className="retreat-form-card">
              <form className="retreat-form" onSubmit={handleRetreatSubmit}>
                <div className="retreat-form-grid retreat-form-grid--two">
                  <div className="retreat-field">
                    <label htmlFor="retreat-full-name">Full name</label>
                    <input
                      id="retreat-full-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={retreatFormValues.fullName}
                      onChange={(event) =>
                        handleRetreatFieldChange("fullName", event.target.value)
                      }
                    />
                  </div>

                  <div className="retreat-field">
                    <label htmlFor="retreat-email">Email</label>
                    <input
                      id="retreat-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={retreatFormValues.email}
                      onChange={(event) =>
                        handleRetreatFieldChange("email", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="retreat-form-grid retreat-form-grid--two">
                  <div className="retreat-field">
                    <label htmlFor="retreat-phone">Phone number</label>
                    <input
                      id="retreat-phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={retreatFormValues.phone}
                      onChange={(event) =>
                        handleRetreatFieldChange("phone", event.target.value)
                      }
                    />
                  </div>

                  <div className="retreat-field">
                    <label htmlFor="retreat-purpose">Purpose of participation</label>
                    <select
                      id="retreat-purpose"
                      name="purpose"
                      required
                      value={retreatFormValues.purpose}
                      onChange={(event) =>
                        handleRetreatFieldChange("purpose", event.target.value)
                      }
                    >
                      {retreatPurposeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="retreat-form-grid">
                  <div className="retreat-field">
                    <label htmlFor="retreat-expectations">
                      Special expectations or wishes
                    </label>
                    <textarea
                      id="retreat-expectations"
                      name="expectations"
                      rows={5}
                      placeholder="Write any expectations, needs, or wishes for the retreat experience."
                      value={retreatFormValues.expectations}
                      onChange={(event) =>
                        handleRetreatFieldChange("expectations", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="retreat-form-grid">
                  <div className="retreat-field">
                    <label htmlFor="retreat-description">
                      Short description - what question or topic are you bringing with
                      you?
                    </label>
                    <textarea
                      id="retreat-description"
                      name="description"
                      required
                      rows={6}
                      placeholder="Write a few sentences about what you would like to explore, understand, or clarify during the retreat."
                      value={retreatFormValues.description}
                      onChange={(event) =>
                        handleRetreatFieldChange("description", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="retreat-form__footer">
                  <button className="questionnaire-primary-button" type="submit">
                    Register for Retreat
                  </button>
                </div>

                {retreatSubmitted ? (
                  <p className="retreat-success-message" role="status" aria-live="polite">
                    Thank you. Your retreat registration request has been prepared. I
                    will contact you with more details when retreat dates are
                    confirmed.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section className="retreat-final-cta" aria-labelledby="retreat-cta-title">
          <div className="retreat-shell">
            <div className="retreat-final-card">
              <h2 id="retreat-cta-title">Begin With Reflection</h2>
              <p>
                If you are not sure whether a retreat is the right next step, begin
                with the Dream Code Map Questionnaire. It can help you reflect on your
                interests, motivations, strengths, blocks, and possible direction.
              </p>
              <div className="retreat-hero__actions retreat-hero__actions--center">
                <button
                  className="questionnaire-primary-button"
                  type="button"
                  onClick={() => navigateTo(questionnaireRoute)}
                >
                  Take the Questionnaire
                </button>
                <button
                  className="questionnaire-secondary-button"
                  type="button"
                  onClick={() => navigateTo(withBase(""))}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>

        {renderFooter()}
      </main>
    );
  }

  if (isContactPage) {
    return (
      <main className="page-shell">
        {renderNavbar()}

        <section className="lectures-contact" aria-labelledby="contact-page-title">
          <div className="lectures-shell">
            <div className="lectures-contact__card">
              <span className="lectures-badge">Dream Code Map Contact</span>
              <h1 id="contact-page-title" className="lectures-hero__title">
                Contact About Lectures
              </h1>
              <p className="lectures-hero__text">
                If you want to ask about the Dream Code Map lectures, the
                questionnaire, or the next steps in the program, use your current
                Dream Code contact channel to continue the conversation.
              </p>
              <div className="lectures-hero__actions">
                <button
                  className="questionnaire-primary-button"
                  type="button"
                  onClick={() => navigateTo(questionnaireRoute)}
                >
                  Start with Questionnaire
                </button>
                <button
                  className="questionnaire-secondary-button"
                  type="button"
                  onClick={() => navigateTo(withBase(""))}
                >
                  Back to Home
                </button>
              </div>
              <p className="lectures-quiet-note">
                Dream Code Map focuses on self-discovery, personal development, and
                clearer direction. It is not a medical or diagnostic service.
              </p>
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

        <div className="section-shell" id="journey">
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
            <button
              className="journey-step-card"
              type="button"
              onClick={() => navigateTo(consultationRoute)}
            >
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/consultation_image.png")}
                alt="Consultation"
              />
              <span className="journey-step-card__label">Consultation</span>
            </button>
            <button
              className="journey-step-card"
              type="button"
              onClick={() => navigateTo(lecturesRoute)}
            >
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/lectures_image.png")}
                alt="Lectures"
              />
              <span className="journey-step-card__label">Lectures</span>
            </button>
            <button
              className="journey-step-card"
              type="button"
              onClick={() => navigateTo(retreatRoute)}
            >
              <img
                className="journey-step-card__icon"
                src={withBase("images/home_images/retreat_image.png")}
                alt="Retreat"
              />
              <span className="journey-step-card__label">Retreat</span>
            </button>
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
