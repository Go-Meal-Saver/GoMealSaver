import SearchMeals from './SearchMeals';

export default function Hero() {
  return (
    <section className="relative  py-24 lg:py-32">
      <div className="absolute inset-0 bg-fern-green-800  "></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            <span className="block">Delicious Leftover Meals</span>
            <span className="block text-green-300 mt-2">At Budget Prices</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 font-light">
            {
              // eslint-disable-next-line quotes
              "Transform yesterday's meals into today's delights. Save money while enjoying tasty, sustainable food options."
            }
          </p>
        </div>
        <SearchMeals />
      </div>
    </section>
  );
}
