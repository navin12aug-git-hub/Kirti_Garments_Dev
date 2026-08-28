import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), 3000);
  }, [dismiss]);

  const icons = {
    success: <CheckCircle size={18} className="text-success" />,
    error: <XCircle size={18} className="text-danger" />,
    info: <Info size={18} className="text-accent" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slide-up flex items-center gap-3 bg-white border border-neutral-200 shadow-lg px-4 py-3 min-w-[280px] max-w-sm"
          >
            {icons[t.type]}
            <span className="text-sm text-neutral-800 flex-1">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="text-neutral-400 hover:text-neutral-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
