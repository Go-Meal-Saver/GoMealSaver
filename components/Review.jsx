import React from 'react';
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

    const reviewDocs = await Review.find({ meal: mealId }).lean();

    if (!reviewDocs || reviewDocs.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-lg mt-6">
          <div className="p-6">
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500 text-center italic">
                No reviews available yet
              </p>
            </div>
          </div>
        </div>
      );
    }

    const reviews = reviewDocs.map((doc) => convertToSerializedObject(doc));

    return (
      <div className="bg-white rounded-lg shadow-lg mt-6">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Customer Reviews
            </h2>
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {review.name}
                        </h3>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={`text-lg ${
                                index < review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="bg-gray-50 text-gray-700 text-sm font-medium px-2.5 py-1 rounded-full">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Review Content */}
                    <div className="pt-2">
                      <p className="text-gray-700 leading-relaxed line-clamp-3">
                        {review.review}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center text-sm text-gray-500 pt-2">
                      <time dateTime={review.createdAt}>
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return (
      <div className="bg-white rounded-lg shadow-lg mt-6">
        <div className="p-6">
          <div className="text-red-500 flex items-center justify-center">
            <span className="font-medium">Error loading reviews</span>
          </div>
        </div>
      </div>
    );
  }
}
