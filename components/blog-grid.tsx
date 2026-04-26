"use client"

import { motion } from "framer-motion"

type PublicationCardProps = {
  title: string
  authors: string
  accent: "neutral" | "indigo" | "paper"
  visual: React.ReactNode
}

const publications: PublicationCardProps[] = [
  {
    title: "Assessing global machine learning weather prediction models during extreme events",
    authors: "Aman Gupta, Aditi Sheshadri, Dhruv Suri",
    accent: "neutral",
    visual: <WaveVisual />,
  },
  {
    title: "PowerGNN: a topology-aware graph neural network for electricity grids",
    authors: "Dhruv Suri and Mohak Mangal",
    accent: "indigo",
    visual: <NetworkVisual />,
  },
  {
    title: "Insights on lateral gravity wave propagation in the extratropical stratosphere from 44 years of ERA5 data",
    authors: "Aman Gupta, Aditi Sheshadri, M Joan Alexander, Thomas Birner",
    accent: "paper",
    visual: <GraphVisual />,
  },
]

function PublicationCard({ title, authors, accent, visual }: PublicationCardProps) {
  const accentStyles = {
    neutral: "bg-[#54A5D5]",
    indigo: "bg-[#3d3d4f]",
    paper: "bg-white border border-[#e8e6e3]",
  }[accent]

  return (
    <article className="group overflow-hidden rounded-2xl bg-[#e8e6e3] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className={`relative aspect-[16/10] overflow-hidden ${accentStyles}`}>
        <div className="absolute inset-0 opacity-95">{visual}</div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-6 lg:p-7">
        <h3 className="text-[1.05rem] font-medium leading-[1.45] tracking-[-0.01em] text-[#2d2d2d]">
          {title}
        </h3>
        <p className="text-sm font-normal text-[#8a8a8a]">{authors}</p>
      </div>
    </article>
  )
}

function WaveVisual() {
  return (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <pattern id="grid1" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8b6b3" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#grid1)" />
      <g stroke="#5a5a5a" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M50,200 Q100,180 150,200 T250,200 T350,200" />
        <path d="M50,190 Q100,170 150,190 T250,190 T350,190" />
        <path d="M50,180 Q100,160 150,180 T250,180 T350,180" />
        <path d="M50,170 Q100,150 150,170 T250,170 T350,170" />
        <path d="M50,160 Q100,140 150,160 T250,160 T350,160" />
        <path d="M50,150 Q100,130 150,150 T250,150 T350,150" />
        <path d="M50,140 Q100,120 150,140 T250,140 T350,140" />
        <path d="M50,130 Q100,110 150,130 T250,130 T350,130" />
        <path d="M50,120 Q100,100 150,120 T250,120 T350,120" />
        <path d="M50,110 Q100,90 150,110 T250,110 T350,110" />
        <path d="M50,100 Q100,80 150,100 T250,100 T350,100" />
        <path d="M50,90 Q100,70 150,90 T250,90 T350,90" />
        <path d="M50,80 Q100,60 150,80 T250,80 T350,80" />
        <path d="M50,70 Q100,50 150,70 T250,70 T350,70" />
        <path d="M50,60 Q100,40 150,60 T250,60 T350,60" />
        <path d="M50,50 Q100,30 150,50 T250,50 T350,50" />
      </g>
    </svg>
  )
}

function NetworkVisual() {
  return (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#555568" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#grid2)" />
      <g fill="none" stroke="#c0c0d0" strokeWidth="1.5">
        <circle cx="80" cy="60" r="12" fill="#3d3d4f" stroke="#e0e0f0" strokeWidth="2" />
        <circle cx="160" cy="60" r="12" fill="#3d3d4f" stroke="#e0e0f0" strokeWidth="2" />
        <circle cx="240" cy="60" r="12" fill="#3d3d4f" stroke="#e0e0f0" strokeWidth="2" />
        <circle cx="320" cy="60" r="12" fill="#3d3d4f" stroke="#e0e0f0" strokeWidth="2" />

        <circle cx="80" cy="60" r="4" fill="#e0e0f0" />
        <circle cx="160" cy="60" r="4" fill="#e0e0f0" />
        <circle cx="240" cy="60" r="4" fill="#e0e0f0" />
        <circle cx="320" cy="60" r="4" fill="#e0e0f0" />

        <rect x="66" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="106" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="146" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="186" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="226" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="266" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="306" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />
        <rect x="346" y="110" width="28" height="28" rx="2" fill="#3d3d4f" stroke="#c0c0d0" strokeWidth="1.5" />

        <circle cx="80" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="120" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="160" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="200" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="240" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="280" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="320" cy="180" r="3" fill="#a0a0b0" />
        <circle cx="360" cy="180" r="3" fill="#a0a0b0" />

        <circle cx="80" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="120" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="160" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="200" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="240" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="280" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="320" cy="210" r="3" fill="#a0a0b0" />
        <circle cx="360" cy="210" r="3" fill="#a0a0b0" />

        <path d="M80,72 L80,110 M80,138 L80,180 M80,138 L120,180 M80,138 L40,180" stroke="#6a6a80" strokeWidth="1" />
        <path d="M160,72 L160,110 M160,138 L160,180 M160,138 L120,180 M160,138 L200,180" stroke="#6a6a80" strokeWidth="1" />
        <path d="M240,72 L240,110 M240,138 L240,180 M240,138 L200,180 M240,138 L280,180" stroke="#6a6a80" strokeWidth="1" />
        <path d="M320,72 L320,110 M320,138 L320,180 M320,138 L280,180 M320,138 L360,180" stroke="#6a6a80" strokeWidth="1" />

        <path d="M94,124 L120,180 M94,124 L80,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M134,124 L160,180 M134,124 L120,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M174,124 L200,180 M174,124 L160,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M214,124 L240,180 M214,124 L200,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M254,124 L280,180 M254,124 L240,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M294,124 L320,180 M294,124 L280,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
        <path d="M334,124 L360,180 M334,124 L320,180" stroke="#6a6a80" strokeWidth="0.8" opacity="0.6" />
      </g>
    </svg>
  )
}

function GraphVisual() {
  return (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#grid3)" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40,150 Q80,100 120,150 T200,150 T280,150 T360,150" stroke="#888" strokeWidth="2" strokeDasharray="4,4" />
        <path d="M40,180 Q80,130 120,180 T200,180 T280,180 T360,180" stroke="#555" strokeWidth="2" />
        <path d="M40,120 Q100,60 160,120 T280,120 T360,80" stroke="#2d2d2d" strokeWidth="2.5" />
        <path d="M40,200 Q80,160 120,200 T200,200 T280,200 T360,200" stroke="#777" strokeWidth="1.5" />
      </g>
      <g fill="#555">
        <circle cx="80" cy="165" r="3" />
        <circle cx="120" cy="150" r="3" />
        <circle cx="160" cy="165" r="3" />
        <circle cx="200" cy="150" r="3" />
        <circle cx="240" cy="165" r="3" />
        <circle cx="280" cy="150" r="3" />
        <circle cx="320" cy="165" r="3" />
        <circle cx="360" cy="150" r="3" />
      </g>
    </svg>
  )
}

export function BlogGrid() {
  return (
    <section className="px-4 py-20 text-[#1a1a1a] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-3xl font-medium tracking-[-0.02em] text-[#2d2d2d] sm:text-4xl lg:text-5xl">
            Research & Publications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              className={index === 0 ? "xl:translate-y-3" : index === 2 ? "xl:translate-y-6" : ""}
            >
              <PublicationCard {...publication} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
