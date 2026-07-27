import type { FC, SVGProps } from "react";
import { Globe, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/icons/brand-icons";
import { cn } from "@/lib/cn";
import { socialLinks } from "@/lib/shared";
import Link from "fumadocs-core/link";

const iconMap = {
  X: XIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Website: Globe,
  Email: Mail,
} as const;

const styleMap = {
  X: {
    iconClass: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
    hoverClass: "hover:border-zinc-400/40 hover:bg-zinc-500/[0.06]",
  },
  LinkedIn: {
    iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    hoverClass: "hover:border-sky-500/35 hover:bg-sky-500/[0.06]",
  },
  GitHub: {
    iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    hoverClass: "hover:border-violet-500/35 hover:bg-violet-500/[0.06]",
  },
  Website: {
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    hoverClass: "hover:border-blue-500/35 hover:bg-blue-500/[0.06]",
  },
  Email: {
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    hoverClass: "hover:border-amber-500/35 hover:bg-amber-500/[0.06]",
  },
} as const;

export const SocialLinks: FC = () => {
  return (
    <div className="not-prose my-4 flex flex-wrap gap-2">
      {socialLinks.map((social) => {
        const Icon = iconMap[social.name];
        const styles = styleMap[social.name];
        const isMail = social.href.startsWith("mailto:");

        return (
          <Link
            key={social.name}
            href={social.href}
            {...(!isMail
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className={cn(
              "group inline-flex items-center gap-2.5 rounded-lg border bg-fd-card px-3 py-2 transition-colors",
              styles.hoverClass,
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md",
                styles.iconClass,
              )}
            >
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-xs font-medium text-fd-foreground">
                {social.name}
              </span>
              <span className="truncate text-[11px] text-fd-muted-foreground">
                {social.handle}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
};
