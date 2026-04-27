"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BackgroundVideo from "next-video/background-video"
import bgVideo from "../videos/light-bg.mp4";
import { siteConfig } from "@/lib/site-config"
  
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-foreground">
      {/* Right content - 80% */}
      <div className="relative min-h-[100svh]">
        {/* Background image - converted to Next.js Image with priority for LCP */}
        <div className="absolute inset-0 pointer-events-none">
          <BackgroundVideo
            src={bgVideo}
            poster="https://image.mux.com/6KllKoiz1Wy8Nyq1nhf01cKUfPOo9qkHuEatxiGl8A74/thumbnail.png?width=2140&height=1210&time=5"
            sizes="(max-width: 1024px) 100vw, 78vw"
            muted
            loop
            playsInline
            preload="none"
            controls={false}
            autoPlay
            className="hero-bg-video absolute inset-0 !h-full !w-full !aspect-video object-cover"
            style={
              { "--media-object-position": "100% 100%" } as React.CSSProperties & {
                [key: `--${string}`]: string | number
              }
            }
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-24 left-8 right-8 max-w-2xl lg:bottom-32 lg:left-16 lg:right-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.1] text-balance">
              {siteConfig.authorName}
              <br />
              {siteConfig.authorTitle}
            </h1>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-background/50"
          />
        </motion.div>
      </div>
    </section>
  )
}
