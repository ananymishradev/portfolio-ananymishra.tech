import Link from "next/link"
import Image from "next/image"

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const mdxComponents = {
  a: ({ href = "", children, ...props }: AnchorProps) => {
    const isExternal = href.startsWith("http")

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  img: ({ alt = "", src = "", width, height, ...props }: ImageProps) => {
    if (!src) {
      return null
    }

    const parsedWidth = typeof width === "number" ? width : Number.parseInt(String(width ?? ""), 10)
    const parsedHeight = typeof height === "number" ? height : Number.parseInt(String(height ?? ""), 10)
    const resolvedWidth = Number.isFinite(parsedWidth) ? parsedWidth : 1200
    const resolvedHeight = Number.isFinite(parsedHeight) ? parsedHeight : 700

    return (
      <Image
        src={src}
        alt={alt}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes="(min-width: 1024px) 896px, 100vw"
        className="h-auto w-full"
      />
    )
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    return <pre {...props} />
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    return <code {...props} />
  },
}
