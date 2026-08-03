"use client";
import { type ComponentProps, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { List } from "./List";
import { BrandMark } from "./BrandMark";
import { Message, ThinkingIndicator } from "./Message";
import { useChatContext } from "./context";
import { sendUserMessage, suggestions } from "./constants";

export function AISearchPanelList({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
  const chat = useChatContext();
  const messages = chat.messages.filter((msg) => msg.role !== "system");

  const isSearching = useMemo(() => {
    const last = messages.at(-1);
    if (!last || last.role !== "assistant") return false;

    return (last.parts ?? []).some(
      (part) =>
        part.type.startsWith("tool-") &&
        (part as { state?: string }).state === "input",
    );
  }, [messages]);

  return (
    <List
      className={cn("py-4 overscroll-contain", className)}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, white 1rem, white calc(100% - 1rem), transparent 100%)",
        ...style,
      }}
      {...props}
    >
      {messages.length === 0 ? (
        <div
          className="flex size-full flex-col items-center justify-center gap-7 px-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-7 rounded-full bg-fd-primary/10 blur-3xl" />
            <BrandMark size="lg" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold tracking-tight">
              Ask about the SERP API
            </p>
            <p className="mx-auto max-w-[250px] text-sm leading-relaxed text-fd-muted-foreground">
              Grounded answers from our documentation, in seconds.
            </p>
          </div>
          <div className="grid w-full gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendUserMessage(chat, suggestion)}
                className="group flex w-full items-center justify-between gap-3 rounded-xl bg-fd-secondary/60 px-4 py-3 text-left text-xs font-medium text-fd-muted-foreground ring-1 ring-fd-border/60 ring-inset transition-all duration-200 hover:bg-fd-primary/[0.06] hover:text-fd-foreground hover:ring-fd-primary/25 active:scale-[0.99]"
              >
                <span className="truncate">{suggestion}</span>
                <ArrowUp className="size-3.5 shrink-0 -rotate-45 text-fd-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-3">
          {chat.error && (
            <div className="rounded-xl border border-fd-error/20 bg-fd-error/5 p-2">
              <p className="mb-1 text-xs font-medium text-fd-error">
                Request Failed
              </p>
              <p className="text-sm text-fd-muted-foreground">
                {chat.error.message}
              </p>
            </div>
          )}
          {messages.map((item) => (
            <Message key={item.id} message={item} />
          ))}
          {chat.status === "submitted" && (
            <ThinkingIndicator message="Cooking your query…" />
          )}
          {chat.status === "streaming" && isSearching && (
            <ThinkingIndicator message="Searching the docs…" />
          )}
        </div>
      )}
    </List>
  );
}
