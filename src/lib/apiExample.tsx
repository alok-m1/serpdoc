import type { ReactNode } from 'react';

export type Fmt = 'curl' | 'js' | 'py' | 'php' | 'go';

export function renderRequest(
  endpoint: string,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
  fmt: Fmt,
  method: 'GET' | 'POST' = 'POST',
) {
  const entries = Object.entries(extraParams);
  const q = JSON.stringify(query);
  const d = JSON.stringify(domain);
  const l = JSON.stringify(lang);

  const formatValue = (v: string | number | boolean) =>
    typeof v === 'string' ? JSON.stringify(v) : String(v);

  const buildQueryString = () => {
    const parts: string[] = [];
    if (query) parts.push(`q=${query}`);
    if (query && domain) parts.push(`domain=${domain}`);
    if (query && lang) parts.push(`lang=${lang}`);
    for (const [k, v] of entries) parts.push(`${k}=${v}`);
    return parts.length > 0 ? `?${parts.join('&')}` : '';
  };

  if (method === 'GET') {
    const url = `${endpoint}${buildQueryString()}`;

    if (fmt === 'curl') {
      return [
        `curl --location --request GET '${url}' \\`,
        `--header 'Authorization: Bearer <YOUR_API_KEY>'`,
      ].join('\n');
    }

    if (fmt === 'js') {
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
      ].join('\n');
    }

    if (fmt === 'py') {
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
      ].join('\n');
    }

    if (fmt === 'php') {
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
      ].join('\n');
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
    ].join('\n');
  }

  if (fmt === 'curl') {
    const lines = entries.map(([k, v], i) =>
      `            "${k}": ${formatValue(v)}${i < entries.length - 1 ? ',' : ''}`,
    );
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
    const lines = entries.map(([k, v], i) =>
      typeof v === 'string'
        ? `            ${k}: "${v}"${i < entries.length - 1 ? ',' : ''}`
        : `            ${k}: ${v}${i < entries.length - 1 ? ',' : ''}`,
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
