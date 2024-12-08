export default function OrderDetailPage({ order }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
            {order.status}
          </span>
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
              <p className="font-medium capitalize">{order.orderType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-medium">${order.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Customer Information
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{order.user}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Delivery Information
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
              <p className="text-sm text-gray-500">Postal Code</p>
              <p className="font-medium">{order.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Special Instructions
          </h2>
          <p className="text-gray-700">{order.specialInstructions}</p>
        </div>
      </div>
    </div>
  );
}
