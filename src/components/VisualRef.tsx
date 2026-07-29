'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export interface Annotation {
  x: number;
  y: number;
  number: number;
  label: string;
}

interface VisualRefProps {
  src: string;
  alt: string;
  title?: string;
  annotations?: Annotation[];
}

export function VisualRef({ src, alt, title, annotations }: VisualRefProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <>
      <figure
        className="not-prose group relative my-8 cursor-pointer overflow-hidden rounded-xl border bg-fd-card transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-fd-primary/20"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`View full-size screenshot: ${alt}`}
      >
        <div className="flex items-center gap-2 border-b bg-gradient-to-r from-fd-muted to-fd-card px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
          <span className="size-1.5 rounded-full bg-fd-primary/60" />
          {title || 'Visual Reference'}
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-fd-background/60 px-2 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
            <Search className="size-3" />
            Click to expand
          </span>
        </div>
        <div className="relative flex aspect-video items-center justify-center bg-fd-muted/50 p-4">
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
          />
          {annotations?.map((a) => (
            <div
              key={a.number}
              className="absolute flex size-6 items-center justify-center rounded-full bg-fd-primary/80 text-[11px] font-bold text-white shadow-lg ring-2 ring-white/60 backdrop-blur-sm"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              title={a.label}
            >
              {a.number}
            </div>
          ))}
        </div>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Full-size view: ${alt}`}
        >
          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl bg-fd-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[95vw] object-contain"
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
                <p className="text-sm font-medium text-white">{title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
