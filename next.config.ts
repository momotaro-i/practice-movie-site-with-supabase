import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
