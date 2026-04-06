import { useTranslations } from 'next-intl';
import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main>
      <h1>{t('auth.welcome')}</h1>
      <p>{t('budget.title')}</p>
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
