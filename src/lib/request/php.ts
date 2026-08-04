import { engineFrom, type Params, type SdkCall } from "./types";
import { formatValue } from "./format";

export const phpArgs = (
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
    if (query) entries.push(`'q' => ${formatValue(query)},`);
    if (query && domain) entries.push(`'domain' => ${formatValue(domain)},`);
    if (query && lang) entries.push(`'lang' => ${formatValue(lang)},`);
  }
  if (call.payload === "type") {
    entries.push(`'type' => ${formatValue(engineFrom(endpoint))},`);
  }
  for (const [k, v] of Object.entries(extraParams)) {
    entries.push(`'${k}' => ${formatValue(v)},`);
  }

  if (entries.length === 0) return null;
  if (call.payload === "search") {
    return `[\n    'data' => [\n${entries.map((e) => `        ${e}`).join("\n")}\n    ]\n]`;
  }
  return `[\n${entries.map((e) => `    ${e}`).join("\n")}\n]`;
};

export const renderPhpSdk = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  endpoint: string,
): string => {
  const args = phpArgs(call, query, domain, lang, extraParams, endpoint);
  const callLine =
    args === null
      ? `$response = $client->${call.php}();`
      : `$response = $client->${call.php}(${args});`;

  return [
    `<?php`,
    ``,
    `require 'vendor/autoload.php';`,
    ``,
    `use SERPHouse\\SERPHouseClient;`,
    ``,
    `$client = new SERPHouseClient('<YOUR_API_KEY>');`,
    ``,
    callLine,
    ``,
    `echo $response->getResponse();`,
  ].join("\n");
};
