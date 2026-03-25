import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RecipeCard({ recipe }) {
  const { locale } = useRouter();

  if (!recipe) return null;

  const imageUrl = recipe.featuredImage?.url
    ? recipe.featuredImage.url.startsWith('//')
      ? `https:${recipe.featuredImage.url}`
      : recipe.featuredImage.url
    : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80';

  return (
    <article
      data-testid="recipe-card"
      style={{
        border: '1px solid #eee',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'white',
        marginBottom: '1rem',
      }}
    >
      <div style={{ position: 'relative', height: '200px' }}>
        <Image
          src={imageUrl}
          alt={recipe.title || 'Recipe image'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div style={{ padding: '1rem' }}>
        <p style={{ color: '#c4573f', fontSize: '0.75rem', margin: '0 0 4px' }}>
          {recipe.cuisine}
        </p>
        <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>
          {recipe.title}
        </h3>
        <p style={{ color: '#666', fontSize: '0.875rem', margin: '0 0 12px' }}>
          {(recipe.description || '').slice(0, 80)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#999' }}>
            ⏱ {recipe.cookingTime} min
          </span>
          <Link
            href={`/recipes/${recipe.slug}`}
            locale={locale}
            style={{
              background: '#c4573f',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            View Recipe
          </Link>
        </div>
      </div>
    </article>
  );
}