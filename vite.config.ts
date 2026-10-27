import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { productionCsp } from "./src/config/securityPolicy.ts";

// GitHub supplies owner/repository. Local development uses the root path.
const [owner, repository] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserSite = repository?.toLowerCase().endsWith(".github.io");
const publicUrl =
  process.env.VITE_SITE_URL ||
  (owner && repository
    ? `https://${owner.toLowerCase()}.github.io/${isUserSite ? "" : `${repository}/`}`
    : undefined);
if (publicUrl) {
  const parsed = new URL(publicUrl);
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash
  )
    throw new Error(
      "VITE_SITE_URL must be a public HTTPS URL without credentials, a query or a hash.",
    );
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "masari-production-csp",
      apply: "build",
      transformIndexHtml: () => [
        {
          tag: "meta",
          attrs: {
            "http-equiv": "Content-Security-Policy",
            content: productionCsp,
          },
          injectTo: "head-prepend",
        },
      ],
    },
    {
      name: "masari-public-metadata",
      transformIndexHtml: () =>
        publicUrl
          ? [
              {
                tag: "link",
                attrs: { rel: "canonical", href: publicUrl },
                injectTo: "head" as const,
              },
              {
                tag: "meta",
                attrs: { property: "og:url", content: publicUrl },
                injectTo: "head" as const,
              },
            ]
          : [],
    },
  ],
  base:
    process.env.VITE_BASE_PATH ||
    (repository && !isUserSite ? `/${repository}/` : "/"),
});
