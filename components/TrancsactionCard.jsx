import { Eye } from 'lucide-react';
import Link from 'next/link';

export default function TransactionCard({ transaction }) {
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(3) : '0.000';
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            transaction #{transaction._id || 'N/A'}
          </h2>
          <p className="text-sm text-gray-500">
            {transaction.name || 'Unknown'}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            (transaction.status?.toLowerCase() || '') === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : transaction.status === 'processing'
              ? 'bg-blue-100 text-blue-800'
              : transaction.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {transaction.status || 'Unknown'}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">Total</p>
          <p className="text-xl font-bold text-green-600">
            Rp.{formatPrice(transaction.totalPrice)}
          </p>
        </div>
        <Link
          href={`/transaction/${transaction._id}`}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Eye className="mr-2 w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}
