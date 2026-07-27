import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { appName, gitConfig } from "./shared";
import Image from "next/image";
import {LinkedInIcon } from "@/icons/brand-icons";

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
  return {};
}
