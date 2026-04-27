type SocialConfig = {
  github: string
  linkedin: string
  twitter: string
  huggingface: string
}

const readString = (publicValue: string | undefined, serverValue: string | undefined, fallback: string) => {
  return publicValue ?? serverValue ?? fallback
}

const readBoolean = (publicValue: string | undefined, serverValue: string | undefined, fallback: boolean) => {
  const rawValue = publicValue ?? serverValue
  if (!rawValue) return fallback
  return rawValue.toLowerCase() === "true"
}

const social: SocialConfig = {
  github: readString(
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    process.env.SOCIAL_GITHUB,
    "https://github.com/ananymishradev",
  ),
  linkedin: readString(
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    process.env.SOCIAL_LINKEDIN,
    "https://www.linkedin.com/in/ananymishradev/",
  ),
  twitter: readString(
    process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
    process.env.SOCIAL_TWITTER,
    "https://twitter.com/ananymishradev",
  ),
  huggingface: readString(
    process.env.NEXT_PUBLIC_SOCIAL_HUGGINGFACE,
    process.env.SOCIAL_HUGGINGFACE,
    "https://huggingface.co/ananymishradev",
  ),
}

export const siteConfig = {
  url: readString(process.env.NEXT_PUBLIC_SITE_URL, process.env.SITE_URL, "https://ananymishra.tech"),
  language: readString(process.env.NEXT_PUBLIC_SITE_LANGUAGE, process.env.SITE_LANGUAGE, "en"),
  locale: readString(process.env.NEXT_PUBLIC_SITE_LOCALE, process.env.SITE_LOCALE, "en_US"),
  title: readString(process.env.NEXT_PUBLIC_SITE_TITLE, process.env.SITE_TITLE, "Anany Mishra"),
  titleTemplate: readString(
    process.env.NEXT_PUBLIC_SITE_TITLE_TEMPLATE,
    process.env.SITE_TITLE_TEMPLATE,
    "%s | Anany Mishra",
  ),
  description: readString(
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    process.env.SITE_DESCRIPTION,
    "AI systems engineer exploring model serving, architectures, infrastructure, and cost-aware intelligence.",
  ),
  keywords: readString(
    process.env.NEXT_PUBLIC_SITE_KEYWORDS,
    process.env.SITE_KEYWORDS,
    "AI Engineering, MLOps, LLM Serving, Systems Design, Infrastructure, Cost Optimization, Next.js, TypeScript",
  ),
  authorName: readString(process.env.NEXT_PUBLIC_SITE_AUTHOR_NAME, process.env.SITE_AUTHOR_NAME, "Anany Mishra"),
  authorTitle: readString(process.env.NEXT_PUBLIC_SITE_AUTHOR_TITLE, process.env.SITE_AUTHOR_TITLE, "AI Engineer"),
  authorBio: readString(
    process.env.NEXT_PUBLIC_SITE_AUTHOR_BIO,
    process.env.SITE_AUTHOR_BIO,
    "AI systems engineer exploring model serving, architectures, infrastructure, and cost-aware intelligence.",
  ),
  authorEmail: readString(
    process.env.NEXT_PUBLIC_SITE_AUTHOR_EMAIL,
    process.env.SITE_AUTHOR_EMAIL,
    "anany.mishra.dev@gmail.com",
  ),
  authorLocation: readString(
    process.env.NEXT_PUBLIC_SITE_AUTHOR_LOCATION,
    process.env.SITE_AUTHOR_LOCATION,
    "Bareilly, India",
  ),
  authorWebsite: readString(
    process.env.NEXT_PUBLIC_SITE_AUTHOR_WEBSITE,
    process.env.SITE_AUTHOR_WEBSITE,
    "https://ananymishra.tech",
  ),
  authorAvatar: readString(
    process.env.NEXT_PUBLIC_SITE_AUTHOR_AVATAR,
    process.env.SITE_AUTHOR_AVATAR,
    "https://ananymishra.tech/developer-portrait.png",
  ),
  ogImage: readString(process.env.NEXT_PUBLIC_SEO_OG_IMAGE, process.env.SEO_OG_IMAGE, "/og-image.jpeg"),
  robotsIndex: readBoolean(process.env.NEXT_PUBLIC_SEO_ROBOTS_INDEX, process.env.SEO_ROBOTS_INDEX, true),
  robotsFollow: readBoolean(process.env.NEXT_PUBLIC_SEO_ROBOTS_FOLLOW, process.env.SEO_ROBOTS_FOLLOW, true),
  social,
}

export const footerSocialLinks = [
  { label: "Twitter", href: social.twitter, description: "Thoughts on AI systems and engineering." },
  { label: "LinkedIn", href: social.linkedin, description: "Professional updates and collaborations." },
  { label: "GitHub", href: social.github, description: "Code, projects, and technical experiments." },
  { label: "Hugging Face", href: social.huggingface, description: "Models, demos, and applied ML work." },
]
