/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configure Turbopack with root directory
  turbopack: {
    root: process.cwd(),
  },
  // Vercel optimizations
  experimental: {
    // Optimize for Vercel deployment
    optimizePackageImports: ['lucide-react'],
  },
  // Disable strict mode for deployment
  reactStrictMode: false,
  // Build timeout optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

export default nextConfig
