/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "fsw-store.s3.sa-east-1.amazonaws.com",
      "bktdbogoranfqtptzqgs.supabase.co",
    ],
    remotePatterns: [
      {
        hostname: "sw-store-images.s3.sa-east-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig
