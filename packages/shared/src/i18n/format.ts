/**
 * Locale-aware formatting utilities built on top of the `Intl` APIs.
 *
 * These helpers keep formatting consistent across web and mobile while
 * allowing the locale to be swapped in the future.
 *
 * Formatter instances are cached by locale (and currency where applicable)
 * so repeated calls avoid re-creating `Intl` objects on every render.
 */

import { defaultLocale } from './keys';

const currencyCache = new Map<string, Intl.NumberFormat>();
const numberCache = new Map<string, Intl.NumberFormat>();
const dateCache = new Map<string, Intl.DateTimeFormat>();
const timeCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Format a number as a locale-aware currency string.
 *
 * @example
 * ```ts
 * formatCurrency(1234.5, 'USD', 'en') // "$1,234.50"
 * ```
 */
export function formatCurrency(
  amount: number,
  currencyCode: string,
  locale: string = defaultLocale
): string {
  const key = `${locale}:${currencyCode}`;
  let fmt = currencyCache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    });
    currencyCache.set(key, fmt);
  }
  return fmt.format(amount);
}

/**
 * Format a number using locale-aware grouping & decimal rules.
 *
 * @example
 * ```ts
 * formatNumber(1234567.89, 'en') // "1,234,567.89"
 * ```
 */
export function formatNumber(
  value: number,
  locale: string = defaultLocale
): string {
  let fmt = numberCache.get(locale);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale);
    numberCache.set(locale, fmt);
  }
  return fmt.format(value);
}

/**
 * Format a `Date` with the medium date style (e.g. "Apr 6, 2026").
 */
export function formatDate(date: Date, locale: string = defaultLocale): string {
  let fmt = dateCache.get(locale);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });
    dateCache.set(locale, fmt);
  }
  return fmt.format(date);
}

/**
 * Format a `Date` with a short time style (e.g. "8:11 AM").
 */
export function formatTime(date: Date, locale: string = defaultLocale): string {
  let fmt = timeCache.get(locale);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, { timeStyle: 'short' });
    timeCache.set(locale, fmt);
  }
  return fmt.format(date);
}
