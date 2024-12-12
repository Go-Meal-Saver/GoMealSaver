'use server';
import { revalidatePath } from 'next/cache';
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

    // Revalidate the order page and redirect
    revalidatePath(`/review/${orderId}`);
    redirect(`/order/${orderId}/review`);
  } catch (error) {
    console.error('Error completing order:', error);
    return {
      success: false,
      error: error.message || 'Failed to complete order',
    };
  }
}
