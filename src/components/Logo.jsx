import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex flex-col leading-none group" aria-label="Kirti Garments Home">
      <span className={`text-xl md:text-2xl font-serif font-bold tracking-wider ${light ? 'text-white' : 'text-neutral-900'} group-hover:text-accent transition-colors`}>
        KIRTI
      </span>
      <span className={`text-[10px] md:text-xs tracking-[0.3em] font-medium ${light ? 'text-neutral-300' : 'text-neutral-500'} group-hover:text-accent transition-colors`}>
        GARMENTS
      </span>
    </Link>
  );
}
