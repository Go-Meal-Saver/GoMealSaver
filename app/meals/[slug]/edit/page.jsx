import MealEditPage from '@/components/MealEdit';
import connectDB from '@/config/database';
import { convertToSerializedObject } from '@/utils/convertToObject';
import Meal from '@/models/Meals';
export default async function EditPage({ params }) {
  await connectDB();
  const mealDoc = await Meal.findById(params.slug).lean();
  const meal = convertToSerializedObject(mealDoc);
  if (!meal) {
    return <div>Meal not found</div>;
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
