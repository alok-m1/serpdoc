import type { BatchItem, ParamEntry } from "./types";

export const formatValue = (v: string | number | boolean) =>
  typeof v === "string" ? JSON.stringify(v) : String(v);

export const formatPyValue = (v: string | number | boolean) =>
  typeof v === "boolean" ? (v ? "True" : "False") : formatValue(v);

export const jsonFields = (
  query: string,
  domain: string,
  lang: string,
  entries: ParamEntry[],
): string[] => {
  const fields: string[] = [];
  if (query) fields.push(`"q": ${JSON.stringify(query)}`);
  if (query && domain) fields.push(`"domain": ${JSON.stringify(domain)}`);
  if (query && lang) fields.push(`"lang": ${JSON.stringify(lang)}`);
  for (const [k, v] of entries) fields.push(`"${k}": ${formatValue(v)}`);
  return fields;
};

export const buildQueryString = (
  query: string,
  domain: string,
  lang: string,
  entries: ParamEntry[],
): string => {
  const parts: string[] = [];
  if (query) parts.push(`q=${query}`);
  if (query && domain) parts.push(`domain=${domain}`);
  if (query && lang) parts.push(`lang=${lang}`);
  for (const [k, v] of entries) parts.push(`${k}=${v}`);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
};

export type BatchStyle = "js" | "php" | "py" | "json";

export const batchItemCompact = (item: BatchItem, style: BatchStyle) => {
  const entries = Object.entries(item);
  if (style === "js")
    return entries.map(([k, v]) => `${k}: ${formatValue(v)}`).join(", ");
  if (style === "php")
    return entries.map(([k, v]) => `"${k}" => ${formatValue(v)}`).join(", ");
  if (style === "py")
    return entries.map(([k, v]) => `"${k}": ${formatPyValue(v)}`).join(", ");
  return entries.map(([k, v]) => `"${k}": ${formatValue(v)}`).join(", ");
};
