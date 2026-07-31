import type { ReactNode } from "react";

export type Fmt = "curl" | "js" | "py" | "php" | "go";

type PayloadKind = "search" | "params" | "type" | "none";

type SdkCall = {
  node: string;
  php: string;
  payload: PayloadKind;
};

const SDK_CALLS: Record<string, SdkCall> = {
  "/google-web": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-image": {
    node: "google.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-news": {
    node: "google.news",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-shop": {
    node: "google.shopping",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-videos-api": {
    node: "google.video",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-short-videos-api": {
    node: "google.short_video",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-local-api": {
    node: "google.local",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-jobs-api": {
    node: "google.jobs",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-forums-api": {
    node: "google.forums",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-autocomplete-api": {
    node: "google.autocomplete",
    php: "serpApi->live",
    payload: "search",
  },
  "/bing-web": { node: "bing.search", php: "serpApi->live", payload: "search" },
  "/bing-image": {
    node: "bing.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/bing-news": { node: "bing.news", php: "serpApi->live", payload: "search" },
  "/yahoo-web": {
    node: "yahoo.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/yahoo-image": {
    node: "yahoo.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/yahoo-news": {
    node: "yahoo.news",
    php: "serpApi->live",
    payload: "search",
  },
  "/web-search-lite": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/serp/live": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/serp/google_advanced": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/account/info": {
    node: "extra.account_info",
    php: "account->fetch",
    payload: "none",
  },
  "/domain/list": {
    node: "extra.domain_list",
    php: "domains->list",
    payload: "none",
  },
  "/language/list/google": {
    node: "extra.language_list",
    php: "languages->list",
    payload: "type",
  },
  "/location/search": {
    node: "extra.location_search",
    php: "location->search",
    payload: "params",
  },
};

const NODE_PACKAGE = "@serphouse/serphouse-nodejs";

const sdkCallFor = (endpoint: string): SdkCall | undefined => {
  const path = endpoint.replace(/^https?:\/\/[^/]+/, "");
  return SDK_CALLS[path];
};

const engineFrom = (endpoint: string): string =>
  endpoint.split("/").pop() || "google";

const formatValue = (v: string | number | boolean) =>
  typeof v === "string" ? JSON.stringify(v) : String(v);

const nodeArgs = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
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

const phpArgs = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
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

const renderNodeSdk = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
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

const renderPhpSdk = (
  call: SdkCall,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
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
    `use Serphouse\\SERPHouseClient;`,
    ``,
    `$client = new SERPHouseClient('<YOUR_API_KEY>');`,
    ``,
    callLine,
    ``,
    `echo $response->getResponse();`,
  ].join("\n");
};

export function renderRequest(
  endpoint: string,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
  fmt: Fmt,
  method: "GET" | "POST" = "POST",
) {
  const entries = Object.entries(extraParams);
  const q = JSON.stringify(query);
  const d = JSON.stringify(domain);
  const l = JSON.stringify(lang);

  const buildQueryString = () => {
    const parts: string[] = [];
    if (query) parts.push(`q=${query}`);
    if (query && domain) parts.push(`domain=${domain}`);
    if (query && lang) parts.push(`lang=${lang}`);
    for (const [k, v] of entries) parts.push(`${k}=${v}`);
    return parts.length > 0 ? `?${parts.join("&")}` : "";
  };

  if (method === "GET") {
    const url = `${endpoint}${buildQueryString()}`;

    if (fmt === "curl") {
      return [
        `curl --location --request GET '${url}' \\`,
        `--header 'Authorization: Bearer <YOUR_API_KEY>'`,
      ].join("\n");
    }

    if (fmt === "js") {
      const call = sdkCallFor(endpoint);
      if (call) {
        return renderNodeSdk(call, query, domain, lang, extraParams, endpoint);
      }
      return [
        `const API_KEY = "<YOUR_API_KEY>";`,
        ``,
        `async function main() {`,
        `  const response = await fetch("${url}", {`,
        `    method: "GET",`,
        `    headers: {`,
        `      Authorization: \`Bearer \${API_KEY}\`,`,
        `    },`,
        `  });`,
        ``,
        `  const data = await response.json();`,
        `  console.log(data);`,
        `}`,
        ``,
        `main();`,
      ].join("\n");
    }

    if (fmt === "py") {
      return [
        `import requests`,
        ``,
        `url = "${url}"`,
        `headers = {`,
        `    "Authorization": "Bearer <YOUR_API_KEY>",`,
        `}`,
        ``,
        `response = requests.get(url, headers=headers)`,
        `print(response.json())`,
      ].join("\n");
    }

    if (fmt === "php") {
      const call = sdkCallFor(endpoint);
      if (call) {
        return renderPhpSdk(call, query, domain, lang, extraParams, endpoint);
      }
      return [
        `<?php`,
        ``,
        `$apiKey = "<YOUR_API_KEY>";`,
        `$url = "${url}";`,
        ``,
        `$ch = curl_init($url);`,
        `curl_setopt($ch, CURLOPT_HTTPGET, true);`,
        `curl_setopt($ch, CURLOPT_HTTPHEADER, [`,
        `    "Authorization: Bearer $apiKey",`,
        `]);`,
        `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`,
        ``,
        `$response = curl_exec($ch);`,
        `curl_close($ch);`,
        ``,
        `echo $response;`,
      ].join("\n");
    }

    return [
      `package main`,
      ``,
      `import (`,
      `    "fmt"`,
      `    "net/http"`,
      `    "io/ioutil"`,
      `)`,
      ``,
      `func main() {`,
      `    url := "${url}"`,
      ``,
      `    client := &http.Client{}`,
      `    req, _ := http.NewRequest("GET", url, nil)`,
      `    req.Header.Set("Authorization", "Bearer <YOUR_API_KEY>")`,
      ``,
      `    resp, _ := client.Do(req)`,
      `    defer resp.Body.Close()`,
      ``,
      `    body, _ := ioutil.ReadAll(resp.Body)`,
      `    fmt.Println(string(body))`,
      `}`,
    ].join("\n");
  }

  if (fmt === "curl") {
    const lines = entries.map(
      ([k, v], i) =>
        `            "${k}": ${formatValue(v)}${i < entries.length - 1 ? "," : ""}`,
    );
    return [
      `curl --location --request POST '${endpoint}' \\`,
      `--header 'Authorization: Bearer <YOUR_API_KEY>' \\`,
      `--header 'Content-Type: application/json' \\`,
      `--data-raw '{`,
      `    "data": {`,
      `        "q": ${q},`,
      `        "domain": ${d},`,
      `        "lang": ${l}${entries.length > 0 ? "," : ""}`,
      ...lines,
      `    }`,
      `}'`,
    ].join("\n");
  }

  if (fmt === "js") {
    const call = sdkCallFor(endpoint);
    if (call) {
      return renderNodeSdk(call, query, domain, lang, extraParams, endpoint);
    }
    const lines = entries.map(([k, v], i) =>
      typeof v === "string"
        ? `            ${k}: "${v}"${i < entries.length - 1 ? "," : ""}`
        : `            ${k}: ${v}${i < entries.length - 1 ? "," : ""}`,
    );
    return [
      `const API_KEY = "<YOUR_API_KEY>";`,
      ``,
      `async function main() {`,
      `  const response = await fetch("${endpoint}", {`,
      `    method: "POST",`,
      `    headers: {`,
      `      Authorization: \`Bearer \${API_KEY}\`,`,
      `      "Content-Type": "application/json",`,
      `    },`,
      `    body: JSON.stringify({`,
      `      data: {`,
      `        q: ${q},`,
      `        domain: ${d},`,
      `        lang: ${l}${entries.length > 0 ? "," : ""}`,
      ...lines,
      `      },`,
      `    }),`,
      `  });`,
      ``,
      `  const data = await response.json();`,
      `  console.log(data);`,
      `}`,
      ``,
      `main();`,
    ].join("\n");
  }

  if (fmt === "py") {
    const lines = entries.map(([k, v]) => `        "${k}": ${formatValue(v)},`);
    return [
      `import requests`,
      ``,
      `url = "${endpoint}"`,
      `headers = {`,
      `    "Authorization": "Bearer <YOUR_API_KEY>",`,
      `    "Content-Type": "application/json"`,
      `}`,
      `payload = {`,
      `    "data": {`,
      `        "q": ${q},`,
      `        "domain": ${d},`,
      `        "lang": ${l},`,
      ...lines,
      `    }`,
      `}`,
      ``,
      `response = requests.post(url, json=payload, headers=headers)`,
      `print(response.json())`,
    ].join("\n");
  }

  if (fmt === "php") {
    const call = sdkCallFor(endpoint);
    if (call) {
      return renderPhpSdk(call, query, domain, lang, extraParams, endpoint);
    }
    const lines = entries.map(
      ([k, v]) => `            "${k}" => ${formatValue(v)},`,
    );
    return [
      `<?php`,
      ``,
      `$apiKey = "<YOUR_API_KEY>";`,
      `$url = "${endpoint}";`,
      ``,
      `$payload = json_encode([`,
      `    "data" => [`,
      `        "q" => ${q},`,
      `        "domain" => ${d},`,
      `        "lang" => ${l},`,
      ...lines,
      `    ]`,
      `]);`,
      ``,
      `$ch = curl_init($url);`,
      `curl_setopt($ch, CURLOPT_POST, true);`,
      `curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);`,
      `curl_setopt($ch, CURLOPT_HTTPHEADER, [`,
      `    "Authorization: Bearer $apiKey",`,
      `    "Content-Type: application/json"`,
      `]);`,
      `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`,
      ``,
      `$response = curl_exec($ch);`,
      `curl_close($ch);`,
      ``,
      `echo $response;`,
    ].join("\n");
  }

  const lines = entries.map(
    ([k, v]) => `                "${k}": ${formatValue(v)},`,
  );
  return [
    `package main`,
    ``,
    `import (`,
    `    "bytes"`,
    `    "encoding/json"`,
    `    "fmt"`,
    `    "net/http"`,
    `)`,
    ``,
    `func main() {`,
    `    url := "${endpoint}"`,
    `    payload := map[string]interface{}{`,
    `        "data": map[string]interface{}{`,
    `            "q":      ${q},`,
    `            "domain": ${d},`,
    `            "lang":   ${l},`,
    ...lines,
    `        },`,
    `    }`,
    `    jsonData, _ := json.Marshal(payload)`,
    ``,
    `    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))`,
    `    req.Header.Set("Authorization", "Bearer <YOUR_API_KEY>")`,
    `    req.Header.Set("Content-Type", "application/json")`,
    ``,
    `    client := &http.Client{}`,
    `    resp, _ := client.Do(req)`,
    `    defer resp.Body.Close()`,
    ``,
    `    var result map[string]interface{}`,
    `    json.NewDecoder(resp.Body).Decode(&result)`,
    `    fmt.Println(result)`,
    `}`,
  ].join("\n");
}

export function formatResponse(response: string | Record<string, unknown>) {
  if (typeof response === "string") {
    try {
      return JSON.stringify(JSON.parse(response), null, 2);
    } catch {
      return response;
    }
  }
  return JSON.stringify(response, null, 2);
}

export const REQUEST_TABS: { label: string; fmt: Fmt; codeLang: string }[] = [
  { label: "curl", fmt: "curl", codeLang: "bash" },
  { label: "Node.js", fmt: "js", codeLang: "javascript" },
  { label: "Python", fmt: "py", codeLang: "python" },
  { label: "PHP", fmt: "php", codeLang: "php" },
  { label: "Go", fmt: "go", codeLang: "go" },
];

export const TRAFFIC_DOTS: ReactNode = (
  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
  </span>
);
