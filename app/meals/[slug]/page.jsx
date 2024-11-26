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

export default async function MealPage({ params }) {
  await connectDB();

  if (!isValidObjectId(params.slug)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600 animate-fade-in">
            Invalid meal ID format
          </h2>
        </div>
      </div>
    );
  }

  try {
    const mealDoc = await Meal.findById(params.slug).lean();

    if (!mealDoc) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="bg-amber-50 p-8 rounded-lg shadow-lg border border-amber-100">
            <h2 className="text-3xl font-bold text-amber-600 animate-fade-in">
              Meal not found
            </h2>
          </div>
        </div>
      );
    }

    const meal = convertToSerializedObject(mealDoc);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        <MealsHeaderImage image={meal.image[0]} />
        <section className="relative -mt-16">
          <div className="container-xl lg:container mx-auto px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl shadow-lg p-6">
              <Link
                href="/meals"
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                <span className="font-medium">Back to Meals</span>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto py-12 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <MealDetail meal={meal} />
                </div>
              </div>
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  <BookmarkButton meal={meal} />
                  <ShareButton meal={meal} />
                  <MealContactForm meal={meal} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching meal:', error);
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600 animate-fade-in">
            Error loading meal
          </h2>
        </div>
      </div>
    );
  }
}
