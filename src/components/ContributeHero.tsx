import type { FC } from "react";
import Link from "next/link";
import {
  BookOpen,
  Bot,
  Code2,
  ExternalLink,
  GitPullRequest,
  Lightbulb,
  Package,
  Sparkles,
} from "lucide-react";
import { GitHubIcon } from "@/icons/brand-icons";

const paths = [
  {
    title: "SDKs & Libraries",
    description: "Ship bug fixes, features, and new language ports for the official clients.",
    href: "https://github.com/SERPHouse",
    icon: Package,
    external: true,
  },
  {
    title: "Agent Harnesses",
    description: "Document how SERPHouse plugs into Claude Code, Cursor, Codex, and more.",
    href: "/serphouse/agent-harnesses/agent-skills",
    icon: Bot,
    external: false,
  },
  {
    title: "Documentation",
    description: "Improve guides, fix typos, and add clearer examples for every API.",
    href: "https://github.com/SERPHouse",
    icon: BookOpen,
    external: true,
  },
  {
    title: "Ideas & Integrations",
    description: "Tutorials, example apps, plugins, and translations all count.",
    href: "https://github.com/SERPHouse",
    icon: Lightbulb,
    external: true,
  },
] as const;

export const ContributeHero: FC = () => {
  return (
    <div className="not-prose my-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-fd-primary/20 bg-gradient-to-br from-fd-primary/10 via-fd-card to-fd-card p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-fd-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-fd-primary/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-fd-primary/25 bg-fd-primary/10 px-3 py-1 text-xs font-medium text-fd-primary">
              <Sparkles className="size-3.5" />
              Open source · Community driven
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
              Build the SERP stack with us
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground sm:text-[15px]">
              SERPHouse is built in the open. Fix a bug, ship an SDK feature, write a guide,
              or plug us into a new agent harness — every contribution makes search data
              easier for developers worldwide.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <a
              href="https://github.com/SERPHouse"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-fd-foreground px-5 py-3 text-sm font-semibold text-fd-background shadow-sm transition-all hover:opacity-90 hover:shadow-md"
            >
              <GitHubIcon className="size-4" />
              Contribute on GitHub
              <ExternalLink className="size-3.5 opacity-70" />
            </a>
            <p className="text-center text-xs text-fd-muted-foreground sm:text-right">
              github.com/SERPHouse
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {paths.map((path) => {
          const Icon = path.icon;
          const className =
            "group flex h-full flex-col gap-3 rounded-xl border bg-fd-card p-4 transition-colors hover:border-fd-primary/30 hover:bg-fd-accent/60";

          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border bg-fd-muted text-fd-muted-foreground transition-colors group-hover:border-fd-primary/30 group-hover:text-fd-primary">
                  <Icon className="size-4" />
                </span>
                {path.external ? (
                  <ExternalLink className="size-3.5 text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                ) : null}
              </div>
              <div>
                <h3 className="text-sm font-medium text-fd-foreground">{path.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                  {path.description}
                </p>
              </div>
            </>
          );

          if (path.external) {
            return (
              <a
                key={path.title}
                href={path.href}
                target="_blank"
                rel="noreferrer noopener"
                className={className}
              >
                {body}
              </a>
            );
          }

          return (
            <Link key={path.title} href={path.href} className={className}>
              {body}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-dashed bg-fd-secondary/40 px-4 py-3 text-xs text-fd-muted-foreground">
        <span className="inline-flex items-center gap-1.5 font-medium text-fd-foreground">
          <GitPullRequest className="size-3.5 text-fd-primary" />
          Ready to open a PR?
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Code2 className="size-3.5" />
          Fork → branch → commit → pull request
        </span>
        <a
          href="https://github.com/SERPHouse"
          target="_blank"
          rel="noreferrer noopener"
          className="ms-auto font-medium text-fd-primary underline-offset-4 hover:underline"
        >
          Browse all repos →
        </a>
      </div>
    </div>
  );
};
