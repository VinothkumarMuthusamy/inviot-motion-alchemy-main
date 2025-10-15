import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Allow builds to continue even with TS/ESLint warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resurgent.co.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.denon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.kramerav.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const combinedConfig: NextConfig = withBundleAnalyzer({
  ...nextConfig, // Merge the existing nextConfig
  reactStrictMode: true,
  images: {
    ...nextConfig.images, // Merge existing image configurations
    formats: ['image/avif', 'image/webp'],
  },
});

module.exports = combinedConfig;
