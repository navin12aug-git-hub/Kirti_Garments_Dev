import { Router } from 'express';
import Home from '../models/Home.js';

const router = Router();

const DEFAULTS = {
  key: 'homepage',
  heroHeadline: 'Style That Defines You',
  heroDescription: 'Discover premium fashion for every occasion. From ethnic elegance to contemporary chic.',
  heroImage: '',
  promoHeadline: 'New Season Collection',
  promoDescription: 'Discover the latest styles from Kirti Garments. Fresh designs that blend tradition with modern aesthetics.',
  promoImage: '',
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
};

// GET /api/home  -> single settings document (created with defaults if missing)
router.get('/', async (req, res, next) => {
  try {
    let settings = await Home.findOne({ key: 'homepage' }).lean();
    if (!settings) {
      settings = await Home.create(DEFAULTS);
      settings = settings.toObject();
    }
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

// PUT /api/home  -> upsert the singleton settings document
router.put('/', async (req, res, next) => {
  try {
    const settings = await Home.findOneAndUpdate(
      { key: 'homepage' },
      { $set: { ...req.body, key: 'homepage' } },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;
