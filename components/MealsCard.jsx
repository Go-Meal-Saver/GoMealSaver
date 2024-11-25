import Image from 'next/image';
import Link from 'next/link';
import { FaMoneyBill, FaClock, FaUtensils, FaPercent } from 'react-icons/fa';
import { FaLocationArrow, FaMapLocation } from 'react-icons/fa6';

export default function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <Image
        src={meal.image[0]}
        alt={meal.name}
        width={500}
        height={300}
        className="w-full h-[200px] object-cover rounded-t-xl"
      />
      <div className="p-4">
        <header className="text-left md:text-center lg:text-left mb-4">
          <div className="text-gray-600">{meal.cuisine}</div>
          <h3 className="text-xl font-bold">{meal.name}</h3>
        </header>

        {/* Price Section */}
        <div className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg shadow-sm">
          <div className="flex flex-col items-end">
            <div className="text-green-600 font-bold text-xl">
              Rp.{meal.price.toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm line-through">
              Rp.{meal.originalPrice.toFixed(2)}
            </div>
            <div className="text-red-500 text-sm font-medium">
              -{meal.discountPercentage}% OFF
            </div>
          </div>
        </div>

        {/* Info Pills */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            <FaClock className="text-sm" />
            <span>{meal.timeRemaining}</span>
          </div>
          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">
            <FaUtensils className="text-sm" />
            <span>{meal.portionSize}</span>
          </div>
        </div>

        <div className="border border-gray-100 mb-4"></div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {meal.features.slice(0, 4).map((feature, index) => (
            <span
              key={index}
              className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Restaurant Info */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col gap-1 mb-3 lg:mb-0">
            <div className="flex align-middle gap-2">
              <FaLocationArrow className="text-lg text-green-700" />
              <span className="text-green-700">{meal.restaurant.name}</span>
            </div>
            <div className="flex align-middle gap-2 text-gray-500 text-sm">
              <FaMapLocation />
              <span>{meal.restaurant.address}</span>
            </div>
          </div>
          <Link
            href={`/meals/${meal._id}`}
            className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-center text-sm transition duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
