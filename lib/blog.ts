import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { mdxComponents } from "@/components/mdx-components"

const BLOG_DIRS = [
  path.join(process.cwd(), "data", "blog"),
  path.join(process.cwd(), "content", "blog"),
]

export const BLOG_REVALIDATE_SECONDS = 60 * 60

type BlogFile = {
  dir: string
  entry: string
}

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  slug?: string
  published?: boolean
  author?: string
  tags?: string[]
  coverImage?: string
}

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
}

export type CompiledBlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: React.ReactNode
}

const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "append" }],
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        keepBackground: false,
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
      },
    ],
  ],
}

const listBlogEntries = async (dir: string) => {
  try {
    await fs.access(dir)
    return await fs.readdir(dir)
  } catch {
    return [] as string[]
  }
}

const listBlogFiles = async (): Promise<BlogFile[]> => {
  const allEntries = await Promise.all(BLOG_DIRS.map((dir) => listBlogEntries(dir)))

  return BLOG_DIRS.flatMap((dir, index) =>
    allEntries[index]
      .filter((entry) => entry.endsWith(".mdx"))
      .map((entry) => ({ dir, entry })),
  )
}

const toSlug = (value: string) => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
}

const extractFirstHeading = (source: string) => {
  const lines = source.split("\n")
  const headingLine = lines.find((line) => line.trim().startsWith("# "))
  if (!headingLine) return null
  return headingLine.replace(/^#\s+/, "").trim() || null
}

const removeFirstH1 = (source: string) => {
  return source.replace(/^#\s+.+\n+/, "")
}

const normalizeFrontmatter = (
  raw: Partial<BlogFrontmatter>,
  fallback: { title: string; description: string; date: string; slug: string },
): BlogFrontmatter => {
  return {
    title: raw.title ?? fallback.title,
    description: raw.description ?? fallback.description,
    date: raw.date ?? fallback.date,
    slug: raw.slug ? toSlug(raw.slug) : fallback.slug,
    published: raw.published ?? true,
    author: raw.author ?? "Anany Mishra",
    tags: raw.tags ?? [],
    coverImage: raw.coverImage,
  }
}

const readPostSource = async ({ dir, entry }: BlogFile) => {
  const fullPath = path.join(dir, entry)
  const source = await fs.readFile(fullPath, "utf8")
  const { content, data } = matter(source)
  const fileSlug = toSlug(entry.replace(/\.mdx$/, ""))
  const derivedTitle = extractFirstHeading(source) ?? fileSlug.replace(/[-_]/g, " ")
  const hasExplicitTitle = typeof data.title === "string" && data.title.trim().length > 0
  const frontmatter = normalizeFrontmatter(data as Partial<BlogFrontmatter>, {
    title: derivedTitle,
    description: `Read ${derivedTitle}.`,
    date: new Date().toISOString(),
    slug: fileSlug,
  })

  return {
    content,
    frontmatter,
    hasExplicitTitle,
  }
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  try {
    const files = await listBlogFiles()

    const posts = await Promise.all(
      files.map(async (file) => {
        try {
          const { frontmatter } = await readPostSource(file)

          return {
            slug: frontmatter.slug ?? toSlug(file.entry.replace(/\.mdx$/, "")),
            ...frontmatter,
          }
        } catch {
          return null
        }
      }),
    )

    const uniquePosts = Array.from(
      posts
        .filter((post): post is BlogPostMeta => post !== null)
        .reduce((acc, post) => {
          if (!acc.has(post.slug)) {
            acc.set(post.slug, post)
          }
          return acc
        }, new Map<string, BlogPostMeta>())
        .values(),
    )

    return uniquePosts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<CompiledBlogPost | null> {
  const targetSlug = toSlug(slug)
  const files = await listBlogFiles()

  for (const file of files) {

    try {
      const { content, frontmatter, hasExplicitTitle } = await readPostSource(file)
      const postSlug = frontmatter.slug ?? toSlug(file.entry.replace(/\.mdx$/, ""))

      if (postSlug !== targetSlug) {
        continue
      }

      const shouldTrimFirstHeading = !hasExplicitTitle && Boolean(extractFirstHeading(content))
      const normalizedContent = shouldTrimFirstHeading ? removeFirstH1(content) : content

      const compiled = await compileMDX({
        source: normalizedContent,
        options: {
          mdxOptions,
        },
        components: mdxComponents,
      })

      return {
        slug: postSlug,
        frontmatter,
        content: compiled.content,
      }
    } catch {
      continue
    }
  }

  return null
}
