import { Router } from 'express';
import Customer from '../models/Customer.js';
import { nextId } from '../utils/nextId.js';

const router = Router();

// GET /api/customers
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const customers = await Customer.find(filter).sort({ id: 1 }).lean();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// GET /api/customers/:id
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ id: Number(req.params.id) }).lean();
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
});

// POST /api/customers
router.post('/', async (req, res, next) => {
  try {
    const id = await nextId(Customer);
    const customer = await Customer.create({ ...req.body, id });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

// PUT /api/customers/:id
router.put('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/customers/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({ id: Number(req.params.id) });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted', id: customer.id });
  } catch (err) {
    next(err);
  }
});

export default router;
