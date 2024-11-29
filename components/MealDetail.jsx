<<<<<<< Updated upstream
import Image from 'next/image';
import { FaClock, FaUtensils, FaStore, FaMapMarkerAlt } from 'react-icons/fa';
import MealMap from './MealMap';

export default function MealDetail({ meal }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Image and Map */}
        <div className="space-y-6">
          {/* Image Section */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={meal.image[0]}
              alt={meal.name}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {meal.available && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
                Available Now
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Restaurant Location
              </h3>
            </div>
            <div className="h-64 md:h-80 border-b">
              <MealMap meal={meal} />
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="flex-grow">
                <p className="font-medium text-gray-700">
                  {meal.restaurant.address}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <FaMapMarkerAlt />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Meal Details */}
        <div className="space-y-6">
          {/* Cuisine and Name */}
          <div>
            <p className="text-gray-500 uppercase tracking-wide text-sm">
              {meal.cuisine}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 mt-2">
              {meal.name}
            </h1>
          </div>

          {/* Pricing with Discount */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-green-600">
                  ${meal.price.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-lg">
                  ${meal.originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                {meal.discountPercentage}% OFF
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex space-x-6">
            <div className="flex items-center gap-2 text-blue-600">
              <FaClock className="text-lg" />
              <span className="font-medium">
                {meal.timeRemaining} mins left
              </span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaUtensils className="text-lg" />
              <span className="font-medium">{meal.portionSize} Portion</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{meal.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Features
            </h2>
            <div className="flex flex-wrap gap-2">
              {meal.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant Information */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Restaurant Information
            </h2>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <FaStore className="text-green-600 text-2xl" />
              <div>
                <p className="font-bold text-gray-800">
                  {meal.restaurant.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {meal.restaurant.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
import Image from 'next/image';
import { FaClock, FaUtensils, FaStore, FaStar } from 'react-icons/fa';

export default function MealDetail({ meal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src={meal.image[0]}
            alt={meal.name}
            fill
            className="object-cover"
          />
          {meal.available && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Available Now
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 text-sm">{meal.cuisine}</p>
            <h1 className="text-3xl font-bold mt-1">{meal.name}</h1>
          </div>

          {/* Pricing */}
          <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-green-600">
                ${meal.price.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through text-lg">
                ${meal.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-red-500 font-medium mt-1">
              {meal.discountPercentage}% OFF
            </div>
          </div>

          {/* Info Pills */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500" />
              <span>{meal.timeRemaining} mins left</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUtensils className="text-purple-500" />
              <span>{meal.portionSize} Portion</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{meal.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {meal.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Restaurant Information
            </h2>
            <div className="flex items-center gap-3">
              <FaStore className="text-green-600 text-xl" />
              <div>
                <p className="font-medium">{meal.restaurant.name}</p>
                <p className="text-gray-600 text-sm">
                  {meal.restaurant.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes
