'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export default async function checkBookmarkStatus(mealId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(mealId);
  return { isBookmarked };
}
