// NOTE: This file is no longer used by the app's UI. The app now reads
// categories/products/coupons/customers/orders/reviews/home settings live
// from MongoDB via the Express API in server/ (see src/services/api.js).
// This file is kept only as the source data for `npm run seed` (server/seed/seed.js),
// which loads it once into MongoDB. The `images` URL pool below has also been
// copied to src/data/images.js, which is what components import for image assets.

// Image pools by category - real Pexels URLs
export const images = {
  men: [
    'https://images.pexels.com/photos/20431931/pexels-photo-20431931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38776933/pexels-photo-38776933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/25786314/pexels-photo-25786314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/36811366/pexels-photo-36811366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8489652/pexels-photo-8489652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37045884/pexels-photo-37045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9064117/pexels-photo-9064117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/28113615/pexels-photo-28113615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/16911729/pexels-photo-16911729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9020697/pexels-photo-9020697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  menCasual: [
    'https://images.pexels.com/photos/37591113/pexels-photo-37591113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11343844/pexels-photo-11343844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38773573/pexels-photo-38773573.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12973099/pexels-photo-12973099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/5770320/pexels-photo-5770320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4044933/pexels-photo-4044933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37831804/pexels-photo-37831804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37631696/pexels-photo-37631696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  women: [
    'https://images.pexels.com/photos/36041239/pexels-photo-36041239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7693907/pexels-photo-7693907.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12299168/pexels-photo-12299168.png?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38969253/pexels-photo-38969253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/32519307/pexels-photo-32519307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/17040982/pexels-photo-17040982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7176430/pexels-photo-7176430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34210956/pexels-photo-34210956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/27719404/pexels-photo-27719404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7176438/pexels-photo-7176438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  womenKurti: [
    'https://images.pexels.com/photos/13178920/pexels-photo-13178920.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8770996/pexels-photo-8770996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38641810/pexels-photo-38641810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37523792/pexels-photo-37523792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37523793/pexels-photo-37523793.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/37523801/pexels-photo-37523801.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6181955/pexels-photo-6181955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  kids: [
    'https://images.pexels.com/photos/34608858/pexels-photo-34608858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/30690921/pexels-photo-30690921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/38778561/pexels-photo-38778561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/35078823/pexels-photo-35078823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/36909815/pexels-photo-36909815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1620759/pexels-photo-1620759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  jeans: [
    'https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/17265364/pexels-photo-17265364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/16069736/pexels-photo-16069736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/18152444/pexels-photo-18152444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/17139455/pexels-photo-17139455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  hero: 'https://images.pexels.com/photos/20194705/pexels-photo-20194705.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hero2: 'https://images.pexels.com/photos/20231996/pexels-photo-20231996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  editorial: [
    'https://images.pexels.com/photos/20177238/pexels-photo-20177238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29937825/pexels-photo-29937825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  store: [
    'https://images.pexels.com/photos/11911863/pexels-photo-11911863.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1488470/pexels-photo-1488470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8386651/pexels-photo-8386651.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/13532891/pexels-photo-13532891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/10689371/pexels-photo-10689371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/5531711/pexels-photo-5531711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8387807/pexels-photo-8387807.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

// Helper to build image arrays (main + secondary)
const img = (pool, i) => [pool[i % pool.length], pool[(i + 1) % pool.length]];

export const categories = [
  { id: 1, name: 'Men', slug: 'men', image: images.men[0], productCount: 18, enabled: true },
  { id: 2, name: 'Women', slug: 'women', image: images.women[0], productCount: 20, enabled: true },
  { id: 3, name: 'Kids', slug: 'kids', image: images.kids[0], productCount: 8, enabled: true },
  { id: 4, name: 'Ethnic Wear', slug: 'ethnic-wear', image: images.men[2], productCount: 12, enabled: true },
  { id: 5, name: 'Casual Wear', slug: 'casual-wear', image: images.menCasual[0], productCount: 10, enabled: true },
  { id: 6, name: 'Dresses', slug: 'dresses', image: images.womenKurti[1], productCount: 6, enabled: true },
  { id: 7, name: 'Shirts', slug: 'shirts', image: images.menCasual[4], productCount: 5, enabled: true },
  { id: 8, name: 'T-Shirts', slug: 't-shirts', image: images.menCasual[3], productCount: 5, enabled: true },
  { id: 9, name: 'Jeans', slug: 'jeans', image: images.jeans[0], productCount: 4, enabled: true },
  { id: 10, name: 'Sarees', slug: 'sarees', image: images.women[3], productCount: 6, enabled: true },
  { id: 11, name: 'Kurtis', slug: 'kurtis', image: images.womenKurti[0], productCount: 8, enabled: true },
  { id: 12, name: 'New Arrivals', slug: 'new-arrivals', image: images.women[6], productCount: 12, enabled: true },
  { id: 13, name: 'Offers', slug: 'offers', image: images.store[0], productCount: 15, enabled: true },
  { id: 14, name: 'Ladies', slug: 'ladies', image: images.women[2], productCount: 12, enabled: true },
  { id: 15, name: 'Gents', slug: 'gents', image: images.men[5], productCount: 9, enabled: true },
  { id: 16, name: 'School', slug: 'school', image: images.kids[3], productCount: 11, enabled: true },
];

const sizesClothing = ['S', 'M', 'L', 'XL', 'XXL'];
const sizesKids = ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'];
const colorsCommon = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#f5f5f5' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Maroon', hex: '#6b1d2e' },
  { name: 'Olive', hex: '#5c5c2e' },
  { name: 'Beige', hex: '#d4b896' },
  { name: 'Mustard', hex: '#d4a017' },
  { name: 'Teal', hex: '#1a7a7a' },
  { name: 'Coral', hex: '#e07856' },
  { name: 'Rust', hex: '#a8412a' },
];

const pickColors = (i) => {
  const start = i % colorsCommon.length;
  return [colorsCommon[start], colorsCommon[(start + 1) % colorsCommon.length], colorsCommon[(start + 2) % colorsCommon.length]];
};

const reviewsData = [
  { name: 'Priya Sharma', rating: 5, date: '2026-07-15', comment: 'Excellent quality and fit. The fabric is premium and stitching is perfect.' },
  { name: 'Rajesh Kumar', rating: 5, date: '2026-07-10', comment: 'Great value for money. Looks even better than the photos.' },
  { name: 'Anita Desai', rating: 4, date: '2026-06-28', comment: 'Beautiful design, slightly tight around shoulders but overall lovely.' },
  { name: 'Vikram Singh', rating: 5, date: '2026-06-20', comment: 'Fast delivery and authentic product. Will buy again.' },
  { name: 'Meera Iyer', rating: 5, date: '2026-06-15', comment: 'Perfect for festive occasions. Got many compliments.' },
  { name: 'Arjun Patel', rating: 4, date: '2026-06-01', comment: 'Good material, color is exactly as shown. Recommended.' },
];

const makeReviews = (i) => {
  const count = 3 + (i % 4);
  return Array.from({ length: count }, (_, j) => ({
    id: `${i}-${j}`,
    ...reviewsData[(i + j) % reviewsData.length],
  }));
};

const calcDiscount = (price, original) => Math.round(((original - price) / original) * 100);

// Product generator
let pid = 1;
function makeProduct(p) {
  const price = p.price;
  const originalPrice = p.originalPrice || Math.round(price * 1.3);
  const discount = calcDiscount(price, originalPrice);
  return {
    id: pid++,
    name: p.name,
    description: p.description,
    category: p.category,
    subcategory: p.subcategory,
    gender: p.gender,
    price,
    originalPrice,
    discountPercentage: discount,
    images: p.images,
    sizes: p.sizes,
    colors: p.colors,
    specifications: p.specifications || {
      fabric: 'Premium Cotton Blend',
      care: 'Machine Wash Cold, Do Not Bleach',
      fit: 'Regular Fit',
      origin: 'Made in India',
    },
    availability: p.availability !== false,
    stock: p.stock ?? (20 + (pid % 50)),
    rating: p.rating || (4 + (pid % 10) / 10),
    reviewCount: p.reviewCount || (15 + (pid * 7) % 80),
    reviews: makeReviews(pid),
    isNew: p.isNew || false,
    isBestSeller: p.isBestSeller || false,
    isOffer: p.isOffer || false,
    createdAt: p.createdAt || `2026-0${(pid % 7) + 1}-15`,
  };
}

export const products = [
  // MEN - Ethnic
  makeProduct({ name: 'Royal Silk Kurta Pajama Set', description: 'An elegant silk kurta pajama set perfect for festive occasions and weddings. Features intricate embroidery on the neckline and premium silk fabric that drapes beautifully.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 2499, originalPrice: 3999, images: img(images.men, 0), sizes: sizesClothing, colors: pickColors(0), isNew: true, isBestSeller: true, rating: 4.8 }),
  makeProduct({ name: 'Classic White Kurta', description: 'A timeless white kurta crafted from breathable cotton. Versatile for both casual and semi-formal occasions with a clean, minimalist design.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 1299, originalPrice: 1999, images: img(images.men, 5), sizes: sizesClothing, colors: pickColors(1), isBestSeller: true }),
  makeProduct({ name: 'Maroon Festive Kurta', description: 'Rich maroon kurta with traditional motifs. Ideal for festivals and celebrations, made from comfortable cotton-silk blend.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 1799, originalPrice: 2799, images: img(images.men, 6), sizes: sizesClothing, colors: pickColors(2), isNew: true }),
  makeProduct({ name: 'Embroidered Sherwani Jacket', description: 'A statement sherwani jacket with detailed embroidery. Perfect for grooms and wedding guests seeking a regal look.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 3499, originalPrice: 5999, images: img(images.men, 1), sizes: sizesClothing, colors: pickColors(3), isOffer: true }),
  makeProduct({ name: 'Orange Ethnic Kurta', description: 'Vibrant orange kurta with pajama, crafted for comfort and style. A standout piece for festive celebrations.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 1599, originalPrice: 2499, images: img(images.men, 2), sizes: sizesClothing, colors: pickColors(4), isNew: true }),

  // MEN - Casual
  makeProduct({ name: 'Urban Casual Shirt', description: 'A modern casual shirt in a versatile design. Made from breathable cotton, perfect for everyday wear and weekend outings.', category: 'Men', subcategory: 'Shirts', gender: 'male', price: 899, originalPrice: 1499, images: img(images.menCasual, 4), sizes: sizesClothing, colors: pickColors(5), isBestSeller: true }),
  makeProduct({ name: 'Premium Cotton T-Shirt', description: 'Soft cotton t-shirt with a contemporary fit. A wardrobe essential that pairs effortlessly with jeans or chinos.', category: 'Men', subcategory: 'T-Shirts', gender: 'male', price: 599, originalPrice: 999, images: img(images.menCasual, 3), sizes: sizesClothing, colors: pickColors(6), isNew: true }),
  makeProduct({ name: 'Streetwear Hoodie', description: 'A stylish hoodie with a relaxed fit. Crafted from fleece for warmth and comfort during cooler months.', category: 'Men', subcategory: 'Casual Wear', gender: 'male', price: 1299, originalPrice: 1999, images: img(images.menCasual, 0), sizes: sizesClothing, colors: pickColors(7), isOffer: true }),
  makeProduct({ name: 'Denim Shirt Jacket', description: 'A versatile denim shirt jacket that works as a layering piece. Classic indigo wash with a modern cut.', category: 'Men', subcategory: 'Jackets', gender: 'male', price: 1899, originalPrice: 2999, images: img(images.menCasual, 7), sizes: sizesClothing, colors: pickColors(8), isNew: true, isBestSeller: true }),
  makeProduct({ name: 'Striped Casual Shirt', description: 'A breezy striped shirt for relaxed weekends. Lightweight fabric keeps you cool all day.', category: 'Men', subcategory: 'Shirts', gender: 'male', price: 799, originalPrice: 1299, images: img(images.menCasual, 5), sizes: sizesClothing, colors: pickColors(9) }),
  makeProduct({ name: 'Graphic Print T-Shirt', description: 'Express yourself with this graphic print t-shirt. Soft cotton blend with a modern silhouette.', category: 'Men', subcategory: 'T-Shirts', gender: 'male', price: 699, originalPrice: 1099, images: img(images.menCasual, 1), sizes: sizesClothing, colors: pickColors(0), isBestSeller: true }),
  makeProduct({ name: 'Slim Fit Jeans', description: 'Premium slim fit jeans with stretch comfort. A versatile dark wash that transitions from day to night.', category: 'Men', subcategory: 'Jeans', gender: 'male', price: 1499, originalPrice: 2299, images: img(images.jeans, 0), sizes: sizesClothing, colors: pickColors(1), isNew: true }),
  makeProduct({ name: 'Classic Straight Jeans', description: 'Timeless straight cut jeans in mid-wash blue. Durable denim with a comfortable regular fit.', category: 'Men', subcategory: 'Jeans', gender: 'male', price: 1299, originalPrice: 1999, images: img(images.jeans, 1), sizes: sizesClothing, colors: pickColors(2), isOffer: true }),
  makeProduct({ name: 'Casual Chinos', description: 'Refined chinos perfect for smart-casual occasions. Soft twill fabric with a tailored fit.', category: 'Men', subcategory: 'Trousers', gender: 'male', price: 1099, originalPrice: 1799, images: img(images.menCasual, 6), sizes: sizesClothing, colors: pickColors(3) }),

  // WOMEN - Ethnic
  makeProduct({ name: 'Banarasi Silk Saree', description: 'A stunning Banarasi silk saree with gold zari work. Perfect for weddings and grand celebrations, this saree exudes timeless elegance.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 3999, originalPrice: 6499, images: img(images.women, 3), sizes: ['Free Size'], colors: pickColors(2), isBestSeller: true, rating: 4.9 }),
  makeProduct({ name: 'Blue Silk Saree', description: 'Elegant blue silk saree with traditional motifs. A graceful choice for festivals and special occasions.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2999, originalPrice: 4999, images: img(images.women, 1), sizes: ['Free Size'], colors: pickColors(3), isNew: true }),
  makeProduct({ name: 'Yellow Designer Saree', description: 'A vibrant yellow designer saree that radiates joy. Crafted from lightweight fabric with beautiful draping.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2499, originalPrice: 3999, images: img(images.women, 7), sizes: ['Free Size'], colors: pickColors(4), isOffer: true }),
  makeProduct({ name: 'Teal Party Saree', description: 'A sophisticated teal saree for evening events. Features subtle shimmer and a flowing silhouette.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2799, originalPrice: 4499, images: img(images.women, 8), sizes: ['Free Size'], colors: pickColors(5), isBestSeller: true }),

  // WOMEN - Kurtis
  makeProduct({ name: 'Cotton Kurti - Blue', description: 'A comfortable cotton kurti in a serene blue shade. Perfect for daily wear with its breathable fabric and elegant print.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 799, originalPrice: 1299, images: img(images.womenKurti, 0), sizes: sizesClothing, colors: pickColors(6), isNew: true, isBestSeller: true }),
  makeProduct({ name: 'Embroidered Yellow Kurti', description: 'A cheerful yellow kurti with delicate embroidery. Ideal for festive gatherings and casual celebrations.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 1199, originalPrice: 1899, images: img(images.womenKurti, 1), sizes: sizesClothing, colors: pickColors(7), isNew: true }),
  makeProduct({ name: 'Red Daily Wear Kurti', description: 'A vibrant red kurti designed for everyday comfort. Soft fabric and a flattering fit make it a wardrobe staple.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 699, originalPrice: 1099, images: img(images.womenKurti, 2), sizes: sizesClothing, colors: pickColors(8), isOffer: true }),
  makeProduct({ name: 'Turquoise Office Kurti', description: 'A refined turquoise kurti perfect for work settings. Clean lines and professional silhouette.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 999, originalPrice: 1599, images: img(images.womenKurti, 3), sizes: sizesClothing, colors: pickColors(9), isBestSeller: true }),
  makeProduct({ name: 'Festive Red Kurti Set', description: 'A complete festive kurti set with dupatta. Rich red color with traditional prints for celebrations.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 1799, originalPrice: 2799, images: img(images.womenKurti, 4), sizes: sizesClothing, colors: pickColors(0), isNew: true }),

  // WOMEN - Dresses & Western
  makeProduct({ name: 'Red Cocktail Dress', description: 'A striking red cocktail dress for special evenings. Tailored fit with elegant draping that commands attention.', category: 'Women', subcategory: 'Dresses', gender: 'female', price: 2199, originalPrice: 3499, images: img(images.women, 2), sizes: sizesClothing, colors: pickColors(1), isBestSeller: true, rating: 4.7 }),
  makeProduct({ name: 'Black Evening Gown', description: 'A sophisticated black evening gown with timeless appeal. Perfect for formal events and galas.', category: 'Women', subcategory: 'Dresses', gender: 'female', price: 2999, originalPrice: 4999, images: img(images.women, 4), sizes: sizesClothing, colors: pickColors(2), isOffer: true }),
  makeProduct({ name: 'Floral Summer Dress', description: 'A breezy floral dress for warm days. Lightweight fabric with a flattering silhouette for effortless style.', category: 'Women', subcategory: 'Dresses', gender: 'female', price: 1299, originalPrice: 1999, images: img(images.womenKurti, 7), sizes: sizesClothing, colors: pickColors(3), isNew: true }),
  makeProduct({ name: 'Casual Top & Jeans Set', description: 'A coordinated casual set featuring a stylish top and jeans. Versatile and comfortable for everyday wear.', category: 'Women', subcategory: 'Western Wear', gender: 'female', price: 1599, originalPrice: 2599, images: img(images.women, 6), sizes: sizesClothing, colors: pickColors(4), isBestSeller: true }),
  makeProduct({ name: 'Elegant Evening Saree', description: 'A graceful evening saree in soft tones. Perfect for intimate gatherings and dinner parties.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2299, originalPrice: 3699, images: img(images.women, 5), sizes: ['Free Size'], colors: pickColors(5) }),
  makeProduct({ name: 'Colorful Festival Saree', description: 'A vibrant festival saree with multi-color borders. Celebrate in style with this eye-catching drape.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 1899, originalPrice: 2999, images: img(images.women, 8), sizes: ['Free Size'], colors: pickColors(6), isOffer: true }),
  makeProduct({ name: 'Traditional Greeting Saree', description: 'A classic teal saree with traditional greeting pose styling. Elegant and culturally rich.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2599, originalPrice: 4199, images: img(images.women, 9), sizes: ['Free Size'], colors: pickColors(7), isBestSeller: true, rating: 4.8 }),
  makeProduct({ name: 'Graceful Waterfront Saree', description: 'An elegant saree perfect for outdoor occasions. Lightweight and beautifully crafted for comfort.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 2099, originalPrice: 3299, images: img(images.women, 0), sizes: ['Free Size'], colors: pickColors(8), isNew: true }),

  // KIDS
  makeProduct({ name: 'Kids Green Traditional Set', description: 'Adorable green traditional outfit for kids. Soft fabric and comfortable fit for festive occasions.', category: 'Kids', subcategory: 'Ethnic Wear', gender: 'kids', price: 899, originalPrice: 1499, images: img(images.kids, 0), sizes: sizesKids, colors: pickColors(4), isNew: true, isBestSeller: true }),
  makeProduct({ name: 'Boys Formal Suit', description: 'A dashing formal suit for young gentlemen. Perfect for weddings and special events.', category: 'Kids', subcategory: 'Party Wear', gender: 'kids', price: 1799, originalPrice: 2799, images: img(images.kids, 1), sizes: sizesKids, colors: pickColors(0), isBestSeller: true }),
  makeProduct({ name: 'Kids Denim & Sunglasses Set', description: 'A cool denim outfit set with matching sunglasses. Stylish and comfortable for everyday adventures.', category: 'Kids', subcategory: 'Casual Wear', gender: 'kids', price: 1099, originalPrice: 1799, images: img(images.kids, 2), sizes: sizesKids, colors: pickColors(1), isNew: true }),
  makeProduct({ name: 'Winter Coat for Kids', description: 'A cozy winter coat to keep your little one warm. Premium insulation with a stylish design.', category: 'Kids', subcategory: 'Casual Wear', gender: 'kids', price: 1499, originalPrice: 2399, images: img(images.kids, 3), sizes: sizesKids, colors: pickColors(2), isOffer: true }),
  makeProduct({ name: 'Boys Bow Tie Suit', description: 'An elegant suit with bow tie for special occasions. Make your young man look sharp and dapper.', category: 'Kids', subcategory: 'Party Wear', gender: 'kids', price: 1999, originalPrice: 3199, images: img(images.kids, 4), sizes: sizesKids, colors: pickColors(3), isNew: true }),
  makeProduct({ name: 'Nautical Kids Outfit', description: 'A fun nautical-themed outfit set for kids. Comfortable cotton blend with playful design.', category: 'Kids', subcategory: 'Casual Wear', gender: 'kids', price: 1199, originalPrice: 1899, images: img(images.kids, 5), sizes: sizesKids, colors: pickColors(5), isBestSeller: true }),

  // More MEN
  makeProduct({ name: 'Traditional Attire with Shawl', description: 'A premium traditional outfit complete with a patterned shawl. Regal and elegant for grand occasions.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 2999, originalPrice: 4999, images: img(images.men, 3), sizes: sizesClothing, colors: pickColors(4), isBestSeller: true }),
  makeProduct({ name: 'Vibrant South Asian Kurta', description: 'A colorful kurta inspired by South Asian traditions. Stand out at any cultural celebration.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 1899, originalPrice: 2999, images: img(images.men, 4), sizes: sizesClothing, colors: pickColors(5), isOffer: true }),
  makeProduct({ name: 'Red Traditional Outfit', description: 'A bold red traditional outfit that makes a statement. Crafted for comfort and cultural pride.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 2199, originalPrice: 3499, images: img(images.men, 9), sizes: sizesClothing, colors: pickColors(6), isNew: true }),
  makeProduct({ name: 'Smiling Festive Kurta', description: 'A joyful festive kurta with ornate details. Perfect for celebrations and family gatherings.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 1699, originalPrice: 2699, images: img(images.men, 8), sizes: sizesClothing, colors: pickColors(7) }),
  makeProduct({ name: 'Golden Hour Traditional Wear', description: 'Traditional attire that catches the golden hour light. A photogenic choice for outdoor events.', category: 'Men', subcategory: 'Ethnic Wear', gender: 'male', price: 2399, originalPrice: 3899, images: img(images.men, 7), sizes: sizesClothing, colors: pickColors(8), isOffer: true }),

  // More WOMEN
  makeProduct({ name: 'Casual Sunglass Dress', description: 'A chic casual dress paired with sunglasses. Effortless style for sunny day outings.', category: 'Women', subcategory: 'Dresses', gender: 'female', price: 1399, originalPrice: 2199, images: img(images.menCasual, 0), sizes: sizesClothing, colors: pickColors(9), isNew: true }),
  makeProduct({ name: 'Traditional Palm Tree Kurti', description: 'A breezy kurti with traditional prints, set against palm tree aesthetics. Comfortable and stylish.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 899, originalPrice: 1499, images: img(images.womenKurti, 6), sizes: sizesClothing, colors: pickColors(0) }),

  // Casual / Jeans more
  makeProduct({ name: 'Designer Folded Jeans', description: 'Premium designer jeans with a refined folded look. Versatile styling for any occasion.', category: 'Women', subcategory: 'Jeans', gender: 'female', price: 1599, originalPrice: 2499, images: img(images.jeans, 2), sizes: sizesClothing, colors: pickColors(1), isBestSeller: true }),
  makeProduct({ name: 'Classic Blue Jeans', description: 'Timeless blue jeans with a comfortable fit. A wardrobe essential for every day.', category: 'Men', subcategory: 'Jeans', gender: 'male', price: 1199, originalPrice: 1899, images: img(images.jeans, 3), sizes: sizesClothing, colors: pickColors(2), isNew: true }),
  makeProduct({ name: 'Premium Stretch Jeans', description: 'Premium jeans with stretch fabric for ultimate comfort. Slim fit with a modern wash.', category: 'Women', subcategory: 'Jeans', gender: 'female', price: 1799, originalPrice: 2799, images: img(images.jeans, 4), sizes: sizesClothing, colors: pickColors(3), isOffer: true }),
  makeProduct({ name: 'Retail Style Jeans', description: 'Quality jeans inspired by retail fashion. Durable denim with a flattering cut.', category: 'Men', subcategory: 'Jeans', gender: 'male', price: 1399, originalPrice: 2199, images: img(images.jeans, 5), sizes: sizesClothing, colors: pickColors(4) }),

  // Additional products to reach 50+
  makeProduct({ name: 'Casual Striped T-Shirt', description: 'A casual striped t-shirt for relaxed days. Soft cotton blend with a modern fit.', category: 'Men', subcategory: 'T-Shirts', gender: 'male', price: 549, originalPrice: 899, images: img(images.menCasual, 2), sizes: sizesClothing, colors: pickColors(5), isOffer: true }),
  makeProduct({ name: 'Urban Streetwear Outfit', description: 'A complete urban streetwear look. Contemporary design for the style-conscious individual.', category: 'Men', subcategory: 'Casual Wear', gender: 'male', price: 1899, originalPrice: 2999, images: img(images.menCasual, 6), sizes: sizesClothing, colors: pickColors(6), isNew: true }),
  makeProduct({ name: 'Lily Denim Shirt', description: 'A denim shirt with a floral touch. Versatile layering piece for transitional weather.', category: 'Men', subcategory: 'Shirts', gender: 'male', price: 1499, originalPrice: 2399, images: img(images.menCasual, 7), sizes: sizesClothing, colors: pickColors(7), isBestSeller: true }),
  makeProduct({ name: 'Sleek Black T-Shirt', description: 'A minimal black t-shirt with premium fabric. An everyday essential with a clean look.', category: 'Men', subcategory: 'T-Shirts', gender: 'male', price: 499, originalPrice: 799, images: img(images.menCasual, 3), sizes: sizesClothing, colors: pickColors(8) }),
  makeProduct({ name: 'Vibrant Casual Shirt', description: 'A vibrant casual shirt for a pop of color. Lightweight and breathable for all-day comfort.', category: 'Men', subcategory: 'Shirts', gender: 'male', price: 849, originalPrice: 1399, images: img(images.menCasual, 0), sizes: sizesClothing, colors: pickColors(9), isNew: true, isOffer: true }),
  makeProduct({ name: 'Nature Inspired Casual Wear', description: 'Casual wear inspired by nature tones. Earthy colors and comfortable fabric for everyday style.', category: 'Men', subcategory: 'Casual Wear', gender: 'male', price: 1149, originalPrice: 1899, images: img(images.menCasual, 1), sizes: sizesClothing, colors: pickColors(0), isBestSeller: true }),
  makeProduct({ name: 'City Style Casual Outfit', description: 'A modern city-style casual outfit. Tailored for the urban dweller who values comfort and style.', category: 'Men', subcategory: 'Casual Wear', gender: 'male', price: 1349, originalPrice: 2199, images: img(images.menCasual, 5), sizes: sizesClothing, colors: pickColors(1), isOffer: true }),
  makeProduct({ name: 'Premium Cotton Saree', description: 'A premium cotton saree for everyday elegance. Comfortable weave with traditional borders.', category: 'Women', subcategory: 'Sarees', gender: 'female', price: 1499, originalPrice: 2399, images: img(images.women, 2), sizes: ['Free Size'], colors: pickColors(2), isNew: true }),
  makeProduct({ name: 'Festive Embroidered Kurti', description: 'A festive kurti with intricate embroidery. Perfect for celebrations and cultural events.', category: 'Women', subcategory: 'Kurtis', gender: 'female', price: 1399, originalPrice: 2299, images: img(images.womenKurti, 5), sizes: sizesClothing, colors: pickColors(3), isBestSeller: true }),
  makeProduct({ name: 'Designer Party Dress', description: 'A designer party dress that turns heads. Elegant silhouette with premium fabric.', category: 'Women', subcategory: 'Dresses', gender: 'female', price: 2499, originalPrice: 3999, images: img(images.women, 7), sizes: sizesClothing, colors: pickColors(4), isOffer: true, rating: 4.6 }),
  makeProduct({ name: 'Kids Party Wear Suit', description: 'A stylish party wear suit for kids. Make every celebration special with this elegant outfit.', category: 'Kids', subcategory: 'Party Wear', gender: 'kids', price: 1599, originalPrice: 2499, images: img(images.kids, 1), sizes: sizesKids, colors: pickColors(5), isNew: true }),
  makeProduct({ name: 'Kids Casual Green Outfit', description: 'A comfy green casual outfit for active kids. Soft fabric that allows free movement.', category: 'Kids', subcategory: 'Casual Wear', gender: 'kids', price: 799, originalPrice: 1299, images: img(images.kids, 0), sizes: sizesKids, colors: pickColors(6), isBestSeller: true }),

  // ===== LADIES ESSENTIALS =====
  makeProduct({ name: 'Ladies Cotton Nighty Gown', description: 'A soft, breathable cotton nighty gown designed for all-night comfort. Loose fit with a simple, elegant print.', category: 'Ladies', subcategory: 'Nightwear', gender: 'female', price: 449, originalPrice: 699, images: img(images.women, 4), sizes: sizesClothing, colors: pickColors(1), isBestSeller: true, stock: 120 }),
  makeProduct({ name: 'Women\'s Everyday Bra (Pack of 3)', description: 'Everyday comfort bra with soft cups and adjustable straps. Sold in packs, available in multiple sizes for daily wear.', category: 'Ladies', subcategory: 'Bra', gender: 'female', price: 349, originalPrice: 599, images: img(images.women, 2), sizes: ['32', '34', '36', '38', '40'], colors: [{ name: 'Skin', hex: '#d4b896' }, { name: 'White', hex: '#f5f5f5' }, { name: 'Black', hex: '#1a1a1a' }], stock: 500, isBestSeller: true }),
  makeProduct({ name: 'Women\'s Cotton Panty (Pack of 6)', description: 'Soft cotton panties in a value pack of 6. Breathable, comfortable and skin-friendly for daily use.', category: 'Ladies', subcategory: 'Panty', gender: 'female', price: 299, originalPrice: 499, images: img(images.women, 5), sizes: sizesClothing, colors: pickColors(2), stock: 500, isBestSeller: true }),
  makeProduct({ name: 'Ladies Cotton Slip / Petticoat', description: 'A comfortable inner slip made from smooth cotton fabric, ideal for wearing under sarees and kurtis.', category: 'Ladies', subcategory: 'Slip', gender: 'female', price: 249, originalPrice: 399, images: img(images.women, 0), sizes: sizesClothing, colors: pickColors(3), stock: 500 }),
  makeProduct({ name: 'Sanitary Napkins (Pack of 40)', description: 'High-absorbency sanitary napkins with a soft cotton top sheet for all-day comfort and protection.', category: 'Ladies', subcategory: 'Sanitary Napkins', gender: 'female', price: 199, originalPrice: 299, images: img(images.store, 3), sizes: ['Pack of 10', 'Pack of 20', 'Pack of 40'], colors: [{ name: 'White', hex: '#f5f5f5' }], specifications: { material: 'Cotton Top Sheet', absorbency: 'High Absorbency', usage: 'Daily / Overnight', origin: 'Made in India' }, stock: 500 }),
  makeProduct({ name: 'Pregnancy Testing Kit', description: '99% accurate, easy-to-use home pregnancy testing kit with clear results in minutes.', category: 'Ladies', subcategory: 'Pregnancy Testing Kit', gender: 'female', price: 49, originalPrice: 79, images: img(images.store, 5), sizes: ['Single Pack', 'Pack of 3'], colors: [{ name: 'White', hex: '#f5f5f5' }], specifications: { type: 'Pregnancy Test Kit', accuracy: '99% Accurate', usage: 'Single Use', origin: 'Made in India' }, stock: 500 }),
  makeProduct({ name: 'Pure Cotton Handloom Saree', description: 'An affordable everyday cotton handloom saree with a simple woven border, comfortable for daily wear.', category: 'Ladies', subcategory: 'Sarees', gender: 'female', price: 899, originalPrice: 1499, images: img(images.women, 3), sizes: ['Free Size'], colors: pickColors(4), isNew: true, stock: 80 }),
  makeProduct({ name: 'Women\'s Plazo Pants', description: 'Flowy, comfortable palazzo pants that pair perfectly with kurtis and tops. Elastic waistband for easy fit.', category: 'Ladies', subcategory: 'Plazo', gender: 'female', price: 449, originalPrice: 799, images: img(images.womenKurti, 3), sizes: sizesClothing, colors: pickColors(5), isBestSeller: true, stock: 90 }),
  makeProduct({ name: 'Women\'s Casual Top', description: 'A versatile casual top made from soft, breathable fabric. Great for daily wear or pairing with jeans/plazo.', category: 'Ladies', subcategory: 'Tops', gender: 'female', price: 499, originalPrice: 899, images: img(images.women, 6), sizes: sizesClothing, colors: pickColors(6), isNew: true, stock: 90 }),
  makeProduct({ name: 'Cotton Printed Kurti', description: 'An everyday printed cotton kurti, lightweight and comfortable, suitable for home and outdoor wear.', category: 'Ladies', subcategory: 'Kurtis', gender: 'female', price: 599, originalPrice: 999, images: img(images.womenKurti, 2), sizes: sizesClothing, colors: pickColors(7), isBestSeller: true, stock: 90 }),
  makeProduct({ name: 'Women\'s Regular Fit Jeans', description: 'Comfortable everyday jeans for women with a regular fit and durable denim fabric.', category: 'Ladies', subcategory: 'Jeans', gender: 'female', price: 899, originalPrice: 1499, images: img(images.jeans, 2), sizes: sizesClothing, colors: pickColors(8), stock: 70 }),
  makeProduct({ name: 'Women\'s Half Slacks (Shorts)', description: 'Comfortable half-length slacks/shorts for everyday and home wear, soft cotton fabric.', category: 'Ladies', subcategory: 'Half Slacks', gender: 'female', price: 249, originalPrice: 399, images: img(images.womenKurti, 4), sizes: sizesClothing, colors: pickColors(9), stock: 90 }),

  // ===== GENTS ESSENTIALS =====
  makeProduct({ name: 'Men\'s Cotton Brief (Pack of 5)', description: 'Soft, breathable cotton briefs sold in a value pack of 5 for everyday comfort.', category: 'Gents', subcategory: 'Panty', gender: 'male', price: 349, originalPrice: 599, images: img(images.men, 2), sizes: sizesClothing, colors: pickColors(0), stock: 500 }),
  makeProduct({ name: 'Men\'s Cotton Baniyan / Vest (Pack of 3)', description: 'Classic cotton vests (baniyan) for everyday comfort, soft and sweat-absorbent, sold in packs.', category: 'Gents', subcategory: 'Baniyan', gender: 'male', price: 299, originalPrice: 499, images: img(images.men, 6), sizes: sizesClothing, colors: [{ name: 'White', hex: '#f5f5f5' }], stock: 500, isBestSeller: true }),
  makeProduct({ name: 'Men\'s Cotton Handkerchief (Pack of 6)', description: 'Soft, absorbent cotton handkerchiefs for daily use, sold as a pack of 6.', category: 'Gents', subcategory: 'Handkerchief', gender: 'male', price: 149, originalPrice: 249, images: img(images.store, 1), sizes: ['Free Size'], colors: [{ name: 'White', hex: '#f5f5f5' }], stock: 500 }),
  makeProduct({ name: 'Cotton Bath Towel', description: 'A soft, highly absorbent cotton bath towel that dries quickly and lasts long.', category: 'Gents', subcategory: 'Towel', gender: 'male', price: 249, originalPrice: 399, images: img(images.store, 2), sizes: ['Small', 'Medium', 'Large'], colors: pickColors(1), stock: 150 }),
  makeProduct({ name: 'Men\'s Track Lower', description: 'Comfortable everyday track lower/pyjama with an elastic waistband, ideal for home and casual wear.', category: 'Gents', subcategory: 'Lower', gender: 'male', price: 449, originalPrice: 699, images: img(images.menCasual, 4), sizes: sizesClothing, colors: pickColors(2), stock: 150 }),
  makeProduct({ name: 'Men\'s Round Neck T-Shirt', description: 'A basic round neck cotton t-shirt for daily wear, soft fabric with a comfortable fit.', category: 'Gents', subcategory: 'T-Shirts', gender: 'male', price: 349, originalPrice: 599, images: img(images.menCasual, 3), sizes: sizesClothing, colors: pickColors(3), stock: 8 }),
  makeProduct({ name: 'Men\'s Bermuda Shorts', description: 'Casual bermuda shorts for everyday comfort, made from breathable cotton fabric. Sold in sets of 3-4.', category: 'Gents', subcategory: 'Bermuda', gender: 'male', price: 399, originalPrice: 649, images: img(images.menCasual, 1), sizes: sizesClothing, colors: pickColors(4), stock: 100 }),
  makeProduct({ name: 'Readymade Dhoti', description: 'A convenient readymade dhoti with pre-stitched pleats, easy to wear for festive and daily occasions.', category: 'Gents', subcategory: 'Dhoti', gender: 'male', price: 399, originalPrice: 649, images: img(images.men, 3), sizes: ['Free Size'], colors: [{ name: 'White', hex: '#f5f5f5' }, { name: 'Cream', hex: '#d4b896' }], isNew: true, stock: 90 }),
  makeProduct({ name: 'Cotton Lungi', description: 'A comfortable, breathable cotton lungi for everyday home wear, available in classic checks and colors.', category: 'Gents', subcategory: 'Lungi', gender: 'male', price: 299, originalPrice: 499, images: img(images.men, 8), sizes: ['Free Size'], colors: pickColors(5), stock: 120 }),

  // ===== SCHOOL ESSENTIALS =====
  makeProduct({ name: 'School Uniform Set - St. Xavier\'s Pattern', description: 'Complete school uniform set stitched as per St. Xavier\'s School pattern. Durable, comfortable daily-wear fabric.', category: 'School', subcategory: 'School Uniforms', gender: 'kids', price: 599, originalPrice: 999, images: img(images.kids, 1), sizes: sizesKids, colors: pickColors(6), isNew: true, stock: 60 }),
  makeProduct({ name: 'School Uniform Set - DAV Public School Pattern', description: 'Complete school uniform set stitched as per DAV Public School pattern. Durable fabric for everyday school wear.', category: 'School', subcategory: 'School Uniforms', gender: 'kids', price: 599, originalPrice: 999, images: img(images.kids, 2), sizes: sizesKids, colors: pickColors(7), stock: 60 }),
  makeProduct({ name: 'School Uniform Set - Generic / Custom Pattern', description: 'Custom-stitched school uniform available as per your school\'s pattern and requirements. Bring your sample or details.', category: 'School', subcategory: 'School Uniforms', gender: 'kids', price: 599, originalPrice: 999, images: img(images.kids, 3), sizes: sizesKids, colors: pickColors(8), stock: 60 }),
  makeProduct({ name: 'School Notebook & Textbook Set (Class 1-5)', description: 'A complete set of notebooks and textbooks for primary school students, as per school curriculum.', category: 'School', subcategory: 'School Books', gender: 'kids', price: 499, originalPrice: 799, images: img(images.store, 4), sizes: ['Class 1-5'], colors: [{ name: 'Standard', hex: '#888888' }], specifications: { type: 'Educational', binding: 'Paperback', language: 'English / Hindi', origin: 'Made in India' }, stock: 200 }),
  makeProduct({ name: 'School Notebook & Textbook Set (Class 6-10)', description: 'A complete set of notebooks and textbooks for middle and high school students, as per school curriculum.', category: 'School', subcategory: 'School Books', gender: 'kids', price: 699, originalPrice: 1099, images: img(images.store, 6), sizes: ['Class 6-10'], colors: [{ name: 'Standard', hex: '#888888' }], specifications: { type: 'Educational', binding: 'Paperback', language: 'English / Hindi', origin: 'Made in India' }, stock: 200 }),
  makeProduct({ name: 'Kids School Shoes', description: 'Durable, comfortable school shoes with good grip, designed for daily wear to school.', category: 'School', subcategory: 'Shoes', gender: 'kids', price: 499, originalPrice: 799, images: img(images.kids, 4), sizes: ['10', '11', '12', '13', '1', '2', '3', '4'], colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#f5f5f5' }], specifications: { material: 'Synthetic Leather & Mesh', sole: 'Rubber', closure: 'Lace-up / Velcro', origin: 'Made in India' }, isBestSeller: true, stock: 100 }),
  makeProduct({ name: 'School Socks (Pack of 3)', description: 'Soft cotton-blend school socks, sold in packs of 3, available in standard school colors.', category: 'School', subcategory: 'Socks', gender: 'kids', price: 99, originalPrice: 149, images: img(images.kids, 5), sizes: ['Free Size'], colors: [{ name: 'White', hex: '#f5f5f5' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#1e3a5f' }], specifications: { material: 'Cotton Blend', care: 'Machine Wash', origin: 'Made in India' }, stock: 200 }),
  makeProduct({ name: 'Insulated School Tiffin Bag', description: 'Insulated tiffin/lunch bag for school, keeps food warm and is easy to carry with an adjustable strap.', category: 'School', subcategory: 'Tiffin Bags', gender: 'kids', price: 299, originalPrice: 499, images: img(images.store, 0), sizes: ['Standard'], colors: pickColors(9), specifications: { material: 'Insulated Fabric', closure: 'Zip', origin: 'Made in India' }, isNew: true, stock: 100 }),
  makeProduct({ name: 'School Water Bottle', description: 'Leak-proof school water bottle, easy for kids to carry and use, available in multiple capacities.', category: 'School', subcategory: 'Water Bottles', gender: 'kids', price: 199, originalPrice: 349, images: img(images.store, 7), sizes: ['500ml', '750ml', '1L'], colors: pickColors(0), specifications: { material: 'Food-Grade Plastic', capacity: '500ml - 1L', origin: 'Made in India' }, stock: 150 }),
  makeProduct({ name: 'School Tie & Belt Set', description: 'Matching school tie and belt set stitched as per school uniform pattern and colors.', category: 'School', subcategory: 'Tie & Belt', gender: 'kids', price: 149, originalPrice: 249, images: img(images.kids, 0), sizes: ['Free Size'], colors: pickColors(1), specifications: { material: 'Polyester / Elastic', origin: 'Made in India' }, stock: 120 }),
  makeProduct({ name: 'School Basket / Utility Basket', description: 'Sturdy woven utility basket, handy for school and home storage use.', category: 'School', subcategory: 'Basket', gender: 'kids', price: 199, originalPrice: 349, images: img(images.store, 3), sizes: ['Standard'], colors: pickColors(2), specifications: { material: 'Woven Plastic / Cane', origin: 'Made in India' }, stock: 80 }),
];

export const coupons = [
  { id: 1, code: 'FIRSTORDER', description: '₹500 off on first order', type: 'fixed', value: 500, minOrder: 999, expiry: '2026-12-31', enabled: true, usageCount: 234 },
  { id: 2, code: 'FESTIVAL2026', description: '20% off on festive collection', type: 'percentage', value: 20, minOrder: 1499, expiry: '2026-10-31', enabled: true, usageCount: 156 },
  { id: 3, code: 'KIRTI10', description: '10% off on all orders', type: 'percentage', value: 10, minOrder: 599, expiry: '2026-12-31', enabled: true, usageCount: 412 },
  { id: 4, code: 'SAVE500', description: '₹500 off on orders above ₹1999', type: 'fixed', value: 500, minOrder: 1999, expiry: '2026-09-30', enabled: true, usageCount: 89 },
  { id: 5, code: 'MEGA25', description: '25% off on orders above ₹2999', type: 'percentage', value: 25, minOrder: 2999, expiry: '2026-08-31', enabled: false, usageCount: 34 },
];

export const customers = [
  { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', mobile: '9876543210', orders: 12, totalSpent: 24599, status: 'active', joinedAt: '2025-03-15', addresses: [{ id: 1, label: 'Home', line: '12 MG Road, Indiranagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560038', country: 'India' }] },
  { id: 2, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', mobile: '9876543211', orders: 8, totalSpent: 18799, status: 'active', joinedAt: '2025-05-20', addresses: [{ id: 1, label: 'Home', line: '45 Park Street', city: 'Kolkata', state: 'West Bengal', pincode: '700016', country: 'India' }] },
  { id: 3, name: 'Anita Desai', email: 'anita.desai@email.com', mobile: '9876543212', orders: 15, totalSpent: 32199, status: 'active', joinedAt: '2024-12-10', addresses: [{ id: 1, label: 'Home', line: '78 Marine Drive', city: 'Mumbai', state: 'Maharashtra', pincode: '400020', country: 'India' }] },
  { id: 4, name: 'Vikram Singh', email: 'vikram.singh@email.com', mobile: '9876543213', orders: 5, totalSpent: 8999, status: 'active', joinedAt: '2026-01-05', addresses: [{ id: 1, label: 'Home', line: '23 Civil Lines', city: 'Jaipur', state: 'Rajasthan', pincode: '302006', country: 'India' }] },
  { id: 5, name: 'Meera Iyer', email: 'meera.iyer@email.com', mobile: '9876543214', orders: 20, totalSpent: 45899, status: 'active', joinedAt: '2024-08-15', addresses: [{ id: 1, label: 'Home', line: '56 Anna Salai', city: 'Chennai', state: 'Tamil Nadu', pincode: '600002', country: 'India' }] },
  { id: 6, name: 'Arjun Patel', email: 'arjun.patel@email.com', mobile: '9876543215', orders: 3, totalSpent: 5499, status: 'inactive', joinedAt: '2026-02-20', addresses: [{ id: 1, label: 'Home', line: '89 Satellite Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015', country: 'India' }] },
  { id: 7, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', mobile: '9876543216', orders: 9, totalSpent: 16799, status: 'active', joinedAt: '2025-09-12', addresses: [{ id: 1, label: 'Home', line: '34 Banjara Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500034', country: 'India' }] },
  { id: 8, name: 'Karan Mehta', email: 'karan.mehta@email.com', mobile: '9876543217', orders: 7, totalSpent: 12999, status: 'active', joinedAt: '2025-11-08', addresses: [{ id: 1, label: 'Home', line: '67 Connaught Place', city: 'New Delhi', state: 'Delhi', pincode: '110001', country: 'India' }] },
];

export const orders = [
  { id: 'KG2026-001', customerId: 1, customerName: 'Priya Sharma', items: [{ productId: 1, name: 'Royal Silk Kurta Pajama Set', quantity: 1, size: 'L', color: 'Black', price: 2499 }], subtotal: 2499, discount: 500, shipping: 0, total: 1999, status: 'Delivered', paymentStatus: 'Paid', paymentMethod: 'UPI', address: '12 MG Road, Indiranagar, Bengaluru, Karnataka - 560038', date: '2026-07-15', updatedAt: '2026-07-20' },
  { id: 'KG2026-002', customerId: 2, customerName: 'Rajesh Kumar', items: [{ productId: 6, name: 'Urban Casual Shirt', quantity: 2, size: 'M', color: 'Navy', price: 899 }], subtotal: 1798, discount: 0, shipping: 49, total: 1847, status: 'Shipped', paymentStatus: 'Paid', paymentMethod: 'Credit Card', address: '45 Park Street, Kolkata, West Bengal - 700016', date: '2026-08-10', updatedAt: '2026-08-12' },
  { id: 'KG2026-003', customerId: 3, customerName: 'Anita Desai', items: [{ productId: 16, name: 'Banarasi Silk Saree', quantity: 1, size: 'Free Size', color: 'Maroon', price: 3999 }, { productId: 20, name: 'Cotton Kurti - Blue', quantity: 1, size: 'M', color: 'Teal', price: 799 }], subtotal: 4798, discount: 960, shipping: 0, total: 3838, status: 'Out for Delivery', paymentStatus: 'Paid', paymentMethod: 'Debit Card', address: '78 Marine Drive, Mumbai, Maharashtra - 400020', date: '2026-08-14', updatedAt: '2026-08-16' },
  { id: 'KG2026-004', customerId: 5, customerName: 'Meera Iyer', items: [{ productId: 25, name: 'Red Cocktail Dress', quantity: 1, size: 'S', color: 'Maroon', price: 2199 }], subtotal: 2199, discount: 220, shipping: 0, total: 1979, status: 'Confirmed', paymentStatus: 'Paid', paymentMethod: 'UPI', address: '56 Anna Salai, Chennai, Tamil Nadu - 600002', date: '2026-08-15', updatedAt: '2026-08-15' },
  { id: 'KG2026-005', customerId: 4, customerName: 'Vikram Singh', items: [{ productId: 36, name: 'Kids Green Traditional Set', quantity: 2, size: '4-5Y', color: 'Olive', price: 899 }], subtotal: 1798, discount: 0, shipping: 49, total: 1847, status: 'Packed', paymentStatus: 'Paid', paymentMethod: 'Net Banking', address: '23 Civil Lines, Jaipur, Rajasthan - 302006', date: '2026-08-15', updatedAt: '2026-08-16' },
  { id: 'KG2026-006', customerId: 7, customerName: 'Sneha Reddy', items: [{ productId: 18, name: 'Yellow Designer Saree', quantity: 1, size: 'Free Size', color: 'Mustard', price: 2499 }], subtotal: 2499, discount: 250, shipping: 0, total: 2249, status: 'New', paymentStatus: 'Pending', paymentMethod: 'Cash on Delivery', address: '34 Banjara Hills, Hyderabad, Telangana - 500034', date: '2026-08-16', updatedAt: '2026-08-16' },
  { id: 'KG2026-007', customerId: 8, customerName: 'Karan Mehta', items: [{ productId: 12, name: 'Slim Fit Jeans', quantity: 1, size: 'L', color: 'Navy', price: 1499 }, { productId: 7, name: 'Premium Cotton T-Shirt', quantity: 2, size: 'L', color: 'White', price: 599 }], subtotal: 2697, discount: 270, shipping: 0, total: 2427, status: 'Delivered', paymentStatus: 'Paid', paymentMethod: 'UPI', address: '67 Connaught Place, New Delhi, Delhi - 110001', date: '2026-07-28', updatedAt: '2026-08-03' },
  { id: 'KG2026-008', customerId: 1, customerName: 'Priya Sharma', items: [{ productId: 21, name: 'Embroidered Yellow Kurti', quantity: 1, size: 'M', color: 'Mustard', price: 1199 }], subtotal: 1199, discount: 0, shipping: 49, total: 1248, status: 'Cancelled', paymentStatus: 'Refunded', paymentMethod: 'Credit Card', address: '12 MG Road, Indiranagar, Bengaluru, Karnataka - 560038', date: '2026-06-15', updatedAt: '2026-06-16' },
  { id: 'KG2026-009', customerId: 6, customerName: 'Arjun Patel', items: [{ productId: 30, name: 'Traditional Attire with Shawl', quantity: 1, size: 'XL', color: 'Rust', price: 2999 }], subtotal: 2999, discount: 750, shipping: 0, total: 2249, status: 'Returned', paymentStatus: 'Refunded', paymentMethod: 'Debit Card', address: '89 Satellite Road, Ahmedabad, Gujarat - 380015', date: '2026-07-01', updatedAt: '2026-07-10' },
  { id: 'KG2026-010', customerId: 3, customerName: 'Anita Desai', items: [{ productId: 17, name: 'Blue Silk Saree', quantity: 1, size: 'Free Size', color: 'Navy', price: 2999 }, { productId: 22, name: 'Red Daily Wear Kurti', quantity: 1, size: 'L', color: 'Maroon', price: 699 }], subtotal: 3698, discount: 370, shipping: 0, total: 3328, status: 'Delivered', paymentStatus: 'Paid', paymentMethod: 'UPI', address: '78 Marine Drive, Mumbai, Maharashtra - 400020', date: '2026-06-20', updatedAt: '2026-06-25' },
];

export const customerReviews = [
  { id: 1, name: 'Priya Sharma', rating: 5, date: '2026-08-01', title: 'Amazing quality!', comment: 'The silk kurta exceeded my expectations. The fabric is luxurious and the fit is perfect. Will definitely shop again.', product: 'Royal Silk Kurta Pajama Set', avatar: 'P' },
  { id: 2, name: 'Rajesh Kumar', rating: 5, date: '2026-07-25', title: 'Great fit and fabric', comment: 'Bought the casual shirt for work and it has become my favorite. Excellent craftsmanship.', product: 'Urban Casual Shirt', avatar: 'R' },
  { id: 3, name: 'Anita Desai', rating: 5, date: '2026-07-18', title: 'Stunning saree', comment: 'The Banarasi silk saree is absolutely beautiful. Got so many compliments at the wedding.', product: 'Banarasi Silk Saree', avatar: 'A' },
  { id: 4, name: 'Vikram Singh', rating: 4, date: '2026-07-10', title: 'Good value', comment: 'Nice traditional outfit for my kid. Quality is good for the price. Delivery was quick.', product: 'Kids Green Traditional Set', avatar: 'V' },
  { id: 5, name: 'Meera Iyer', rating: 5, date: '2026-07-05', title: 'Perfect for festivals', comment: 'The festive kurti is gorgeous. Colors are vibrant and the embroidery is detailed. Love it!', product: 'Festive Red Kurti Set', avatar: 'M' },
  { id: 6, name: 'Arjun Patel', rating: 5, date: '2026-06-28', title: 'Premium feel', comment: 'The denim shirt jacket is premium quality. Perfect for evening wear. Highly recommended.', product: 'Denim Shirt Jacket', avatar: 'A' },
];

export const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;
