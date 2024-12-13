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
    const name = formData.name;
    const meal = formData.meal;

    // Validate inputs
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new Error('Invalid rating. Must be a number between 1 and 5.');
    }

    if (!reviewText) {
      throw new Error('Review text is required.');
    }

    if (!name) {
      throw new Error('Name is required.');
    }

    // Create new review
    const newReview = new Review({
      user: sessionUser.userId,
      name,
      rating,
      meal,
      review: reviewText,
      transaction: transactionId,
    });

    await newReview.save();

    // Remove the return statement after redirect
    // The redirect should be the last action
    redirect('/orders');
  } catch (error) {
    // Don't return an error object, instead throw it
    // so it can be handled by the UI layer
    console.error('Error adding review:', error);
    throw error;
  }
}
