"use client"
import * as React from "react"
import Link from "next/link"
import { Check, ChevronsUpDown, BookOpen, Globe, LayoutDashboard } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover"

const APPS = [
  {
    key: "docs",
    label: "Documentation",
    href: "/",
    icon: BookOpen,
    color:
      "text-blue-600 bg-blue-50 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20",
  },
  {
    key: "website",
    label: "Website",
    href: "https://www.serphouse.com",
    icon: Globe,
    color:
      "text-teal-600 bg-teal-50 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-400/20",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    href: "https://www.serphouse.com/home",
    icon: LayoutDashboard,
    color:
      "text-amber-600 bg-amber-50 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  },
]

export function AppSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState("docs")
  const current = APPS.find((a) => a.key === selected) ?? APPS[0]
  const CurrentIcon = current.icon

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background px-2.5 py-2 text-left text-sm shadow-sm transition-all hover:border-border/80 hover:bg-secondary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[popup-open]:border-border/80 data-[popup-open]:bg-secondary/60 data-[popup-open]:shadow-md"
          >
            <div
              className={`flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg ${current.color}`}
            >
              <CurrentIcon className="size-4.5" />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5 leading-none">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Switch to
              </span>
              <span className="truncate font-semibold text-foreground">
                {current.label}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180" />
          </button>
        }
      />
      <PopoverContent className="overflow-hidden rounded-xl border border-border bg-background/50 p-1.5 shadow-lg backdrop-blur-sm">
        {APPS.map((app) => {
          const Icon = app.icon
          const isSelected = app.key === selected
          return (
            <Link
              key={app.key}
              href={app.href}
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-secondary/70"
              onClick={() => setSelected(app.key)}
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-md ${app.color}`}
              >
                <Icon className="size-4" />
              </div>
              <span className="font-medium">{app.label}</span>
              {isSelected && <Check className="ml-auto size-4 text-primary" />}
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
