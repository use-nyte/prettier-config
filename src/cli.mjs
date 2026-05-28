#!/usr/bin/env node

import { execSync } from "child_process";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  const prettierDefaultCommand = "pnpm prettier . --write --config ./src/prettier.config.mjs";
  const prettierPluginOrganizeClassMembersCommand =
    "pnpm prettier . --write --config ./src/prettier.config.mjs --plugin=prettier-plugin-organize-class-members";

  try {
    execSync(prettierDefaultCommand, { stdio: "inherit" });
    execSync(prettierPluginOrganizeClassMembersCommand, { stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
