import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CertificationCard } from "../components/certifications/CertificationCard";
import { Icon } from "../components/ui/Icon";
import { certifications } from "../data/certifications";
import { providers } from "../data/providers";
import { careerTracks } from "../data/careerTracks";
import { credentialTypeLabels } from "../data/types";
import { getVisibleCertifications } from "../data/catalogSearch";
import "../styles/catalog.css";

export default function CertificationsPage() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTrack = searchParams.get("track") ?? "";
  const selectedTrack = careerTracks.some(
    (track) => track.id === requestedTrack,
  )
    ? requestedTrack
    : "";
  const visibleCertifications = getVisibleCertifications(
    certifications,
    providers,
    careerTracks,
    query,
    selectedTrack,
  );
  const includedTypes = [
    ...new Set(certifications.map((record) => record.type)),
  ];
  return (
    <div className="catalog-page">
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="container">
          <Link className="back-link" to="/">
            <Icon name="arrow" className="flip-arrow" />
            العودة إلى الرئيسية
          </Link>
          <div className="catalog-intro">
            <div>
              <span className="eyebrow">
                <span className="status-dot" />
                معرفة أوضح، قبل خطوتك التالية
              </span>
              <h1 id="catalog-title">استكشف الشهادات الاحترافية</h1>
              <p>
                تعرّف على الشهادات والمسارات التعليمية من جهات موثوقة، واكتشف
                الخيارات التي تساعدك على تطوير مهاراتك المهنية.
              </p>
            </div>
            <div className="catalog-summary" aria-label="ملخص الدليل">
              <Icon name="book" />
              <strong>
                {certifications.length}
                <span>شهادة في الدليل</span>
              </strong>
              <p>
                {providers.length} جهة مانحة · {careerTracks.length} مجالًا
                تقنيًا
              </p>
            </div>
          </div>
          <div className="catalog-scope">
            <Icon name="path" />
            <p>
              دليل للاطّلاع، وليس توصية شخصية. اختر ما تريد التعرّف عليه، وراجع
              تفاصيله لدى الجهة المانحة.
            </p>
          </div>
        </div>
      </section>
      <section
        className="container catalog-content"
        aria-label="قائمة الشهادات"
      >
        <div className="catalog-section-heading">
          <div>
            <span className="eyebrow">من المصادر الرسمية</span>
            <h2>خيارات تستحق أن تتعرّف عليها</h2>
          </div>
          <span
            className="catalog-count"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {visibleCertifications.length} من {certifications.length} مؤهلًا
          </span>
        </div>
        <p className="catalog-level-note">
          المجالات والمستوى الإرشادي تصنيف مساري استنادًا إلى نطاق الشهادة وخبرة
          المرشح الموصى بها؛ وليسا ترتيبًا للشهادات أو تقييمًا لصعوبة الاختبار.
        </p>
        <div className="catalog-controls">
          <div>
            <label htmlFor="credential-search">ابحث في الدليل</label>
            <input
              id="credential-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="اسم الشهادة أو الجهة أو مهارة مثل SQL"
            />
          </div>
          <div>
            <label htmlFor="credential-track">المجال المهني</label>
            <select
              id="credential-track"
              value={selectedTrack}
              onChange={(event) => {
                const next = new URLSearchParams(searchParams);
                if (event.target.value) next.set("track", event.target.value);
                else next.delete("track");
                setSearchParams(next, { replace: true });
              }}
            >
              <option value="">جميع المجالات</option>
              {careerTracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.nameAr}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="catalog-grid">
          {visibleCertifications.map((certification) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
            />
          ))}
        </div>
        {visibleCertifications.length === 0 && (
          <div className="catalog-empty">
            <Icon name="book" />
            <h3>لم نعثر على نتائج مطابقة</h3>
            <p>جرّب اسمًا أو مهارة أخرى، أو اختر جميع المجالات.</p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setQuery("");
                setSearchParams({});
              }}
            >
              مسح البحث والمجال
            </button>
          </div>
        )}
      </section>
      <aside
        className="container catalog-guidance"
        aria-labelledby="credential-guide-title"
      >
        <div>
          <Icon name="shield" />
          <h2 id="credential-guide-title">اعرف نوع المؤهل، قبل أن تختار</h2>
        </div>
        <p>
          <strong>الشهادة الاحترافية</strong> تقيس كفايات باختبار من الجهة
          المانحة. <strong>شهادة إتمام الدورة</strong> توثق إنهاء تدريب، و
          <strong>الشارة الرقمية</strong> قد توثق مهارة أو إنجازًا؛ لا تُعدّ
          الأنواع متكافئة، ولا تعني الشارة وحدها شهادة احترافية. الأنواع
          الموجودة حاليًا في الدليل:{" "}
          {includedTypes.map((type) => credentialTypeLabels[type]).join("، ")}.
        </p>
        <p>
          الأسعار المحلية غير موثقة في هذا الإصدار ولا نعرضها كتكلفة سعودية أو
          كشهادات مجانية. تحقّق من السعر والضرائب وإصدار الاختبار والمتطلبات قبل
          التسجيل. التحقق مراجعة بتاريخ محدد، وليس تحديثًا مباشرًا.
        </p>
      </aside>
    </div>
  );
}
