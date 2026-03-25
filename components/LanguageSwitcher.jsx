import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const LANG_LABELS = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
};

const LANG_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { pathname, asPath, query, locale } = router;

  return (
    <div data-testid="language-switcher" className="flex items-center gap-1">
      <span className="text-xs text-amber-800/60 mr-1 hidden sm:inline">
        {t('language')}:
      </span>
      {['en', 'es', 'fr'].map((lang) => (
        <Link
          key={lang}
          href={{ pathname, query }}
          as={asPath}
          locale={lang}
          className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-200 ${
            locale === lang
              ? 'bg-terracotta-500 text-white'
              : 'text-amber-800 hover:bg-terracotta-500/10 border border-amber-200 hover:border-terracotta-400'
          }`}
          title={LANG_NAMES[lang]}
        >
          {LANG_LABELS[lang]}
        </Link>
      ))}
    </div>
  );
}