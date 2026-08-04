import { engineFrom, pathFrom, type Params, type SdkCall } from "./types";
import { buildQueryString, formatPyValue } from "./format";

export const pyArgs = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  endpoint: string,
): string | null => {
  if (call.payload === "none") return null;

  const entries: string[] = [];
  if (call.payload === "search") {
    if (query) entries.push(`"q": ${formatPyValue(query)},`);
    if (query && domain) entries.push(`"domain": ${formatPyValue(domain)},`);
    if (query && lang) entries.push(`"lang": ${formatPyValue(lang)},`);
  }
  if (call.payload === "type") {
    entries.push(`"type": ${formatPyValue(engineFrom(endpoint))},`);
  }
  for (const [k, v] of Object.entries(extraParams)) {
    entries.push(`"${k}": ${formatPyValue(v)},`);
  }

  if (entries.length === 0) return null;
  return `{\n${entries.map((e) => `    ${e}`).join("\n")}\n}`;
};

export const renderPySdk = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  endpoint: string,
  method: "GET" | "POST",
): string => {
  const path = pathFrom(endpoint);

  const header = [
    `# pip install serphouse-ai-sdk`,
    ``,
    `from serphouse import SERPHouseClient`,
    ``,
    `client = SERPHouseClient(api_key="<YOUR_API_KEY>")`,
    ``,
  ];

  let callLine: string;
  if (method === "GET") {
    const queryString = buildQueryString(
      query,
      domain,
      lang,
      Object.entries(extraParams),
    );
    callLine = `response = client.get("${path}${queryString}")`;
  } else {
    const args = pyArgs(call, query, domain, lang, extraParams, endpoint);
    callLine =
      args === null
        ? `response = client.post("${path}", {})`
        : `response = client.post("${path}", ${args})`;
  }

  return [...header, callLine, ``, `print(response)`].join("\n");
};
