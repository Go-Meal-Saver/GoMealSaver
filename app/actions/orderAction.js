'use server';

import { revalidatePath } from 'next/cache';
import Order from '@/models/Orders';

export async function confirmOrder(orderId) {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = 'confirmed';
    order.confirmedAt = new Date();
    await order.save();

    // Revalidate the order page
    revalidatePath(`/orders/${orderId}`);

    return { success: true };
  } catch (error) {
    console.error('Error confirming order:', error);
    return { success: false, error: error.message };
  }
}
