'use server';
import { revalidatePath } from 'next/cache';
import Order from '@/models/Orders';

export async function cancelOrder(transactionId) {
  try {
    // Validate input
    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }

    // Find and populate the order
    const transaction = await Order.findById(transactionId).populate('meal');

    // Check order existence
    if (!transaction) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Check order status
    if (transaction.status !== 'pending') {
      return {
        success: false,
        error: 'Order cannot be cancelled - invalid status',
      };
    }

    // Update order
    transaction.status = 'cancelled';
    transaction.canceledAt = new Date();
    await transaction.save();

    // Revalidate the path
    revalidatePath(`/orders/${transactionId}`);

    return {
      success: true,
      redirectUrl: `/orders/${transactionId}`,
    };
  } catch (error) {
    console.error('Error canceling order:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}
