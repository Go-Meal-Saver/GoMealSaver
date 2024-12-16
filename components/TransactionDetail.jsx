'use client';

import { useState } from 'react';
import { cancelOrder } from '@/app/actions/cancelOrder';
import { processOrder } from '@/app/actions/processOrder';

export default function TransactionDetailPage({ transaction, meal }) {
  const [orderStatus, setOrderStatus] = useState(transaction.status);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState('');
  process;
  const handleStatusChange = async () => {
    try {
      setIsProcessing(true);
      setError('');

      if (orderStatus === 'pending') {
        const result = await processOrder(transaction._id);
        if (result.success) {
          setOrderStatus('processing');
        } else {
          setError(result.error || 'Failed to processing order');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error handling status change:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleStatusCancle = async () => {
    try {
      setIsCancelling(true);
      setError('');

      if (orderStatus === 'pending') {
        const result = await cancelOrder(transaction._id);
        if (result.success) {
          setOrderStatus('cancelled');
        } else {
          setError(result.error || 'Failed to cancelled order');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error handling status change:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Transaction Details
          </h1>
          <span>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p>{transaction._id}</p>
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                orderStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : orderStatus === 'processing'
                  ? 'bg-blue-100 text-blue-800'
                  : orderStatus === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : orderStatus === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
            </span>
            {orderStatus === 'pending' && (
              <button
                onClick={handleStatusCancle}
                disabled={isCancelling}
                className={`px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold 
                  ${
                    isCancelling
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } 
                  transition-colors duration-200`}
              >
                {isCancelling ? 'Processing...' : 'Mark as Cancelling'}
              </button>
            )}
            {orderStatus === 'pending' && (
              <button
                onClick={handleStatusChange}
                disabled={isProcessing}
                className={`px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold 
                  ${
                    isProcessing
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } 
                  transition-colors duration-200`}
              >
                {isProcessing ? 'Processing...' : 'Mark as Confirmed'}
              </button>
            )}
          </div>
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
                <p className="font-medium">{transaction.quantity} Quantity</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-semibold text-lg text-green-600">
                  Rp {transaction.totalPrice.toFixed(3)}
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
              <p className="font-medium">{transaction._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Type</p>
              <p className="font-medium">
                {transaction.orderType === 'dine_in'
                  ? 'Dine In'
                  : transaction.orderType === 'takeaway'
                  ? 'Takeaway'
                  : 'Takeaway'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ordering Time</p>
              <p className="font-medium">
                {new Date(transaction.createdAt).toLocaleString('id-ID')}
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
              <p className="font-medium">{transaction.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{transaction.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone No.</p>
              <p className="font-medium">{transaction.phone}</p>
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
              <p className="font-medium">{transaction.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{transaction.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Zip Code</p>
              <p className="font-medium">{transaction.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {transaction.specialInstructions && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Special Instructions
            </h2>
            <p className="text-gray-700">{transaction.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
