'use server';

import { redirect } from 'next/navigation';
import Order from '@/models/Orders';

export async function confirmOrder(orderId) {
  try {
    if (!orderId || typeof orderId !== 'string') {
      throw new Error('Valid order ID is required');
    }

    const order = await Order.findById(orderId).populate('meal');
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== 'processing') {
      throw new Error('Order cannot be confirmed - invalid status');
    }

    // Update product stock quantity
    order.meal.stockQuantity -= order.quantity;
    await order.meal.save();

    // Update product total orders
    order.meal.totalOrders += order.quantity;
    await order.meal.save();

    // Update order status
    order.status = 'completed';
    order.confirmedAt = new Date();
    await order.save();

    // Redirect should be the last action
    // Remove the try-catch around the redirect
    redirect(`/orders/${orderId}/review`);
  } catch (error) {
    // Log the error but don't return anything
    console.error('Error completing order:', error);
    throw error; // Re-throw the error to be handled by the UI
  }
}
