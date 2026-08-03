"use client";
import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { useAISearchContext } from "./context";

export function AISearchPanelHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  const { setOpen } = useAISearchContext();

  return (
    <div
      className={cn("relative flex items-center gap-3 px-1 pb-2", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold tracking-tight">SERPHouse AI</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs leading-snug text-fd-muted-foreground/80">
          Answers grounded in our docs AI can be inaccurate, please verify.
        </p>
      </div>

      <button
        aria-label="Close"
        tabIndex={-1}
        className={cn(
          buttonVariants({
            size: "icon-sm",
            color: "ghost",
            className: "shrink-0 rounded-full text-fd-muted-foreground",
          }),
        )}
        onClick={() => setOpen(false)}
      >
        <X />
      </button>
    </div>
  );
}
