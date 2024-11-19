import MealsAddForm from '@/components/MealsAddForm';

export default function AddMeals() {
  return (
    <section className="bg-green-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className=" bg-white px-6 mb-4 shadow-md border m-4 md:m-0">
          <MealsAddForm />
        </div>
      </div>
    </section>
  );
}
