'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DocsPage, DocsBody } from 'fumadocs-ui/layouts/docs/page';

export default function NotFound() {
  const pathname = usePathname();
  return (
    <DocsPage full={true}>
      <DocsBody>
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100lvh-6.5rem)] overflow-hidden">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          {/* card */}
          <div className="relative w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-2xl shadow-black/5 transition-all duration-300 hover:shadow-3xl ">
            {/* query bar */}
            <div className="flex items-center gap-3 border-b border-fd-border bg-fd-secondary/20 px-4 sm:px-6 py-3.5">
              <Image src="/serphouse-logo.svg" alt="SERPHouse" width={16} height={16} className="size-4 shrink-0" />
              <code className="flex-1 truncate font-mono text-sm text-fd-foreground/80">
                GET {pathname}
              </code>
              <span className="shrink-0 animate-in fade-in zoom-in duration-500 delay-300 rounded-md bg-red-500/10 px-2 py-0.5 font-mono text-xs font-medium text-red-500 ring-1 ring-red-500/20 shadow-[0_0_12px_-4px] shadow-red-500/30">
                404
              </span>
            </div>

            {/* result body */}
            <div className="px-4 sm:px-6 py-10 sm:py-12 text-center">
              <div className="mb-1 font-mono text-6xl font-bold tracking-tight text-fd-foreground sm:text-7xl md:text-8xl leading-none">
                0{' '}
                <span className="bg-gradient-to-b from-amber-400/70 to-amber-600/20 bg-clip-text text-transparent">
                  Results
                </span>
              </div>
              <p className="mx-auto mt-4 max-w-xs text-sm text-fd-muted-foreground/80 leading-relaxed">
                Lost? Us too. This page doesn&apos;t exist.
              </p>
            </div>

            {/* meta row */}
            <div className="flex items-center justify-between border-t border-fd-border bg-fd-secondary/20 px-4 sm:px-6 py-3 font-mono text-xs text-fd-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-500/60 animate-pulse" />
                status: Not Found
              </span>
              <span>latency: 0ms</span>
            </div>
          </div>

          {/* actions */}
          <div className="relative mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            <Link
              href="/about-the-serp-api"
              className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-fd-muted-foreground transition-all duration-200 hover:text-fd-foreground hover:bg-fd-secondary/50"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to docs
            </Link>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
