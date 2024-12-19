import MealsCard from './MealsCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
export default async function HomeMealsPage() {
  await connectDB();
  const recentMeals = await Meal.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
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
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/meals"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Meals
        </Link>
      </section>
    </>
  );
}
