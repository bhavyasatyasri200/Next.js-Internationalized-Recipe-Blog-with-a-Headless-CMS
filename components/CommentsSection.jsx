import { useTranslation } from 'next-i18next';

// Mock comments — in production these would come from CMS
const MOCK_COMMENTS = [
  {
    id: 1,
    author: 'Maria Garcia',
    date: '2024-01-15',
    text: 'This recipe is absolutely delicious! Made it for the family and everyone loved it.',
    avatar: '👩‍🍳',
  },
  {
    id: 2,
    author: 'Jean-Pierre Dubois',
    date: '2024-01-20',
    text: 'Wonderful recipe. I added a bit more spice and it was perfect!',
    avatar: '👨‍🍳',
  },
];

export default function CommentsSection() {
  const { t } = useTranslation('common');

  return (
    <section className="no-print mt-12 border-t border-amber-100 pt-10">
      <h2 className="font-display text-2xl font-bold text-espresso-800 mb-6">
        {t('comments_title')}
      </h2>

      {MOCK_COMMENTS.length === 0 ? (
        <p className="text-gray-400 italic text-sm">{t('no_comments')}</p>
      ) : (
        <ul data-testid="comments-list" className="space-y-6">
          {MOCK_COMMENTS.map((comment) => (
            <li key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-cream-100 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-espresso-800 text-sm">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}