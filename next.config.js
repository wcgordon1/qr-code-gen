/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: 'images.unsplash.com' },
      ],
    },
    // Include other Next.js configurations if necessary
  }
  
  module.exports = nextConfig;