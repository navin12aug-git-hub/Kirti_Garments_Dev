import { Link } from 'react-router-dom';
import { Icon } from 'lucide-react';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionLink, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <Icon size={32} className="text-neutral-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-neutral-500 max-w-md mb-6">{description}</p>}
      {actionLabel && (actionLink ? (
        <Link to={actionLink} className="btn-primary">{actionLabel}</Link>
      ) : (
        <button onClick={onAction} className="btn-primary">{actionLabel}</button>
      ))}
    </div>
  );
}
