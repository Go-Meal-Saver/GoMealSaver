import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // if the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connected = true;
  } catch (error) {
    console.log('Error connecting to MongoDB');
  }
};

export default connectDB;
