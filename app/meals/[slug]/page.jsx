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

export default async function MealPage({ params }) {
  await connectDB();

  // Validate if slug is a valid ObjectId
  if (!isValidObjectId(params.slug)) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        Invalid meal ID format
      </div>
    );
  }

  try {
    const mealDoc = await Meal.findById(params.slug).lean();

    if (!mealDoc) {
      return (
        <div className="text-center text-2xl font-bold mt-10">
          Meal not found
        </div>
      );
    }

    const meal = convertToSerializedObject(mealDoc);

    return (
      <>
        <MealsHeaderImage image={meal.image[0]} />
        <section>
          <div className="container-xl lg:container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <Link
                href="/meals"
                className="flex items-center text-green-500 hover:text-green-600"
              >
                <FaArrowLeft className="mr-2" />
                Back to Meals
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-green-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <MealDetail meal={meal} />
                </div>
                <aside className="md:col-span-1">
                  <BookmarkButton meal={meal} />
                  <ShareButton meal={meal} />
                </aside>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error fetching meal:', error);
    return (
      <div className="text-center text-2xl font-bold mt-10">
        Error loading meal
      </div>
    );
  }
}
