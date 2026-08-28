import { Router } from 'express';
import Product from '../models/Product.js';
import { nextId } from '../utils/nextId.js';

const router = Router();

// GET /api/products?category=&gender=&isNew=&isBestSeller=&isOffer=&search=&minPrice=&maxPrice=&sort=&limit=&page=
router.get('/', async (req, res, next) => {
  try {
    const { category, gender, isNew, isBestSeller, isOffer, search, minPrice, maxPrice, sort, limit, page } = req.query;
    const filter = {};

    if (category) filter.category = new RegExp(`^${category}$`, 'i');
    if (gender) filter.gender = gender;
    if (isNew !== undefined) filter.isNew = isNew === 'true';
    if (isBestSeller !== undefined) filter.isBestSeller = isBestSeller === 'true';
    if (isOffer !== undefined) filter.isOffer = isOffer === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { subcategory: new RegExp(search, 'i') },
      ];
    }

    const sortMap = {
      priceLowHigh: { price: 1 },
      priceHighLow: { price: -1 },
      newest: { id: -1 },
      rating: { rating: -1 },
    };

    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Number(limit) || 0; // 0 = no limit

    let query = Product.find(filter).sort(sortMap[sort] || { id: 1 });
    if (limitNum) query = query.skip((pageNum - 1) * limitNum).limit(limitNum);

    const [products, total] = await Promise.all([query.lean(), Product.countDocuments(filter)]);

    res.json({ products, total, page: pageNum, limit: limitNum || total });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) }).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const id = await nextId(Product);
    const price = req.body.price;
    const originalPrice = req.body.originalPrice || Math.round(price * 1.3);
    const discountPercentage = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const product = await Product.create({ ...req.body, id, originalPrice, discountPercentage });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', id: product.id });
  } catch (err) {
    next(err);
  }
});

export default router;
