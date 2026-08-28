import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: String,
    type: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
    value: { type: Number, required: true },
    minOrder: { type: Number, default: 0 },
    expiry: String,
    enabled: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema, 'coupons');
