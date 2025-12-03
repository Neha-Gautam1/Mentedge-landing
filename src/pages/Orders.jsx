import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Package, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="ml-3 text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              You haven’t placed any orders yet
            </h2>
            <p className="text-gray-600 mb-4">Start shopping to see your orders here.</p>
            <a
              href="/"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-md ${order.status === "Delivered"
  ? "bg-green-100 text-green-700"
  : order.status === "Out for Delivery"
  ? "bg-yellow-100 text-yellow-700"
  : order.status === "Picked Up"
  ? "bg-blue-100 text-blue-700"
  : order.status === "Failed/Returned"
  ? "bg-red-100 text-red-700"
  : order.status === "Cancelled"
  ? "bg-gray-100 text-gray-700"
  : "bg-orange-100 text-orange-700" // Processing

                      }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  Payment ID: <span className="font-medium">{order.paymentId}</span>
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Tracking ID: <span className="font-medium">
                    {order.trackingId || "Not Available"}
                  </span>
                </p>

                <p className="text-gray-600 text-sm mb-2">
                  Total Amount: <span className="font-semibold">₹{order.totalAmount}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                <div className="border-t pt-3 mt-3">
                  <h4 className="font-medium text-gray-800 mb-2">Items:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 border rounded-md p-3 bg-gray-50"
                      >
                        <img
                          src={item.carpet?.image || "/placeholder.jpg"}
                          alt={item.carpet?.name || "Item"}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h5 className="text-gray-800 font-medium">
                            {item.carpet?.name || "Unknown Item"}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            ₹{item.quantity * item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ View Details Button */}
                <div className="mt-4 text-right">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-medium transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
