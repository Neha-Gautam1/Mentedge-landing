import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedUpi, setSelectedUpi] = useState("");
  const token = localStorage.getItem("token");

  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://rosewell.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data.user || res.data;
        setUser(userData);

        if (userData.addresses?.length) setSelectedAddress(userData.addresses[0]);
        if (userData.upiIds?.length) setSelectedUpi(userData.upiIds[0]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user profile");
      }
    };
    fetchUser();
  }, [token]);

  // Remove Item
  const handleRemove = async (carpetId) => {
    try {
      if (!carpetId) return toast.error("Item no longer exists");

      await axios.delete(`https://rosewell.onrender.com/api/cart/${carpetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item.carpet?._id !== carpetId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  // Move to Wishlist
  const handleMoveToWishlist = async (carpetId) => {
    try {
      await axios.patch(`https://rosewell.onrender.com/api/cart/${carpetId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.carpet?._id !== carpetId));
      toast.success("Moved to wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Error moving item");
    }
  };

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Total Price
  const total = cartItems.reduce(
    (acc, item) => acc + ((item.carpet?.price || 0) * (item.quantity || 1)),
    0
  );

  // Payment Handler
  const handlePayment = async () => {
    if (!selectedAddress || !selectedUpi) {
      toast.error("Please select address and UPI ID");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    try {
      // Create Razorpay order on backend (amount in paise)
      const orderResponse = await axios.post(
        "https://rosewell.onrender.com/api/payment/order",
        { amount: (total + 100) * 100 }, // multiply by 100 for paise
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderResponse.data;

      if (!order || !order.id) {
        toast.error("Failed to create order. Try again later.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "MentEdge Carpets",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Send payment details + cart info + total to backend to validate & save order
            // Inside handler function after successful payment
            const verifyRes = await axios.post(
              "https://rosewell.onrender.com/api/payment/order/validate",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: cartItems.map((item) => ({
                  _id: item.carpet?._id, // must match backend 'carpet' ref
                  quantity: item.quantity,
                  price: item.carpet?.price,
                })),
                totalAmount: total + 100,
                address: selectedAddress,
                upiId: selectedUpi,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );


            if (verifyRes.data.success) {
              toast.success("Payment successful! Order placed.");
              setCartItems([]);
              setCheckout(false);
            } else {
              toast.error(verifyRes.data.message || "Payment verification failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          address: selectedAddress,
          upi: selectedUpi,
        },
        theme: { color: "#F97316" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error("Unable to initiate payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>

          {loading ? (
            <p>Loading your cart...</p>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-4">
                Explore our handcrafted carpets to find your favorite.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium">
                Shop Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.carpet?._id || Math.random()}
                  className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
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
                    <p className="text-gray-500 italic mb-3">This product no longer exists</p>
                  )}

                  <p className="text-gray-500 text-sm mb-3">Quantity: {item.quantity}</p>

                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => handleRemove(item.carpet?._id || null)}
                      className="text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleMoveToWishlist(item.carpet?._id)}
                      className="text-sm px-3 py-2 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-md"
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 h-fit">
            {!checkout ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Shipping</span>
                  <span>₹100</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-gray-900 mb-4">
                  <span>Total</span>
                  <span>₹{total + 100}</span>
                </div>
                <button
                  onClick={() => setCheckout(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium"
                >
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Address & UPI</h3>
                <div className="mb-4 text-gray-800">
                  <label className="block font-medium mb-1">Select Address</label>
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {user?.addresses?.map((addr, i) => (
                      <option key={i} value={addr}>
                        {addr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 text-gray-800">
                  <label className="block font-medium mb-1">Select UPI ID</label>
                  <select
                    value={selectedUpi}
                    onChange={(e) => setSelectedUpi(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {user?.upiIds?.map((upi, i) => (
                      <option key={i} value={upi}>
                        {upi}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium"
                  disabled={!selectedAddress || !selectedUpi}
                >
                  Proceed to Payment
                </button>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
