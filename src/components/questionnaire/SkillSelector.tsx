import { useState } from "react";
import { skills } from "../../data/skills";
import type { CareerTrack } from "../../data/types";
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .trim();
}
export function SkillSelector({
  id,
  track,
  title,
  description,
  emptyLabel,
  selected,
  onChange,
  error,
}: {
  id: string;
  track: CareerTrack;
  title: string;
  description: string;
  emptyLabel: string;
  selected: string[];
  onChange: (ids: string[]) => void;
  error?: string;
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const relevant = skills.filter((skill) => skill.tracks.includes(track));
  const matching = relevant.filter((skill) =>
    normalize(`${skill.nameAr} ${skill.nameEn}`).includes(normalize(query)),
  );
  const visible = query.trim() || expanded ? matching : matching.slice(0, 12);
  function toggle(skillId: string) {
    onChange(
      selected.includes(skillId)
        ? selected.filter((item) => item !== skillId)
        : [...selected, skillId],
    );
  }
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      className="skill-selector"
      aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
      aria-invalid={!!error}
    >
      <legend>{title}</legend>
      <p id={`${id}-description`}>{description}</p>
      <div className="skill-toolbar">
        <span role="status">
          {selected.length} مهارات مختارة من {relevant.length}
        </span>
        <button
          type="button"
          className="questionnaire-text-button"
          onClick={() => onChange([])}
        >
          {emptyLabel}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="questionnaire-error">
          {error}
        </p>
      )}
      <label htmlFor={`${id}-search`} className="skill-search-label">
        ابحث عن مهارة بالعربي أو الإنجليزي
      </label>
      <input
        id={`${id}-search`}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="مثل اسم المهارة أو التقنية"
      />
      {selected.length > 0 && (
        <div className="skill-selected" aria-label="المهارات المختارة">
          {relevant
            .filter((skill) => selected.includes(skill.id))
            .map((skill) => (
              <button
                type="button"
                key={skill.id}
                onClick={() => toggle(skill.id)}
                aria-label={`إزالة ${skill.nameAr}`}
              >
                {skill.nameAr} <span aria-hidden="true">×</span>
              </button>
            ))}
        </div>
      )}
      <div className="skill-choices">
        {visible.map((skill) => (
          <label
            key={skill.id}
            className={selected.includes(skill.id) ? "is-selected" : ""}
          >
            <input
              type="checkbox"
              value={skill.id}
              checked={selected.includes(skill.id)}
              onChange={() => toggle(skill.id)}
            />
            <span>
              {skill.nameAr}
              <small lang="en" dir="ltr">
                {skill.nameEn}
              </small>
            </span>
          </label>
        ))}
      </div>
      {!matching.length && (
        <p role="status" className="questionnaire-notice">
          ما لقينا مهارة بهذا الاسم في مجالك. جرّب كلمة ثانية أو{" "}
          <button
            type="button"
            className="questionnaire-text-button"
            onClick={() => setQuery("")}
          >
            امسح البحث
          </button>
          .
        </p>
      )}
      {!query.trim() && matching.length > 12 && (
        <button
          className="questionnaire-text-button skill-show-more"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "عرض مهارات أقل" : `عرض كل المهارات (${matching.length})`}
        </button>
      )}
    </fieldset>
  );
}
