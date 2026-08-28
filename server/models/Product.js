import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    rating: Number,
    date: String,
    comment: String,
  },
  { _id: false }
);

const colorSchema = new mongoose.Schema(
  {
    name: String,
    hex: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    description: String,
    category: { type: String, index: true },
    subcategory: String,
    gender: { type: String, index: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    discountPercentage: Number,
    images: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [colorSchema], default: [] },
    specifications: { type: Map, of: String, default: {} },
    availability: { type: Boolean, default: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },
    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
    createdAtLabel: String,
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', category: 'text', subcategory: 'text' });

export default mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
