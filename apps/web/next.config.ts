import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@budgetino/ui', '@budgetino/shared', '@budgetino/auth'],
};

export default nextConfig;
