import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const dir = new URL(".", import.meta.url).pathname;
const inputFile = join(dir, "responce.txt");
const outputDir = dir;

if (!existsSync(inputFile)) {
  console.error("responce.txt not found.");
  process.exit(1);
}

let raw = readFileSync(inputFile, "utf-8");

// Strip XML-ish wrapper tags like <ApiExample ...>...</ApiExample> and extract response='...' attribute
raw = raw.replace(/<[^>]+response='([^']+)'[^>]*>/g, "$1");
raw = raw.replace(/<[^>]+>/g, "");

function extractJsonBlocks(text: string): string[] {
  const blocks: string[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (ch === "\\") i++;
      else if (ch === '"') inString = false;
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "{" || ch === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0 && start !== -1) {
        blocks.push(text.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return blocks;
}

function cleanJson(input: string): string {
  return input
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .replace(/^\s*\.\.\.\s*$/gm, "")
    .replace(/,\s*([}\]])/g, "$1")
    .trim();
}

const blocks = extractJsonBlocks(raw);

let successCount = 0;

for (let i = 0; i < blocks.length; i++) {
  let input = cleanJson(blocks[i]);
  if (!input) continue;

  let value: unknown;

  try {
    value = JSON.parse(input);
  } catch {
    console.error(`[${i}] Couldn't parse.`);
    continue;
  }

  const formatted = JSON.stringify(
    value,
    (_, val) => {
      if (typeof val === "string" && val.length > 500 && /^[A-Za-z0-9+/=]+$/.test(val.slice(0, 100))) {
        return "src:BASE64";
      }
      if (typeof val === "string" && val.startsWith("data:image/")) {
        return "src:BASE64";
      }
      return val;
    }
  );

  const wrapped = `<ApiExample mode="response" response='${formatted.replace(/'/g, "&apos;")}' />`;

  console.log(`--- responce_out_${i + 1} ---`);
  console.log(wrapped);

  const outFile = join(outputDir, `responce_out_${i + 1}.txt`);
  writeFileSync(outFile, wrapped, "utf-8");
  successCount++;
}

if (blocks.length > 0) {
  let lastInput = cleanJson(blocks[blocks.length - 1]);
  if (lastInput) {
    try {
      const lastVal = JSON.parse(lastInput);
      const lastFormatted = JSON.stringify(
        lastVal,
        (_, val) => {
          if (typeof val === "string" && val.length > 500 && /^[A-Za-z0-9+/=]+$/.test(val.slice(0, 100))) {
            return "src:BASE64";
          }
          if (typeof val === "string" && val.startsWith("data:image/")) {
            return "src:BASE64";
          }
          return val;
        }
      );
      const lastWrapped = `<ApiExample mode="response" response='${lastFormatted.replace(/'/g, "&apos;")}' />`;
      writeFileSync(inputFile, lastWrapped, "utf-8");
    } catch {}
  }
}

console.log(`Done. Processed ${successCount} response(s).`);
