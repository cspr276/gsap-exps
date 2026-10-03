"use client"

import { useEffect, useMemo, useState } from "react"

import { uMiniMapOpenSound } from "@/lib/u-mini-map-open"
import { cn } from "@/lib/utils"
import { useSound } from "@/hooks/soundcn/use-sound"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export type TOCItemType = {
  title: React.ReactNode
  url: string
  depth: number
}

export type TOCMinimapProps = {
  /** @fumadocsHref #tocitemtype */
  items: TOCItemType[]
  className?: string
}

export function TOCMinimap({ items, className }: TOCMinimapProps) {
  const itemIds = useMemo(
    () => items.map((item) => item.url.replace("#", "")),
    [items]
  )

  const activeHeading = useActiveHeading(itemIds)

  const [play] = useSound(uMiniMapOpenSound, { volume: 0.3 })

  if (!items.length) {
    return null
  }

  return (
    <div className={cn("w-18", className)}>
      <HoverCard
        openDelay={0}
        closeDelay={120}
        onOpenChange={(open) => {
          if (open) play()
        }}
      >
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label="Table of contents minimap"
            className="flex max-h-[50dvh] flex-col gap-3 overflow-hidden py-3 pl-2 pr-4 cursor-pointer opacity-100 transition-opacity duration-150"
          >
            {items.map((item) => (
              <div
                key={item.url}
                data-depth={item.depth}
                data-active={item.url === `#${activeHeading}`}
                className={cn(
                  "h-0.5 w-6 shrink-0 rounded-xs bg-neutral-700 transition-[background-color,width] duration-150",
                  "data-[depth=3]:ml-2 data-[depth=3]:w-4",
                  "data-[depth=4]:ml-4 data-[depth=4]:w-2",
                  "data-active:bg-white data-active:w-8"
                )}
              />
            ))}
          </button>
        </HoverCardTrigger>

        <HoverCardContent
          className="w-64 overflow-hidden p-0 duration-150 transition-all ease-out border border-neutral-800 bg-[#121214] text-white shadow-2xl rounded-xl backdrop-blur-md"
          align="start"
          alignOffset={-4}
          side="right"
          sideOffset={14}
        >
          <div className="flex max-h-[50dvh] overflow-y-auto overscroll-contain">
            <ul className="flex size-full flex-col px-5 py-4 text-sm font-sans">
              {items.map((item) => (
                <li key={item.url} className="flex py-1">
                  <a
                    href={item.url}
                    data-depth={item.depth}
                    data-active={item.url === `#${activeHeading}`}
                    className={cn(
                      "line-clamp-2 w-full transition-[color] duration-150",
                      "text-neutral-400 hover:text-white data-active:text-white data-active:font-semibold",
                      "data-[depth=3]:pl-4 data-[depth=3]:text-xs data-[depth=3]:text-neutral-500 data-[depth=3]:data-active:text-neutral-200"
                    )}
                    onClick={handleItemClick}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!itemIds || !itemIds.length) return

    const computeActive = () => {
      // Offset reading line 180px down from viewport top
      const scrollY = window.scrollY
      const readingLine = scrollY + 220
      let current: string | null = null

      for (const id of itemIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          if (elementTop <= readingLine) {
            current = id
          }
        }
      }

      if (current) {
        setActiveId(current)
      } else if (itemIds[0]) {
        setActiveId(itemIds[0])
      }
    }

    computeActive()
    window.addEventListener("scroll", computeActive, { passive: true })
    window.addEventListener("resize", computeActive, { passive: true })

    return () => {
      window.removeEventListener("scroll", computeActive)
      window.removeEventListener("resize", computeActive)
    }
  }, [itemIds])

  return activeId
}

function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const url = e.currentTarget.getAttribute("href") ?? ""
  scrollToHeading(url)
}

function scrollToHeading(url: string) {
  history.pushState(null, "", url)
  const target = document.getElementById(url.replace("#", ""))
  if (!target) return
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -90, duration: 1.2 })
  } else {
    target.scrollIntoView({
      behavior: "smooth",
    })
  }
}
