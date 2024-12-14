export const dynamic = 'force-dynamic';
import OrderCard from '@/components/OrdersCard';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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

          {serializedOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serializedOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-6">
                It seems you havent placed any orders yet. Lets change that!
              </p>
              <Link
                href="/orders"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Explore Meals
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return <div>Error loading orders. Please try again later.</div>;
  }
}
