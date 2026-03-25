import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import { getAllRecipes, getAllCategories } from '../../lib/contentful';

export default function RecipesPage({ recipes, categories }) {
  const { t } = useTranslation('common');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = recipes.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || r.cuisine === category;
    return matchSearch && matchCat;
  });

  return (
    <Layout title={t('all_recipes')}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-espresso-800 mb-8">{t('all_recipes')}</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            data-testid="search-input"
            type="text"
            placeholder={t('search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
          />
          <select
            data-testid="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
          >
            <option value="">{t('all_categories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const recipes = await getAllRecipes(locale);
  const categories = await getAllCategories(locale);
  return {
    props: { recipes, categories, ...(await serverSideTranslations(locale, ['common'])) },
    revalidate: 60,
  };
}