import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    image: { type: String, default: '' },
    productCount: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', categorySchema, 'categories');
