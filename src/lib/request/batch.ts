import type { BatchItem, Fmt } from "./types";
import { batchItemCompact, formatValue } from "./format";

export function renderBatchRequest(
  endpoint: string,
  items: BatchItem[],
  fmt: Fmt,
) {
  if (fmt === "curl") {
    const itemBlocks = items.map((item) => {
      const fields = Object.entries(item).map(
        ([k, v], i) =>
          `            "${k}": ${formatValue(v)}${i < Object.keys(item).length - 1 ? "," : ""}`,
      );
      return [`        {`, ...fields, `        }`].join("\n");
    });
    return [
      `curl --location --request POST '${endpoint}' \\`,
      `--header 'Authorization: Bearer <YOUR_API_KEY>' \\`,
      `--header 'Content-Type: application/json' \\`,
      `--data-raw '{`,
      `    "data": [`,
      itemBlocks.join(",\n"),
      `    ]`,
      `}'`,
    ].join("\n");
  }

  if (fmt === "js") {
    const itemLines = items
      .map(
        (item, i) =>
          `        { ${batchItemCompact(item, "js")} }${i < items.length - 1 ? "," : ""}`,
      )
      .join("\n");
    return [
      `const express = require("express");`,
      `const app = express();`,
      ``,
      `app.use(express.json());`,
      ``,
      `app.post("/search", async (req, res) => {`,
      `  const response = await fetch("${endpoint}", {`,
      `    method: "POST",`,
      `    headers: {`,
      `      Authorization: \`Bearer <YOUR_API_KEY>\`,`,
      `      "Content-Type": "application/json",`,
      `    },`,
      `    body: JSON.stringify({`,
      `      data: [`,
      itemLines,
      `      ],`,
      `    }),`,
      `  });`,
      ``,
      `  const data = await response.json();`,
      `  res.json(data);`,
      `});`,
      ``,
      `app.listen(3000);`,
    ].join("\n");
  }

  if (fmt === "py") {
    const itemLines = items
      .map(
        (item, i) =>
          `        { ${batchItemCompact(item, "py")} }${i < items.length - 1 ? "," : ""}`,
      )
      .join("\n");
    return [
      `import requests`,
      ``,
      `url = "${endpoint}"`,
      `headers = {`,
      `    "Authorization": "Bearer <YOUR_API_KEY>",`,
      `    "Content-Type": "application/json"`,
      `}`,
      `payload = {`,
      `    "data": [`,
      itemLines,
      `    ]`,
      `}`,
      ``,
      `response = requests.post(url, json=payload, headers=headers)`,
      `print(response.json())`,
    ].join("\n");
  }

  if (fmt === "php") {
    const itemLines = items
      .map(
        (item, i) =>
          `        [ ${batchItemCompact(item, "php")} ]${i < items.length - 1 ? "," : ""}`,
      )
      .join("\n");
    return [
      `<?php`,
      ``,
      `$apiKey = "<YOUR_API_KEY>";`,
      `$url = "${endpoint}";`,
      ``,
      `$payload = json_encode([`,
      `    "data" => [`,
      itemLines,
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

  const itemLines = items
    .map(
      (item) =>
        `            map[string]interface{}{ ${batchItemCompact(item, "json")} },`,
    )
    .join("\n");
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
    `        "data": []interface{}{`,
    itemLines,
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
