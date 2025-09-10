import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // distDir: 'dist', // Vercelでは標準の.nextディレクトリを使用
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['dummyimage.com', 'itplbmvydiozxxrujhug.supabase.co'],
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
