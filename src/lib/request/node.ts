import { engineFrom, type Params, type SdkCall } from "./types";
import { formatValue } from "./format";

const NODE_PACKAGE = "@serphouse/serphouse-nodejs";

export const nodeArgs = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  endpoint: string,
): string | null => {
  if (call.payload === "none") return null;

  const lines: string[] = [];
  if (call.payload === "search") {
    if (query) lines.push(`    q: ${formatValue(query)},`);
    if (query && domain) lines.push(`    domain: ${formatValue(domain)},`);
    if (query && lang) lines.push(`    lang: ${formatValue(lang)},`);
  }
  if (call.payload === "type") {
    lines.push(`    type: ${formatValue(engineFrom(endpoint))},`);
  }
  for (const [k, v] of Object.entries(extraParams)) {
    lines.push(`    ${k}: ${formatValue(v)},`);
  }

  if (lines.length === 0) return null;
  return `{\n${lines.join("\n")}\n  }`;
};

export const renderNodeSdk = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  endpoint: string,
): string => {
  const args = nodeArgs(call, query, domain, lang, extraParams, endpoint);
  const callLine =
    args === null
      ? `  const response = await client.${call.node}();`
      : `  const response = await client.${call.node}(${args});`;

  return [
    `// npm install ${NODE_PACKAGE}`,
    ``,
    `const { SERPHouse } = require("${NODE_PACKAGE}");`,
    ``,
    `const client = new SERPHouse("<YOUR_API_KEY>");`,
    ``,
    `async function main() {`,
    callLine,
    ``,
    `  console.log(response.results);`,
    `}`,
    ``,
    `main();`,
  ].join("\n");
};
