import { useTranslation } from 'next-i18next';

export default function SocialShare({ title, url }) {
  const { t } = useTranslation('common');

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      testId: 'social-share-twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: 'Twitter',
      emoji: '𝕏',
      bg: 'bg-black hover:bg-gray-800',
    },
    {
      testId: 'social-share-facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Facebook',
      emoji: 'f',
      bg: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      testId: 'social-share-pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      label: 'Pinterest',
      emoji: 'P',
      bg: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-gray-500">{t('share_on')}:</span>
      {shareLinks.map((link) => (
        <a
          key={link.testId}
          data-testid={link.testId}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded-lg transition-colors ${link.bg}`}
        >
          <span className="font-bold">{link.emoji}</span>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}