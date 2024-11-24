'use server';
import cloudinary from '@/config/cloudinary';
import Meal from '@/models/Meals';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
export default async function deleteMeal(MealId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    throw new Error('You need to sign in to delete a meal');
  }
  const { userId } = sessionUser;

  const meal = await Meal.findById(MealId);

  if (!meal) {
    throw new Error('Meal not found');
  }

  // Check if the user is the owner of the meal
  if (meal.owner.toString() !== userId) {
    throw new Error('You are not authorized to delete this meal');
  }
  // Extract the public_id from the
  const publicIds = meal.image.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });
  // Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('GoMealSaver' + publicId);
    }
  }

  await meal.deleteOne();
  revalidatePath('/', 'layout');
}
