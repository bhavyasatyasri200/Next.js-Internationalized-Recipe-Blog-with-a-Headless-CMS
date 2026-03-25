import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation('common');
  return (
    <header className="no-print bg-white border-b border-amber-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl text-espresso-800">
          🍳 {t('site_name')}
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-terracotta-500">{t('nav_home')}</Link>
          <Link href="/recipes" className="text-sm hover:text-terracotta-500">{t('nav_recipes')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}