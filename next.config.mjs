/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure App Router is enabled
  },
  output: 'standalone',
    images: {
        domains: ["source.unsplash.com"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "source.unsplash.com",
          },
        ],
      },
};

export default nextConfig;
