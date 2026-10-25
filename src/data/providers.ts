import type { CertificationProvider } from "./types.ts";

export const providers: CertificationProvider[] = [
  {
    id: "cisco",
    name: "Cisco",
    officialWebsite: "https://www.cisco.com/",
    sourceDomains: ["cisco.com"],
  },
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    officialWebsite: "https://aws.amazon.com/",
    sourceDomains: ["aws.amazon.com"],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    officialWebsite: "https://www.microsoft.com/",
    sourceDomains: ["microsoft.com"],
  },
  {
    id: "github",
    name: "GitHub",
    officialWebsite: "https://github.com/",
    sourceDomains: ["github.com", "learn.microsoft.com"],
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    officialWebsite: "https://cloud.google.com/",
    sourceDomains: ["cloud.google.com", "support.google.com"],
  },
];
