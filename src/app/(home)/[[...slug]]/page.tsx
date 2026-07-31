import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { notFound, redirect } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { CustomLink } from "@/components/CustomLink";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { gitConfig, appName } from "@/lib/shared";
import { submitFeedback } from "@/lib/feedback";
import { Feedback } from "@/components/feedback/client";

const baseUrl = "https://serphouse.com";

function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function DocJsonLd({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: title,
        description,
        url,
        author: { "@type": "Organization", name: appName, url: baseUrl },
        publisher: { "@type": "Organization", name: appName },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }}
    />
  );
}

function WebSiteJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: appName,
        url: baseUrl,
        description:
          "SERP API documentation — access search results from Google, Bing, Yahoo, and more through a unified REST API.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;

  if (!params.slug) {
    redirect("/about-the-serp-api");
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const canonical = `${baseUrl}/${page.slugs.join("/")}`;

  return (
    <>
      <WebSiteJsonLd />
      <DocJsonLd
        title={page.data.title}
        description={page.data.description ?? ""}
        url={canonical}
      />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
          />
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page, CustomLink),
            })}
          />
        </DocsBody>
        {page.data.lastModified ? (
          <PageLastUpdate date={page.data.lastModified} />
        ) : null}
        <Feedback
          onSendAction={async (feedback) => {
            'use server';
            await submitFeedback(feedback);
            return {};
          }}
        />
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!params.slug) {
    return {
      title: `${appName} — SERP API Documentation`,
      description:
        "Access search results from Google, Bing, Yahoo, and more through a unified REST API. Build SEO tools, monitor rankings, and automate competitive research.",
      alternates: { canonical: baseUrl },
      openGraph: { url: baseUrl },
    };
  }

  if (!page) notFound();

  const canonical = `${baseUrl}/${page.slugs.join("/")}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical },
    openGraph: {
      images: getPageImageUrl(page).url,
      url: canonical,
    },
  };
}
