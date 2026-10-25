import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub supplies owner/repository. Local development uses the root path.
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repository?.toLowerCase().endsWith(".github.io");

export default defineConfig({
  plugins: [react()],
  base:
    process.env.VITE_BASE_PATH ||
    (repository && !isUserSite ? `/${repository}/` : "/"),
});
