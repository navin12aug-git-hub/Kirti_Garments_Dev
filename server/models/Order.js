import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: Number,
    name: String,
    quantity: Number,
    size: String,
    color: String,
    price: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    customerId: Number,
    customerName: String,
    items: { type: [orderItemSchema], default: [] },
    subtotal: Number,
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: Number,
    status: {
      type: String,
      enum: ['New', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
      default: 'New',
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' },
    paymentMethod: String,
    address: String,
    date: String,
    updatedAt: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');
