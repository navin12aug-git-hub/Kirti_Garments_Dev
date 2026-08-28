import { Router } from 'express';
import Category from '../models/Category.js';
import { nextId } from '../utils/nextId.js';

const router = Router();

// GET /api/categories
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.enabled !== undefined) filter.enabled = req.query.enabled === 'true';
    const categories = await Category.find(filter).sort({ id: 1 }).lean();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:idOrSlug
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const query = /^\d+$/.test(idOrSlug) ? { id: Number(idOrSlug) } : { slug: idOrSlug };
    const category = await Category.findOne(query).lean();
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// POST /api/categories
router.post('/', async (req, res, next) => {
  try {
    const id = await nextId(Category);
    const slug = req.body.slug || req.body.name.toLowerCase().trim().replace(/\s+/g, '-');
    const category = await Category.create({ ...req.body, id, slug, productCount: req.body.productCount ?? 0 });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res, next) => {
  try {
    const category = await Category.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const category = await Category.findOneAndDelete({ id: Number(req.params.id) });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted', id: category.id });
  } catch (err) {
    next(err);
  }
});

export default router;
