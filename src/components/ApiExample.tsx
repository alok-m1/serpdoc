import { Tabs, TabsList, TabsTrigger, TabsContent } from 'fumadocs-ui/components/tabs';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

interface ApiExampleProps {
  endpoint: string;
  query: string;
  domain?: string;
  lang?: string;
  params?: string;
}

function renderData(
  endpoint: string,
  query: string,
  domain: string,
  lang: string,
  extraParams: Record<string, string | number | boolean>,
  fmt: 'curl' | 'js' | 'py' | 'php' | 'go',
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

function parseParams(params: string) {
  try {
    return JSON.parse(params) as Record<string, string | number | boolean>;
  } catch {
    return {};
  }
}

const TRAFFIC_DOTS = (
  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
  </span>
);

export function ApiExample({
  endpoint,
  query,
  domain = 'google.com',
  lang = 'en',
  params = '{}',
}: ApiExampleProps) {
  const extraParams = parseParams(params);

  const tabs: { label: string; fmt: 'curl' | 'js' | 'py' | 'php' | 'go'; codeLang: string }[] = [
    { label: 'curl', fmt: 'curl', codeLang: 'bash' },
    { label: 'Node.js', fmt: 'js', codeLang: 'javascript' },
    { label: 'Python', fmt: 'py', codeLang: 'python' },
    { label: 'PHP', fmt: 'php', codeLang: 'php' },
    { label: 'Go', fmt: 'go', codeLang: 'go' },
  ];

  return (
    <Tabs defaultValue={tabs[0].label}>
      <TabsList>
        {TRAFFIC_DOTS}
        {tabs.map((t) => (
          <TabsTrigger key={t.label} value={t.label} className="flex items-center gap-2">
            <span>{t.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.label} value={t.label}>
          <DynamicCodeBlock
            lang={t.codeLang}
            code={renderData(endpoint, query, domain, lang, extraParams, t.fmt)}
            codeblock={{ allowCopy: true }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
