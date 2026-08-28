import { Router } from 'express';
import Order from '../models/Order.js';

const router = Router();

// GET /api/orders?status=&customerId=
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.customerId) filter.customerId = Number(req.query.customerId);
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id  (order id is a string like KG2026-001)
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({ id: req.params.id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders
router.post('/', async (req, res, next) => {
  try {
    const count = await Order.countDocuments();
    const id = req.body.id || `KG${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    const order = await Order.create({ ...req.body, id });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id  (e.g. status updates from the admin panel)
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, updatedAt: new Date().toISOString().slice(0, 10) } },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted', id: order.id });
  } catch (err) {
    next(err);
  }
});

export default router;
