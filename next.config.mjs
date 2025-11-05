/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configure Turbopack
  turbopack: {
    // Empty config to disable webpack fallback
  },
}

export default nextConfig
