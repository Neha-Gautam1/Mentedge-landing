import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

const UserDashboard = () => {
  const [carpets, setCarpets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCarpets = async () => {
      try {
        const { data } = await axios.get("https://rosewell.onrender.com/api/carpets");
        setCarpets(data);
      } catch (err) {
        console.error("Error fetching carpets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarpets();
  }, []);

  // Add to Wishlist
  const handleAddToWishlist = async (carpetId) => {
    try {
      await axios.post(
        "https://rosewell.onrender.com/api/wishlist",
        { carpetId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  // Add to Cart
  const handleAddToCart = async (carpetId) => {
    try {
      await axios.post(
        "https://rosewell.onrender.com/api/cart",
        { carpetId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <section className="flex-1 w-full flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 space-y-6 hidden lg:block text-gray-800">
          <h2 className="text-lg font-semibold mb-4">User Menu</h2>
          <nav className="space-y-3">
            <Link
              to="/order"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
            >
              My Orders
            </Link>
            <Link
              to="/wishlist"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cart
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carpets.map((carpet) => (
                <div
  key={carpet._id}
  onClick={() => navigate(`/product/${carpet._id}`)}
  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer relative"
>
  <img
    src={carpet.image}
    alt={carpet.name}
    className="w-full h-40 object-cover rounded-md mb-4"
  />

  {/* 🔴 Out of Stock Badge */}
  {carpet.stock === 0 && (
    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
      Out of Stock
    </span>
  )}

  <h3 className="font-semibold text-gray-700 mb-2">{carpet.name}</h3>
  <p className="text-gray-500 text-sm mb-2">{carpet.description}</p>
  <p className="text-gray-900 font-bold mb-2">
    ₹{carpet.price - (carpet.discount || 0)}
    {carpet.discount > 0 && (
      <span className="line-through text-gray-400 ml-2">₹{carpet.price}</span>
    )}
  </p>
  <p className="text-gray-500 text-sm mb-3">Category: {carpet.category}</p>

  {/* Action Buttons */}
  <div className="flex justify-between">
    <button
      onClick={() => handleAddToCart(carpet._id)}
      disabled={carpet.stock === 0} // 🔒 disable if out of stock
      className={`text-sm px-4 py-2 rounded-md ${
        carpet.stock === 0
          ? "bg-gray-400 cursor-not-allowed text-white"
          : "bg-orange-500 hover:bg-orange-600 text-white"
      }`}
    >
      {carpet.stock === 0 ? "Unavailable" : "Add to Cart"}
    </button>

    <button
      onClick={() => handleAddToWishlist(carpet._id)}
      className="border border-orange-500 text-orange-600 hover:bg-orange-50 text-sm px-4 py-2 rounded-md"
    >
      Wishlist
    </button>
  </div>
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

export default UserDashboard;
