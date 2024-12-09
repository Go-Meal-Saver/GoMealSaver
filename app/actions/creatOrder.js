'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData) {
  try {
    // Check authentication
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('You need to be logged in to add a meals');
    }
    const { userId } = sessionUser;

    // Connect to database
    await connectDB();

    // Validate required fields
    const requiredFields = [
      'meal',
      'name',
      'email',
      'phone',
      'address',
      'owner',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return {
          success: false,
          message: `Field ${field} harus diisi`,
        };
      }
    }

    // Validate quantity
    if (formData.quantity < 1) {
      return {
        success: false,
        message: 'Jumlah harus lebih dari 1',
      };
    }

    // Create order data
    const ordersData = {
      user: userId,
      owner: formData.owner,
      meal: formData.meal,
      quantity: formData.quantity,
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

    // Convert newOrder to plain object and ensure all properties are simple values
    const plainOrder = JSON.parse(JSON.stringify(newOrder));

    // Revalidate data
    revalidatePath('/orders');
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: plainOrder,
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
