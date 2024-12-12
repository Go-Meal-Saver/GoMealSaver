'use server';

import { revalidatePath } from 'next/cache';
import Order from '@/models/Orders';

export async function processOrder(transactionId) {
  try {
    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }

    const transaction = await Order.findById(transactionId);

    if (!transaction) {
      throw new Error('Order not found');
    }

    if (transaction.status !== 'pending') {
      throw new Error('Order cannot be confirmed - invalid status');
    }

    transaction.status = 'processing';
    transaction.confirmedAt = new Date();
    await transaction.save();

    // Revalidate the order page
    revalidatePath(`/transaction/${transactionId}`);

    return { success: true };
  } catch (error) {
    console.error('Error confirming order:', error);
    return {
      success: false,
      error: error.message || 'Failed to confirm order',
    };
  }
}
