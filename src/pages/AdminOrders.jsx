import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, Package } from "lucide-react";
import { toast } from "sonner";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error loading orders:", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // ✅ Update delivery status (Admin only)
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await axios.put(
        `https://rosewell.onrender.com/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order status updated!");
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Orders (Admin)
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="ml-3 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 mb-4">
              Orders will appear here once placed.
            </p>
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
                          : order.status === "Failed/Returned"
                            ? "bg-red-100 text-red-700"
                            : order.status === "Cancelled"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-1">
                  <strong>User:</strong> {order.user?.name} ({order.user?.email})
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Address:</strong> {order.address}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Payment ID:</strong> {order.paymentId}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Tracking ID:</strong> {order.trackingId || "Not generated"}
                </p>


                {/* ✅ Update Delivery Status */}
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-gray-700 font-medium">
                    Update Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500"
                    disabled={updating}
                  >
                    {[
                      "Processing",
                      "Picked Up",
                      "Out for Delivery",
                      "Delivered",
                      "Failed/Returned",
                      "Cancelled",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {updating && (
                    <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                  )}
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
