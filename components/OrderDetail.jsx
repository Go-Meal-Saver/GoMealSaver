export default function OrderDetailPage({ order, meal }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
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
              ? 'Menunggu'
              : order.status === 'processing'
              ? 'Diproses'
              : order.status === 'completed'
              ? 'Selesai'
              : 'Dibatalkan'}
          </span>
        </div>

        {/* Meal Details Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Detail Makanan
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Nama Makanan</p>
                <p className="font-medium">{meal.name || ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Harga per Porsi</p>
                <p className="font-medium">Rp {meal?.price.toFixed(3)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Jumlah Pesanan</p>
                <p className="font-medium">{order.quantity} porsi</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Harga</p>
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
            Informasi Pesanan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID Pesanan</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipe Pesanan</p>
              <p className="font-medium">
                {order.orderType === 'dine_in'
                  ? 'Makan di Tempat'
                  : order.orderType === 'takeaway'
                  ? 'Bawa Pulang'
                  : 'Pengantaran'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Waktu Pemesanan</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Informasi Pelanggan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-medium">{order.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No. Telepon</p>
              <p className="font-medium">{order.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery Info Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Informasi Pengiriman
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-medium">{order.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kota</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kode Pos</p>
              <p className="font-medium">{order.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Instruksi Khusus
            </h2>
            <p className="text-gray-700">{order.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
