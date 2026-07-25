import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { appName, gitConfig } from "./shared";
import Image from "next/image";
import { LogIn, CreditCard } from "lucide-react";
import Link from "next/link";
import { XIcon, LinkedInIcon } from "@/icons/brand-icons";

const socialLinks = [
  {
    type: "icon" as const,
    url: "https://x.com/serphouse",
    text: "X (Twitter)",
    icon: <XIcon className="size-4" />,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image src="/serphouse-logo.svg" alt="SERPHouse" width={25} height={25} className="size-7" />
          <span className="font-semibold text-xl">{appName}</span>
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      ...socialLinks,
      {
        type: "icon" as const,
        url: "https://linkedin.com/company/serphouse",
        text: "LinkedIn",
        icon: <LinkedInIcon className="size-4" />,
      },

    ],
  };
}

export function sidebarOptions(): DocsLayoutProps["sidebar"] {
  return {
    footer: (
      <div key="footer" className="flex gap-1 p-2">
        <Link key="login" href="https://serphouse.com/login" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent">
          <LogIn className="size-4" />
          Login
        </Link>
        <Link key="pricing" href="https://serphouse.com/pricing" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent">
          <CreditCard className="size-4" />
          Pricing
        </Link>
      </div>
    ),
  };
}
