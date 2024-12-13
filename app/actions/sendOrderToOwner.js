'use server';

import connectDB from '@/config/database';
import Order from '@/models/Orders';

export async function sendOrderToOwner(orderId) {
  await connectDB();

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = 'processing';
    await order.save();

    return { success: true, message: 'Order sent to owner for approval' };
  } catch (error) {
    console.error('Error sending order to owner:', error);
    return { success: false, message: 'Error sending order to owner' };
  }
}
