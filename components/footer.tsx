"use client"

import type { PointerEvent } from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import ananySignature from "../images/anany.png"
import mishraSignature from "../images/mishra.png"
import { footerSocialLinks } from "@/lib/site-config"

type SocialLink = {
  label: string
  description: string
  href: string
}

type JourneySectionProps = {
  name?: string
  title?: string
  description?: string
  tagline?: string
  links?: SocialLink[]
  year?: number
  className?: string
}

const defaultLinks: SocialLink[] = footerSocialLinks

export function Footer({
  links = defaultLinks,
  className = "",
}: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false })

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = sectionRef.current?.getBoundingClientRect()
    if (!bounds) return

    setSpotlight({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      active: true,
    })
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setSpotlight((current) => ({ ...current, active: false }))}
      className={`relative overflow-hidden border-t border-border bg-background text-foreground ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(560px circle at ${spotlight.x}px ${spotlight.y}px, rgba(249,249,249,0.08), transparent 60%)`,
        }}
      />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 py-1 lg:px-8 lg:py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-8">
          <div className="space-y-3">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group flex items-start justify-between gap-6 border-b border-background/10 py-2.5 transition-colors hover:bg-background/5"
              >
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm leading-6 text-foreground/55">{String(index + 1).padStart(2, "0")}</p>
                  <p className="font-serif text-xl italic leading-none tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                    {link.label}
                  </p>
                  <p className="max-w-md text-sm leading-6 text-foreground/55">{link.description}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-foreground/55 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </motion.a>
            ))}
          </div>

          <div className="flex justify-start py-2 lg:justify-end lg:py-4">
            <div className="flex w-full flex-col gap-3">
              <Image
                src={ananySignature}
                alt="Anany signature"
                width={1040}
                height={360}
                className="h-auto w-full object-contain"
                priority={false}
              />
              <Image
                src={mishraSignature}
                alt="Mishra signature"
                width={1040}
                height={360}
                className="h-auto w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Footer