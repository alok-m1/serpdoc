"use client";

import type { ComponentProps } from "react";
import Link from "fumadocs-core/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

interface CustomLinkProps extends ComponentProps<typeof Link> {}

export function CustomLink({
  href = "#",
  external = !!(href.match(/^\w+:/) || href.startsWith("//")),
  children,
  className,
  ...props
}: CustomLinkProps) {
  return (
    <Link
      href={href}
      external={external}
      className={cn(
        "group/link relative inline-flex items-center gap-1 font-medium transition-all duration-200",
        "hover:opacity-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-1",
        className,
      )}
      {...props}
    >
      {children}
      {external && (
        <ExternalLink
          aria-hidden
          className="size-3.5 shrink-0 text-fd-muted-foreground transition-all duration-200 group-hover/link:translate-x-[1.5px] group-hover/link:-translate-y-[1.5px] group-hover/link:text-fd-primary"
        />
      )}
    </Link>
  );
}
