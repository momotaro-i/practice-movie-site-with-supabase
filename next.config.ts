import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
};

export default nextConfig;
