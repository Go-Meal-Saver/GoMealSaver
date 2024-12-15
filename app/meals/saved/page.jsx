/* eslint-disable react/no-unescaped-entities */
import { BookmarkIcon, SearchHeartIcon } from 'lucide-react';
import { FaBookmark, FaSearch } from 'react-icons/fa';
import MealCard from '@/components/MealsCard';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedMealsPage = async () => {
  await connectDB();
  const { userId } = await getSessionUser();

  const { bookmarks } = await User.findById(userId).populate({
    path: 'bookmarks',
    model: Meal,
  });

  return (
    <section className="px-4 py-6 min-h-screen bg-gray-50">
      <div className="container lg:container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          <span className="flex items-center gap-3">
            <FaBookmark className="text-gray-700" />
            Saved Meals
          </span>
        </h1>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white shadow-lg rounded-lg p-12 border border-gray-200">
            <FaSearch className="w-24 h-24 text-gray-400" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center justify-center gap-2">
                <FaBookmark className="text-gray-600" />
                No Saved Meals Yet
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't saved any meals to your collection.
              </p>
              <div className="flex items-center justify-center space-x-2 bg-blue-50 p-3 rounded-lg">
                <FaBookmark className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 text-sm">
                  Tap the bookmark icon on a meal to save it for later
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookmarks.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedMealsPage;
