import {
  careerTrackIds,
  certificationLevels,
  credentialTypes,
  certificationStatuses,
  verificationStatuses,
  roadmapStages,
} from "./types.ts";
import type {
  Certification,
  CertificationProvider,
  CareerTrackInfo,
  Skill,
  CareerRoadmapTemplate,
} from "./types.ts";

/** Internal consistency only. Editorial verification still requires reading the issuer. */
export function validateCatalog(
  records: Certification[],
  providers: CertificationProvider[],
  tracks: CareerTrackInfo[],
  skills: Skill[],
  templates: CareerRoadmapTemplate[],
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
  unique(
    skills.map((skill) => skill.id),
    "skill",
  );
  unique(
    templates.map((template) => template.trackId),
    "roadmap",
  );
  for (const skill of skills) {
    if (!nonempty(skill.nameAr) || !nonempty(skill.nameEn))
      errors.push(`skill ${skill.id}: missing display name`);
    if (
      !skill.tracks.length ||
      skill.tracks.some((id) => !tracks.some((track) => track.id === id))
    )
      errors.push(`skill ${skill.id}: invalid career track`);
    if (new Set(skill.tracks).size !== skill.tracks.length)
      errors.push(`skill ${skill.id}: duplicate career track`);
  }
  for (const track of tracks) {
    if (!careerTrackIds.includes(track.id))
      errors.push(`track: unsupported ID ${track.id}`);
    if (
      !nonempty(track.nameAr) ||
      !nonempty(track.nameEn) ||
      !nonempty(track.descriptionAr)
    )
      errors.push(`track ${track.id}: missing content`);
    if (
      !track.skillIds.length ||
      track.skillIds.some(
        (id) =>
          !skills.some(
            (skill) => skill.id === id && skill.tracks.includes(track.id),
          ),
      )
    )
      errors.push(`track ${track.id}: invalid skill reference`);
    if (new Set(track.skillIds).size !== track.skillIds.length)
      errors.push(`track ${track.id}: duplicate skill reference`);
    if (
      skills.some(
        (skill) =>
          skill.tracks.includes(track.id) && !track.skillIds.includes(skill.id),
      )
    )
      errors.push(`track ${track.id}: incomplete skill references`);
    if (!templates.some((template) => template.trackId === track.id))
      errors.push(`track ${track.id}: missing roadmap template`);
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
      !record.skillIds.length ||
      record.skillIds.some((id) => !skills.some((skill) => skill.id === id))
    )
      fail("invalid certification skill reference");
    if (new Set(record.skillIds).size !== record.skillIds.length)
      fail("duplicate skill reference");
    if (
      record.skillIds.some((id) => {
        const skill = skills.find((item) => item.id === id);
        return (
          skill &&
          !skill.tracks.some((trackId) => record.tracks.includes(trackId))
        );
      })
    )
      fail("skill does not match any credential track");
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
  for (const template of templates) {
    const fail = (message: string) =>
      errors.push(`roadmap ${template.trackId}: ${message}`);
    if (!tracks.some((track) => track.id === template.trackId))
      fail("invalid career track");
    if (
      template.stages.length !== 3 ||
      template.stages.some(
        (stage, index) => stage.stage !== roadmapStages[index],
      )
    )
      fail("needs three ordered stages");
    for (const stage of template.stages) {
      if (
        !nonempty(stage.titleAr) ||
        !nonempty(stage.descriptionAr) ||
        !nonempty(stage.practicalMilestoneAr)
      )
        fail("missing stage content or practical milestone");
      if (
        !stage.skillIds.length ||
        stage.skillIds.some(
          (id) =>
            !skills.some(
              (skill) =>
                skill.id === id && skill.tracks.includes(template.trackId),
            ),
        )
      )
        fail("invalid stage skill reference");
      if (new Set(stage.skillIds).size !== stage.skillIds.length)
        fail("duplicate stage skill reference");
      if (
        new Set(stage.suggestedCertificationIds).size !==
        stage.suggestedCertificationIds.length
      )
        fail("duplicate suggested credential");
      if (stage.certificationChoice !== "optional-options")
        fail("suggestions must be optional");
      if (stage.futureGoal !== (stage.stage === "advanced"))
        fail("advanced stages must be future goals");
      for (const id of stage.suggestedCertificationIds) {
        const credential = records.find((record) => record.id === id);
        if (!credential) {
          fail("invalid suggested certification reference");
          continue;
        }
        if (
          credential.status !== "active" ||
          credential.verificationStatus !== "verified"
        )
          fail("suggested credential must be verified and active");
        if (!credential.tracks.includes(template.trackId))
          fail("suggested credential does not match track");
        if (credential.level === "advanced" && stage.stage !== "advanced")
          fail("advanced credential must remain a future goal");
        if (stage.stage === "foundation" && credential.level !== "beginner")
          fail("foundation suggestion must be foundational");
        if (
          !credential.skillIds.some((skillId) =>
            stage.skillIds.includes(skillId),
          )
        )
          fail("suggested credential has no stage skill overlap");
      }
    }
  }
  return errors;
}
