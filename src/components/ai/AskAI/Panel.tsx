"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/cn";
import { useAISearchContext } from "./context";
import { AISearchPanelHeader } from "./Header";
import { AISearchPanelList } from "./PanelList";
import { AISearchInput, AISearchInputActions } from "./Input";

function useHotKey() {
  const { open, setOpen } = useAISearchContext();

  const onKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === "/" && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true);
      e.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, []);
}

export function AISearchPanel() {
  const { open, setOpen } = useAISearchContext();
  const [actualOpen, setActualOpen] = useState(open);
  useHotKey();

  if (open && !actualOpen) setActualOpen(open);

  return (
    <>
      <style>
        {`
        @keyframes ask-ai-open {
          from {
            translate: 100% 0;
          }
          to {
            translate: 0 0;
          }
        }
        @keyframes ask-ai-close {
          from {
            width: var(--ai-chat-width);
          }
          to {
            width: 0px;
          }
        }
        @keyframes ask-ai-bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          40% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ask-ai-bounce {
            0%, 80%, 100% { opacity: 0.5; }
            40% { opacity: 1; }
          }
        }`}
      </style>
      {actualOpen && (
        <div
          className={cn(
            "fixed inset-0 z-30 backdrop-blur-xs bg-fd-overlay lg:hidden",
            open ? "animate-fd-fade-in" : "animate-fd-fade-out",
          )}
          onClick={() => setOpen(false)}
          onAnimationEnd={() => {
            if (!open) flushSync(() => setActualOpen(false));
          }}
        />
      )}
      {actualOpen && (
        <div
          className={cn(
            "overflow-hidden z-30 bg-fd-card text-fd-card-foreground [--ai-chat-width:400px] 2xl:[--ai-chat-width:460px]",
            "max-lg:fixed max-lg:inset-x-2 max-lg:inset-y-4 max-lg:border max-lg:rounded-2xl max-lg:shadow-xl",
            "lg:sticky lg:top-0 lg:h-dvh lg:border-s lg:ms-auto lg:in-[#nd-docs-layout]:[grid-area:toc] lg:in-[#nd-notebook-layout]:row-span-full lg:in-[#nd-notebook-layout]:col-start-5",
            open
              ? "animate-fd-dialog-in lg:animate-[ask-ai-open_200ms]"
              : "animate-fd-dialog-out lg:animate-[ask-ai-close_200ms]",
          )}
          onAnimationEnd={() => {
            if (!open) flushSync(() => setActualOpen(false));
          }}
        >
          <div className="relative flex flex-col size-full p-2 lg:p-3 lg:w-(--ai-chat-width)">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-fd-primary/8 to-transparent" />
            <AISearchPanelHeader className="relative" />
            <AISearchPanelList className="relative flex-1" />
            <div className="relative mt-3 rounded-2xl bg-fd-secondary/50 shadow-sm ring-1 ring-fd-border/70 ring-inset backdrop-blur-sm transition-all duration-200 focus-within:ring-fd-primary/30 focus-within:shadow-md focus-within:shadow-fd-primary/5">
              <AISearchInput />
              <div className="flex items-center gap-1.5 p-1.5 empty:hidden">
                <AISearchInputActions />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
