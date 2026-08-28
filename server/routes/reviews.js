import { Router } from 'express';
import Review from '../models/Review.js';
import { nextId } from '../utils/nextId.js';

const router = Router();

// GET /api/reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ id: 1 }).lean();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// POST /api/reviews
router.post('/', async (req, res, next) => {
  try {
    const id = await nextId(Review);
    const review = await Review.create({ ...req.body, id });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({ id: Number(req.params.id) });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted', id: review.id });
  } catch (err) {
    next(err);
  }
});

export default router;
