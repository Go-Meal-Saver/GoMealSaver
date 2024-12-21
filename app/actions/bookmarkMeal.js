'use server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function bookmarkMeal(mealId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;
  // Find user in the database
  const user = await User.findById(userId);

  //Check if the meals is already bookmarked
  let isBookmarked = user.bookmarks.includes(mealId);

  let message;

  if (isBookmarked) {
    // Remove the bookmark
    user.bookmarks.pull(mealId);
    message = 'Meal removed from bookmarks';
    isBookmarked = false;
  } else {
    // Add the bookmark
    user.bookmarks.push(mealId);
    message = 'Meal added to bookmarks';
    isBookmarked = true;
  }

  await user.save();

  revalidatePath('/meals/saved', 'page');
  return { isBookmarked, message };
}

export default bookmarkMeal;
