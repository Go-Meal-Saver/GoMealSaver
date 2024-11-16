'use client';

import Image from 'next/image';
import Link from 'next/link';
import meals from '../meals.json';
import { FaMoneyBill, FaClock, FaUtensils, FaPercent } from 'react-icons/fa';
import { FaLocationArrow, FaMapLocation } from 'react-icons/fa6';

export default function HomeMealsPage() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Recent Meals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white rounded-xl shadow-md relative"
            >
              <Image
                src={`/${meal.image}`}
                alt={meal.name}
                width={500}
                height={300}
                className="w-full h-[200px] object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                  <div className="text-gray-600">{meal.cuisine}</div>
                  <h3 className="text-xl font-bold">{meal.name}</h3>
                </div>
                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-600 font-bold text-right md:text-center lg:text-right">
                  ${meal.price.toFixed(2)}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                  <p className="flex items-center gap-2">
                    <FaClock className="text-lg" /> {meal.timeRemaining}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUtensils className="text-lg" /> {meal.portionSize}
                  </p>
                </div>

                <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <FaMoneyBill className="text-lg" />
                    {meal.discountPercentage}
                    <FaPercent className="text-sm" />
                  </p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

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

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex align-middle gap-2">
                      <FaLocationArrow className="text-lg text-green-700" />
                      <span className="text-green-700">
                        {meal.restaurant.name}
                      </span>
                    </div>
                    <div className="flex align-middle gap-2 text-gray-500 text-sm">
                      <FaMapLocation />
                      <span>{meal.restaurant.address}</span>
                    </div>
                  </div>
                  <Link
                    href={`/meals/${meal._id}`}
                    className="h-[36px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
