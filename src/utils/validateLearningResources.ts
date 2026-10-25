import { careerTracks } from "../data/careerTracks.ts";
import { skills } from "../data/skills.ts";
import {
  resourceTypes,
  resourceLanguages,
  resourceLevels,
  registrationRequirements,
} from "../types/learningResources.ts";
import type { LearningResource } from "../types/learningResources.ts";

/** Structural validation cannot prove free access or teaching quality; see manual evidence. */
export function validateLearningResources(
  resources: readonly LearningResource[],
  today: string,
): string[] {
  const errors: string[] = [],
    ids = new Set<string>(),
    urls = new Set<string>();
  const validDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
  if (!validDate(today)) throw new Error("A valid reference date is required");
  for (const resource of resources) {
    const skillIds = Array.isArray(resource.skillIds) ? resource.skillIds : [];
    const trackIds = Array.isArray(resource.trackIds) ? resource.trackIds : [];
    const fail = (message: string) => errors.push(`${resource.id}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(resource.id) || ids.has(resource.id))
      fail("invalid or duplicate ID");
    ids.add(resource.id);
    for (const field of [
      "title",
      "provider",
      "descriptionAr",
      "freeAccessNoteAr",
    ] as const)
      if (typeof resource[field] !== "string" || !resource[field].trim())
        fail(`missing ${field}`);
    if (!resourceTypes.includes(resource.type))
      fail("unsupported resource type");
    if (!resourceLanguages.includes(resource.language))
      fail("unsupported language");
    if (!resourceLevels.includes(resource.level)) fail("unsupported level");
    if (!registrationRequirements.includes(resource.registration))
      fail("unsupported registration requirement");
    try {
      const url = new URL(resource.url);
      if (url.protocol !== "https:" || url.username || url.password || url.hash)
        fail("expected direct HTTPS URL without credentials or fragment");
      url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
      const canonical = url.toString().replace(/\/$/, "");
      if (urls.has(canonical)) fail("duplicate course URL");
      urls.add(canonical);
      if (
        /(^|\/)(results|search)(\/|$)/.test(url.pathname) ||
        url.searchParams.has("search_query")
      )
        fail("search results are not course destinations");
      if (
        resource.type === "youtube-playlist" &&
        (!/(^|\.)youtube\.com$/.test(url.hostname) ||
          url.pathname !== "/playlist" ||
          !url.searchParams.get("list"))
      )
        fail("invalid direct YouTube playlist URL");
      if (
        resource.type === "youtube-video" &&
        !(
          (/(^|\.)youtube\.com$/.test(url.hostname) &&
            url.pathname === "/watch" &&
            !!url.searchParams.get("v")) ||
          (url.hostname === "youtu.be" && url.pathname.length > 1)
        )
      )
        fail("invalid direct YouTube video URL");
    } catch {
      fail("malformed URL");
    }
    if (
      !Array.isArray(resource.skillIds) ||
      !skillIds.length ||
      new Set(skillIds).size !== skillIds.length ||
      skillIds.some((id) => !skills.some((skill) => skill.id === id))
    )
      fail("empty, duplicate or unknown skills");
    if (
      !Array.isArray(resource.trackIds) ||
      !trackIds.length ||
      new Set(trackIds).size !== trackIds.length ||
      trackIds.some((id) => !careerTracks.some((track) => track.id === id))
    )
      fail("empty, duplicate or unknown tracks");
    if (
      trackIds.some(
        (track) =>
          !skillIds.some((id) =>
            skills.some(
              (skill) => skill.id === id && skill.tracks.includes(track),
            ),
          ),
      )
    )
      fail("track has no relevant associated skill");
    if (
      skillIds.some(
        (id) =>
          !trackIds.some((track) =>
            skills.some(
              (skill) => skill.id === id && skill.tracks.includes(track),
            ),
          ),
      )
    )
      fail("skill has no relevant associated track");
    if (typeof resource.freeAccessVerified !== "boolean")
      fail("verification flag must be boolean");
    if (resource.freeAccessVerified && resource.lastVerifiedAt === null)
      fail("free access needs a verification date");
    if (!resource.freeAccessVerified && resource.lastVerifiedAt !== null)
      fail("pending free-access claims must have a null verification date");
    if (
      resource.lastVerifiedAt !== null &&
      (!validDate(resource.lastVerifiedAt) || resource.lastVerifiedAt > today)
    )
      fail("invalid or future verification date");
  }
  return errors;
}
