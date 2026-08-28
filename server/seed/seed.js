// Populates MongoDB with the app's original demo content, taken straight from
// src/data/mockData.js, so the app has real data to read over the API.
//
// Usage:
//   npm run seed         -> only inserts data into empty collections (safe to re-run)
//   npm run seed:fresh   -> wipes these collections first, then re-inserts everything
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Home from '../models/Home.js';

import { categories, products, coupons, customers, orders, customerReviews } from '../../src/data/mockData.js';

const FRESH = process.argv.includes('--fresh');

async function seedCollection(Model, data, label) {
  const existing = await Model.countDocuments();
  if (existing > 0 && !FRESH) {
    console.log(`- ${label}: already has ${existing} documents, skipping (use --fresh to reset)`);
    return;
  }
  if (FRESH) {
    await Model.deleteMany({});
  }
  if (data.length) {
    await Model.insertMany(data, { ordered: false });
  }
  console.log(`- ${label}: inserted ${data.length} documents`);
}

async function run() {
  await connectDB();

  await seedCollection(Category, categories, 'categories');
  await seedCollection(Product, products, 'products');
  await seedCollection(Coupon, coupons, 'coupons');
  await seedCollection(Customer, customers, 'customers');
  await seedCollection(Order, orders, 'orders');
  await seedCollection(
    Review,
    customerReviews.map((r) => ({ ...r })),
    'reviews'
  );

  const homeExisting = await Home.countDocuments({ key: 'homepage' });
  if (homeExisting === 0 || FRESH) {
    if (FRESH) await Home.deleteMany({});
    await Home.create({
      key: 'homepage',
      heroHeadline: 'Style That Defines You',
      heroDescription: 'Discover premium fashion for every occasion. From ethnic elegance to contemporary chic.',
      heroImage: 'https://images.pexels.com/photos/20194705/pexels-photo-20194705.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      promoHeadline: 'New Season Collection',
      promoDescription: 'Discover the latest styles from Kirti Garments. Fresh designs that blend tradition with modern aesthetics.',
      promoImage: 'https://images.pexels.com/photos/20177238/pexels-photo-20177238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      promoButtonText: 'Shop Now',
      categoryTitle: 'Shop By Category',
      newArrivalsTitle: 'New Arrivals',
      newArrivalsSubtitle: 'Fresh drops for the new season',
      bestSellersTitle: 'Best Sellers',
      offersTitle: 'Style More. Spend Less.',
      announcementText: 'FREE SHIPPING ON ORDERS ABOVE ₹999',
      showReviews: true,
      showNewsletter: true,
      showWhatsApp: true,
    });
    console.log('- homes: inserted homepage settings document');
  } else {
    console.log(`- homes: already configured, skipping (use --fresh to reset)`);
  }

  console.log('\nSeed complete.');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
