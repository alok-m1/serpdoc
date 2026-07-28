"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

interface APIRequestUrlProps {
  type: HttpMethod | Lowercase<HttpMethod>;
  url: string;
}

const methodStyles: Record<
  HttpMethod,
  {
    badge: string;
    dot: string;
    glow: string;
  }
> = {
  GET: {
    badge: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/25",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,0.08)]",
  },
  POST: {
    badge: "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/25",
    dot: "bg-blue-400",
    glow: "shadow-[0_0_0_1px_rgba(59,130,246,0.08)]",
  },
  PUT: {
    badge: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/25",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_0_1px_rgba(245,158,11,0.08)]",
  },
  PATCH: {
    badge: "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/25",
    dot: "bg-violet-400",
    glow: "shadow-[0_0_0_1px_rgba(139,92,246,0.08)]",
  },
  DELETE: {
    badge: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/25",
    dot: "bg-red-400",
    glow: "shadow-[0_0_0_1px_rgba(239,68,68,0.08)]",
  },
  OPTIONS: {
    badge: "bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/25",
    dot: "bg-slate-400",
    glow: "shadow-[0_0_0_1px_rgba(100,116,139,0.08)]",
  },
  HEAD: {
    badge: "bg-cyan-500/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/25",
    dot: "bg-cyan-400",
    glow: "shadow-[0_0_0_1px_rgba(34,211,238,0.08)]",
  },
};

export function APIRequestUrl({ type, url }: APIRequestUrlProps) {
  const [copied, setCopied] = useState(false);
  const method = type.toUpperCase() as HttpMethod;
  const style = methodStyles[method];

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={`inline-flex w-fit max-w-full items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/70 py-1.5 pl-1.5 pr-2 backdrop-blur-sm transition-shadow hover:border-white/15 ${style.glow}`}
    >
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wide ${style.badge}`}
      >
        <span className={`size-1.5 rounded-full ${style.dot}`} />
        {method}
      </span>

      <code className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-zinc-300">
        {url}
      </code>

      <button
        onClick={copy}
        className="ml-1 inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200 active:scale-95"
        aria-label="Copy URL"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
