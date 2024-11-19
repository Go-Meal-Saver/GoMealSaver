// models/Meals.js
import { Schema, model, models } from 'mongoose';

const MealSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    portionSize: {
      type: String,
      required: true,
    },
    timeRemaining: {
      type: String,
      required: true,
    },
    features: [String], // Simplified array definition
    restaurant: {
      name: String,
      address: String,
      city: String,
      state: String,
      phone: String,
      email: String,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = models.Meal || model('Meal', MealSchema);
export default Meal;
