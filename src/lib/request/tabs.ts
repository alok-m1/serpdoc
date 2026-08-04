import type { Fmt } from "./types";

export const REQUEST_TABS: { label: string; fmt: Fmt; codeLang: string }[] = [
  { label: "curl", fmt: "curl", codeLang: "bash" },
  { label: "Node.js", fmt: "js", codeLang: "javascript" },
  { label: "Python", fmt: "py", codeLang: "python" },
  { label: "PHP", fmt: "php", codeLang: "php" },
  { label: "Go", fmt: "go", codeLang: "go" },
];
