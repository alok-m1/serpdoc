"use client";
import { type ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { useAISearchContext } from "./context";

const gradientBorder =
  "relative rounded-full border border-transparent bg-origin-border p-[1.5px] [background-clip:padding-box,border-box] [background-image:linear-gradient(var(--color-fd-background),var(--color-fd-background)),linear-gradient(120deg,theme(colors.pink.500),theme(colors.violet.500),theme(colors.blue.500))]";

const gradientGlow =
  "before:absolute before:inset-0 before:-z-10 before:rounded-full before:blur-md before:opacity-40 before:bg-[linear-gradient(120deg,theme(colors.pink.500),theme(colors.violet.500),theme(colors.blue.500))]";

export function AISearchTrigger({
  position = "default",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { position?: "default" | "float" }) {
  const { open, setOpen } = useAISearchContext();

  return (
    <button
      type="button"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      className={cn(
        gradientBorder,
        gradientGlow,
        position === "float" && [
          "fixed z-20 bottom-4 inset-e-[calc(--spacing(4)+var(--removed-body-scroll-bar-size,0px))]",
          "w-28 gap-2 shadow-lg backdrop-blur-sm transition-[translate,opacity,box-shadow] hover:shadow-xl hover:shadow-fd-primary/10",
          open && "translate-y-10 opacity-0",
        ],
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}
