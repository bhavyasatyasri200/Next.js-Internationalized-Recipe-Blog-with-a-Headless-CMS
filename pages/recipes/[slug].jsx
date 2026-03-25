import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import SocialShare from '../../components/SocialShare';
import CommentsSection from '../../components/CommentsSection';
import { getAllRecipes, getAllRecipeSlugs, getRecipeBySlug } from '../../lib/contentful';

export default function RecipeDetail({ recipe }) {
  const { t } = useTranslation('common');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${siteUrl}/recipes/${recipe?.slug}`;

  if (!recipe) return <Layout><p>Not found</p></Layout>;

  const imageUrl = recipe.featuredImage?.url?.startsWith('//')
    ? `https:${recipe.featuredImage.url}`
    : recipe.featuredImage?.url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80';

  return (
    <Layout title={recipe.title} description={recipe.description}>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 data-testid="recipe-title" className="font-display text-4xl font-bold text-espresso-800 mb-4">
          {recipe.title}
        </h1>
        <div className="flex gap-4 text-sm text-gray-400 mb-6">
          <span>⏱ {recipe.cookingTime} {t('minutes')}</span>
          <span>📊 {t(recipe.difficulty?.toLowerCase()) || recipe.difficulty}</span>
          {recipe.cuisine && <span>🍽 {recipe.cuisine}</span>}
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden mb-10">
          <Image src={imageUrl} alt={recipe.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
        </div>

        <p className="text-lg text-gray-600 mb-10 leading-relaxed">{recipe.description}</p>

        <section className="mb-10">
          <h2 data-testid="ingredients-heading" className="font-display text-2xl font-bold text-espresso-800 mb-4">
            {t('ingredients')}
          </h2>
          <ul data-testid="recipe-ingredients" className="space-y-2">
            {(recipe.ingredients || []).map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-terracotta-500 mt-0.5">•</span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-espresso-800 mb-4">{t('instructions')}</h2>
          <div data-testid="recipe-instructions" className="prose prose-amber max-w-none text-gray-700 leading-relaxed">
            <p>{recipe.instructions}</p>
          </div>
        </section>

        <div className="border-t border-amber-100 pt-6 mb-6">
          <SocialShare title={recipe.title} url={pageUrl} />
        </div>
        <button
          onClick={() => window.print()}
          className="no-print text-sm text-gray-400 hover:text-terracotta-500 flex items-center gap-1 mb-10 transition-colors"
        >
          🖨 {t('print_recipe')}
        </button>

        <CommentsSection />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllRecipeSlugs();
  const locales = ['en', 'es', 'fr'];
  const paths = locales.flatMap((locale) =>
    slugs.map((slug) => ({ params: { slug }, locale }))
  );
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params, locale }) {
  const recipe = await getRecipeBySlug(params.slug, locale);
  if (!recipe) return { notFound: true };
  return {
    props: { recipe, ...(await serverSideTranslations(locale, ['common'])) },
    revalidate: 60,
  };
}