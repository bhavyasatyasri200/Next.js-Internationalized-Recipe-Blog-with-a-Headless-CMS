// // lib/contentful.js
// // SERVER-SIDE ONLY — used only in getStaticProps/getStaticPaths.
// // Uses dynamic import() for 'contentful' to avoid browser fs/http2 errors.

// const MOCK_RECIPES = [
//     {
//       sys: { id: '1' },
//       fields: {
//         title: {
//           en: 'Classic Spanish Paella',
//           es: 'Paella Española Clásica',
//           fr: 'Paëlla Espagnole Classique',
//         },
//         slug: { en: 'classic-spanish-paella', es: 'classic-spanish-paella', fr: 'classic-spanish-paella' },
//         description: {
//           en: 'A vibrant and flavorful Spanish rice dish loaded with seafood, chicken, and saffron.',
//           es: 'Un colorido y sabroso plato de arroz español cargado de mariscos, pollo y azafrán.',
//           fr: 'Un plat de riz espagnol vibrant et savoureux chargé de fruits de mer, de poulet et de safran.',
//         },
//         ingredients: {
//           en: ['2 cups Arborio rice', '4 cups chicken broth', '1 lb shrimp', '1 lb chicken thighs', '1 tsp saffron', '2 cloves garlic', '1 onion', '2 tbsp olive oil', '1 red bell pepper', 'Salt and pepper'],
//           es: ['2 tazas de arroz Arborio', '4 tazas de caldo de pollo', '500g de gambas', '500g de muslos de pollo', '1 cucharadita de azafrán', '2 dientes de ajo', '1 cebolla', '2 cucharadas de aceite de oliva', '1 pimiento rojo', 'Sal y pimienta'],
//           fr: ['2 tasses de riz Arborio', '4 tasses de bouillon de poulet', '500g de crevettes', '500g de cuisses de poulet', '1 c.à.c de safran', '2 gousses d\'ail', '1 oignon', '2 c.à.s d\'huile d\'olive', '1 poivron rouge', 'Sel et poivre'],
//         },
//         instructions: {
//           en: 'Heat olive oil in a large paella pan. Sauté chicken until golden. Add onion and garlic. Stir in rice and saffron. Pour in broth. Add seafood and bell pepper. Cook on medium heat for 20 minutes without stirring. Let rest 5 minutes before serving.',
//           es: 'Calentar el aceite de oliva en una paellera grande. Sofreír el pollo hasta dorar. Añadir cebolla y ajo. Incorporar arroz y azafrán. Verter el caldo. Agregar mariscos y pimiento. Cocinar a fuego medio 20 minutos sin remover. Reposar 5 minutos antes de servir.',
//           fr: 'Chauffer l\'huile d\'olive dans une grande poêle à paella. Faire revenir le poulet jusqu\'à ce qu\'il soit doré. Ajouter l\'oignon et l\'ail. Incorporer le riz et le safran. Verser le bouillon. Ajouter les fruits de mer et le poivron. Cuire à feu moyen 20 minutes sans remuer. Laisser reposer 5 minutes avant de servir.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' },
//             title: 'Spanish Paella',
//           },
//         },
//         cuisine: { fields: { name: { en: 'Spanish', es: 'Española', fr: 'Espagnole' } } },
//         difficulty: 'Medium',
//         cookingTime: 45,
//         isFeatured: true,
//         tags: ['seafood', 'rice', 'spanish'],
//       },
//     },
//     {
//       sys: { id: '2' },
//       fields: {
//         title: {
//           en: 'French Coq au Vin',
//           es: 'Coq au Vin Francés',
//           fr: 'Coq au Vin Français',
//         },
//         slug: { en: 'french-coq-au-vin', es: 'french-coq-au-vin', fr: 'french-coq-au-vin' },
//         description: {
//           en: 'Tender chicken braised in red wine with mushrooms, bacon, and herbs.',
//           es: 'Tierno pollo estofado en vino tinto con champiñones, tocino y hierbas.',
//           fr: 'Poulet tendre braisé au vin rouge avec des champignons, du lard et des herbes.',
//         },
//         ingredients: {
//           en: ['1 whole chicken cut up', '2 cups red wine', '1 cup chicken stock', '200g mushrooms', '150g bacon', '2 carrots', '2 cloves garlic', 'Fresh thyme', 'Bay leaves', '2 tbsp flour'],
//           es: ['1 pollo entero cortado', '2 tazas de vino tinto', '1 taza de caldo de pollo', '200g de champiñones', '150g de tocino', '2 zanahorias', '2 dientes de ajo', 'Tomillo fresco', 'Hojas de laurel', '2 cucharadas de harina'],
//           fr: ['1 poulet entier découpé', '2 tasses de vin rouge', '1 tasse de bouillon de poulet', '200g de champignons', '150g de lardons', '2 carottes', '2 gousses d\'ail', 'Thym frais', 'Feuilles de laurier', '2 c.à.s de farine'],
//         },
//         instructions: {
//           en: 'Brown bacon in a Dutch oven. Remove and brown chicken pieces. Add vegetables and garlic. Sprinkle flour over everything. Pour in wine and stock. Add herbs. Cover and simmer for 1 hour. Sauté mushrooms separately and add in the last 15 minutes.',
//           es: 'Dorar el tocino en una cazuela. Retirar y dorar los trozos de pollo. Agregar verduras y ajo. Espolvorear harina. Verter vino y caldo. Agregar hierbas. Cubrir y cocer a fuego lento 1 hora. Saltear champiñones y añadir los últimos 15 minutos.',
//           fr: 'Faire dorer les lardons dans une cocotte. Retirer et faire dorer les morceaux de poulet. Ajouter les légumes et l\'ail. Saupoudrer de farine. Verser le vin et le bouillon. Ajouter les herbes. Couvrir et mijoter 1 heure. Faire sauter les champignons séparément et les ajouter les 15 dernières minutes.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80' },
//             title: 'Coq au Vin',
//           },
//         },
//         cuisine: { fields: { name: { en: 'French', es: 'Francesa', fr: 'Française' } } },
//         difficulty: 'Hard',
//         cookingTime: 90,
//         isFeatured: true,
//         tags: ['chicken', 'wine', 'french', 'braised'],
//       },
//     },
//     {
//       sys: { id: '3' },
//       fields: {
//         title: {
//           en: 'Italian Margherita Pizza',
//           es: 'Pizza Margherita Italiana',
//           fr: 'Pizza Margherita Italienne',
//         },
//         slug: { en: 'italian-margherita-pizza', es: 'italian-margherita-pizza', fr: 'italian-margherita-pizza' },
//         description: {
//           en: 'Classic Neapolitan pizza with tomato, fresh mozzarella, and basil.',
//           es: 'Clásica pizza napolitana con tomate, mozzarella fresca y albahaca.',
//           fr: 'Pizza napolitaine classique avec tomate, mozzarella fraîche et basilic.',
//         },
//         ingredients: {
//           en: ['Pizza dough', '1 cup tomato sauce', '200g fresh mozzarella', 'Fresh basil', '2 tbsp olive oil', 'Salt'],
//           es: ['Masa de pizza', '1 taza de salsa de tomate', '200g de mozzarella fresca', 'Albahaca fresca', '2 cucharadas de aceite de oliva', 'Sal'],
//           fr: ['Pâte à pizza', '1 tasse de sauce tomate', '200g de mozzarella fraîche', 'Basilic frais', '2 c.à.s d\'huile d\'olive', 'Sel'],
//         },
//         instructions: {
//           en: 'Preheat oven to 250°C. Stretch dough on a floured surface. Spread tomato sauce. Tear mozzarella and distribute. Drizzle with olive oil. Bake for 10-12 minutes until crust is golden. Add fresh basil after baking.',
//           es: 'Precalentar el horno a 250°C. Estirar la masa en una superficie enharinada. Extender la salsa de tomate. Trozar la mozzarella y distribuir. Rociar con aceite de oliva. Hornear 10-12 minutos hasta dorar. Añadir albahaca fresca tras hornear.',
//           fr: 'Préchauffer le four à 250°C. Étirer la pâte sur une surface farinée. Étaler la sauce tomate. Déchirer la mozzarella et la distribuer. Arroser d\'huile d\'olive. Cuire 10-12 minutes jusqu\'à ce que la croûte soit dorée. Ajouter le basilic frais après la cuisson.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80' },
//             title: 'Margherita Pizza',
//           },
//         },
//         cuisine: { fields: { name: { en: 'Italian', es: 'Italiana', fr: 'Italienne' } } },
//         difficulty: 'Easy',
//         cookingTime: 30,
//         isFeatured: true,
//         tags: ['pizza', 'italian', 'vegetarian'],
//       },
//     },
//     {
//       sys: { id: '4' },
//       fields: {
//         title: {
//           en: 'Mexican Chicken Tacos',
//           es: 'Tacos de Pollo Mexicanos',
//           fr: 'Tacos de Poulet Mexicains',
//         },
//         slug: { en: 'mexican-chicken-tacos', es: 'mexican-chicken-tacos', fr: 'mexican-chicken-tacos' },
//         description: {
//           en: 'Juicy grilled chicken tacos with fresh salsa, avocado, and lime.',
//           es: 'Jugosos tacos de pollo a la parrilla con salsa fresca, aguacate y lima.',
//           fr: 'Tacos de poulet grillé juteux avec salsa fraîche, avocat et citron vert.',
//         },
//         ingredients: {
//           en: ['8 corn tortillas', '500g chicken breast', '2 avocados', '1 cup salsa', 'Fresh cilantro', '2 limes', '1 tsp cumin', '1 tsp chili powder', 'Salt'],
//           es: ['8 tortillas de maíz', '500g de pechuga de pollo', '2 aguacates', '1 taza de salsa', 'Cilantro fresco', '2 limas', '1 cucharadita de comino', '1 cucharadita de chile en polvo', 'Sal'],
//           fr: ['8 tortillas de maïs', '500g de blanc de poulet', '2 avocats', '1 tasse de salsa', 'Coriandre fraîche', '2 citrons verts', '1 c.à.c de cumin', '1 c.à.c de piment en poudre', 'Sel'],
//         },
//         instructions: {
//           en: 'Season chicken with cumin, chili, and salt. Grill for 6-8 minutes each side. Rest and slice. Warm tortillas. Mash avocado. Assemble tacos with chicken, avocado, salsa, and cilantro. Squeeze lime before serving.',
//           es: 'Sazonar el pollo con comino, chile y sal. Asar 6-8 minutos por lado. Reposar y cortar. Calentar tortillas. Machacar aguacate. Armar tacos con pollo, aguacate, salsa y cilantro. Exprimir lima antes de servir.',
//           fr: 'Assaisonner le poulet avec du cumin, du piment et du sel. Griller 6-8 minutes de chaque côté. Laisser reposer et trancher. Chauffer les tortillas. Écraser l\'avocat. Assembler les tacos avec le poulet, l\'avocat, la salsa et la coriandre. Presser le citron vert avant de servir.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80' },
//             title: 'Chicken Tacos',
//           },
//         },
//         cuisine: { fields: { name: { en: 'Mexican', es: 'Mexicana', fr: 'Mexicaine' } } },
//         difficulty: 'Easy',
//         cookingTime: 25,
//         isFeatured: false,
//         tags: ['tacos', 'mexican', 'chicken', 'quick'],
//       },
//     },
//     {
//       sys: { id: '5' },
//       fields: {
//         title: {
//           en: 'Japanese Ramen',
//           es: 'Ramen Japonés',
//           fr: 'Ramen Japonais',
//         },
//         slug: { en: 'japanese-ramen', es: 'japanese-ramen', fr: 'japanese-ramen' },
//         description: {
//           en: 'Rich tonkotsu pork broth ramen with soft-boiled egg, chashu, and noodles.',
//           es: 'Ramen de caldo de cerdo tonkotsu rico con huevo cocido, chashu y fideos.',
//           fr: 'Ramen au bouillon de porc tonkotsu riche avec œuf mollet, chashu et nouilles.',
//         },
//         ingredients: {
//           en: ['4 portions ramen noodles', '2L pork bone broth', '4 eggs', '400g pork belly', 'Soy sauce', 'Mirin', 'Sesame oil', 'Green onions', 'Nori sheets', 'Bamboo shoots'],
//           es: ['4 porciones de fideos ramen', '2L de caldo de huesos de cerdo', '4 huevos', '400g de panceta de cerdo', 'Salsa de soya', 'Mirin', 'Aceite de sésamo', 'Cebollas verdes', 'Hojas de nori', 'Brotes de bambú'],
//           fr: ['4 portions de nouilles ramen', '2L de bouillon d\'os de porc', '4 œufs', '400g de poitrine de porc', 'Sauce soja', 'Mirin', 'Huile de sésame', 'Oignons verts', 'Feuilles de nori', 'Pousses de bambou'],
//         },
//         instructions: {
//           en: 'Simmer pork broth for 2 hours. Marinate and slow-cook pork belly. Soft-boil eggs and marinate in soy-mirin. Cook noodles per instructions. Assemble bowls with hot broth, noodles, sliced chashu, halved egg, and toppings.',
//           es: 'Hervir el caldo de cerdo 2 horas. Marinar y cocinar lentamente la panceta. Cocer los huevos y marinar en soya-mirin. Cocer fideos según instrucciones. Armar cuencos con caldo caliente, fideos, chashu en rodajas, huevo partido y aderezos.',
//           fr: 'Faire mijoter le bouillon de porc 2 heures. Faire mariner et cuire lentement la poitrine de porc. Cuire les œufs mollets et les faire mariner dans la soja-mirin. Cuire les nouilles selon les instructions. Assembler les bols avec le bouillon chaud, les nouilles, le chashu tranché, l\'œuf coupé en deux et les garnitures.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80' },
//             title: 'Japanese Ramen',
//           },
//         },
//         cuisine: { fields: { name: { en: 'Japanese', es: 'Japonesa', fr: 'Japonaise' } } },
//         difficulty: 'Hard',
//         cookingTime: 180,
//         isFeatured: false,
//         tags: ['ramen', 'japanese', 'soup', 'noodles'],
//       },
//     },
//     {
//       sys: { id: '6' },
//       fields: {
//         title: {
//           en: 'Greek Moussaka',
//           es: 'Musaka Griega',
//           fr: 'Moussaka Grecque',
//         },
//         slug: { en: 'greek-moussaka', es: 'greek-moussaka', fr: 'greek-moussaka' },
//         description: {
//           en: 'Layered eggplant and spiced ground lamb casserole topped with creamy béchamel.',
//           es: 'Cazuela de berenjenas y cordero picado especiado cubierta con cremosa bechamel.',
//           fr: 'Casserole d\'aubergines et d\'agneau haché épicé surmontée d\'une béchamel crémeuse.',
//         },
//         ingredients: {
//           en: ['3 large eggplants', '500g ground lamb', '1 cup tomato sauce', '2 onions', 'Cinnamon', 'Allspice', 'For béchamel: 4 tbsp butter, 4 tbsp flour, 2 cups milk, 2 eggs'],
//           es: ['3 berenjenas grandes', '500g de cordero molido', '1 taza de salsa de tomate', '2 cebollas', 'Canela', 'Pimienta de Jamaica', 'Para bechamel: 4 cdas mantequilla, 4 cdas harina, 2 tazas leche, 2 huevos'],
//           fr: ['3 grandes aubergines', '500g d\'agneau haché', '1 tasse de sauce tomate', '2 oignons', 'Cannelle', 'Quatre-épices', 'Pour la béchamel: 4 c.à.s beurre, 4 c.à.s farine, 2 tasses lait, 2 œufs'],
//         },
//         instructions: {
//           en: 'Slice and salt eggplants, then fry or roast. Cook lamb with onions, tomatoes and spices. Make béchamel. Layer eggplant, meat sauce, eggplant again, then top with béchamel. Bake at 180°C for 45 minutes until golden.',
//           es: 'Cortar y salar las berenjenas, luego freír o asar. Cocinar el cordero con cebollas, tomates y especias. Preparar bechamel. Colocar capas de berenjena, salsa de carne, berenjena de nuevo y cubrir con bechamel. Hornear a 180°C 45 minutos hasta dorar.',
//           fr: 'Trancher et saler les aubergines, puis frire ou rôtir. Cuire l\'agneau avec les oignons, les tomates et les épices. Préparer la béchamel. Superposer les aubergines, la sauce à la viande, les aubergines à nouveau, puis couvrir de béchamel. Cuire à 180°C pendant 45 minutes jusqu\'à ce que ce soit doré.',
//         },
//         featuredImage: {
//           fields: {
//             file: { url: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800&q=80' },
//             title: 'Greek Moussaka',
//           },
//         },
//         cuisine: { fields: { name: { en: 'Greek', es: 'Griega', fr: 'Grecque' } } },
//         difficulty: 'Medium',
//         cookingTime: 120,
//         isFeatured: false,
//         tags: ['lamb', 'greek', 'baked', 'casserole'],
//       },
//     },
//   ];
  
