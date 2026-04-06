import type en from './locales/en.json';

export type Locale = 'en';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en'];

/**
 * Type representing the full translation message structure,
 * derived from the English locale file.
 */
export type Messages = typeof en;

/**
 * Recursively builds dot-notation key paths from a nested object type.
 *
 * Example: { common: { save: string } } → 'common' | 'common.save'
 */
type NestedKeyOf<T extends Record<string, unknown>> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? K | `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];

/**
 * Union of all valid dot-notation translation keys.
 */
export type TranslationKey = NestedKeyOf<Messages>;
