// app/meals/checkout/page.js
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import { authOptions } from '@/utils/authOptions';
import CheckoutForm from '@/components/CheckoutForm';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { createOrder } from '@/app/actions/creatOrder';

export default async function CheckoutPage({ searchParams }) {
  // Ensure user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // Connect to database
  await connectDB();

  // Get meal ID from search parameters
  const mealId = searchParams.mealId;

  if (!mealId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600">
            Tidak ada makanan yang dipilih
          </h2>
        </div>
      </div>
    );
  }

  try {
    // Fetch meal details
    const mealDoc = await Meal.findById(mealId).lean();

    if (!mealDoc) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-amber-50 p-8 rounded-lg shadow-lg border border-amber-100">
            <h2 className="text-3xl font-bold text-amber-600">
              Makanan tidak ditemukan
            </h2>
          </div>
        </div>
      );
    }

    // Convert to serialized object
    const meal = convertToSerializedObject(mealDoc);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 pt-28">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12 text-green-800">
            Checkout
          </h1>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <CheckoutForm
              meal={meal}
              user={session.user}
              createOrder={createOrder}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Checkout page error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border border-red-100">
          <h2 className="text-3xl font-bold text-red-600">
            Kesalahan memproses checkout
          </h2>
        </div>
      </div>
    );
  }
}
