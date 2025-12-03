import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch admin stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main section fills remaining height */}
      <section className="flex-1 flex w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 space-y-6 hidden lg:block text-gray-800">
          <h2 className="text-lg font-semibold text-gray-800">Admin Menu</h2>
          <nav className="space-y-3">
            <Link to="/admin/manage-products" className="block w-full px-4 py-2 rounded-md hover:bg-gray-100">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="block w-full px-4 py-2 rounded-md hover:bg-gray-100">
              Orders
            </Link>
            <Link to="/admin/users" className="block w-full px-4 py-2 rounded-md hover:bg-gray-100">
              Users
            </Link>
            <Link to="/admin/sales" className="block w-full px-4 py-2 rounded-md hover:bg-gray-100">
              Sales
            </Link>
          </nav>
        </aside>

        {/* Dashboard main content */}
        <main className="flex-1 p-10 flex flex-col min-h-[calc(100vh-4rem-4rem)]">
          {/* Adjusted height: subtract Navbar + Footer height (approx 4rem each) */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard ⚙️</h1>

          {loading ? (
            <div className="flex justify-center items-center flex-1">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              <p className="ml-3 text-gray-600">Loading dashboard data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                onClick={() => navigate("/admin/sales")}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-700 mb-2">Total Sales</h3>
                <p className="text-gray-500 text-sm">₹{stats.totalSales.toLocaleString()}</p>
              </div>

              <div
                onClick={() => navigate("/admin/orders")}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-700 mb-2">Orders</h3>
                <p className="text-gray-500 text-sm">{stats.totalOrders} total orders</p>
              </div>

              <div
                onClick={() => navigate("/admin/users")}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-700 mb-2">Users</h3>
                <p className="text-gray-500 text-sm">{stats.totalUsers} registered users</p>
              </div>
            </div>
          )}
        </main>
      </section>

      {/* Footer always stays at bottom */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
