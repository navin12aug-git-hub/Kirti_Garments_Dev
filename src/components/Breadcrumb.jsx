import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="text-neutral-300" />}
          {item.link ? (
            <Link to={item.link} className="hover:text-neutral-900 transition-colors capitalize">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 capitalize">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
