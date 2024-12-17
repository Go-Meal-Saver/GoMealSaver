'use server';

import { revalidatePath } from 'next/cache';
import Order from '@/models/Orders';

export async function confirmOrder(orderId) {
  try {
    // Validate input
    if (!orderId || typeof orderId !== 'string') {
      return {
        success: false,
        error: 'Valid order ID is required',
      };
    }

    // Find and populate the order
    const order = await Order.findById(orderId).populate('meal');

    // Check order existence
    if (!order) {
      return {
        success: false,
        error: 'Order not found',
      };
    }

    // Check order status
    if (order.status !== 'processing') {
      return {
        success: false,
        error: 'Order cannot be confirmed - invalid status',
      };
    }

    // Update stock and total orders
    order.meal.stockQuantity -= order.quantity;
    order.meal.totalOrders += order.quantity;
    await order.meal.save();

    // Update order
    order.status = 'completed';
    order.confirmedAt = new Date();
    await order.save();

    // Revalidate the path
    revalidatePath(`/orders/${orderId}`);

    return {
      success: true,
      redirectUrl: `/orders/${orderId}/review`,
    };
  } catch (error) {
    console.error('Error completing order:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}
