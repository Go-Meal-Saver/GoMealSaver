'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        success: false,
        message: 'Anda harus login untuk membuat pesanan',
      };
    }

    // Connect to database
    await connectDB();

    // Validate required fields
    const requiredFields = ['meal', 'name', 'email', 'phone', 'address'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return {
          success: false,
          message: `Field ${field} harus diisi`,
        };
      }
    }

    // Create order data
    const ordersData = {
      user: session.user.id,
      meal: formData.meal, // Changed from mealId to meal
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      orderType: formData.orderType,
      specialInstructions: formData.specialInstructions,
      totalPrice: formData.totalPrice,
      status: 'pending',
    };

    // Save order
    const newOrder = await Orders.create(ordersData);

    // Revalidate data
    revalidatePath('/orders');
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: newOrder,
    };
  } catch (error) {
    console.error('Order creation error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return {
        success: false,
        message: Object.values(error.errors)[0].message,
      };
    }

    return {
      success: false,
      message: 'Gagal membuat pesanan',
    };
  }
}
