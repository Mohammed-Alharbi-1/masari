import { Link } from "react-router";
import { SavedRoadmapNotice } from "../components/roadmap/SavedRoadmapNotice";
import "../styles/progress.css";
import { Icon } from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { careerTracks } from "../data/careerTracks";
import type { CareerTrack } from "../data/types";

const directionStyles: Record<CareerTrack, { icon: IconName; color: string }> =
  {
    "web-development": { icon: "code", color: "mint" },
    cybersecurity: { icon: "shield", color: "peach" },
    networking: { icon: "network", color: "blue" },
    "cloud-computing": { icon: "cloud", color: "lilac" },
    "software-development": { icon: "code", color: "mint" },
    devops: { icon: "path", color: "lilac" },
    "data-analytics": { icon: "target", color: "blue" },
    "artificial-intelligence": { icon: "spark", color: "lilac" },
    "database-administration": { icon: "network", color: "blue" },
    "it-support": { icon: "book", color: "peach" },
    "software-testing": { icon: "check", color: "mint" },
  };
const directions = careerTracks.map((track, index) => ({
  ...track,
  ...directionStyles[track.id],
  number: String(index + 1).padStart(2, "0"),
}));

const steps = [
  {
    title: "عرّفنا على اهتماماتك",
    text: "أسئلة بسيطة عن دراستك، مهاراتك، والمجال اللي يهمك.",
    icon: "target" as const,
  },
  {
    title: "استلم خارطة واضحة",
    text: "ثلاث مراحل بأولويات مهارات ومشاريع وخيارات شهادات.",
    icon: "book" as const,
  },
  {
    title: "تعلّم وجرّب بنفسك",
    text: "ابدأ بمصدر مجاني، وطبّق اللي تتعلمه في مشروعك.",
    icon: "path" as const,
  },
];

