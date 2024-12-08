'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';
export default function OrderCard({ order }) {
  if (!order) {
    return <div>Loading...</div>;
  }

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Order #{order.id || 'N/A'}
          </h2>
          <p className="text-sm text-gray-500">{order.name || 'Unknown'}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            (order.status?.toLowerCase() || '') === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {order.status || 'Unknown'}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">Total</p>
          <p className="text-xl font-bold text-green-600">
            ${formatPrice(order.totalPrice)}
          </p>
        </div>
        <Link
          href={`/orders/${order._id}`}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Eye className="mr-2 w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}
