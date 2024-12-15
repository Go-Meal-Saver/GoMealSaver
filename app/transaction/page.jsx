export const dynamic = 'force-dynamic';
import TransactionCard from '@/components/TrancsactionCard';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export default async function TransactionPage() {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      redirect('/login');
    }

    const { userId } = sessionUser;

    if (!userId) {
      throw new Error('You need to sign in to view your transactions');
    }

    const transactions = await Orders.find({ owner: userId })
      .populate('transaction')
      .lean();
    const serializedTransactions = transactions.map((transaction) =>
      convertToSerializedObject(transaction)
    );
    return (
      <section className="min-h-screen bg-gray-50 py-8 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Transaction
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track your transaction here
            </p>
          </div>

          {serializedTransactions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serializedTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                />
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
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm4 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Sorry, No Transaction at Your Store
              </h2>
              <p className="text-gray-600 mb-6">
                It looks like you dont have a transaction history yet. Start
                selling products to see your first transaction! Sorry, No
                Transaction at Your Store
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                To Main Page
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return <div>Error loading transactions. Please try again later.</div>;
  }
}
