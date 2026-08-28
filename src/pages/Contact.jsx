import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!form.email.trim()) err.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid';
    if (!form.message.trim()) err.message = 'Required';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      toast('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="container-custom py-8">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Contact Us' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-2">Get In Touch</h1>
      <p className="text-sm text-neutral-500 mb-8 max-w-lg">We're here to help. Reach out to us with any questions, concerns, or feedback.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { icon: Phone, title: 'Call Us', value: '+91 98765 43210', sub: 'Mon-Sat, 10AM-7PM IST' },
            { icon: Mail, title: 'Email Us', value: 'support@kirtigarments.com', sub: 'We reply within 24 hours' },
            { icon: MapPin, title: 'Visit Us', value: '123 Fashion Street, Mumbai', sub: 'Maharashtra, India 400001' },
            { icon: MessageCircle, title: 'WhatsApp', value: 'Chat with us', sub: 'Quick responses on WhatsApp', link: 'https://wa.me/919876543210' },
          ].map((c) => (
            <div key={c.title} className="bg-white border border-neutral-200 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <c.icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent-dark">{c.value}</a>
                  ) : (
                    <p className="text-sm text-neutral-700">{c.value}</p>
                  )}
                  <p className="text-xs text-neutral-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Send a Message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Subject</label>
              <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="What's this about?" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="input-field resize-none" placeholder="Tell us more..." />
              {errors.message && <p className="text-xs text-danger mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2"><Send size={16} /> Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
