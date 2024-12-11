export default function OrderDetailPage({ order, meal }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : order.status === 'processing'
                ? 'bg-blue-100 text-blue-800'
                : order.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {order.status === 'pending'
              ? 'Pending'
              : order.status === 'processing'
              ? 'Processed'
              : order.status === 'completed'
              ? 'Completed'
              : 'Canceled'}
          </span>
        </div>

        {/* Meal Details Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Meal Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Food Name</p>
                <p className="font-medium">{meal.name || ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Price per Portion</p>
                <p className="font-medium">Rp {meal?.price.toFixed(3)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Order Quantity</p>
                <p className="font-medium">{order.quantity} Quantity</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-semibold text-lg text-green-600">
                  Rp {order.totalPrice.toFixed(3)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Order Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Type</p>
              <p className="font-medium">
                {order.orderType === 'dine_in'
                  ? 'dine_in'
                  : order.orderType === 'takeaway'
                  ? 'takeaway'
                  : 'takeaway'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ordering Time</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone No.</p>
              <p className="font-medium">{order.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Shipping Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{order.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Zip Code</p>
              <p className="font-medium">{order.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Special Instructions
            </h2>
            <p className="text-gray-700">{order.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
