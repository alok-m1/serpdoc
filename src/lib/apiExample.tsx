import type { ReactNode } from 'react';

export type Fmt = 'curl' | 'js' | 'py' | 'php' | 'go';

export function renderRequest(
  endpoint: string,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
  fmt: Fmt,
) {
  const entries = Object.entries(extraParams);
  const q = JSON.stringify(query);
  const d = JSON.stringify(domain);
  const l = JSON.stringify(lang);

  const formatValue = (v: string | number | boolean) =>
    typeof v === 'string' ? JSON.stringify(v) : String(v);

  if (fmt === 'curl') {
    const lines = entries.map(([k, v]) => `            "${k}": ${formatValue(v)}`);
    return [
      `curl --location --request POST '${endpoint}' \\`,
      `--header 'Authorization: Bearer <YOUR_API_KEY>' \\`,
      `--header 'Content-Type: application/json' \\`,
      `--data-raw '{`,
      `    "data": {`,
      `        "q": ${q},`,
      `        "domain": ${d},`,
      `        "lang": ${l}${entries.length > 0 ? ',' : ''}`,
      ...lines,
      `    }`,
      `}'`,
    ].join('\n');
  }

  if (fmt === 'js') {
    const lines = entries.map(([k, v]) =>
      typeof v === 'string' ? `            ${k}: "${v}"` : `            ${k}: ${v}`,
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
      `        lang: ${l}${entries.length > 0 ? ',' : ''}`,
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
    ].join('\n');
  }

  if (fmt === 'py') {
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
    ].join('\n');
  }

  if (fmt === 'php') {
    const lines = entries.map(([k, v]) => `            "${k}" => ${formatValue(v)},`);
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
    ].join('\n');
  }

  const lines = entries.map(([k, v]) => `                "${k}": ${formatValue(v)},`);
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
  ].join('\n');
}

export function formatResponse(response: string | Record<string, unknown>) {
  if (typeof response === 'string') {
    try {
      return JSON.stringify(JSON.parse(response), null, 2);
    } catch {
      return response;
    }
  }
  return JSON.stringify(response, null, 2);
}

export const REQUEST_TABS: { label: string; fmt: Fmt; codeLang: string }[] = [
  { label: 'curl', fmt: 'curl', codeLang: 'bash' },
  { label: 'Node.js', fmt: 'js', codeLang: 'javascript' },
  { label: 'Python', fmt: 'py', codeLang: 'python' },
  { label: 'PHP', fmt: 'php', codeLang: 'php' },
  { label: 'Go', fmt: 'go', codeLang: 'go' },
];

export const TRAFFIC_DOTS: ReactNode = (
  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
  </span>
);
