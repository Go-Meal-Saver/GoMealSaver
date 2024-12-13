import connectDB from '@/config/database';
import Review from '@/models/Review';
import { convertToSerializedObject } from '@/utils/convertToObject';

export default async function MealReview({ mealId }) {
  if (!mealId) {
    console.log('No mealId provided');
    return null;
  }

  try {
    await connectDB();

    console.log('Searching for review with mealId:', mealId);

    const reviewDoc = await Review.findOne({ meal: mealId }).lean();
    console.log('Found review:', reviewDoc);

    if (!reviewDoc) {
      console.log('No review found for mealId:', mealId);
      return (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
          <p>No reviews yet.</p>
        </div>
      );
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
  } catch (error) {
    console.error('Error fetching review:', error);
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
        <p>Error loading review.</p>
      </div>
    );
  }
}
