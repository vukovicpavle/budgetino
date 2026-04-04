import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@budgetino/ui', '@budgetino/shared'],
};

export default nextConfig;
