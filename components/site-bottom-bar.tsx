import { siteConfig } from "@/lib/site-config"

export function SiteBottomBar() {
  return (
    <footer className="relative z-[2] mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border bg-background px-12 py-5 text-foreground max-md:flex-col max-md:gap-4 max-md:px-6 max-md:py-4 max-md:text-center max-[480px]:px-4">
      <div className="flex flex-wrap items-center gap-2 max-md:justify-center">
        <span className="font-serif text-2xl italic leading-none tracking-[-0.02em] text-foreground md:text-3xl">
          Build with <span aria-hidden="true">&#10084;&#65039;</span> by Anany
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 max-md:justify-center">
        <span className="font-serif text-2xl italic leading-none tracking-[-0.02em] text-foreground md:text-3xl">{siteConfig.authorTitle}</span>
      </div>
    </footer>
  )
}
