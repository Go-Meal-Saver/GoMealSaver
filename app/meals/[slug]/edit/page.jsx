import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';
import MealEditPage from '@/components/MealEdit';
import connectDB from '@/config/database';
import { convertToSerializedObject } from '@/utils/convertToObject';
import Meal from '@/models/Meals';
import NotFound from '@/app/not-found';

export default async function EditPage({ params }) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/login');
  }

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('You need to sign in to view your transactions');
  }
  await connectDB();

  // Find the meal document
  const mealDoc = await Meal.findOne({
    _id: params.slug,
    owner: userId,
  }).lean();
  const meal = convertToSerializedObject(mealDoc);

  if (!meal) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
    <section className="bg-green-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className=" bg-white px-6 mb-4 shadow-md border m-4 md:m-0">
          <MealEditPage meal={meal} />
        </div>
      </div>
    </section>
  );
}
