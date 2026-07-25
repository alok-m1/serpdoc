"use client";
import type { FC, ReactNode } from "react";

export const ManualSetup: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <details className="group my-4 overflow-hidden rounded-xl border border-fd-border bg-fd-card transition-colors [&>pre]:mt-0">
      <summary
        className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-sm font-medium text-fd-foreground select-none hover:bg-fd-accent/50 [&::-webkit-details-marker]:hidden"
      >
        <svg
          className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-open:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Manual setup
        <span className="ml-auto text-xs font-normal text-fd-muted-foreground">optional</span>
      </summary>
      <div className="border-t border-fd-border px-4 py-3 text-sm text-fd-muted-foreground [&_figure.shiki]:border-0 [&_figure.shiki]:rounded-none [&_figure.shiki]:bg-transparent [&_figure.shiki]:shadow-none [&_figure.shiki]:my-0">
        {children}
      </div>
    </details>
  );
};