//   function getFieldValue(field, locale) {
//     if (!field) return null;
//     if (typeof field === 'string') return field;
//     if (typeof field === 'number') return field;
//     if (typeof field === 'boolean') return field;
//     if (Array.isArray(field)) return field;
//     if (field[locale]) return field[locale];
//     if (field['en']) return field['en'];
//     return field;
//   }
  
//   function normalizeRecipe(item, locale = 'en') {
//     const f = item.fields;
//     return {
//       id: item.sys.id,
//       title: getFieldValue(f.title, locale) || '',
//       slug: getFieldValue(f.slug, locale) || getFieldValue(f.slug, 'en') || '',
//       description: getFieldValue(f.description, locale) || '',
//       ingredients: getFieldValue(f.ingredients, locale) || [],
//       instructions: getFieldValue(f.instructions, locale) || '',
//       featuredImage: f.featuredImage
//         ? {
//             url: f.featuredImage.fields?.file?.url || '',
//             alt: f.featuredImage.fields?.title || '',
//           }
//         : null,
//       cuisine: f.cuisine
//         ? getFieldValue(f.cuisine.fields?.name, locale) || ''
//         : '',
//       difficulty: f.difficulty || 'Easy',
//       cookingTime: f.cookingTime || 0,
//       isFeatured: f.isFeatured || false,
//       tags: f.tags || [],
//     };
//   }
  
