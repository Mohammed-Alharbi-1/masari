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
  {
    id: "linux-foundation",
    name: "The Linux Foundation",
    officialWebsite: "https://www.linuxfoundation.org/",
    sourceDomains: ["linuxfoundation.org"],
  },
  {
    id: "cncf",
    name: "CNCF / The Linux Foundation",
    officialWebsite: "https://www.cncf.io/",
    sourceDomains: ["cncf.io", "linuxfoundation.org"],
  },
  {
    id: "red-hat",
    name: "Red Hat",
    officialWebsite: "https://www.redhat.com/",
    sourceDomains: ["redhat.com"],
  },
  {
    id: "isc2",
    name: "ISC2",
    officialWebsite: "https://www.isc2.org/",
    sourceDomains: ["isc2.org"],
  },
  {
    id: "python-institute",
    name: "OpenEDG Python Institute",
    officialWebsite: "https://pythoninstitute.org/",
    sourceDomains: ["pythoninstitute.org"],
  },
  {
    id: "istqb",
    name: "ISTQB",
    officialWebsite: "https://istqb.org/",
    sourceDomains: ["istqb.org"],
  },
  {
    id: "databricks",
    name: "Databricks",
    officialWebsite: "https://www.databricks.com/",
    sourceDomains: ["databricks.com"],
  },
];
