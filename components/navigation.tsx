"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "About" },
    { href: "/Blogs", label: "Blogs" },
    { href: "/Contact", label: "Contact" },
  ]

  const navItemColor = "text-foreground"
  const navItemHoverColor = "text-foreground hover:text-foreground"
  const iconColor = isScrolled || isMenuOpen ? "text-foreground" : "text-white"

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 -ml-2 transition-colors text-foreground duration-500 ${iconColor}`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Menu className="h-5 w-5 stroke-[1.5]" />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-[0.2em] uppercase transition-colors duration-500 text-foreground ${
                    pathname === link.href ? navItemColor : navItemHoverColor
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden border-t border-border/70 bg-background/95 backdrop-blur-md"
            >
              <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`rounded-md px-3 py-2 text-sm uppercase tracking-[0.2em] transition-colors duration-200 ${
                          isActive
                            ? "bg-foreground text-background"
                            : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
