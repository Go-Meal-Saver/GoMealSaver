import { isValidObjectId } from 'mongoose';
import connectDB from '@/config/database';
import Order from '@/models/Orders';
import OrderDetail from '@/components/OrderDetail';
import { convertToSerializedObject } from '@/utils/convertToObject';

export default async function OrderPage({ params }) {
  await connectDB();

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
    const orderDoc = await Order.findById(params.slug).lean();
    if (!orderDoc) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="bg-amber-50 p-8 rounded-lg shadow-lg border border-amber-100">
            <h2 className="text-3xl font-bold text-amber-600 animate-fade-in">
              Order not found
            </h2>
          </div>
        </div>
      );
    }

    const order = convertToSerializedObject(orderDoc);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-28">
        <OrderDetail order={order} />
      </div>
    );
  } catch (error) {
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
