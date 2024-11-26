import Image from 'next/image';
import { FaClock, FaUtensils, FaStore } from 'react-icons/fa';

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
