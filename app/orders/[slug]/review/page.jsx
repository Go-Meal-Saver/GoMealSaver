import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import AddReviewForm from '@/components/ReviewAddForm';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { redirect } from 'next/navigation';

export default async function AddReviewPage({ params }) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/login');
  }

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('You need to sign in to post a review');
  }

  const reviewId = params.slug;

  if (!reviewId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600">No food selected</h2>
        </div>
      </div>
    );
  }

  try {
    const reviewDoc = await Orders.findById(params.slug).lean();
    const review = convertToSerializedObject(reviewDoc);
    if (!reviewDoc) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-amber-50 p-8 rounded-lg shadow-lg border border-amber-100">
            <h2 className="text-3xl font-bold text-amber-600">
              Transaction not found
            </h2>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Add Review</h1>
          <AddReviewForm order={review} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600 animate-fade-in">
            Error fetching order
          </h2>
        </div>
      </div>
    );
  }
}