import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '919876543210';
  const text = encodeURIComponent('Hello Kirti Garments, I have a question.');
  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle size={26} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
    </a>
  );
}
