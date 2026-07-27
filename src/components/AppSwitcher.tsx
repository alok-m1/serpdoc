"use client"
import * as React from "react"
import Link from "next/link"
import { BookOpen, Globe, LayoutDashboard, ChevronsUpDown, ArrowUpRight, type LucideIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover"
import { cn } from "@/lib/utils"

interface App {
  key: string
  label: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  external?: boolean
}

const APPS: readonly App[] = [
  {
    key: "docs",
    label: "Documentation",
    description: "Guides & API reference",
    href: "/introduction/about-the-serp-api",
    icon: BookOpen,
    color:
      "text-blue-600 bg-blue-50 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20",
  },
  {
    key: "website",
    label: "Website",
    description: "Marketing site",
    href: "https://www.serphouse.com",
    icon: Globe,
    external: true,
    color:
      "text-teal-600 bg-teal-50 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-400/20",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    description: "Account & billing",
    href: "https://www.serphouse.com/home",
    icon: LayoutDashboard,
    external: true,
    color:
      "text-amber-600 bg-amber-50 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  },
] as const

export function AppSwitcher() {
  const CurrentIcon = APPS[0].icon

  return (
    <Popover>
      <PopoverTrigger >
        <button
          type="button"
          className={cn(
            "group flex items-center gap-2 rounded-lg border border-black/5 px-2 py-2.5",
            "bg-fd-secondary/50 hover:bg-fd-secondary transition-colors",
            "text-sm font-medium text-fd-foreground w-full justify-between"
          )}
        >

          <div className="flex gap-2 items-center justify-center">
          <span className={cn("flex items-center justify-center rounded-md p-1", APPS[0].color)}>
            <CurrentIcon className="size-4" aria-hidden="true" />
          </span>
            <span>{APPS[0].label}</span>
          </div>
          <ChevronsUpDown className="size-3.5 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-1.5">
        {APPS.map((app) => {
          const Icon = app.icon
          return (
            <Link
              key={app.key}
              href={app.href}
              target={app.external ? "_blank" : undefined}
              rel={app.external ? "noopener noreferrer" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-2.5 py-2",
                "hover:bg-fd-accent transition-colors group w-full"
              )}
            >
              <span className={cn("flex shrink-0 items-center justify-center rounded-md p-1.5", app.color)}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-fd-foreground truncate">
                  {app.label}
                </span>
                <span className="text-xs text-fd-muted-foreground truncate">
                  {app.description}
                </span>
              </span>
              {app.external && (
                <ArrowUpRight className="size-3.5 ml-auto shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
