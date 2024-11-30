'use client';
import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function SearchMeals() {
  const [location, setLocation] = useState('');
  const [mealType, setMealType] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (location === '' && mealType === 'All') {
      router.push('/meals');
    } else {
      const query = `?location=${location}&mealType=${mealType}`;
      router.push(`/meals/search-results${query}`);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 mx-auto max-w-2xl w-full p-4 bg-white/5 backdrop-blur-md rounded-xl shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-3/5 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FiMapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500
                     border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 
                     transition-all duration-300"
          />
        </div>

        <div className="w-full md:w-2/5">
          <select
            id="meal-type"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 
                     border border-gray-200 focus:outline-none focus:ring-2 
                     focus:ring-green-500 transition-all duration-300"
          >
            <option value="All">All Meals</option>
            <option value="Asian Cuisine">Asian Cuisine</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
            <option value="Western Cuisine">Western Cuisine</option>
            <option value="Local Delights">Local Delights</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-6 py-3 rounded-lg bg-green-600 text-white 
                   hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
                   transition-all duration-300 flex items-center justify-center gap-2
                   disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          <FiSearch className="h-5 w-5" />
          {isLoading ? (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
}
