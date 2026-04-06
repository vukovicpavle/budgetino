import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@budgetino/ui', '@budgetino/shared', '@budgetino/auth'],
};

export default withNextIntl(nextConfig);
