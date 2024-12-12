'use server';
import { redirect } from 'next/navigation';
import Review from '@/models/Review';
import { getSessionUser } from '@/utils/getSessionUser';

export async function addReview(transactionId, formData) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      redirect('/login');
    }

    // Extract values directly from the object
    const rating = Number(formData.rating);
    const reviewText = formData.review;

    // Validate inputs
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new Error('Invalid rating. Must be a number between 1 and 5.');
    }

    if (!reviewText) {
      throw new Error('Review text is required.');
    }

    // Create new review
    const newReview = new Review({
      user: sessionUser.userId,
      rating,
      review: reviewText,
      transaction: transactionId,
    });

    await newReview.save();

    return {
      submitted: true,
    };
  } catch (error) {
    console.error('Error adding review:', error);
    return {
      submitted: false,
      error: error.message,
    };
  }
}
