import { buildQueryString, formatValue, jsonFields } from "./format";
import { renderNodeSdk } from "./node";
import { renderPhpSdk } from "./php";
import { renderPySdk } from "./py";
import { sdkCallFor, type Fmt, type Params } from "./types";

export function renderRequest(
  endpoint: string,
  query: string,
  domain: string,
  lang: string,
  extraParams: Params,
  fmt: Fmt,
  method: "GET" | "POST" = "POST",
) {
  const entries = Object.entries(extraParams);

  if (method === "GET") {
    const url = `${endpoint}${buildQueryString(query, domain, lang, entries)}`;

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
      const call = sdkCallFor(endpoint);
      if (call) {
        return renderPySdk(
          call,
          query,
          domain,
          lang,
          extraParams,
          endpoint,
          method,
        );
      }
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
    const fields = jsonFields(query, domain, lang, entries);
    const body = fields.map((f) => `        ${f}`).join(",\n");
    return [
      `curl --location --request POST '${endpoint}' \\`,
      `--header 'Authorization: Bearer <YOUR_API_KEY>' \\`,
      `--header 'Content-Type: application/json' \\`,
      `--data-raw '{`,
      `    "data": {`,
      body,
      `    }`,
      `}'`,
    ].join("\n");
  }

  if (fmt === "js") {
    const call = sdkCallFor(endpoint);
    if (call) {
      return renderNodeSdk(call, query, domain, lang, extraParams, endpoint);
    }
    const fields: string[] = [];
    if (query) fields.push(`q: ${JSON.stringify(query)}`);
    if (query && domain) fields.push(`domain: ${JSON.stringify(domain)}`);
    if (query && lang) fields.push(`lang: ${JSON.stringify(lang)}`);
    for (const [k, v] of entries) fields.push(`${k}: ${formatValue(v)}`);
    const body = fields.map((f) => `        ${f}`).join(",\n");
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
      body,
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
    const call = sdkCallFor(endpoint);
    if (call) {
      return renderPySdk(
        call,
        query,
        domain,
        lang,
        extraParams,
        endpoint,
        method,
      );
    }
    const fields = jsonFields(query, domain, lang, entries);
    const body = fields.map((f) => `        ${f},`).join("\n");
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
      body,
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
    const fields: string[] = [];
    if (query) fields.push(`"q" => ${JSON.stringify(query)},`);
    if (query && domain) fields.push(`"domain" => ${JSON.stringify(domain)},`);
    if (query && lang) fields.push(`"lang" => ${JSON.stringify(lang)},`);
    for (const [k, v] of entries) fields.push(`"${k}" => ${formatValue(v)},`);
    const body = fields.map((f) => `        ${f}`).join("\n");
    return [
      `<?php`,
      ``,
      `$apiKey = "<YOUR_API_KEY>";`,
      `$url = "${endpoint}";`,
      ``,
      `$payload = json_encode([`,
      `    "data" => [`,
      body,
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

  const fields: string[] = [];
  if (query) fields.push(`"q":      ${JSON.stringify(query)},`);
  if (query && domain) fields.push(`"domain": ${JSON.stringify(domain)},`);
  if (query && lang) fields.push(`"lang":   ${JSON.stringify(lang)},`);
  for (const [k, v] of entries) fields.push(`"${k}": ${formatValue(v)},`);
  const body = fields.map((f) => `            ${f}`).join("\n");
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
    body,
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
