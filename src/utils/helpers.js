export const formatPrice = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const calculateDiscount = (price, original) =>
  Math.round(((original - price) / original) * 100);

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const truncateText = (text, len = 100) =>
  text.length > len ? text.slice(0, len) + '...' : text;

export const getDeliveryEstimate = () => {
  const start = new Date();
  start.setDate(start.getDate() + 3);
  const end = new Date();
  end.setDate(end.getDate() + 7);
  return `${start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`;
};
