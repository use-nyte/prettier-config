#!/usr/bin/env node

import { readFile, readdir, writeFile } from "fs/promises";
import path from "path";
import prettier from "prettier";
import ignore from "ignore";
import config from "./prettier.config.mjs";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  const cwd = process.cwd();
  const ignorePath = new URL("./.prettierignore", import.meta.url).pathname;

  const ig = ignore().add(await readFile(ignorePath, "utf8").catch(() => ""));

  const files = await collectFiles(cwd, ig);
  let formattedCount = 0;

  for (const filePath of files) {
    const fileInfo = await prettier.getFileInfo(filePath, {
      ignorePath: ignorePath,
      plugins: config.plugins,
      withNodeModules: false
    });

    if (fileInfo.ignored || !fileInfo.inferredParser) {
      continue;
    }

    const source = await readFile(filePath, "utf8");
    const formatted = await prettier.format(source, {
      ...config,
      filepath: filePath
    });

    if (formatted !== source) {
      await writeFile(filePath, formatted);
      console.log(`Formatted ${filePath.replace(cwd + path.sep, "")}`);
      formattedCount += 1;
    }
  }

  if (formattedCount > 0) {
    console.log("--------------------");
    console.log(`Formatted ${formattedCount} file${formattedCount === 1 ? "" : "s"}.`);
    process.exit(0);
  } else {
    console.log("No formatting errors found.");
    process.exit(0);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function collectFiles(root, ig) {
  const files = [];
  const stack = [root];

  while (stack.length) {
    const dir = stack.pop();
    const entries = await readdir(dir, { withFileTypes: true });

    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.relative(root, full).split(path.sep).join("/");

      if (rel && (ig.ignores(rel) || ig.ignores(rel + "/"))) continue;

      if (e.isDirectory()) stack.push(full);
      else if (e.isFile() || e.isSymbolicLink()) files.push(full);
    }
  }

  return files;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
