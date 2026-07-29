import { Tabs, TabsList, TabsTrigger, TabsContent } from 'fumadocs-ui/components/tabs';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { renderRequest, formatResponse, REQUEST_TABS, TRAFFIC_DOTS, type Fmt } from '@/lib/apiExample';
import { Children, type ReactNode } from 'react';

type RequestExampleProps = {
  mode?: 'request';
  endpoint: string;
  query: string;
  domain?: string;
  lang?: string;
  params?: string;
};

type ResponseExampleProps = {
  mode: 'response';
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

export function ApiTab({ label, response }: { label: string; response: string | Record<string, unknown> }) {
  return null;
}

export function ApiCodeBlock({
  endpoint,
  query = '',
  domain = 'google.com',
  lang = 'en',
  params = '{}',
  fmt,
}: {
  endpoint: string;
  query?: string;
  domain?: string;
  lang?: string;
  params?: string;
  fmt: Fmt;
}) {
  const extraParams = parseParams(params);
  const tab = REQUEST_TABS.find((t) => t.fmt === fmt);
  return (
    <DynamicCodeBlock
      lang={tab?.codeLang ?? 'bash'}
      code={renderRequest(endpoint, query, domain, lang, extraParams, fmt)}
      codeblock={{ allowCopy: true }}
    />
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
      ? childArray.map((child: any) => ({
          label: child.props?.label ?? 'Response',
          response: child.props?.response,
        }))
      : response
        ? [{ label: 'Response', response }]
        : [];

  if (tabs.length === 0) return null;

  return (
    <Tabs defaultValue={tabs[0].label}>
      <TabsList>
        {TRAFFIC_DOTS}
        {tabs.map((t) => (
          <TabsTrigger key={t.label} value={t.label}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.label} value={t.label}>
          <DynamicCodeBlock
            lang="json"
            code={formatResponse(t.response)}
            codeblock={{ allowCopy: true }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function RequestExample({
  endpoint,
  query,
  domain = 'google.com',
  lang = 'en',
  params = '{}',
}: Omit<RequestExampleProps, 'mode'>) {
  const extraParams = parseParams(params);

  return (
    <Tabs defaultValue={REQUEST_TABS[0].label}>
      <TabsList>
        {TRAFFIC_DOTS}
        {REQUEST_TABS.map((t) => (
          <TabsTrigger key={t.label} value={t.label} className="flex items-center gap-2">
            <span>{t.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {REQUEST_TABS.map((t) => (
        <TabsContent key={t.label} value={t.label}>
          <DynamicCodeBlock
            lang={t.codeLang}
            code={renderRequest(endpoint, query, domain, lang, extraParams, t.fmt)}
            codeblock={{ allowCopy: true }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function ApiExample(props: ApiExampleProps) {
  if (props.mode === 'response') {
    return <ResponseExample response={props.response} children={props.children} />;
  }
  return <RequestExample {...props} />;
}
