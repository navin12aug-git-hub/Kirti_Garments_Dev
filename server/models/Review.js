import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: String,
    title: String,
    comment: String,
    product: String,
    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model('Review', reviewSchema, 'reviews');
