import type { FC, ReactNode, SVGProps } from "react";
import Link from "next/link";
import {
  GitHubIcon,
  NpmIcon,
  PypiIcon,
  PackagistIcon,
  SmitheryIcon,
} from "@/icons/brand-icons";

const resourceIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  npm: NpmIcon,
  pypi: PypiIcon,
  packagist: PackagistIcon,
  smithery: SmitheryIcon,
};

type ResourceIcon = keyof typeof resourceIcons;

export interface ResourceCardProps {
  title: string;
  subtitle: string;
  href: string;
  icon: ResourceIcon;
}

export const ResourceCard: FC<ResourceCardProps> = ({ title, subtitle, href, icon }) => {
  const Icon = resourceIcons[icon];
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border bg-fd-card p-3 hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors w-full sm:w-auto min-w-0 sm:min-w-56"
    >
      <span className="size-9 shrink-0 flex items-center justify-center rounded-lg ">
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-fd-muted-foreground truncate">{subtitle}</span>
      </div>
    </Link>
  );
};

export const ResourceCards: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="not-prose flex flex-wrap gap-3 my-4">
      {children}
    </div>
  );
};
