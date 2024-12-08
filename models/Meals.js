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
      type: Number,
      required: true,
    },
    features: [String],
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
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    ratings: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = models.Meal || model('Meal', MealSchema);
export default Meal;
