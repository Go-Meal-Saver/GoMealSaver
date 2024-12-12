import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    // meal: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Meal',
    //   required: true,
    // },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
