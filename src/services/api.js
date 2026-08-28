// Thin fetch wrapper around the Express API (server/).
// In dev, Vite proxies '/api' -> http://localhost:5000 (see vite.config.js),
// so relative URLs work without any extra config. For a separately-hosted
// backend in production, set VITE_API_URL in a .env file.
const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. 204)
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
}

const get = (path) => request(path);
const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
const put = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) });
const del = (path) => request(path, { method: 'DELETE' });

const qs = (params = {}) => {
  const clean = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  const str = new URLSearchParams(clean).toString();
  return str ? `?${str}` : '';
};

export const categoriesApi = {
  list: (params) => get(`/categories${qs(params)}`),
  get: (idOrSlug) => get(`/categories/${idOrSlug}`),
  create: (data) => post('/categories', data),
  update: (id, data) => put(`/categories/${id}`, data),
  remove: (id) => del(`/categories/${id}`),
};

export const productsApi = {
  list: (params) => get(`/products${qs(params)}`),
  get: (id) => get(`/products/${id}`),
  create: (data) => post('/products', data),
  update: (id, data) => put(`/products/${id}`, data),
  remove: (id) => del(`/products/${id}`),
};

export const couponsApi = {
  list: (params) => get(`/coupons${qs(params)}`),
  validate: (code) => get(`/coupons/validate/${code}`),
  create: (data) => post('/coupons', data),
  update: (id, data) => put(`/coupons/${id}`, data),
  remove: (id) => del(`/coupons/${id}`),
};

export const customersApi = {
  list: (params) => get(`/customers${qs(params)}`),
  get: (id) => get(`/customers/${id}`),
  create: (data) => post('/customers', data),
  update: (id, data) => put(`/customers/${id}`, data),
  remove: (id) => del(`/customers/${id}`),
};

export const ordersApi = {
  list: (params) => get(`/orders${qs(params)}`),
  get: (id) => get(`/orders/${id}`),
  create: (data) => post('/orders', data),
  update: (id, data) => put(`/orders/${id}`, data),
  remove: (id) => del(`/orders/${id}`),
};

export const reviewsApi = {
  list: () => get('/reviews'),
  create: (data) => post('/reviews', data),
  remove: (id) => del(`/reviews/${id}`),
};

export const homeApi = {
  get: () => get('/home'),
  update: (data) => put('/home', data),
};
