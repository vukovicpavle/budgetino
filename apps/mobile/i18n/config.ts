import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from '@budgetino/shared/i18n/locales/en.json';
import { defaultLocale } from '@budgetino/shared/i18n';

const deviceLocale = getLocales()[0]?.languageCode ?? defaultLocale;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: deviceLocale,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
