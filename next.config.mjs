import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stream.mux.com",
        pathname: "/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  crossOrigin: "anonymous",
}

export default withNextVideo(nextConfig);