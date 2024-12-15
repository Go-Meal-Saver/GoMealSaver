import { isValidObjectId } from 'mongoose';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import OrderDetail from '@/components/OrderDetail';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { redirect } from 'next/navigation';
import NotFound from '@/app/not-found';

export default async function OrderPage({ params }) {
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
      <div>
        <NotFound />
      </div>
    );
  }

  try {
    const orderDoc = await Orders.findOne({
      _id: params.slug,

      user: userId,
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
        <OrderDetail order={order} meal={meal} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
}
