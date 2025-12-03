import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Show only Paid orders
        const paidOrders = res.data.filter((order) => order.paymentStatus === "Paid");
        setSales(paidOrders);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sales data");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales Overview 💰</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="ml-3 text-gray-600">Loading sales...</p>
          </div>
        ) : sales.length === 0 ? (
          <p className="text-gray-600 text-center">No sales records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{order._id}</td>
                    <td className="py-3 px-4 text-gray-700">{order.user?.name || "Unknown"}</td>
                    <td className="py-3 px-4 text-gray-700">₹{order.totalAmount}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
