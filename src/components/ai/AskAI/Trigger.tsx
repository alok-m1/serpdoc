"use client";
import { type ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { useAISearchContext } from "./context";

export function AISearchTrigger({
  position = "default",
  className,
  ...props
}: ComponentProps<"button"> & { position?: "default" | "float" }) {
  const { open, setOpen } = useAISearchContext();

  return (
    <button
      data-state={open ? "open" : "closed"}
      className={cn(
        position === "float" && [
          "fixed bottom-4 gap-2 w-28 inset-e-[calc(--spacing(4)+var(--removed-body-scroll-bar-size,0px))] shadow-lg z-20 backdrop-blur-sm transition-[translate,opacity,box-shadow] hover:shadow-xl hover:shadow-fd-primary/10",
          open && "translate-y-10 opacity-0",
        ],
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {props.children}
    </button>
  );
}
