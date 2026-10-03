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
  side?: "left" | "right" | "top" | "bottom"
  sideOffset?: number
}

export function TOCMinimap({
  items,
  className,
  side = "right",
  sideOffset = 16,
}: TOCMinimapProps) {
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
    <div className={cn("w-16", className)}>
      <HoverCard
        openDelay={0}
        closeDelay={150}
        onOpenChange={(open) => {
          if (open) play()
        }}
      >
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label="Table of contents minimap"
            className="flex max-h-[50dvh] flex-col gap-2.5 overflow-hidden py-3 px-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            {items.map((item) => (
              <div
                key={item.url}
                data-depth={item.depth}
                data-active={item.url === `#${activeHeading}`}
                className={cn(
                  "h-0.5 w-6 shrink-0 rounded-xs bg-neutral-700 transition-all duration-200",
                  "data-[depth=3]:ml-2 data-[depth=3]:w-4",
                  "data-[depth=4]:ml-4 data-[depth=4]:w-2",
                  "data-active:bg-white data-active:w-8"
                )}
              />
            ))}
          </button>
        </HoverCardTrigger>

        <HoverCardContent
          className="w-64 overflow-hidden p-0 duration-200 bg-neutral-900 border border-neutral-800 text-white shadow-2xl rounded-lg backdrop-blur-md"
          align="start"
          alignOffset={0}
          side={side}
          sideOffset={sideOffset}
        >
          <div className="flex max-h-[50dvh] overflow-y-auto overscroll-contain">
            <ul className="flex size-full flex-col px-5 py-4 text-xs font-mono">
              {items.map((item) => (
                <li key={item.url} className="flex py-1">
                  <a
                    href={item.url}
                    data-depth={item.depth}
                    data-active={item.url === `#${activeHeading}`}
                    className={cn(
                      "line-clamp-2 w-full transition-[color] duration-200",
                      "text-neutral-400 hover:text-white data-active:text-white data-active:font-semibold",
                      "data-[depth=3]:pl-3 data-[depth=4]:pl-6"
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 0.1 }
    )

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      }
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
  const id = url.replace("#", "")
  const element = document.getElementById(id)
  if (!element) return

  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(element, { offset: -90, duration: 1.2 })
  } else {
    element.scrollIntoView({
      behavior: "smooth",
    })
  }
}
