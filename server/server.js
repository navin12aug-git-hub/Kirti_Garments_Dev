import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import couponRoutes from './routes/coupons.js';
import customerRoutes from './routes/customers.js';
import orderRoutes from './routes/orders.js';
import reviewRoutes from './routes/reviews.js';
import homeRoutes from './routes/home.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/home', homeRoutes);

// 404 for unmatched API routes
app.use('/api', (req, res) => res.status(404).json({ message: 'Route not found' }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API server running at http://localhost:${PORT}`));
});
