import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

const DeliveryHistory = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://rosewell.onrender.com/api/delivery/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDeliveredOrders(data);
      } catch (err) {
        console.error("Error fetching delivery history:", err);
        toast.error("Failed to fetch delivery history");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <section className="flex-1 w-full flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 space-y-6 hidden lg:block text-gray-800">
          <h2 className="text-lg font-semibold mb-4">Delivery Menu</h2>
          <nav className="space-y-3">
            <Link
              to="/delivery/orders"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Assigned Orders
            </Link>
            <Link
              to="/delivery/history"
              className="block w-full px-4 py-2 rounded-md bg-gray-100 font-medium"
            >
              Delivery History
            </Link>
            <Link
              to="/delivery/profile"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
            >
              My Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Completed Deliveries
          </h1>

          {loading ? (
            <p>Loading history...</p>
          ) : deliveredOrders.length === 0 ? (
            <p className="text-gray-600">No deliveries completed yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliveredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1">
                    Customer:{" "}
                    <span className="font-medium">{order.customerName}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Address: <span className="font-medium">{order.address}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Contact: <span className="font-medium">{order.phone}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Total Amount: ₹{order.totalAmount}
                  </p>
                  <p className="text-green-600 font-semibold mt-3">
                    ✅ Delivered on{" "}
                    {new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DeliveryHistory;
