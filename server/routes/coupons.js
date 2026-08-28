import { Router } from 'express';
import Coupon from '../models/Coupon.js';
import { nextId } from '../utils/nextId.js';

const router = Router();

// GET /api/coupons
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.enabled !== undefined) filter.enabled = req.query.enabled === 'true';
    const coupons = await Coupon.find(filter).sort({ id: 1 }).lean();
    res.json(coupons);
  } catch (err) {
    next(err);
  }
});

// GET /api/coupons/validate/:code  -> checks a coupon is usable, for the storefront cart
router.get('/validate/:code', async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), enabled: true }).lean();
    if (!coupon) return res.status(404).json({ message: 'Invalid or expired coupon' });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
});

// POST /api/coupons
router.post('/', async (req, res, next) => {
  try {
    const id = await nextId(Coupon);
    const coupon = await Coupon.create({ ...req.body, id, code: req.body.code?.toUpperCase() });
    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
});

// PUT /api/coupons/:id
router.put('/:id', async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (update.code) update.code = update.code.toUpperCase();
    const coupon = await Coupon.findOneAndUpdate({ id: Number(req.params.id) }, { $set: update }, { new: true, runValidators: true });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/coupons/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findOneAndDelete({ id: Number(req.params.id) });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted', id: coupon.id });
  } catch (err) {
    next(err);
  }
});

export default router;
