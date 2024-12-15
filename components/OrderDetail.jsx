'use client';
import { useState } from 'react';
import { confirmOrder } from '@/app/actions/confirmOrder';
import { useRouter } from 'next/navigation';

export default function OrderDetailPage({ order, meal }) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async () => {
    try {
      setIsConfirming(true);
      setError('');

      if (orderStatus === 'processing') {
        const result = await confirmOrder(order._id);

        if (result.success) {
          setOrderStatus('completed');

          // If a redirect URL is provided, use router to navigate
          if (result.redirectUrl) {
            router.push(result.redirectUrl);
          }
        } else {
          setError(result.error || 'Failed to confirm order');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error handling status change:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              orderStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : orderStatus === 'processing'
                ? 'bg-blue-100 text-blue-800'
                : orderStatus === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
          </span>
          {orderStatus === 'processing' && (
            <button
              onClick={handleStatusChange}
              disabled={isConfirming}
              className={`px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold 
                  ${
                    isConfirming
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } 
                  transition-colors duration-200`}
            >
              {isConfirming ? 'Completing...' : 'Mark as completed'}
            </button>
          )}
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Meal Details Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Meal Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Food Name</p>
                <p className="font-medium">{meal.name || ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Price per Portion</p>
                <p className="font-medium">Rp {meal?.price.toFixed(3)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Order Quantity</p>
                <p className="font-medium">{order.quantity} Quantity</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-semibold text-lg text-green-600">
                  Rp {order.totalPrice.toFixed(3)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Order Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Type</p>
              <p className="font-medium">
                {order.orderType === 'dine_in'
                  ? 'Dine In'
                  : order.orderType === 'takeaway'
                  ? 'Takeaway'
                  : 'Takeaway'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ordering Time</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone No.</p>
              <p className="font-medium">{order.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Shipping Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{order.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Zip Code</p>
              <p className="font-medium">{order.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Special Instructions
            </h2>
            <p className="text-gray-700">{order.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
