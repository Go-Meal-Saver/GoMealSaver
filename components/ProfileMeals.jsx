'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import deleteMeal from '@/app/actions/deleteMeal';
import { toast } from 'react-toastify';

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
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-4">My Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-40">
              <Image
                src={meal.image[0]}
                layout="fill"
                objectFit="cover"
                alt={meal.name}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-900">
                {meal.name}
              </h3>
              <p className="text-sm text-green-600">{meal.description}</p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/meals/${meal._id}`}
                  className="text-green-600 hover:underline"
                >
                  View Meal
                </Link>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
