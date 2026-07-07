import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const animationsDir = path.join(root, "public", "animations");
const manifest = {};

const entries = await readdir(animationsDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory() || !/^A\d+$/.test(entry.name)) continue;
  const dir = path.join(animationsDir, entry.name);
  const files = (await readdir(dir))
    .filter((file) => file.toLowerCase().endsWith(".webp"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  manifest[entry.name] = files.map((file) => `animations/${entry.name}/${file}`);
}

await writeFile(
  path.join(animationsDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(
  Object.entries(manifest)
    .map(([key, frames]) => `${key}:${frames.length}`)
    .join(" "),
);
