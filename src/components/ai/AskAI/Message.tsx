"use client";
import type { ComponentProps } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import type { Tool, UIToolInvocation } from "ai";
import { cn } from "@/lib/cn";
import { Markdown } from "@/components/markdown";
import { BrandMark } from "./BrandMark";
import type { ChatUIMessage, SearchTool } from "./types";

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-fd-primary px-4 py-2.5 text-sm text-fd-primary-foreground shadow-sm">
        {text}
      </div>
    </div>
  );
}

function SearchPills({ calls }: { calls: UIToolInvocation<SearchTool>[] }) {
  if (calls.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {calls.map((call) => {
        const error =
          call.state === "output-error" || call.state === "output-denied";
        return (
          <span
            key={call.toolCallId}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
              error
                ? "border-fd-error/30 bg-fd-error/10 text-fd-error"
                : "border-fd-primary/20 bg-fd-primary/8 text-fd-primary",
            )}
          >
            {error ? (
              <>
                <AlertCircle className="size-3" />
                Search failed
              </>
            ) : call.output ? (
              <>
                <Check className="size-3" />
                {call.output.length} sources
              </>
            ) : (
              <>
                <Loader2 className="size-3 animate-spin" />
                Searching docs…
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatUIMessage }) {
  let markdown = "";
  const searchCalls: UIToolInvocation<SearchTool>[] = [];

  for (const part of message.parts ?? []) {
    if (part.type === "text") {
      markdown += part.text;
      continue;
    }

    if (part.type.startsWith("tool-")) {
      const toolName = part.type.slice("tool-".length);
      const p = part as UIToolInvocation<Tool>;

      if (toolName !== "search" || !p.toolCallId) continue;
      searchCalls.push(p);
    }
  }

  return (
    <div className="flex items-start gap-2.5">
      <BrandMark size="sm" className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-xs font-semibold tracking-tight">
          SERPHouse AI
        </p>
        <div className="prose prose-sm max-w-none text-sm">
          <Markdown text={markdown} />
        </div>
        <SearchPills calls={searchCalls} />
      </div>
    </div>
  );
}

export function Message({
  message,
  ...props
}: { message: ChatUIMessage } & ComponentProps<"div">) {
  if (message.role === "user") {
    const text =
      message.parts
        ?.filter((part) => part.type === "text" && "text" in part)
        .map((part) => (part as { text: string }).text)
        .join("") ?? "";

    return (
      <div onClick={(e) => e.stopPropagation()} {...props}>
        <UserMessage text={text} />
      </div>
    );
  }

  return (
    <div onClick={(e) => e.stopPropagation()} {...props}>
      <AssistantMessage message={message} />
    </div>
  );
}

export function ThinkingIndicator({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <BrandMark size="sm" />
      <div className="flex items-center gap-2 rounded-full bg-fd-secondary px-3 py-2.5">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-fd-muted-foreground/70 animate-[ask-ai-bounce_1.2s_infinite]"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-fd-muted-foreground">
          {message}
        </span>
      </div>
    </div>
  );
}
