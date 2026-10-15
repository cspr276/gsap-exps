"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(() => typeof document !== "undefined")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer ${className || ''}`}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neutral-700 dark:text-neutral-300" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-700 dark:text-neutral-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-fit w-auto p-1 flex flex-col gap-0.5 bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`w-8 h-8 flex items-center justify-center p-0 rounded-md cursor-pointer transition-colors ${
            mounted && theme === "light"
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
          aria-label="Light mode"
          title="Light"
        >
          <Sun className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`w-8 h-8 flex items-center justify-center p-0 rounded-md cursor-pointer transition-colors ${
            mounted && theme === "dark"
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
          aria-label="Dark mode"
          title="Dark"
        >
          <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`w-8 h-8 flex items-center justify-center p-0 rounded-md cursor-pointer transition-colors ${
            mounted && theme === "system"
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
          aria-label="System mode"
          title="System"
        >
          <Monitor className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
