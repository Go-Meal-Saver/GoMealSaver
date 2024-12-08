'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CheckoutForm({ meal, user, onSubmitOrder }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: user._id, // Matching the mongoose Schema user field
    meal: meal._id, // Matching the mongoose Schema meal field
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    orderType: 'dine_in',
    specialInstructions: '',
    totalPrice: meal?.price || 0,
    status: 'pending', // Default status as per schema
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      'name',
      'email',
      'phone',
      'address',
      'city',
      'postalCode',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Harap isi kolom ${missingFields.join(', ')}`);
      return;
    }

    try {
      const orderData = {
        ...formData,
        createdAt: new Date(), // Adding timestamp as per schema
      };

      const result = await onSubmitOrder(orderData);

      if (result.success) {
        toast.success('Pesanan berhasil dibuat!');
        router.push('/orders');
      } else {
        toast.error(result.message || 'Gagal membuat pesanan');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Terjadi kesalahan saat membuat pesanan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Type Selection */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Pilih Jenis Pesanan</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="orderType"
              value="dine_in"
              checked={formData.orderType === 'dine_in'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span>Makan di Tempat</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="orderType"
              value="takeaway"
              checked={formData.orderType === 'takeaway'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span>Bawa Pulang</span>
          </label>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nama Lengkap"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Alamat Email"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Nomor Telepon"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Kota"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Alamat Lengkap"
          className="w-full p-3 border rounded-lg md:col-span-2"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          placeholder="Kode Pos"
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>

      {/* Special Instructions */}
      <textarea
        name="specialInstructions"
        value={formData.specialInstructions}
        onChange={handleInputChange}
        placeholder="Instruksi Khusus (Opsional)"
        className="w-full p-3 border rounded-lg"
        rows={4}
      />

      {/* Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Ringkasan Pesanan</h3>
        <div className="flex justify-between">
          <span>{meal.name}</span>
          <span className="font-bold">
            Rp {meal.price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Buat Pesanan
      </button>
    </form>
  );
}
