const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const LOCALES = ['en', 'es', 'fr'];
const SLUGS = ['classic-spanish-paella','french-coq-au-vin','italian-margherita-pizza','mexican-chicken-tacos','japanese-ramen','greek-moussaka'];

const urls = [
  ...LOCALES.map(l => `<url><loc>${BASE_URL}/${l}</loc><changefreq>daily</changefreq></url>`),
  ...LOCALES.map(l => `<url><loc>${BASE_URL}/${l}/recipes</loc><changefreq>daily</changefreq></url>`),
  ...SLUGS.flatMap(slug => LOCALES.map(l =>
    `<url><loc>${BASE_URL}/${l}/recipes/${slug}</loc><changefreq>weekly</changefreq></url>`
  )),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
console.log('✅ sitemap.xml generated');