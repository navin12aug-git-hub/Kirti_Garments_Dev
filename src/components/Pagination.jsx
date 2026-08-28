import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-40 hover:border-neutral-900 transition-colors"
        aria-label="Previous page"
      >
        <ChevronRight size={16} className="rotate-180" />
      </button>
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-10 h-10 flex items-center justify-center text-sm border border-neutral-200 hover:border-neutral-900 transition-colors">1</button>
          {start > 2 && <span className="px-1 text-neutral-400">…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors ${
            p === currentPage
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'border-neutral-200 hover:border-neutral-900'
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-neutral-400">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-10 h-10 flex items-center justify-center text-sm border border-neutral-200 hover:border-neutral-900 transition-colors">{totalPages}</button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-40 hover:border-neutral-900 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
