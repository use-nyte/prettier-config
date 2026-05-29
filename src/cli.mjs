#!/usr/bin/env node

import { execSync } from "child_process";
import { fileURLToPath } from "url";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  const configPath = fileURLToPath(new URL("./prettier.config.mjs", import.meta.url));
  const organizeClassMembersPluginPath = fileURLToPath(
    new URL("../node_modules/prettier-plugin-organize-class-members/build/index.js", import.meta.url)
  );

  const prettierDefaultCommand = `pnpm prettier . --write --config ${JSON.stringify(configPath)}`;
  const prettierPluginOrganizeClassMembersCommand = `pnpm prettier . --write --config ${JSON.stringify(configPath)} --plugin=${JSON.stringify(organizeClassMembersPluginPath)}`;

  try {
    console.log("Running Prettier with default configuration...");
    execSync(prettierDefaultCommand, { stdio: "inherit" });
    console.log("\nRunning Prettier to organize class members...");
    execSync(prettierPluginOrganizeClassMembersCommand, { stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
