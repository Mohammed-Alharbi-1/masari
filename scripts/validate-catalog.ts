import assert from "node:assert/strict";
import { certifications } from "../src/data/certifications.ts";
import { providers } from "../src/data/providers.ts";
import { careerTracks } from "../src/data/careerTracks.ts";
import { validateCatalog } from "../src/data/validateCatalog.ts";
import type { Certification } from "../src/data/types.ts";

const errors = validateCatalog(certifications, providers, careerTracks);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  // Mutation checks prove the validator rejects bad data, rather than only
  // confirming that the current fixture happens to pass.
  const reject = (patch: Partial<Certification>, expected: string) => {
    const records = structuredClone(certifications);
    Object.assign(records[0], patch);
    assert.ok(
      validateCatalog(records, providers, careerTracks).some((error) =>
        error.includes(expected),
      ),
      expected,
    );
  };
  reject({ providerId: "missing" }, "unknown provider");
  reject(
    { tracks: ["invalid" as Certification["tracks"][number]] },
    "invalid career track",
  );
  reject({ name: " " }, "empty name");
  reject({ descriptionAr: " " }, "missing Arabic description");
  reject({ officialUrl: "http://github.com/" }, "issuer HTTPS");
  reject({ sourceUrl: "https://github.com.example.invalid/" }, "issuer HTTPS");
  reject({ sourceUrl: "" }, "issuer source");
  reject({ lastVerifiedAt: null }, "non-future date");
  reject({ lastVerifiedAt: "2099-01-01" }, "non-future date");
  reject({ lastVerifiedAt: "2026-02-30" }, "non-future date");
  reject({ verificationStatus: "pending" }, "must not claim");
  reject({ examPrice: -1, currency: "USD" }, "nonnegative");
  reject({ examPrice: 100, currency: null }, "currency code");
  reject(
    { type: "fake" as Certification["type"] },
    "unsupported credential type",
  );
  reject({ level: "fake" as Certification["level"] }, "unsupported level");
  reject(
    { status: "fake" as Certification["status"] },
    "unsupported availability",
  );
  assert.ok(
    validateCatalog(
      [...certifications, certifications[0]],
      providers,
      careerTracks,
    ).some((error) => error.includes("duplicate ID")),
  );
  assert.ok(
    validateCatalog(
      certifications,
      [...providers, providers[0]],
      careerTracks,
    ).some((error) => error.includes("duplicate ID")),
  );
  assert.ok(
    validateCatalog(certifications, providers, [
      ...careerTracks,
      careerTracks[0],
    ]).some((error) => error.includes("duplicate ID")),
  );
  const duplicate = { ...certifications[0], id: "duplicate-credential" };
  assert.ok(
    validateCatalog(
      [...certifications, duplicate],
      providers,
      careerTracks,
    ).some((error) => error.includes("duplicate credential name")),
  );
  for (const status of ["retired", "unknown"] as const) {
    assert.deepEqual(
      validateCatalog(
        [{ ...certifications[0], status }],
        providers,
        careerTracks,
      ),
      [],
    );
  }
  assert.deepEqual(
    validateCatalog(
      [
        {
          ...certifications[0],
          verificationStatus: "pending",
          sourceUrl: "",
          lastVerifiedAt: null,
        },
      ],
      providers,
      careerTracks,
    ),
    [],
  );
  console.log(
    `PASSED: ${certifications.length} credentials, ${providers.length} providers, ${careerTracks.length} career tracks; 20 invalid-data checks and 3 honest-status cases.`,
  );
  for (const track of careerTracks)
    console.log(
      `${track.id}: ${certifications.filter((record) => record.tracks.includes(track.id)).length}`,
    );
}