//   let contentfulClient = null;
  
//   async function getClient() {
//     if (contentfulClient) return contentfulClient;
  
//     const spaceId = process.env.CONTENTFUL_SPACE_ID;
//     const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
//     if (
//       spaceId &&
//       accessToken &&
//       spaceId !== 'demo_space_id' &&
//       accessToken !== 'demo_access_token'
//     ) {
//       try {
//         const contentful = require('contentful');
//         contentfulClient = contentful.createClient({ space: spaceId, accessToken });
//         return contentfulClient;
//       } catch (e) {
//         console.warn('Contentful client failed, using mock data:', e.message);
//       }
//     }
//     return null;
//   }
  
//   export async function getAllRecipes(locale = 'en') {
//     const client = await getClient();
  
//     if (client) {
//       try {
//         const entries = await client.getEntries({
//           content_type: 'recipe',
//           locale: locale === 'en' ? 'en-US' : locale,
//           include: 2,
//         });
//         return entries.items.map((item) => normalizeRecipe(item, locale));
//       } catch (err) {
//         console.warn('Contentful fetch failed, using mock data:', err.message);
//       }
//     }
  
//     return MOCK_RECIPES.map((item) => normalizeRecipe(item, locale));
//   }
  
//   export async function getFeaturedRecipes(locale = 'en') {
//     const all = await getAllRecipes(locale);
//     return all.filter((r) => r.isFeatured);
//   }
  
