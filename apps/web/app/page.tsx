import { useTranslations } from 'next-intl';

import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{t('auth.welcome')}</h1>
      <p className="mt-2 text-muted-foreground">{t('budget.title')}</p>
      <p>
        {t('budget.remaining', {
          amount: formatCurrency(1234.5, 'USD'),
        })}
      </p>
      <p>{formatDate(new Date())}</p>
      <nav>
        <ul>
          <li>{t('nav.budgets')}</li>
          <li>{t('nav.expenses')}</li>
          <li>{t('nav.subscriptions')}</li>
          <li>{t('nav.analytics')}</li>
          <li>{t('nav.settings')}</li>
        </ul>
      </nav>
    </main>
  );
}
