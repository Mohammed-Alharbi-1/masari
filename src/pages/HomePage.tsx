import { Link } from "react-router";
import { SavedRoadmapNotice } from "../components/roadmap/SavedRoadmapNotice";
import { Icon } from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { careerTracks } from "../data/careerTracks";
import { learningResources } from "../data/learningResources";
import type { CareerTrack } from "../data/types";
import "../styles/progress.css";

const directionStyles: Record<CareerTrack, { icon: IconName; color: string }> =
  {
    "web-development": { icon: "code", color: "mint" },
    "software-development": { icon: "code", color: "mint" },
    cybersecurity: { icon: "shield", color: "peach" },
    networking: { icon: "network", color: "blue" },
    "cloud-computing": { icon: "cloud", color: "lilac" },
    devops: { icon: "path", color: "lilac" },
    "data-analytics": { icon: "target", color: "blue" },
    "artificial-intelligence": { icon: "spark", color: "lilac" },
    "database-administration": { icon: "network", color: "blue" },
    "it-support": { icon: "book", color: "peach" },
    "software-testing": { icon: "check", color: "mint" },
  };
const previewStages = [
  {
    number: "01",
    label: "ابنِ الأساس",
    title: "افهم كيف يبدأ الويب",
    skills: ["HTML", "CSS", "JavaScript"],
    task: "صفحة بسيطة تصنعها بنفسك",
    icon: "code" as const,
  },
  {
    number: "02",
    label: "تعلّم بالتطبيق",
    title: "حوّل الفكرة إلى مشروع",
    skills: ["React", "REST APIs", "Git"],
    task: "تطبيق صغير قابل للاستخدام",
    icon: "path" as const,
  },
  {
    number: "03",
    label: "تعمّق بالتدريج",
    title: "اختبر، حسّن، وطوّر",
    skills: ["Testing", "Architecture"],
    task: "جودة أفضل، وفهم أعمق",
    icon: "target" as const,
  },
];
const steps = [
  {
    title: "ابدأ بما يهمّك",
    text: "أربع خطوات عن دراستك ومهاراتك والمجال اللي يثير فضولك.",
    icon: "target" as const,
  },
  {
    title: "شوف الصورة كاملة",
    text: "مهارات مرتبة، مصادر تساعدك، ومشروع عملي في كل مرحلة.",
    icon: "path" as const,
  },
  {
    title: "خلّ التعلّم يصير تطبيق",
    text: "سجّل الأنشطة اللي أنهيتها، وارجع لخطوتك التالية متى حبيت.",
    icon: "check" as const,
  },
];
const featuredResources = [
  "elzero-javascript-ar",
  "react-quick-start",
  "github-introduction",
].map((id) => learningResources.find((resource) => resource.id === id)!);

