import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { appName, gitConfig, socialLinks } from "./shared";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/icons/brand-icons";
import { Globe, Mail } from "lucide-react";

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
    links: socialLinks.map((social) => {
      const iconMap = {
        X: <XIcon className="size-4" />,
        LinkedIn: <LinkedInIcon className="size-4" />,
        GitHub: <GitHubIcon className="size-4" />,
        Website: <Globe className="size-4" />,
        Email: <Mail className="size-4" />,
      };

      return {
        type: "icon" as const,
        url: social.href,
        text: social.name,
        icon: iconMap[social.name as keyof typeof iconMap],
      };
    }),
  };
}

export function sidebarOptions(): DocsLayoutProps["sidebar"] {
  return {};
}
