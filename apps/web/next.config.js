/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  transpilePackages: ['@nobel/types', '@nobel/validation'],
};

module.exports = nextConfig;
