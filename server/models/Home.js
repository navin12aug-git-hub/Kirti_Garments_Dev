import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'homepage', unique: true },
    heroHeadline: String,
    heroDescription: String,
    heroImage: String,
    promoHeadline: String,
    promoDescription: String,
    promoImage: String,
    promoButtonText: String,
    categoryTitle: String,
    newArrivalsTitle: String,
    newArrivalsSubtitle: String,
    bestSellersTitle: String,
    offersTitle: String,
    announcementText: String,
    showReviews: { type: Boolean, default: true },
    showNewsletter: { type: Boolean, default: true },
    showWhatsApp: { type: Boolean, default: true },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Home || mongoose.model('Home', homeSchema, 'homes');
