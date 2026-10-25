import assert from "node:assert/strict";
import { certifications } from "../src/data/certifications.ts";
import { providers } from "../src/data/providers.ts";
import { careerTracks } from "../src/data/careerTracks.ts";
import { skills } from "../src/data/skills.ts";
import { roadmapTemplates } from "../src/data/roadmapTemplates.ts";
import { validateCatalog } from "../src/data/validateCatalog.ts";
import { getVisibleCertifications } from "../src/data/catalogSearch.ts";
import type {
  Certification,
  CareerTrack,
  CareerRoadmapStage,
} from "../src/data/types.ts";

const fixture = {
  records: certifications,
  providers,
  tracks: careerTracks,
  skills,
  templates: roadmapTemplates,
};
type Fixture = typeof fixture;
const validate = (data: Fixture) =>
  validateCatalog(
    data.records,
    data.providers,
    data.tracks,
    data.skills,
    data.templates,
  );
const errors = validate(fixture);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  let invalidChecks = 0;
  const reject = (mutate: (data: Fixture) => void, message: string) => {
    const data = structuredClone(fixture);
    mutate(data);
    assert.ok(
      validate(data).some((error) => error.includes(message)),
      message,
    );
    invalidChecks += 1;
  };
  const rejectRecord = (patch: Partial<Certification>, message: string) =>
    reject((data) => Object.assign(data.records[0], patch), message);
  rejectRecord({ providerId: "missing" }, "unknown provider");
  rejectRecord({ tracks: ["invalid" as CareerTrack] }, "invalid career track");
  rejectRecord({ name: " " }, "empty name");
  rejectRecord({ descriptionAr: " " }, "missing Arabic description");
  rejectRecord({ officialUrl: "http://github.com/" }, "issuer HTTPS");
  rejectRecord(
    { sourceUrl: "https://github.com.example.invalid/" },
    "issuer HTTPS",
  );
  rejectRecord({ sourceUrl: "" }, "issuer source");
  rejectRecord({ lastVerifiedAt: null }, "non-future date");
  rejectRecord({ lastVerifiedAt: "2099-01-01" }, "non-future date");
  rejectRecord({ lastVerifiedAt: "2026-02-30" }, "non-future date");
  rejectRecord({ verificationStatus: "pending" }, "must not claim");
  rejectRecord(
    { verificationStatus: "fake" as Certification["verificationStatus"] },
    "unsupported verification",
  );
  rejectRecord({ examPrice: -1, currency: "USD" }, "nonnegative");
  rejectRecord({ examPrice: 100, currency: null }, "currency code");
  rejectRecord({ examPrice: null, currency: "USD" }, "null currency");
  rejectRecord(
    { type: "fake" as Certification["type"] },
    "unsupported credential type",
  );
  rejectRecord(
    { level: "fake" as Certification["level"] },
    "unsupported level",
  );
  rejectRecord(
    { status: "fake" as Certification["status"] },
    "unsupported availability",
  );
  rejectRecord({ skillIds: ["missing-skill"] }, "invalid certification skill");
  rejectRecord({ skillIds: ["git", "git"] }, "duplicate skill reference");
  reject((data) => data.records.push(data.records[0]), "duplicate ID");
  reject((data) => data.providers.push(data.providers[0]), "duplicate ID");
  reject((data) => data.tracks.push(data.tracks[0]), "duplicate ID");
  reject((data) => data.skills.push(data.skills[0]), "duplicate ID");
  reject(
    (data) =>
      data.records.push({ ...data.records[0], id: "duplicate-credential" }),
    "duplicate credential name",
  );
  reject((data) => data.tracks.pop(), "track: missing");
  reject((data) => {
    data.skills[0].tracks = ["invalid" as CareerTrack];
  }, "invalid career track");
  reject((data) => {
    data.skills[0].nameAr = "";
  }, "missing display name");
  reject((data) => {
    data.tracks[0].skillIds = ["missing-skill"];
  }, "invalid skill reference");
  reject((data) => data.templates.pop(), "missing roadmap template");
  reject((data) => data.templates.push(data.templates[0]), "duplicate ID");
  reject((data) => {
    data.templates[0].trackId = "invalid" as CareerTrack;
  }, "roadmap invalid: invalid career track");
  reject((data) => data.templates[0].stages.pop(), "three ordered stages");
  reject((data) => data.templates[0].stages.reverse(), "three ordered stages");
  reject((data) => {
    data.templates[0].stages[0].practicalMilestoneAr = "";
  }, "practical milestone");
  reject((data) => {
    data.templates[0].stages[0].skillIds = ["missing-skill"];
  }, "invalid stage skill");
  reject((data) => {
    data.templates[0].stages[0].suggestedCertificationIds = [
      "missing-credential",
    ];
  }, "invalid suggested certification");
  rejectRecord({ status: "retired" }, "verified and active");
  rejectRecord({ status: "unknown" }, "verified and active");
  rejectRecord(
    { verificationStatus: "pending", lastVerifiedAt: null, sourceUrl: "" },
    "verified and active",
  );
  reject((data) => {
    data.templates[0].stages[0].suggestedCertificationIds = ["cisco-ccna"];
  }, "does not match track");
  reject((data) => {
    data.templates[0].stages[0].suggestedCertificationIds = ["python-pcpp1"];
  }, "advanced credential must remain");
  reject((data) => {
    data.templates[0].stages[0].certificationChoice =
      "required" as CareerRoadmapStage["certificationChoice"];
  }, "must be optional");
  reject((data) => {
    data.templates[0].stages[2].futureGoal = false;
  }, "future goals");

  // Honest inactive/pending records may exist in the catalog, but never in suggestions.
  for (const status of ["retired", "unknown"] as const) {
    assert.deepEqual(
      validate({
        ...fixture,
        records: [
          ...certifications,
          {
            ...certifications[0],
            id: `example-${status}`,
            name: `Example ${status}`,
            status,
          },
        ],
      }),
      [],
    );
  }
  assert.deepEqual(
    validate({
      ...fixture,
      records: [
        ...certifications,
        {
          ...certifications[0],
          id: "example-pending",
          name: "Example pending",
          status: "unknown",
          verificationStatus: "pending",
          sourceUrl: "",
          lastVerifiedAt: null,
        },
      ],
    }),
    [],
  );

  const search = (query: string, track = "") =>
    getVisibleCertifications(
      certifications,
      providers,
      careerTracks,
      query,
      track,
    );
  assert.equal(search("   ").length, certifications.length);
  assert.equal(search("PL-300")[0]?.id, "microsoft-power-bi-data-analyst");
  assert.ok(search("الأَمْن").length > 0);
  assert.deepEqual(search("الأَمْن"), search("الامن"));
  assert.equal(search("zzzz-not-a-certification").length, 0);
  assert.ok(search("", "software-testing").length > 0);
  assert.ok(
    search("", "software-testing").every((record) =>
      record.tracks.includes("software-testing"),
    ),
  );
  assert.ok(search("python", "software-testing").length > 0);
  console.log(
    `PASSED: ${certifications.length} credentials, ${providers.length} providers, ${skills.length} skills, ${careerTracks.length} tracks, ${roadmapTemplates.length * 3} ordered stages.`,
  );
  console.log(
    `PASSED: ${invalidChecks} invalid-data checks, 3 honest-status cases, 8 search/filter assertions.`,
  );
  for (const track of careerTracks)
    console.log(
      `${track.id}: ${certifications.filter((record) => record.tracks.includes(track.id)).length} credentials; ${track.skillIds.length} skills; 3 stages`,
    );
}
