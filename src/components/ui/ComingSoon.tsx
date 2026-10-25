import { Link } from "react-router";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type ComingSoonProps = {
  title: string;
  description: string;
  icon: IconName;
  items: string[];
  label: string;
};

export function ComingSoon({
  title,
  description,
  icon,
  items,
  label,
}: ComingSoonProps) {
  return (
    <section
      className="placeholder-section container"
      aria-labelledby="page-title"
    >
      <Link className="back-link" to="/">
        <Icon name="arrow" className="flip-arrow" />
        العودة إلى الرئيسية
      </Link>
      <div className="placeholder-card">
        <div className="placeholder-content">
          <span className="eyebrow">{label}</span>
          <div className="coming-badge">
            <span className="status-dot" />
            قريبًا
          </div>
          <h1 id="page-title">{title}</h1>
          <p className="placeholder-description">{description}</p>
          <p className="placeholder-notice">
            نعمل على هذه الميزة ضمن المراحل القادمة. هذه الصفحة للتعريف بها، وهي
            غير متاحة للاستخدام بعد.
          </p>
          <Link className="button button-primary" to="/">
            استكشف الصفحة الرئيسية
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="placeholder-preview">
          <span className="preview-icon">
            <Icon name={icon} />
          </span>
          <p className="preview-label">ما الذي يمكنك توقّعه؟</p>
          <ul>
            {items.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
          <span className="preview-caption">تصوّر للميزة القادمة</span>
        </div>
      </div>
    </section>
  );
}
