import type {
  Certification,
  CertificationProvider,
  CareerTrackInfo,
} from "./types.ts";
import { skills } from "./skills.ts";

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("ar")
    .normalize("NFKC")
    .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .trim();
}

/** A small client-side catalog filter, not a ranking or recommendation engine. */
export function getVisibleCertifications(
  records: Certification[],
  providers: CertificationProvider[],
  tracks: CareerTrackInfo[],
  query: string,
  trackId: string,
): Certification[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return records.filter((record) => {
    if (trackId && !record.tracks.some((id) => id === trackId)) return false;
    const provider = providers.find((item) => item.id === record.providerId);
    const skillNames = skills
      .filter((skill) => record.skillIds.includes(skill.id))
      .flatMap((skill) => [skill.nameAr, skill.nameEn]);
    const trackNames = tracks
      .filter((track) => record.tracks.includes(track.id))
      .flatMap((track) => [track.nameAr, track.nameEn]);
    const text = normalize(
      [
        record.name,
        record.code ?? "",
        record.descriptionAr,
        provider?.name ?? "",
        ...trackNames,
        ...skillNames,
      ].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
