import { isValidObjectId } from 'mongoose';
import connectDB from '@/config/database';
import Order from '@/models/Orders';
import TransactionDetailPage from '@/components/TransactionDetail';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { redirect } from 'next/navigation';
import NotFound from '@/app/not-found';

export default async function TransactionPage({ params }) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/login');
  }

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('You need to sign in to view your transactions');
  }

  if (!isValidObjectId(params.slug)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600 animate-fade-in">
            Invalid order ID format
          </h2>
        </div>
      </div>
    );
  }

  try {
    // Cari order berdasarkan ID dan owner
    const orderDoc = await Order.findOne({
      _id: params.slug,

      owner: userId, // Memastikan order dimiliki oleh user yang sedang login
    })
      .populate('meal')
      .lean();

    if (!orderDoc) {
      return (
        <div>
          <NotFound />
        </div>
      );
    }

    const order = convertToSerializedObject(orderDoc);
    const meal = convertToSerializedObject(orderDoc.meal);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-28">
        <TransactionDetailPage transaction={order} meal={meal} />
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