function PathIllustration() {
  return (
    <div
      className="path-illustration"
      role="img"
      aria-label="رسم توضيحي لمسار يبدأ باكتشاف الاهتمامات ثم بناء المهارات وصولًا إلى الهدف، وليس توصية فعلية"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="illustration-star star-one">✳</span>
      <span className="illustration-star star-two">✦</span>
      <div className="path-board">
        <div className="board-header">
          <span className="board-logo">
            <Icon name="path" />
          </span>
          <span>
            من طموح… إلى مسار<span>كل رحلة عظيمة تبدأ بخطوة</span>
          </span>
          <span className="board-dots">•••</span>
        </div>
        <div className="board-track">
          <div className="track-line" />
          <div className="track-item">
            <span className="track-node">
              <Icon name="target" />
            </span>
            <div>
              <span className="track-label">نقطة البداية</span>
              <strong>اكتشف اهتماماتك</strong>
              <p>مسارك يبدأ بما يلهمك</p>
            </div>
            <span className="track-index">01</span>
          </div>
          <div className="track-item">
            <span className="track-node">
              <Icon name="code" />
            </span>
            <div>
              <span className="track-label">خطوتك التالية</span>
              <strong>ابنِ مهاراتك</strong>
              <p>أساس قوي، وخيارات أنسب</p>
            </div>
            <span className="track-index">02</span>
          </div>
          <div className="track-item track-final">
            <span className="track-node">
              <Icon name="spark" />
            </span>
            <div>
              <span className="track-label">وجهتك</span>
              <strong>اقترب من طموحك</strong>
              <p>تعلّم مستمر، ومستقبل أوضح</p>
            </div>
            <span className="track-index">03</span>
          </div>
        </div>
        <span className="board-caption">
          رسم توضيحي · خارطتك تبدأ باختياراتك
        </span>
      </div>
      <div className="floating-note">
        <span>
          <Icon name="check" />
        </span>
        <div>
          خطوة صغيرة اليوم<strong>تفتح لك آفاقًا جديدة</strong>
        </div>
      </div>
      <div className="illustration-bottom">
        <span />
        البداية لا تحتاج أن تعرف كل شيء
      </div>
    </div>
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
              <span className="status-dot" />
              طريقك في التقنية يبدأ بفهم اختياراتك
            </span>
            <h1>
              من اهتمامك،
              <br />
              إلى <span className="headline-accent">مسار واضح</span>
              <br />
              لمستقبلك<span className="headline-dot">.</span>
            </h1>
            <p className="hero-description">
              حدّد المجال اللي يهمك، وخذ خارطة تجمع المهارات والمصادر المجانية
              والمشاريع العملية. والشهادات؟ خيارات تفكر فيها، مو شرط لتبدأ.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/questionnaire">
                اكتشف مسارك الآن
                <Icon name="arrow" />
              </Link>
              <Link className="button button-secondary" to="/certifications">
                استعرض الشهادات
              </Link>
            </div>
            <p className="phase-note">
              <Icon name="spark" />
              مجاني للطلاب · بدون حساب · إجاباتك تبقى في متصفحك
            </p>
          </div>
          <PathIllustration />
        </div>
        <div className="container hero-foot">
          <span>{careerTracks.length} مجالًا تقنيًا</span>
          <span>3 مراحل واضحة · مهارات، مصادر، وتطبيق عملي</span>
          <span className="hero-foot-icon">
            <Icon name="path" />
          </span>
        </div>
      </section>

      <section className="section how-section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="eyebrow">الفكرة ببساطة</span>
            <h2 id="how-title">طريقك أوضح، في ثلاث خطوات</h2>
            <p>اختياراتك تحدد نقطة البداية. والممارسة تبني اللي بعدها.</p>
          </div>
          <ol className="steps-grid" data-reveal>
            {steps.map((step, index) => (
              <li className="step" key={step.title}>
                <div className="step-top">
                  <span className="step-number">0{index + 1}</span>
                  <span className="step-icon">
                    <Icon name={step.icon} />
                  </span>
                </div>
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
          <div className="section-heading split-heading" data-reveal>
            <div>
              <span className="eyebrow">أكثر من طريق لطموحك</span>
              <h2 id="directions-title">أي مجال يثير فضولك؟</h2>
              <p>
                {careerTracks.length} مجالًا تقنيًا لتتعرّف على الخيارات التي
                تثير اهتمامك.
              </p>
            </div>
            <span className="subtle-label">
              مجالات تقنية يغطيها الدليل
              <Icon name="spark" />
            </span>
          </div>
          <div className="directions-grid directions-grid-expanded">
            {directions.map((direction) => (
              <article
                className={`direction-card ${direction.color}`}
                data-reveal
                key={direction.id}
              >
                <div className="direction-top">
                  <span className="direction-icon">
                    <Icon name={direction.icon} />
                  </span>
                  <span className="direction-number">/{direction.number}</span>
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

      <section className="section why-section" aria-labelledby="why-title">
        <div className="container why-grid" data-reveal>
          <div className="why-intro">
            <span className="eyebrow">لماذا مساري؟</span>
            <h2 id="why-title">
              طموحك كبير.
              <br />
              والبداية تستحق الوضوح.
            </h2>
            <p>
              بين كثرة الشهادات وتعدد الخيارات، نريد أن نجعل خطوتك الأولى أبسط
              وأكثر وعيًا.
            </p>
            <span className="planned-label">
              <span className="status-dot" />
              إرشاد واضح، بدون وعود مبالغ فيها
            </span>
          </div>
          <div className="benefits-grid">
            <article>
              <Icon name="target" />
              <h3>أولويات تبدأ منك</h3>
              <p>مهارات تحتاجها، ومعرفة تبي تعمقها. كل اقتراح له سبب.</p>
            </article>
            <article>
              <Icon name="shield" />
              <h3>شهادات بقرار واعي</h3>
              <p>
                خيارات اختيارية بمراجعها ومتطلباتها، دون افتراض الأهلية أو
                السعر.
              </p>
            </article>
            <article>
              <Icon name="book" />
              <h3>مصادر تبدأ فيها الآن</h3>
              <p>دروس ومراجع مجانية للوصول، مرتبطة بمهارات خارطتك.</p>
            </article>
            <article>
              <Icon name="path" />
              <h3>معرفة تصير تطبيق</h3>
              <p>مشروع عملي في كل مرحلة، عشان تختبر فهمك وتبني خبرة.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="container closing-card" data-reveal>
          <span className="closing-symbol" aria-hidden="true">
            ✳
          </span>
          <div>
            <span className="eyebrow">المستقبل يبدأ بخطوة</span>
            <h2>
              خذ وقتك في الاكتشاف.
              <br />
              وابدأ من المكان المناسب لك.
            </h2>
            <p>خطوة بسيطة، ومنها تتضح لك نقطة البداية.</p>
          </div>
          <Link className="button button-lime" to="/questionnaire">
            اكتشف مسارك الآن
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
