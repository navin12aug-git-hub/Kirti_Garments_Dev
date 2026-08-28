import { Link } from 'react-router-dom';

const megaMenuData = {
  Men: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Ethnic Wear', 'Shoes', 'Accessories'],
  Women: ['Dresses', 'Kurtis', 'Sarees', 'Tops', 'Shirts', 'Jeans', 'Ethnic Wear', 'Western Wear', 'Accessories'],
  Kids: ['Boys', 'Girls', 'Ethnic Wear', 'Casual Wear', 'Party Wear'],
  Ladies: ['Nightwear', 'Bra', 'Panty', 'Slip', 'Sanitary Napkins', 'Pregnancy Testing Kit', 'Sarees', 'Plazo', 'Tops', 'Kurtis', 'Jeans', 'Half Slacks'],
  Gents: ['Panty', 'Baniyan', 'Handkerchief', 'Towel', 'Lower', 'T-Shirts', 'Bermuda', 'Dhoti', 'Lungi'],
  School: ['School Uniforms', 'School Books', 'Shoes', 'Socks', 'Tiffin Bags', 'Water Bottles', 'Tie & Belt', 'Basket'],
};

export default function MegaMenu({ category, onClose }) {
  const subcats = megaMenuData[category];
  if (!subcats) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-lg animate-slide-down z-50">
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4">
          {subcats.map((sub) => (
            <Link
              key={sub}
              to={`/shop?category=${category.toLowerCase()}&subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={onClose}
              className="text-sm text-neutral-700 hover:text-accent transition-colors py-1"
            >
              {sub}
            </Link>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-neutral-100 flex gap-4">
          <Link to={`/shop?category=${category.toLowerCase()}`} onClick={onClose} className="text-xs font-semibold tracking-wider uppercase text-neutral-900 hover:text-accent transition-colors">
            Shop All {category} →
          </Link>
        </div>
      </div>
    </div>
  );
}
