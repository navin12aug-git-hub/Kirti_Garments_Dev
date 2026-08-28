import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    id: Number,
    label: String,
    line: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: String,
    password: { type: String, select: false },
    orders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    joinedAt: String,
    addresses: { type: [addressSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema, 'customers');
