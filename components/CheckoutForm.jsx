'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CheckoutForm({ meal, user, createOrder }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: user._id,
    meal: meal._id,
    owner: meal.owner,
    quantity: 1,
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    orderType: 'dine_in',
    specialInstructions: '',
    totalPrice: meal?.price || 0,
    status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) {
      const totalPrice = meal.price * quantity;
      setFormData((prev) => ({
        ...prev,
        quantity: quantity,
        totalPrice: totalPrice,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(formData);
      toast.success('Order successfully created!');
      router.push('/orders');
    } catch (error) {
      toast.error('Failed to create an order');
      console.error('Order submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Meal Details Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{meal.name}</h3>
              <p className="text-gray-600">
                Rp {meal.price.toFixed(3)} / portion
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                max="99"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                className="w-20 rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal ({formData.quantity} portion):</span>
              <span>Rp {Number(formData.totalPrice).toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Existing form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zip Codes
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Type
          </label>
          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="dine_in">dine_in</option>
            <option value="takeaway">takeaway</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold">
            Total: Rp {formData.totalPrice.toFixed(3)}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Order Confirmation
      </button>
    </form>
  );
}
