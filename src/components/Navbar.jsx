import { useState, useEffect } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await axios.get("https://rosewell.onrender.com/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user || data); // handle both backend shapes
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm text-gray-800">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/49013bb38fbf8fe2b6287e3555d49827ab343fa2.png"
            alt="Rosewell Logo"
            className="h-16 w-16"
          />
          <span className="font-semibold text-lg">ROSE WELL CARPETS</span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><a href="/" className="hover:text-orange-500">Home</a></li>
          <li><a href="/products" className="hover:text-orange-500">Products</a></li>
          <li><a href="/about" className="hover:text-orange-500">About</a></li>
          <li><a href="/care" className="hover:text-orange-500">Care</a></li>
          <li><a href="/size" className="hover:text-orange-500">Size Guide</a></li>
          <li><a href="/faqs" className="hover:text-orange-500">FAQS</a></li>
          <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search carpets..."
            className="hidden md:block border rounded-lg px-4 py-2 text-sm w-64"
          />

          {/* Wishlist */}
          <Heart
            onClick={() => navigate("/wishlist")}
            className="w-5 h-5 cursor-pointer hover:text-orange-500"
          />

          {/* Cart */}
          <ShoppingCart
            onClick={() => navigate("/cart")}
            className="w-5 h-5 cursor-pointer hover:text-orange-500"
          />

          {/* User Profile */}
          {user?.photo ? (
            <img
              src={`https://rosewell.onrender.com/${user.photo}`}
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full cursor-pointer object-cover border-2 border-gray-300"
            />
          ) : (
            user && (
              <User
                onClick={() => navigate("/profile")}
                className="w-5 h-5 cursor-pointer hover:text-orange-500"
              />
            )
          )}

          {/* Sign In / Logout */}
          {!user ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium hover:text-orange-500"
            >
              Sign In
            </button>
          ) : (
            <LogOut
              onClick={handleLogout}
              className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600"
              title="Logout"
            />
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
