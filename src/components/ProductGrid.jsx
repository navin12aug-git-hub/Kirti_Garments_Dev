import ProductCard from './ProductCard';

export default function ProductGrid({ products, onQuickView, columns }) {
  const cols = columns || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
  return (
    <div className={`grid ${cols} gap-x-4 gap-y-8`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
