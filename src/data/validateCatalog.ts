import {
  careerTrackIds,
  certificationLevels,
  credentialTypes,
  certificationStatuses,
  verificationStatuses,
} from "./types.ts";
import type {
  Certification,
  CertificationProvider,
  CareerTrackInfo,
} from "./types.ts";

/** Internal consistency only. Editorial verification still requires reading the issuer. */
export function validateCatalog(
  records: Certification[],
  providers: CertificationProvider[],
  tracks: CareerTrackInfo[],
  today = new Date().toISOString().slice(0, 10),
): string[] {
  const errors: string[] = [];
  const nonempty = (value: unknown) =>
    typeof value === "string" && value.trim().length > 0;
  const unique = (values: string[], kind: string) => {
    const seen = new Set<string>();
    for (const id of values) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
        errors.push(`${kind}: invalid ID ${id}`);
      if (seen.has(id)) errors.push(`${kind}: duplicate ID ${id}`);
      seen.add(id);
    }
  };
  const httpsUrl = (value: string): URL | null => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password
        ? url
        : null;
    } catch {
      return null;
    }
  };
  const issuerUrl = (value: string, provider: CertificationProvider) => {
    const url = httpsUrl(value);
    return (
      url !== null &&
      provider.sourceDomains.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith(`.${domain}`),
      )
    );
  };

  unique(
    records.map((record) => record.id),
    "certification",
  );
  unique(
    providers.map((provider) => provider.id),
    "provider",
  );
  unique(
    tracks.map((track) => track.id),
    "track",
  );
  for (const track of tracks) {
    if (!careerTrackIds.includes(track.id))
      errors.push(`track: unsupported ID ${track.id}`);
    if (
      !nonempty(track.nameAr) ||
      !nonempty(track.nameEn) ||
      !nonempty(track.descriptionAr)
    )
      errors.push(`track ${track.id}: missing content`);
  }
  for (const id of careerTrackIds) {
    if (!tracks.some((track) => track.id === id))
      errors.push(`track: missing ${id}`);
  }
  for (const provider of providers) {
    if (!nonempty(provider.name))
      errors.push(`provider ${provider.id}: empty name`);
    if (
      !provider.sourceDomains.length ||
      provider.sourceDomains.some(
        (domain) => !/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/.test(domain),
      )
    )
      errors.push(`provider ${provider.id}: invalid source domains`);
    if (!issuerUrl(provider.officialWebsite, provider))
      errors.push(`provider ${provider.id}: invalid official website`);
  }
  const credentialIdentities = new Set<string>();
  for (const record of records) {
    const fail = (message: string) => errors.push(`${record.id}: ${message}`);
    const provider = providers.find(
      (candidate) => candidate.id === record.providerId,
    );
    if (!provider) fail("unknown provider");
    if (!nonempty(record.name)) fail("empty name");
    if (
      !nonempty(record.descriptionAr) ||
      !/[\u0600-\u06ff]/.test(record.descriptionAr)
    )
      fail("missing Arabic description");
    const identity = `${record.providerId}:${record.name.trim().toLowerCase()}`;
    if (credentialIdentities.has(identity))
      fail("duplicate credential name for provider");
    credentialIdentities.add(identity);
    if (
      !record.tracks.length ||
      record.tracks.some((id) => !tracks.some((track) => track.id === id))
    )
      fail("invalid career track");
    if (new Set(record.tracks).size !== record.tracks.length)
      fail("duplicate career track");
    if (!credentialTypes.includes(record.type))
      fail("unsupported credential type");
    if (!certificationLevels.includes(record.level)) fail("unsupported level");
    if (!certificationStatuses.includes(record.status))
      fail("unsupported availability status");
    if (!verificationStatuses.includes(record.verificationStatus))
      fail("unsupported verification status");
    if (
      !record.skills.length ||
      record.skills.some((skill) => !nonempty(skill))
    )
      fail("empty skills");
    if (
      !httpsUrl(record.officialUrl) ||
      (provider && !issuerUrl(record.officialUrl, provider))
    )
      fail("official URL must be issuer HTTPS");
    if (
      record.sourceUrl &&
      (!httpsUrl(record.sourceUrl) ||
        (provider && !issuerUrl(record.sourceUrl, provider)))
    )
      fail("source URL must be issuer HTTPS");
    if (record.verificationStatus === "verified") {
      if (
        !record.sourceUrl ||
        !provider ||
        !issuerUrl(record.sourceUrl, provider)
      )
        fail("verified record needs an issuer source");
      const date = record.lastVerifiedAt;
      if (
        !date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date ||
        date > today
      )
        fail("verified record needs a valid non-future date");
    } else if (record.lastVerifiedAt !== null)
      fail("unverified record must not claim a verification date");
    if (record.examPrice !== null) {
      if (!Number.isFinite(record.examPrice) || record.examPrice < 0)
        fail("price must be finite and nonnegative");
      if (!record.currency || !/^[A-Z]{3}$/.test(record.currency))
        fail("numeric price needs a currency code");
    } else if (record.currency !== null)
      fail("unknown price must have null currency");
  }
  return errors;
}
