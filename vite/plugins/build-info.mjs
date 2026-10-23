import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";

const git = (args) => {
  try {
    return (
      execSync(`git ${args}`, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || undefined
    );
  } catch {
    return undefined;
  }
};

/**
 * Vite plugin to bake build metadata into the bundle as __BUILD_INFO__
 * Read at runtime by window.BI() (src/utils/BuildInfo.ts)
 *
 * Commit/branch come from CI env first (GitHub Actions), then local git.
 * Never fails the build - unknown values are reported as "unknown".
 *
 * @param {{ repo?: string, deployBranch: string }} options
 *   repo: "owner/name" of a public GitHub repo - enables the latest-commit check
 *   deployBranch: branch that production deploys from
 */
export function buildInfoPlugin({ repo, deployBranch }) {
  return {
    name: "build-info-plugin",
    config(_, { mode }) {
      const pkg = JSON.parse(
        readFileSync(resolve(process.cwd(), "package.json"), "utf-8")
      );
      const env = process.env;

      const buildInfo = {
        name: pkg.name,
        version: pkg.version,
        commit: env.GITHUB_SHA || git("rev-parse HEAD") || "unknown",
        branch:
          env.GITHUB_REF_NAME ||
          git("rev-parse --abbrev-ref HEAD") ||
          "unknown",
        builtAt: new Date().toISOString(),
        mode,
        repo: repo || null,
        deployBranch,
      };

      return { define: { __BUILD_INFO__: JSON.stringify(buildInfo) } };
    },
  };
}
