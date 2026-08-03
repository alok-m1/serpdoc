"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import { CheckIcon, Link2Icon, PlusIcon } from "lucide-react";

const FaqItemContext = createContext<{ index: number; value: string }>({
  index: 0,
  value: "",
});

const FaqAccordionContext = createContext<{
  openItem: (value: string) => void;
}>({
  openItem: () => {},
});

function FaqAccordion({
  className,
  defaultValue = [],
  ...props
}: AccordionPrimitive.Root.Props) {
  const [open, setOpen] = useState<string[]>(defaultValue as string[]);
  const rootRef = useRef<HTMLDivElement>(null);

  const openItem = useCallback((value: string) => {
    const target = rootRef.current?.querySelector(
      `[data-faq-anchor="${value}"]`,
    );
    if (!value || !target) return;

    setOpen([value]);
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  useEffect(() => {
    const checkHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (id) openItem(id);
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [openItem]);

  return (
    <FaqAccordionContext.Provider value={{ openItem }}>
      <AccordionPrimitive.Root
        ref={rootRef}
        data-slot="faq-accordion"
        value={open}
        onValueChange={(value) => setOpen(value)}
        hiddenUntilFound
        className={cn(
          "flex w-full flex-col divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card/50",
          className,
        )}
        {...props}
      />
    </FaqAccordionContext.Provider>
  );
}

function FaqItem({
  className,
  index = 0,
  children,
  ...props
}: AccordionPrimitive.Item.Props & { index?: number }) {
  const value = String(props.value ?? "");

  return (
    <AccordionPrimitive.Item
      data-slot="faq-accordion-item"
      data-faq-anchor={value}
      id={value || undefined}
      className={cn("group/faq-item scroll-mt-28", className)}
      {...props}
    >
      <FaqItemContext.Provider value={{ index, value }}>
        {children}
      </FaqItemContext.Provider>
    </AccordionPrimitive.Item>
  );
}

function FaqTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const { index, value } = useContext(FaqItemContext);
  const { openItem } = useContext(FaqAccordionContext);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${value}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard may be unavailable; the hash link is still set below.
    }
    history.replaceState(null, "", `#${value}`);
    openItem(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AccordionPrimitive.Header className="flex items-center">
      <AccordionPrimitive.Trigger
        data-slot="faq-accordion-trigger"
        className={cn(
          "group/faq-trigger flex w-full min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-3 text-left outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/40",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "hidden w-6 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground/60 select-none transition-colors duration-200 sm:block",
            "group-aria-expanded/faq-trigger:text-primary",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 text-sm font-medium text-foreground">
          {children}
        </span>
        <PlusIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground/70 transition-transform duration-200 ease-out",
            "group-aria-expanded/faq-trigger:rotate-45 group-aria-expanded/faq-trigger:text-primary",
          )}
        />
      </AccordionPrimitive.Trigger>

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link to this question"
        title={copied ? "Link copied" : "Copy link"}
        className={cn(
          "mr-3 flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 transition-opacity duration-150",
          "opacity-0 focus-visible:opacity-100 group-hover/faq-item:opacity-100 group-focus-within/faq-item:opacity-100",
          "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
          copied && "opacity-100 text-primary",
        )}
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <Link2Icon className="size-3.5" />
        )}
      </button>
    </AccordionPrimitive.Header>
  );
}

function FaqContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="faq-accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) px-4 pt-0.5 pb-6 pr-4 data-ending-style:h-0 data-starting-style:h-0 sm:pl-9",
          className,
        )}
      >
        <div
          className={cn(
            "text-sm leading-7 text-muted-foreground",
            "[&_p:not(:last-child)]:mb-4",
            "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2",
            "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2",
            "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg",
            "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg [&_table]:border [&_table]:text-sm [&_th]:border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:px-3 [&_td]:py-2.5",
            "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em] [&_code]:text-foreground",
            "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline",
          )}
        >
          {children}
        </div>
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { FaqAccordion, FaqItem, FaqTrigger, FaqContent };
