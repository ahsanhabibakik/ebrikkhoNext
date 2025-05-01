/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // or specify your domains, e.g. "images.unsplash.com"
      },
    ],
  },
};

module.exports = nextConfig;
