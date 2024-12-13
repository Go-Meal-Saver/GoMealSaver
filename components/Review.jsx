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

    if (!reviewDoc) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6 transition-all duration-300 hover:shadow-xl">
          <p className="text-gray-500 text-center italic">
            No reviews available yet.
          </p>
        </div>
      );
    }

    const review = convertToSerializedObject(reviewDoc);

    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          Customer Review
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-gray-800">
              {review.name}
            </h3>
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="ml-1 font-medium text-gray-700">
                {review.rating}
              </span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.review}</p>
          <div className="text-sm text-gray-500 italic pt-2">
            Posted on{' '}
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
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
