'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Orders from '@/models/Orders';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrder(formData) {
  try {
    // Pastikan pengguna sudah login
    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        success: false,
        message: 'Anda harus login untuk membuat pesanan',
      };
    }

    // Sambungkan ke database
    await connectDB();

    // Buat pesanan baru
    const ordersData = {
      user: session.user.id,
      meal: formData.mealId,
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

    // Simpan pesanan
    const newOrder = new Orders(ordersData);
    await newOrder.save();

    // Refresh data
    revalidatePath('/', 'layout');

    // Redirect ke halaman pesanan
    redirect(`/meals/${newOrder._id}`);
  } catch (error) {
    console.error('Kesalahan pembuatan pesanan:', error);
    return {
      success: false,
      message: 'Gagal membuat pesanan',
    };
  }
}
