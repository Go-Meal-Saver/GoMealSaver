import SearchMeals from '@/components/SearchMeals';
import MealsCard from '@/components/MealsCard';
export default function AddMealsPage() {
  return (
    <>
      <section className=" bg-green-800 py-28">
        <div className=" max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchMeals />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <MealsCard />
        </div>
      </section>
    </>
  );
}
