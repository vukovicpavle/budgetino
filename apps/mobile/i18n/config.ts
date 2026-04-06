import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from '@budgetino/shared/i18n/locales/en.json';
import { defaultLocale, locales } from '@budgetino/shared/i18n';
import type { Locale } from '@budgetino/shared/i18n';

const deviceLocale = getLocales()[0]?.languageCode ?? defaultLocale;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: locales.includes(deviceLocale as Locale) ? deviceLocale : defaultLocale,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
