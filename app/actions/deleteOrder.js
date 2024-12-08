'use server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/config/database';
import Order from '@/models/Orders';
import { getSessionUser } from '@/utils/getSessionUser';

export default async function deleteOrder(orderId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    throw new Error('You need to sign in to delete an order');
  }

  const { userId } = sessionUser;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  // Check if the user is the owner of the order
  if (order.owner.toString() !== userId) {
    throw new Error('You are not authorized to delete this order');
  }

  await order.deleteOne();
  revalidatePath('/', 'layout');
}
