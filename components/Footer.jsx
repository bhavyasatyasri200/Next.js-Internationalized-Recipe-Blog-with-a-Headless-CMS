import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="no-print bg-espresso-800 text-white mt-16 py-8 text-center">
      <p className="text-sm text-cream-200/50">
        © {new Date().getFullYear()} {t('site_name')} — {t('footer_rights')}
      </p>
    </footer>
  );
}