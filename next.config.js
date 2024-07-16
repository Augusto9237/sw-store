/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sw-store-images.s3.sa-east-1.amazonaws.com",
        pathname: "**"
      },
    ],
  },
};

module.exports = nextConfig
