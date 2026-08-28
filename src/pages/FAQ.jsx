import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const FAQS = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-7 business days across India. Express delivery (1-2 days) is available at checkout for select pin codes.' },
  { q: 'What is your return policy?', a: 'We offer 7-day easy returns. Items must be unused with original tags intact. Refunds are processed within 5-7 business days to the original payment method.' },
  { q: 'How do I track my order?', a: 'Once your order is shipped, you\'ll receive a tracking link via email and SMS. You can also track your order anytime using the Track Order page with your order ID.' },
  { q: 'Do you offer free shipping?', a: 'Yes! Free standard shipping is available on all orders above ₹999. Orders below ₹999 incur a flat shipping fee of ₹49.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, debit/credit cards (Visa, Mastercard, RuPay), net banking, popular wallets, and cash on delivery.' },
  { q: 'How do I use a coupon code?', a: 'Enter your coupon code in the cart page or at checkout in the "Apply Coupon" section. The discount will be applied to your order total automatically.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placing them. Go to My Orders in your account or contact our support team immediately.' },
  { q: 'Do you ship internationally?', a: 'Currently, we only ship within India. International shipping is coming soon — subscribe to our newsletter for updates.' },
  { q: 'How do I find the right size?', a: 'Check our Size Guide on each product page for detailed measurements. If you\'re between sizes, we recommend sizing up for a comfortable fit.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard encryption and never store your card details. All transactions are processed through secure payment gateways.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="container-custom py-8 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'FAQ' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-2">Frequently Asked Questions</h1>
      <p className="text-sm text-neutral-500 mb-8">Find answers to common questions about orders, shipping, returns, and more.</p>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white border border-neutral-200">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-neutral-900">{faq.q}</span>
              <ChevronDown size={18} className={`text-neutral-400 transition-transform shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed animate-slide-down">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