function PathIllustration() {
  return (
    <figure className="product-visual" aria-labelledby="preview-caption">
      <div
        className="product-canvas"
        role="img"
        aria-label="مثال توضيحي لخارطة تعلم تطوير الويب: أساسيات، مشروع تطبيقي، ثم تحسين الجودة. ليس توصية شخصية أو سجل إنجاز."
      >
        <div className="preview-orbit" aria-hidden="true" />
        <div className="preview-window" aria-hidden="true">
          <div className="preview-window-bar">
            <span className="preview-brand">
              <Icon name="path" /> خارطة تعلّمك
            </span>
            <span className="preview-window-label">مثال · تطوير الويب</span>
            <span className="preview-dots">● ● ●</span>
          </div>
          <div className="preview-intro">
            <div>
              <small>من فكرة، إلى شيء تصنعه</small>
              <strong>كل مرحلة تفتح لك الخطوة اللي بعدها.</strong>
            </div>
            <span className="preview-stage-count">3 مراحل</span>
          </div>
          <div className="preview-stage-grid">
            {previewStages.map((stage) => (
              <div className="preview-stage" key={stage.number}>
                <div className="preview-stage-top">
                  <span className="preview-number">{stage.number}</span>
                  <Icon name={stage.icon} />
                </div>
                <small>{stage.label}</small>
                <h2>{stage.title}</h2>
                <div className="preview-skills">
                  {stage.skills.map((skill) => (
                    <bdi lang="en" key={skill}>
                      {skill}
                    </bdi>
                  ))}
                </div>
                <p>
                  <Icon name="book" />
                  {stage.task}
                </p>
              </div>
            ))}
          </div>
          <div className="preview-footer">
            <span>
              <Icon name="shield" /> الشهادات خيارات، والممارسة هي الأساس
            </span>
            <span>
              خطوة بخطوة <Icon name="arrow" />
            </span>
          </div>
        </div>
        <div
          className="preview-float preview-float-resources"
          aria-hidden="true"
        >
          <span className="preview-float-icon">
            <Icon name="book" />
          </span>
          <span>
            مصادر تبدأ فيها<strong>بالعربي والإنجليزي</strong>
          </span>
        </div>
        <div className="preview-float preview-float-choice" aria-hidden="true">
          <Icon name="check" />
          <span>
            مجالك باختيارك.<strong>والبداية على مهلك.</strong>
          </span>
        </div>
      </div>
      <figcaption id="preview-caption">
        رسم توضيحي فقط. نبني خارطتك الفعلية بعد إجاباتك، دون افتراض أهلية أو
        إنجاز.
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  return (
    <>
      <SavedRoadmapNotice />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              <span className="status-dot" /> مسارك في التقنية، يبدأ من هنا
            </span>
            <h1>
              طموحك يستحق
              <br />
              <span className="headline-accent">مسارًا أوضح.</span>
            </h1>
            <p className="hero-description">
              اكتشف المجالات والشهادات، وابنِ خارطة للمهارات والمصادر المجانية.
              تعلّم، طبّق، وتابع خطوتك التالية — بدون حساب.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/questionnaire">
                اكتشف مسارك الآن <Icon name="arrow" />
              </Link>
              <Link className="button button-secondary" to="/certifications">
                استعرض الشهادات
              </Link>
            </div>
            <p className="phase-note">
              <Icon name="shield" /> بياناتك تبقى في متصفحك. والحفظ على الجهاز
              باختيارك.
            </p>
          </div>
          <PathIllustration />
        </div>
      </section>
      <section className="section how-section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-heading story-heading" data-story>
            <span className="eyebrow">فكرة بسيطة. أثرها في خطوتك.</span>
            <h2 id="how-title">
              من أول سؤال،
              <br />
              <span>إلى شيء تتعلّمه.</span>
            </h2>
            <p>مو لازم تعرف كل شيء اليوم. يكفي تبدأ من مكان يناسبك.</p>
          </div>
          <ol className="steps-grid" data-step-group>
            {steps.map((step, index) => (
              <li className="step" key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <Icon name={step.icon} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="section directions-section"
        aria-labelledby="directions-title"
      >
        <div className="container">
          <div className="section-heading split-heading" data-story>
            <div>
              <span className="eyebrow">مساحة للاستكشاف</span>
              <h2 id="directions-title">
                {careerTracks.length} مجالًا.
                <br />
                <span>والاختيار يبدأ بفضولك.</span>
              </h2>
            </div>
            <p>
              تعرّف على كل مجال وشهاداته. اختيارك المهني مستقل عن تخصصك، وما فيه
              مسار واحد يناسب الجميع.
            </p>
          </div>
          <div
            className="directions-grid directions-grid-expanded"
            data-career-group
          >
            {careerTracks.map((direction, index) => (
              <article
                className={`direction-card ${directionStyles[direction.id].color}`}
                key={direction.id}
              >
                <div className="direction-top">
                  <span className="direction-icon">
                    <Icon name={directionStyles[direction.id].icon} />
                  </span>
                  <span className="direction-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="direction-english" lang="en" dir="ltr">
                  {direction.nameEn}
                </span>
                <h3>{direction.nameAr}</h3>
                <p>{direction.descriptionAr}</p>
                <Link
                  className="direction-bottom direction-catalog-link"
                  to={`/certifications?track=${direction.id}`}
                  aria-label={`استعرض شهادات ${direction.nameAr}`}
                >
                  استعرض شهادات المجال <Icon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="home-roadmap-story"
        aria-labelledby="journey-story-title"
      >
        <div className="container journey-story-grid">
          <div className="journey-story-copy" data-story>
            <span className="eyebrow">أقل حيرة. خطوة أوضح.</span>
            <h2 id="journey-story-title">
              ثلاث مراحل.
              <br />
              وتفاصيل <em>تناسبك.</em>
            </h2>
            <p>
              ابدأ بالمهارات اللي تحتاجها، واربط التعلّم بمشروع. كل اقتراح له
              سبب، وكل شهادة خيار تفكر فيه بعد الممارسة.
            </p>
            <Link className="button button-lime" to="/questionnaire">
              ابنِ خارطتك <Icon name="arrow" />
            </Link>
            <small>تقييمك الشخصي ما يُعدّ إثبات كفاءة أو ضمانًا لوظيفة.</small>
          </div>
          <ol className="story-stage-stack" data-story-stack>
            {previewStages.map((stage) => (
              <li key={stage.number}>
                <span>{stage.number}</span>
                <div>
                  <small>{stage.label}</small>
                  <h3>{stage.title}</h3>
                  <p>{stage.task}</p>
                </div>
                <Icon name={stage.icon} />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="section home-resources-section"
        aria-labelledby="home-resources-title"
      >
        <div className="container">
          <div className="section-heading split-heading" data-story>
            <div>
              <span className="eyebrow">افتح مصدرًا. وابدأ تتعلّم.</span>
              <h2 id="home-resources-title">
                المعرفة أقرب
                <br />
                <span>مما تتخيّل.</span>
              </h2>
            </div>
            <div>
              <p>
                {learningResources.length} مصدرًا مجانيًا للوصول. نختار المناسب
                منها لمهارات خارطتك، مع توضيح اللغة والحساب المطلوب.
              </p>
              <p className="resource-preview-disclaimer">
                هذه أمثلة من المكتبة، وليست توصيات شخصية أو اختبارات اعتماد
                مجانية.
              </p>
            </div>
          </div>
          <div className="resource-preview-grid" data-resource-group>
            {featuredResources.map((resource) => (
              <article className="resource-preview" key={resource.id}>
                <span className="resource-preview-language">
                  {resource.language === "ar" ? "بالعربي" : "بالإنجليزي"}{" "}
                  <Icon name="book" />
                </span>
                <h3 lang={resource.language} dir="auto">
                  {resource.title}
                </h3>
                <p className="resource-preview-provider">
                  <bdi>{resource.provider}</bdi>
                </p>
                <p>{resource.descriptionAr}</p>
                <p className="resource-preview-note">
                  {resource.freeAccessNoteAr}
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`افتح المصدر التوضيحي — ${resource.title} (يفتح في تبويب جديد)`}
                >
                  افتح المصدر <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-section">
        <div className="container closing-card" data-story>
          <div>
            <span className="eyebrow">كل مسار، يبدأ باختيار</span>
            <h2>
              خلّ خطوتك الجاية
              <br />
              <span>أوضح من اليوم.</span>
            </h2>
            <p>بدون حساب. وبدون وعود مبالغ فيها. بداية تبني عليها.</p>
          </div>
          <Link className="button button-lime" to="/questionnaire">
            اكتشف مسارك الآن <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
