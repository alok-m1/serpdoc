"use client";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { AISearch } from "./Provider";
import { AISearchPanel } from "./Panel";
import { AISearchTrigger } from "./Trigger";

export function AskFromAI() {
  return (
    <AISearch>
      <AISearchPanel />
      <AISearchTrigger
        position="float"
        className={cn(
          buttonVariants({
            variant: "secondary",
            className: "rounded-full text-fd-muted-foreground shadow-lg",
          }),
        )}
      >
        <Image
          src="/serphouse-logo.svg"
          alt="SERPHouse"
          width={18}
          height={18}
          className="size-4.5 object-cover"
        />
        Ask AI
      </AISearchTrigger>
    </AISearch>
  );
}
