'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';


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

const MIN_SCALE = 1;
const MAX_SCALE = 10;

export function VisualRef({ src, alt, title, annotations }: VisualRefProps) {
  const [open, setOpen] = useState(false);
  // Only used to re-render the "% zoom" badge and to toggle reset-button visibility.
  // Not read during drag/wheel — those mutate the DOM directly via refs.
  const [scaleLabel, setScaleLabel] = useState(1);

  const imgRef = useRef<HTMLImageElement>(null);
  const transform = useRef({ scale: 1, x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const applyTransform = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    const { scale, x, y } = transform.current;
    el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }, []);

  // Throttle the state sync (drives the % badge / reset button) to animation frames
  // instead of on every raw event.
  const scheduleLabelSync = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      setScaleLabel(transform.current.scale);
    });
  }, []);

  const clampScale = (s: number) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

  const setScale = useCallback((next: number) => {
    const clamped = clampScale(next);
    transform.current.scale = clamped;
    if (clamped <= MIN_SCALE) {
      transform.current.x = 0;
      transform.current.y = 0;
    }
    applyTransform();
    scheduleLabelSync();
  }, [applyTransform, scheduleLabelSync]);

  const close = useCallback(() => {
    setOpen(false);
    transform.current = { scale: 1, x: 0, y: 0 };
    setScaleLabel(1);
  }, []);

  const zoomIn = useCallback(() => setScale(transform.current.scale * 1.5), [setScale]);
  const zoomOut = useCallback(() => setScale(transform.current.scale / 1.5), [setScale]);
  const resetZoom = useCallback(() => setScale(1), [setScale]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    setScale(transform.current.scale * delta);
  }, [setScale]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (transform.current.scale <= MIN_SCALE) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX - transform.current.x, y: e.clientY - transform.current.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || transform.current.scale <= MIN_SCALE) return;
    transform.current.x = e.clientX - dragStart.current.x;
    transform.current.y = e.clientY - dragStart.current.y;
    applyTransform();
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow="hidden"
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
       document.body.style.overflow = '';

    }
  }, [open, close, zoomIn, zoomOut, resetZoom]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

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
          <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
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
          className="fixed inset-0 z-50 flex items-center justify-center  p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Full-size view: ${alt}`}
        >
          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl bg-fd-card shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: scaleLabel > 1 ? 'grab' : 'default' }}
          >
            <div className="absolute right-3 top-3 z-10 flex gap-1.5">
              <button onClick={zoomIn} className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70" aria-label="Zoom in" title="Zoom in (+)">
                <ZoomIn className="size-4" />
              </button>
              <button onClick={zoomOut} className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70" aria-label="Zoom out" title="Zoom out (-)">
                <ZoomOut className="size-4" />
              </button>
              {scaleLabel !== 1 && (
                <button onClick={resetZoom} className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70" aria-label="Reset zoom" title="Reset zoom (0)">
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button onClick={close} className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70" aria-label="Close" title="Close (Esc)">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex max-h-[90vh] max-w-[95vw] items-center justify-center overflow-hidden p-4">
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                draggable={false}
                style={{ transform: 'translate(0px, 0px) scale(1)', willChange: 'transform' }}
              />
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none">
                <p className="text-sm font-medium text-primary p-2 rounded-sm backdrop-blur-lg">{title}</p>
              </div>
            )}
            {scaleLabel !== 1 && (
              <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm pointer-events-none">
                {Math.round(scaleLabel * 100)}%
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
