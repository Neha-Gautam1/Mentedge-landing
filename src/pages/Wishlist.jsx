import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data.items || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [token]);

  // Remove from wishlist
  const handleRemove = async (carpetId) => {
    try {
      await axios.delete(`https://rosewell.onrender.com/api/wishlist/${carpetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item.carpet?._id !== carpetId));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Error removing item");
    }
  };

  // Move to cart
  const handleMoveToCart = async (carpetId) => {
    try {
      await axios.patch(`https://rosewell.onrender.com/api/wishlist/${carpetId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item.carpet?._id !== carpetId));
      toast.success("Moved to cart");
    } catch (err) {
      console.error(err);
      toast.error("Error moving item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h2>

        {loading ? (
          <p>Loading your wishlist...</p>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-10">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-4">
              Save your favorite carpets for later shopping.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
            <div
  key={item.carpet?._id || Math.random()}
  className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col"
>
  {item.carpet ? (
    <>
      <img
        src={item.carpet.image}
        alt={item.carpet.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-gray-800">{item.carpet.name}</h3>
      <p className="text-gray-600 text-sm">{item.carpet.description}</p>
      <p className="text-orange-600 font-semibold text-lg mt-2">
        ₹{item.carpet.price}
      </p>
    </>
  ) : (
    <p className="text-gray-500 italic mb-3">
      This product no longer exists
    </p>
  )}

  <div className="flex justify-between mt-auto">
    <button
      onClick={() => handleRemove(item.carpet?._id || null)}
      className="text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
    >
      Remove
    </button>
    <button
      onClick={() => handleMoveToCart(item.carpet?._id || null)}
      className="text-sm px-3 py-2 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-md"
    >
      Move to Cart
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
