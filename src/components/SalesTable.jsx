export default function SalesTable({ data }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-auto border">
      <table className="w-full text-sm md:text-base text-black">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Date</th>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Customer</th>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Product</th>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Qty</th>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Amount</th>
            <th className="px-4 md:px-6 py-3 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-12 text-gray-500">
                No results found
              </td>
            </tr>
          ) : (
            data.map((sale, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 md:px-6 py-3">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="px-4 md:px-6 py-3">
                  <div className="font-medium">{sale.customerName}</div>
                  <div className="text-gray-500 text-xs md:text-sm">
                    {sale.phoneNumber} • {sale.customerRegion}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3">
                  <div>{sale.productName}</div>
                  <div className="text-gray-500 text-xs md:text-sm">
                    {sale.productCategory} • {sale.paymentMethod}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3">{sale.quantity}</td>
                <td className="px-4 md:px-6 py-3">
                  ₹{sale.finalAmount.toFixed(2)}
                </td>
                <td className="px-4 md:px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sale.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : sale.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {sale.orderStatus}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
