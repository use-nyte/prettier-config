import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../src/cli.mjs", import.meta.url));

test("format checks consumer files and only rewrites them with --write", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "nyte-format-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const filename = join(directory, "fixture.json");
  const unformatted = '{"nyte":true}';
  writeFileSync(filename, unformatted);

  const check = spawnSync(process.execPath, [cli], { cwd: directory, encoding: "utf8" });
  assert.ifError(check.error);
  assert.equal(check.status, 1, check.stderr);
  assert.equal(readFileSync(filename, "utf8"), unformatted);

  const write = spawnSync(process.execPath, [cli, "--write"], { cwd: directory, encoding: "utf8" });
  assert.ifError(write.error);
  assert.equal(write.status, 0, write.stderr);
  assert.equal(readFileSync(filename, "utf8"), '{ "nyte": true }\n');

  const clean = spawnSync(process.execPath, [cli], { cwd: directory, encoding: "utf8" });
  assert.ifError(clean.error);
  assert.equal(clean.status, 0, clean.stderr);
});
