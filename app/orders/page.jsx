import OrderCard from '@/components/OrdersCard';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';

export default async function OrderPage() {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      redirect('/login');
    }
    const { userId } = sessionUser;
    if (!userId) {
      throw new Error('You need to sign in to view your orders');
    }
    const orders = await Orders.find({ user: userId }).lean();
    const serializedOrders = orders.map((order) =>
      convertToSerializedObject(order)
    );

    return (
      <section className="min-h-screen bg-gray-50 py-8 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track your orders here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {serializedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return <div>Error loading orders. Please try again later.</div>;
  }
}
