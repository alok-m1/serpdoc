"use client";

import {
  Tabs as ControlledTabs,
  TabsContent as ControlledTabsContent,
} from "fumadocs-ui/components/ui/tabs";
import { TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { CodeBlock } from "fumadocs-ui/components/codeblock";
import {
  renderRequest,
  renderBatchRequest,
  formatResponse,
  REQUEST_TABS,
  TRAFFIC_DOTS,
  type Fmt,
} from "@/lib/request";
import { Children, useState, type ReactNode } from "react";

const MAX_HIGHLIGHT_CHARS = 80_000;

type RequestExampleProps = {
  mode?: "request";
  endpoint: string;
  query: string;
  domain?: string;
  lang?: string;
  params?: string;
  items?: string;
  method?: "GET" | "POST";
};

type ResponseExampleProps = {
  mode: "response";
  response?: string | Record<string, unknown>;
  children?: ReactNode;
};

type ApiExampleProps = RequestExampleProps | ResponseExampleProps;

function parseParams(params: string) {
  try {
    return JSON.parse(params) as Record<string, string | number | boolean>;
  } catch {
    return {};
  }
}

function parseItems(items?: string) {
  if (!items) return null;
  try {
    const parsed = JSON.parse(items);
    if (Array.isArray(parsed))
      return parsed as Record<string, string | number | boolean>[];
    return null;
  } catch {
    return null;
  }
}

export function ApiTab({
  label,
  response,
  lang = "json",
}: {
  label: string;
  response: string | Record<string, unknown>;
  lang?: string;
}) {
  return null;
}

export function ApiCodeBlock({
  endpoint,
  query = "",
  domain = "google.com",
  lang = "en",
  params = "{}",
  method = "POST",
  fmt,
}: {
  endpoint: string;
  query?: string;
  domain?: string;
  lang?: string;
  params?: string;
  method?: "GET" | "POST";
  fmt: Fmt;
}) {
  const extraParams = parseParams(params);
  const tab = REQUEST_TABS.find((t) => t.fmt === fmt);
  return (
    <DynamicCodeBlock
      lang={tab?.codeLang ?? "bash"}
      code={renderRequest(
        endpoint,
        query,
        domain,
        lang,
        extraParams,
        fmt,
        method,
      )}
      codeblock={{ allowCopy: true }}
    />
  );
}

export function ApiCodeTabs({
  items,
  defaultIndex = 0,
}: {
  items: { label: string; code: string; lang?: string }[];
  defaultIndex?: number;
}) {
  const [active, setActive] = useState<string>();
  const current = items.find((i) => i.label === active) ?? items[defaultIndex];

  return (
    <ControlledTabs
      value={current.label}
      onValueChange={(v) => setActive(v)}
      className="flex flex-col overflow-hidden rounded-xl border bg-fd-secondary my-4"
    >
      <TabsList>
        {TRAFFIC_DOTS}
        {items.map((t) => (
          <TabsTrigger key={t.label} value={t.label}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <ControlledTabsContent
        value={current.label}
        className="p-4 text-[0.9375rem] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
      >
        <DynamicCodeBlock
          lang={current.lang ?? "bash"}
          code={current.code}
          codeblock={{ allowCopy: true }}
        />
      </ControlledTabsContent>
    </ControlledTabs>
  );
}

function ResponseCodeBlock({ lang, code }: { lang: string; code: string }) {
  if (code.length > MAX_HIGHLIGHT_CHARS) {
    return (
      <CodeBlock allowCopy>
        <pre className="px-4 whitespace-pre">{code}</pre>
      </CodeBlock>
    );
  }
  return (
    <DynamicCodeBlock lang={lang} code={code} codeblock={{ allowCopy: true }} />
  );
}

function ResponseExample({
  response,
  children,
}: {
  response?: string | Record<string, unknown>;
  children?: ReactNode;
}) {
  const childArray = Children.toArray(children);
  const tabs =
    childArray.length > 0
      ? childArray
          .map((child: any) => ({
            label: child.props?.label ?? "Response",
            response: child.props?.response,
            lang: child.props?.lang ?? "json",
          }))
          .filter((t) => t.lang !== "html")
      : response
        ? [{ label: "Response", response, lang: "json" }]
        : [];

  const [active, setActive] = useState<string>();

  if (tabs.length === 0) return null;

  const current = tabs.find((t) => t.label === active) ?? tabs[0];

  return (
    <ControlledTabs
      value={current.label}
      onValueChange={(v) => setActive(v)}
      className="flex flex-col overflow-hidden rounded-xl border bg-fd-secondary my-4"
    >
      <TabsList>
        {TRAFFIC_DOTS}
        {tabs.map((t) => (
          <TabsTrigger key={t.label} value={t.label}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <ControlledTabsContent
        value={current.label}
        className="p-4 text-[0.9375rem] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
      >
        <ResponseCodeBlock
          lang={current.lang}
          code={formatResponse(current.response, current.lang)}
        />
      </ControlledTabsContent>
    </ControlledTabs>
  );
}

function RequestExample({
  endpoint,
  query,
  domain = "google.com",
  lang = "en",
  params = "{}",
  items,
  method = "POST",
}: Omit<RequestExampleProps, "mode">) {
  const extraParams = parseParams(params);
  const batchItems = parseItems(items);

  return (
    <ControlledTabs
      defaultValue={REQUEST_TABS[0].label}
      className="flex flex-col overflow-hidden rounded-xl border bg-fd-secondary my-4"
    >
      <TabsList>
        {TRAFFIC_DOTS}
        {REQUEST_TABS.map((t) => (
          <TabsTrigger
            key={t.label}
            value={t.label}
            className="flex items-center gap-2"
          >
            <span>{t.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {REQUEST_TABS.map((t) => (
        <ControlledTabsContent
          key={t.label}
          value={t.label}
          className="p-4 text-[0.9375rem] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
        >
          <DynamicCodeBlock
            lang={t.codeLang}
            code={
              batchItems
                ? renderBatchRequest(endpoint, batchItems, t.fmt)
                : renderRequest(
                    endpoint,
                    query,
                    domain,
                    lang,
                    extraParams,
                    t.fmt,
                    method,
                  )
            }
            codeblock={{ allowCopy: true }}
          />
        </ControlledTabsContent>
      ))}
    </ControlledTabs>
  );
}

export function ApiExample(props: ApiExampleProps) {
  if (props.mode === "response") {
    return (
      <ResponseExample response={props.response}>
        {props.children}
      </ResponseExample>
    );
  }
  return <RequestExample {...props} />;
}
