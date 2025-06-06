/** @type {import('next').NextConfig} */
const nextConfig = {
  
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
