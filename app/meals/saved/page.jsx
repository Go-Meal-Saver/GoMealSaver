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
    <section className="px-4 py-6">
      <div className=" container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Meals</h1>
        {bookmarks.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            No saved meals
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
