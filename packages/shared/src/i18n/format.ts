/**
 * Locale-aware formatting utilities built on top of the `Intl` APIs.
 *
 * These helpers keep formatting consistent across web and mobile while
 * allowing the locale to be swapped in the future.
 */

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
  locale: string = 'en'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Format a number using locale-aware grouping & decimal rules.
 *
 * @example
 * ```ts
 * formatNumber(1234567.89, 'en') // "1,234,567.89"
 * ```
 */
export function formatNumber(value: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a `Date` with the medium date style (e.g. "Apr 6, 2026").
 */
export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}

/**
 * Format a `Date` with a short time style (e.g. "8:11 AM").
 */
export function formatTime(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(date);
}
