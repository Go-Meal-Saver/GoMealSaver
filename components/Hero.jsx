import SearchMeals from './SearchMeals';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-green-700 to-green-900 py-24 lg:py-32">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            <span className="block">Delicious Leftover Meals</span>
            <span className="block text-green-300 mt-2">At Budget Prices</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 font-light">
            Transform yesterday's meals into today's delights. Save money while
            enjoying tasty, sustainable food options.
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <button className="px-8 py-3 text-lg font-medium rounded-full bg-white text-green-800 hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
              Browse Affordable Meals
            </button>
            <button className="px-8 py-3 text-lg font-medium rounded-full border-2 border-white text-white hover:bg-white hover:text-green-800 transition-all duration-300">
              Save Food & Money
            </button>
          </div>
        </div>
        <SearchMeals />
      </div>
    </section>
  );
}
