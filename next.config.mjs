/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@dipesh.singh/commerce-ui', '@dipesh.singh/proton'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  staticPageGenerationTimeout: 180,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
