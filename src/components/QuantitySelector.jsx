import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onDecrease, onIncrease, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center border border-neutral-300">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="w-12 text-center text-sm font-medium tabular-nums">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
