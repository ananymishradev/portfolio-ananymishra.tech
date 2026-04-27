"use client"

import { motion } from "framer-motion"
import BackgroundVideo from "next-video/background-video"
import bgVideo from "../videos/light-bg.mp4"

type BlogPostHeroProps = {
  title: string
}

export function BlogPostHero({ title }: BlogPostHeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-foreground">
      <div className="relative min-h-[100svh]">
        <div className="pointer-events-none absolute inset-0">
          <BackgroundVideo
            src={bgVideo}
            sizes="100vw"
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            className="hero-bg-video absolute inset-0 !h-full !w-full !aspect-auto object-cover"
            style={
              { "--media-object-position": "100% 100%" } as React.CSSProperties & {
                [key: `--${string}`]: string | number
              }
            }
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-foreground/25" />
        </div>

        <div className="absolute inset-0 z-10 p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-24 left-8 right-8 max-w-4xl lg:bottom-32 lg:left-16 lg:right-auto"
          >
            <h1 className="font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-7xl">{title}</h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="h-12 w-[1px] bg-background/60"
          />
        </motion.div>
      </div>
    </section>
  )
}
