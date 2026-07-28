'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="relative flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-fd-primary/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        {/* brand */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-2.5 rounded-full bg-fd-secondary/60 px-4 py-1.5 ring-1 ring-fd-border">
            <Image src="/serphouse-logo.svg" alt="SERPHouse" width={18} height={18} className="size-4.5" />
            <span className="text-xs font-medium tracking-wide text-fd-muted-foreground">SERPHouse</span>
          </div>
        </div>

        {/* signature element: a search request rendered like an API/SERP result with zero hits */}
        <div className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card/60 shadow-2xl shadow-black/5 backdrop-blur-sm">
          {/* query bar */}
          <div className="flex items-center gap-3 border-b border-fd-border px-5 py-4">
            <svg className="size-4 shrink-0 text-fd-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <code className="flex-1 truncate font-mono text-sm text-fd-foreground">
              GET {pathname}
            </code>
            <span className="shrink-0 rounded-md bg-red-500/10 px-2 py-0.5 font-mono text-xs font-medium text-red-500">
              404
            </span>
          </div>

          {/* result body */}
          <div className="px-5 py-8 text-center">
            <div className="mb-1 font-mono text-6xl font-bold tracking-tight text-fd-foreground/90 sm:text-7xl">
              0 <span className="text-fd-muted-foreground/50">Results</span>
            </div>
            <p className="mx-auto mt-4 max-w-sm text-sm text-fd-muted-foreground">
              This page doesn&apos;t exist, or it moved. No index, no cache, nothing to return.
            </p>
          </div>

          {/* footer / meta row, styled like a response status line */}
          <div className="flex items-center justify-between border-t border-fd-border bg-fd-secondary/30 px-5 py-3 font-mono text-xs text-fd-muted-foreground">
            <span>status: Not Found</span>
            <span>latency: 0ms</span>
          </div>
        </div>

        {/* actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/about-the-serp-api"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 ring-1 ring-zinc-700/50 transition-all hover:from-zinc-700 hover:to-zinc-800 dark:from-white dark:to-zinc-100 dark:text-zinc-900 dark:shadow-white/10 dark:ring-zinc-200/60 dark:hover:from-zinc-100 dark:hover:to-white"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </div>
  );
}
