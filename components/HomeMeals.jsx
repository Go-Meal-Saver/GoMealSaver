import MealsCard from './Mealscard';

export default function HomeMealsPage() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Recent Meals
        </h2>
        <MealsCard />
      </div>
    </section>
  );
}
