import SearchMeals from '@/components/SearchMeals';
import MealsCard from '@/components/MealsCard';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
export default async function AddMealsPage() {
  await connectDB();
  const recentMeals = await Meal.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
      <section className=" bg-green-800 py-28">
        <div className=" max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchMeals />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-fern-green-600 mb-6 text-center">
            Recent Meals
          </h2>
          {recentMeals.length === 0 ? (
            <p>No Meals found</p>
          ) : (
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentMeals.map((meal) => (
                <MealsCard key={meal._id} meal={meal} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
