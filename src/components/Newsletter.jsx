import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast('Please enter a valid email', 'error');
      return;
    }
    setDone(true);
    toast('Successfully subscribed!');
    setEmail('');
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section className="bg-neutral-900 text-white py-16 md:py-20">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <Mail size={32} className="mx-auto text-accent mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">JOIN THE KIRTI GARMENTS FAMILY</h2>
        <p className="mt-3 text-neutral-400 text-sm md:text-base">
          Get updates about new arrivals, exclusive offers and latest collections.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-accent transition-colors"
          />
          <button type="submit" className="btn-accent flex items-center justify-center gap-2 whitespace-nowrap">
            {done ? <><CheckCircle size={16} /> Subscribed</> : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
