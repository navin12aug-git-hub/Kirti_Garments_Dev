import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 14, showCount = false }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <Star
              key={i}
              size={size}
              className={
                filled || isHalf
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-neutral-200 text-neutral-200'
              }
            />
          );
        })}
      </div>
      <span className="text-xs text-neutral-600 font-medium">{value.toFixed(1)}</span>
      {showCount && count != null && (
        <span className="text-xs text-neutral-400">({count})</span>
      )}
    </div>
  );
}
