// components/MealReview.js
import connectDB from '@/config/database';
import Review from '@/models/Review';
import { convertToSerializedObject } from '@/utils/convertToObject';

export default async function MealReview({ mealId }) {
  await connectDB();

  // Find reviews specifically for this meal
  const reviewDoc = await Review.findOne({
    meals: mealId,
  }).lean();

  if (!reviewDoc) {
    return null; // Return nothing if no review exists
  }

  const review = convertToSerializedObject(reviewDoc);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{review.name}</h3>
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{review.rating}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm">{review.review}</p>
      <div className="mt-2 text-xs text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
