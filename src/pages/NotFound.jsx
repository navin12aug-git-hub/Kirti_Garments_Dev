import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-serif font-bold text-neutral-900">404</p>
        <h1 className="text-2xl font-serif font-bold mt-4">Page Not Found</h1>
        <p className="mt-3 text-sm text-neutral-500 max-w-md">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <HomeIcon size={16} /> Go Home
          </Link>
          <Link to="/shop" className="btn-secondary flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
