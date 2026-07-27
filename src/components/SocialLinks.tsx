import type { FC, SVGProps } from "react";
import { Globe, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/icons/brand-icons";
import { cn } from "@/lib/cn";

type SocialItem = {
  name: string;
  handle: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  iconClass: string;
  hoverClass: string;
};

const socials: SocialItem[] = [
  {
    name: "X",
    handle: "@serphouse",
    href: "https://x.com/serphouse",
    icon: XIcon,
    iconClass: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
    hoverClass: "hover:border-zinc-400/40 hover:bg-zinc-500/[0.06]",
  },
  {
    name: "LinkedIn",
    handle: "serphouse",
    href: "https://linkedin.com/company/serphouse",
    icon: LinkedInIcon,
    iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    hoverClass: "hover:border-sky-500/35 hover:bg-sky-500/[0.06]",
  },
  {
    name: "GitHub",
    handle: "SERPHouse",
    href: "https://github.com/SERPHouse/docs",
    icon: GitHubIcon,
    iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    hoverClass: "hover:border-violet-500/35 hover:bg-violet-500/[0.06]",
  },
  {
    name: "Website",
    handle: "serphouse.com",
    href: "https://www.serphouse.com",
    icon: Globe,
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    hoverClass: "hover:border-blue-500/35 hover:bg-blue-500/[0.06]",
  },
  {
    name: "Email",
    handle: "support@serphouse.com",
    href: "mailto:support@serphouse.com",
    icon: Mail,
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    hoverClass: "hover:border-amber-500/35 hover:bg-amber-500/[0.06]",
  },
];

export const SocialLinks: FC = () => {
  return (
    <div className="not-prose my-4 flex flex-wrap gap-2">
      {socials.map((social) => {
        const Icon = social.icon;
        const isMail = social.href.startsWith("mailto:");

        return (
          <a
            key={social.name}
            href={social.href}
            {...(!isMail
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className={cn(
              "group inline-flex items-center gap-2.5 rounded-lg border bg-fd-card px-3 py-2 transition-colors",
              social.hoverClass,
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md",
                social.iconClass,
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
          </a>
        );
      })}
    </div>
  );
};
