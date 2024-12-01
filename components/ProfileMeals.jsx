'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import deleteMeal from '@/app/actions/deleteMeal';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'; // Add icons

export default function ProfileMeals({ meals: initialMeals }) {
  const [meals, setMeals] = useState(initialMeals);

  const handleDelete = async (mealId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this meal?'
    );
    if (!confirm) return;

    await deleteMeal(mealId);
    const updatedMeals = meals.filter((meal) => meal._id !== mealId);
    setMeals(updatedMeals);
    toast.success('Meal deleted successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        My Meals
        <span className="text-sm ml-4 text-gray-500">
          ({meals.length} items)
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative h-48 group">
              <Image
                src={meal.image[0]}
                layout="fill"
                objectFit="cover"
                alt={meal.name}
                className="transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  href={`/meals/${meal._id}`}
                  className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {meal.name}
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Rp.{meal.price}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {meal.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{meal.cuisine}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-500">
                    {meal.portionSize}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/meals/${meal._id}/edit`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {meals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No meals added yet</p>
          <Link
            href="/meals/add"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
          >
            Add Your First Meal
          </Link>
        </div>
      )}
    </div>
  );
}
