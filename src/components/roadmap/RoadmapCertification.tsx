import { certifications } from "../../data/certifications";
import { providers } from "../../data/providers";
import { levelLabels } from "../../data/types";
import type { RoadmapCertificationOption } from "../../types/roadmap";

export function RoadmapCertification({
  option,
  alternative = false,
}: {
  option: RoadmapCertificationOption;
  alternative?: boolean;
}) {
  const credential = certifications.find(
    (item) => item.id === option.certificationId,
  )!;
  const provider = providers.find((item) => item.id === credential.providerId)!;
  return (
    <article
      className="roadmap-credential"
      aria-labelledby={`roadmap-${credential.id}`}
    >
      <p className="roadmap-option-label">
        {alternative ? "بديل اختياري بتركيز مختلف" : "خيار شهادة اختياري"}
        {option.futureGoal ? " · هدف مستقبلي" : ""}
      </p>
      <h4 id={`roadmap-${credential.id}`} lang="en" dir="ltr">
        {credential.name}
      </h4>
      <p className="roadmap-credential-meta">
        <bdi lang="en">{provider.name}</bdi> · {levelLabels[credential.level]}
      </p>
      <p>{option.reasonAr}</p>
      <details>
        <summary>متطلبات وتنبيهات قبل التسجيل</summary>
        <p>{option.warningAr}</p>
        <p>
          {credential.prerequisitesAr ??
            "المتطلبات غير موثقة بالكامل هنا؛ راجع الجهة المانحة."}
        </p>
        {credential.notesAr && <p>{credential.notesAr}</p>}
        <p>
          سعر الاختبار غير مؤكد في الدليل. راجع السعر وإصدار الاختبار لدى الجهة.
          آخر تحقق:{" "}
          <time dateTime={credential.lastVerifiedAt!} dir="ltr">
            {credential.lastVerifiedAt}
          </time>
          .
        </p>
      </details>
      {option.futureGoal && (
        <p className="roadmap-warning">
          هدف لاحق بعد الممارسة والخبرة. تحقق من شروط الخبرة والشهادات السابقة؛
          تقييمك الشخصي لا يثبت الأهلية.
        </p>
      )}
      <a
        className="official-link"
        href={credential.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`الموقع الرسمي — ${credential.name} (يفتح في تبويب جديد)`}
      >
        الموقع الرسمي <span aria-hidden="true">↗</span>
        <span className="sr-only"> (يفتح في تبويب جديد)</span>
      </a>
    </article>
  );
}
