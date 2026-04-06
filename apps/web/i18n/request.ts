import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from '@budgetino/shared/i18n';

export default getRequestConfig(async () => ({
  locale: defaultLocale,
  messages: (await import('@budgetino/shared/i18n/locales/en.json')).default,
}));
