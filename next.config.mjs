/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath:"/school",
    assetPrefix:"/school",
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
