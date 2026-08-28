export default function LoadingSkeleton({ count = 8, type = 'product' }) {
  if (type === 'product') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {[...Array(count)].map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-[3/4] w-full" />
            <div className="skeleton h-3 w-1/3 mt-3" />
            <div className="skeleton h-4 w-2/3 mt-2" />
            <div className="skeleton h-4 w-1/2 mt-2" />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'line') {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="skeleton h-12 w-full" />
        ))}
      </div>
    );
  }
  return <div className="skeleton h-40 w-full" />;
}
