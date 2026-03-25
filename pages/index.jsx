// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
// import Layout from '../components/Layout';
// import RecipeCard from '../components/RecipeCard';
// import NewsletterForm from '../components/NewsletterForm';
// import { getFeaturedRecipes } from '../lib/contentful';

// export default function Home({ recipes }) {
//   const { t } = useTranslation('common');

//   return (
//     <Layout title={t('site_name')} description={t('tagline')}>
//       {/* Hero */}
//       <section className="bg-gradient-to-br from-espresso-800 to-espresso-900 text-white py-24 text-center px-4">
//         <h1 className="font-display text-6xl font-bold text-cream-50 mb-4">
//           {t('site_name')}
//         </h1>
//         <p className="text-xl text-cream-200/70 max-w-xl mx-auto mb-8">
//           {t('tagline')}
//         </p>
//         <Link
//           href="/recipes"
//           className="inline-block bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
//         >
//           {t('all_recipes')} →
//         </Link>
//       </section>

//       {/* Featured Recipes */}
//       <section className="max-w-6xl mx-auto px-4 py-16">
//         <h2 className="font-display text-3xl font-bold text-espresso-800 mb-8">
//           {t('featured_recipes')}
//         </h2>
//         <div
//           data-testid="featured-recipes"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {recipes.map((recipe) => (
//             <RecipeCard key={recipe.id} recipe={recipe} />
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="max-w-2xl mx-auto px-4 pb-16">
//         <NewsletterForm />
//       </section>
//     </Layout>
//   );
// }



// import Layout from '../components/Layout';
// import RecipeCard from '../components/RecipeCard';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { getFeaturedRecipes } from '../lib/contentful';

// export default function Home({ recipes = [] }) {
//   return (
//     <Layout>
//       <h1>Hello World</h1>
//       <p>Recipes found: {recipes.length}</p>
//       <div data-testid="featured-recipes">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>
//     </Layout>
//   );
// }

// export async function getStaticProps({ locale }) {
//   try {
//     const recipes = await getFeaturedRecipes(locale);
//     console.log('Recipes loaded:', recipes?.length);
//     return {
//       props: {
//         recipes: recipes || [],
//         ...(await serverSideTranslations(locale, ['common'])),
//       },
//     };
//   } catch (err) {
//     console.error('getStaticProps error:', err.message);
//     return {
//       props: {
//         recipes: [],
//         ...(await serverSideTranslations(locale, ['common'])),
//       },
//     };
//   }
// }

import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getFeaturedRecipes } from '../lib/contentful';

export default function Home({ recipes = [] }) {
  return (
    <Layout title="RecipeCraft">

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #2c1810 0%, #1a0f08 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
          RecipeCraft
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '500px', margin: '0 auto 32px' }}>
          Authentic Recipes from Around the World
        </p>
        <Link href="/recipes" style={{
          background: '#c4573f', color: 'white', padding: '14px 32px',
          borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold',
        }}>
          Browse All Recipes →
        </Link>
      </section>

      {/* Featured Recipes */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', color: '#2c1810', marginBottom: '32px' }}>
          Featured Recipes
        </h2>
        <div
          data-testid="featured-recipes"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const recipes = await getFeaturedRecipes(locale);
    return {
      props: {
        recipes: recipes || [],
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (err) {
    console.error('Error:', err.message);
    return {
      props: {
        recipes: [],
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
}