//   export async function getRecipeBySlug(slug, locale = 'en') {
//     const all = await getAllRecipes(locale);
//     return all.find((r) => r.slug === slug) || null;
//   }
  
//   export async function getAllRecipeSlugs() {
//     const recipes = await getAllRecipes('en');
//     return recipes.map((r) => r.slug);
//   }
  
//   export async function getAllCategories(locale = 'en') {
//     const all = await getAllRecipes(locale);
//     const cuisines = [...new Set(all.map((r) => r.cuisine).filter(Boolean))];
//     return cuisines;
//   }

// lib/contentful.js - SERVER SIDE ONLY

async function getClient() {
    const contentful = await import('contentful');
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    return client;
  }
  
  function normalizeRecipe(item) {
    const f = item.fields;
    return {
      id: item.sys.id,
      title: f.title || '',
      slug: f.slug || '',
      description: f.description || '',
      ingredients: Array.isArray(f.ingredients)
        ? f.ingredients
        : typeof f.ingredients === 'string'
        ? f.ingredients.split('\n').filter(Boolean)
        : [],
      instructions: f.instructions || '',
      featuredImage: f.featuredImage
        ? {
            url: f.featuredImage.fields?.file?.url || '',
            alt: f.featuredImage.fields?.title || '',
          }
        : null,
      cuisine: f.cuisine || '',
      difficulty: f.difficulty || 'Easy',
      cookingTime: f.cookingTime || 0,
      isFeatured: f.isFeatured || false,
      tags: f.tags || [],
    };
  }
  
  export async function getAllRecipes(locale = 'en') {
    try {
      const client = await getClient();
      const entries = await client.getEntries({
        content_type: 'recipe',
        include: 2,
      });
      console.log(`✅ Contentful: fetched ${entries.items.length} recipes`);
      return entries.items.map(normalizeRecipe);
    } catch (err) {
      console.error('❌ Contentful error:', err.message);
      return [];
    }
  }
  
  export async function getFeaturedRecipes(locale = 'en') {
    try {
      const client = await getClient();
      const entries = await client.getEntries({
        content_type: 'recipe',
        'fields.isFeatured': true,
        include: 2,
      });
      console.log(`✅ Contentful: fetched ${entries.items.length} featured recipes`);
      return entries.items.map(normalizeRecipe);
    } catch (err) {
      console.error('❌ Contentful error:', err.message);
      return [];
    }
  }
  
  export async function getRecipeBySlug(slug, locale = 'en') {
    try {
      const client = await getClient();
      const entries = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': slug,
        include: 2,
      });
      if (entries.items.length === 0) return null;
      return normalizeRecipe(entries.items[0]);
    } catch (err) {
      console.error('❌ Contentful error:', err.message);
      return null;
    }
  }
  
  export async function getAllRecipeSlugs() {
    try {
      const client = await getClient();
      const entries = await client.getEntries({
        content_type: 'recipe',
        select: 'fields.slug',
      });
      return entries.items.map((item) => item.fields.slug).filter(Boolean);
    } catch (err) {
      console.error('❌ Contentful error:', err.message);
      return [];
    }
  }
  
  export async function getAllCategories(locale = 'en') {
    const recipes = await getAllRecipes(locale);
    return [...new Set(recipes.map((r) => r.cuisine).filter(Boolean))];
  }