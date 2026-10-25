import { careerTracks } from "../../data/careerTracks";
import { providers } from "../../data/providers";
import {
  credentialTypeLabels,
  levelLabels,
  statusLabels,
  verificationLabels,
} from "../../data/types";
import type { Certification } from "../../data/types";
import { Icon } from "../ui/Icon";

export function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  const provider = providers.find(
    (item) => item.id === certification.providerId,
  );
  const tracks = careerTracks.filter((track) =>
    certification.tracks.includes(track.id),
  );
  return (
    <article
      className="certification-card"
      aria-labelledby={`credential-${certification.id}`}
    >
      <div className="certification-card-top">
        <span
          className="certification-icon"
          data-track={certification.tracks[0]}
        >
          <Icon name="book" />
        </span>
        <span
          className={`verification-badge ${certification.verificationStatus}`}
        >
          <Icon
            name={
              certification.verificationStatus === "verified"
                ? "check"
                : "target"
            }
          />
          {verificationLabels[certification.verificationStatus]}
        </span>
      </div>
      <p className="certification-provider">
        الجهة: <bdi lang="en">{provider?.name ?? "غير محددة"}</bdi>
      </p>
      <h3 id={`credential-${certification.id}`} lang="en" dir="ltr">
        {certification.name}
      </h3>
      <div className="certification-tracks" aria-label="المجالات">
        {tracks.map((track) => (
          <span key={track.id}>{track.nameAr}</span>
        ))}
      </div>
      <p className="certification-description">{certification.descriptionAr}</p>
      <dl className="certification-meta">
        <div>
          <dt>المستوى الإرشادي</dt>
          <dd>{levelLabels[certification.level]}</dd>
        </div>
        <div>
          <dt>نوع المؤهل</dt>
          <dd>{credentialTypeLabels[certification.type]}</dd>
        </div>
      </dl>
      <p className={`credential-availability ${certification.status}`}>
        <span className="status-dot" />
        {statusLabels[certification.status]}
      </p>
      {certification.notesAr && (
        <p className="certification-notice">
          <Icon name="spark" />
          {certification.notesAr}
        </p>
      )}
      <div className="certification-card-bottom">
        <span className="verification-date">
          آخر تحقق:{" "}
          {certification.lastVerifiedAt ? (
            <time dateTime={certification.lastVerifiedAt} dir="ltr">
              {certification.lastVerifiedAt}
            </time>
          ) : (
            "لم يُتحقق بعد"
          )}
        </span>
        <a
          className="official-link"
          href={certification.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`الموقع الرسمي — ${certification.name} (يفتح في تبويب جديد)`}
        >
          الموقع الرسمي
          <Icon name="arrow" />
          <span className="sr-only"> (يفتح في تبويب جديد)</span>
        </a>
      </div>
    </article>
  );
}
