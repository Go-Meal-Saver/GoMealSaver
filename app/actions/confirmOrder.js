'use server';
import { revalidatePath } from 'next/cache';
import Order from '@/models/Orders';

export async function confirmOrder(orderId) {
  try {
    const order = await Order.findById(orderId).populate('meal');

    // Add more detailed status checking
    if (!order) {
      throw new Error('Order not found');
    }

    // List acceptable statuses for confirmation
    const acceptableStatuses = ['pending', 'processing'];

    if (!acceptableStatuses.includes(order.status)) {
      throw new Error(
        `Order cannot be confirmed - current status is ${order.status}`
      );
    }

    // Rest of your existing confirmation logic
    order.meal.stockQuantity -= order.quantity;
    await order.meal.save();

    order.meal.totalOrders += order.quantity;
    await order.meal.save();

    order.status = 'completed';
    order.confirmedAt = new Date();
    await order.save();

    revalidatePath(`/order/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error completing order:', error);
    return {
      success: false,
      error: error.message || 'Failed to complete order',
    };
  }
}
