import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kirti_garments';

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected -> ${mongoose.connection.name} @ ${mongoose.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
}

export default connectDB;
