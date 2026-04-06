import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from '@budgetino/shared/i18n';
import messages from '@budgetino/shared/i18n/locales/en.json';

export default getRequestConfig(() => ({
  locale: defaultLocale,
  messages,
}));
