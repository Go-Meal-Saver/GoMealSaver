import { isValidObjectId } from 'mongoose';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import MealDetail from '@/components/MealDetail';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { convertToSerializedObject } from '@/utils/convertToObject';
import MealsHeaderImage from '@/components/MealsHeaderImage';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButton from '@/components/ShareButton';
import MealContactForm from '@/components/MealContactForm';
import ReviewPage from '@/components/Review';

export default async function MealPage({ params }) {
  await connectDB();

  // Invalid Meal ID Handler
  if (!isValidObjectId(params.slug)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-red-600">Invalid Meal ID</h2>
            <p className="mt-2 text-gray-600">
              The meal identifier you provided is not valid.
            </p>
            <Link
              href="/meals"
              className="mt-4 inline-block rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
            >
              Return to Meals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  try {
    const mealDoc = await Meal.findById(params.slug).lean();

    // Meal Not Found Handler
    if (!mealDoc) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-4 h-16 w-16 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-amber-600">
                Meal Not Found
              </h2>
              <p className="mt-2 text-gray-600">
                The meal you are looking for does not exist.
              </p>
              <Link
                href="/meals"
                className="mt-4 inline-block rounded-full bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition-colors"
              >
                Back to Meals
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const meal = convertToSerializedObject(mealDoc);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        <MealsHeaderImage image={meal.image[0]} />

        <div className="container mx-auto px-4 py-8">
          {/* Navigation Back Button */}
          <div className="mb-6">
            <Link
              href="/meals"
              className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 transition-all"
            >
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Meals</span>
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-8">
            {/* Meal Details Section */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <MealDetail meal={meal} />
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-1">
              {/* Booking and Interaction Buttons */}
              <div className="rounded-2xl bg-white p-6 shadow-xl">
                <div className="space-y-4">
                  <BookmarkButton meal={meal} />
                  <ShareButton meal={meal} />
                  <MealContactForm meal={meal} />
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section - Now at the bottom */}
          <div className="w-full shadow-xl">
            <ReviewPage mealId={meal._id} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching meal:', error);

    // Error Handling UI
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-red-600">
              Error Loading Meal
            </h2>
            <p className="mt-2 text-gray-600">
              We encountered an issue while retrieving the meal details.
            </p>
            <Link
              href="/meals"
              className="mt-4 inline-block rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
            >
              Return to Meals
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
