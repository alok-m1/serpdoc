"use client";
import { type ComponentProps, type SyntheticEvent, useEffect, useState } from "react";
import { ArrowUp, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { useChatContext } from "./context";
import { brandGradient, sendUserMessage, StorageKeyInput } from "./constants";

export function AISearchInput(props: ComponentProps<"form">) {
  const { status, stop } = useChatContext();
  const chat = useChatContext();
  const [input, setInput] = useState(
    () => localStorage.getItem(StorageKeyInput) ?? "",
  );
  const isLoading = status === "streaming" || status === "submitted";
  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (isLoading) return;
    const message = input.trim();
    if (message.length === 0) return;

    sendUserMessage(chat, message);
    setInput("");
    localStorage.removeItem(StorageKeyInput);
  };

  useEffect(() => {
    if (isLoading) document.getElementById("nd-ai-input")?.focus();
  }, [isLoading]);

  return (
    <form
      {...props}
      className={cn("flex items-end gap-2 p-2", props.className)}
      onSubmit={onStart}
    >
      <Input
        value={input}
        placeholder={isLoading ? "AI is answering…" : "Ask a question"}
        autoFocus
        className="px-2 py-2.5 text-sm leading-relaxed"
        onChange={(e) => {
          setInput(e.target.value);
          localStorage.setItem(StorageKeyInput, e.target.value);
        }}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === "Enter") {
            onStart(event);
          }
        }}
      />
      {isLoading ? (
        <button
          key="abort"
          type="button"
          aria-label="Abort answer"
          className="grid size-9 shrink-0 place-items-center rounded-full border bg-fd-secondary text-fd-muted-foreground transition hover:bg-fd-accent"
          onClick={stop}
        >
          <Loader2 className="size-4 animate-spin" />
        </button>
      ) : (
        <button
          key="send"
          type="submit"
          aria-label="Send"
          disabled={input.length === 0}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-fd-primary-foreground shadow-md shadow-fd-primary/20 transition hover:opacity-90 active:scale-95 disabled:opacity-35 disabled:shadow-none",
            brandGradient,
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </form>
  );
}

export function AISearchInputActions() {
  const { messages, status, setMessages, regenerate } = useChatContext();
  const isLoading = status === "streaming";

  if (messages.length === 0) return null;

  return (
    <>
      {!isLoading && messages.at(-1)?.role === "assistant" && (
        <button
          type="button"
          className={cn(
            buttonVariants({
              color: "secondary",
              size: "sm",
              className: "gap-1.5 rounded-full",
            }),
          )}
          onClick={() => regenerate()}
        >
          <RefreshCw className="size-3.5" />
          Retry
        </button>
      )}
      <button
        type="button"
        className={cn(
          buttonVariants({
            color: "secondary",
            size: "sm",
            className: "gap-1.5 rounded-full",
          }),
        )}
        onClick={() => setMessages([])}
      >
        <Trash2 className="size-3.5" />
        Clear Chat
      </button>
    </>
  );
}

function Input(props: ComponentProps<"textarea">) {
  const shared = cn("col-start-1 row-start-1", props.className);

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          "resize-none bg-transparent placeholder:text-fd-muted-foreground focus-visible:outline-none",
          shared,
        )}
      />
      <div className={cn(shared, "break-all invisible")}>
        {`${props.value?.toString() ?? ""}\n`}
      </div>
    </div>
  );
}
