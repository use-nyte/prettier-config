#!/usr/bin/env node

import { execSync } from "child_process";

async function main() {
  const prettierDefaultCommand = "pnpm prettier . --write --config ./src/prettier.config.mjs";
  const prettierPluginOrganizeClassMembersCommand =
    "pnpm prettier . --write --config ./src/prettier.config.mjs --plugin=prettier-plugin-organize-class-members";

  try {
    execSync(prettierDefaultCommand, { stdio: "inherit" });
    execSync(prettierPluginOrganizeClassMembersCommand, { stdio: "inherit" });
  } catch (error) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
