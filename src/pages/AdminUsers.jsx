import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, Users } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/auth/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Users (Except Admin)
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="ml-3 text-gray-600">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No users found
            </h2>
            <p className="text-gray-600 mb-4">No users registered yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg"
              >
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">Role: {user.role}</p>
                {user.mobile && (
                  <p className="text-gray-600 text-sm">📞 {user.mobile}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
