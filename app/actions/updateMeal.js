'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import { getSessionUser } from '@/utils/getSessionUser';

export default async function updateMeal(MealId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error('You must be logged in to update a meal');
  }
  const { userId } = sessionUser;

  const existingMeal = await Meal.findById(MealId);

  // Verify that the user owns the meal

  if (existingMeal.owner.toString() !== userId) {
    throw new Error('You do not have permission to update this meal');
  }

  const mealsData = {
    owner: userId, // Use the ID from session
    name: formData.get('name'),
    stockQuantity: Number(formData.get('stockQuantity')),
    cuisine: formData.get('cuisine'),
    description: formData.get('description'),
    price: Number(formData.get('price')),
    discountPercentage: Number(formData.get('discountPercentage')),
    originalPrice: Number(formData.get('originalPrice')),
    portionSize: formData.get('portionSize'),
    timeRemaining: formData.get('timeRemaining'),
    features: formData.getAll('features'),
    restaurant: {
      name: formData.get('restaurant.name'),
      address: formData.get('restaurant.address'),
      city: formData.get('restaurant.city'),
      state: formData.get('restaurant.state'),
      phone: formData.get('restaurant.phone'),
      email: formData.get('restaurant.email'),
    },
    available: formData.get('available') === 'on',
  };

  const updatedMeal = await Meal.findByIdAndUpdate(MealId, mealsData);

  revalidatePath('/', 'layout');
  redirect(`/meals/${updatedMeal._id}`);
}
