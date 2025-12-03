import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, MapPin, Copy, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`https://rosewell.onrender.com/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        toast.error("Unable to fetch order details");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!order) return null;

  const steps = ["Processing", "Picked Up", "Out for Delivery", "Delivered"];
  const currentIndex = steps.indexOf(order.status);

  const copyTrackingId = () => {
    if (order.trackingId) {
      navigator.clipboard.writeText(order.trackingId);
      toast.success("Tracking ID copied!");
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setLoading(true);
      const res = await axios.put(
        `https://rosewell.onrender.com/api/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(res.data.order);
      toast.success("Order cancelled successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>

          {/* ORDER STATUS TRACKER */}
          <div className="flex items-center justify-between my-6 relative">
            {order.status === "Cancelled" || order.status === "Failed/Returned" ? (
              <div className="w-full text-center text-red-600 font-semibold flex flex-col items-center">
                <XCircle className="w-10 h-10 mb-2" />
                <p>{order.status}</p>
              </div>
            ) : (

              steps.map((step, index) => (
                <div key={step} className="flex-1 text-center relative">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index < currentIndex
                        ? "bg-orange-600 text-white"
                        : index === currentIndex
                          ? "bg-orange-300 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {index < currentIndex ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <p
                    className={`text-sm mt-2 ${index <= currentIndex
                        ? "text-orange-600"
                        : "text-gray-500"
                      }`}
                  >
                    {step}
                  </p>

                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-1/2 w-full h-[2px] transform -translate-x-1/2 ${index < currentIndex
                          ? "bg-orange-600"
                          : "bg-gray-300"
                        }`}
                    ></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Cancel Order Button */}
          {order.status === "Processing" && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={cancelOrder}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            </div>
          )}

          {/* Tracking ID */}
          {order.trackingId && order.status !== "Cancelled" && (
            <div className="mt-6 border-t pt-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Tracking ID
                </h3>
                <p className="text-gray-600 font-medium">
                  {order.trackingId}
                </p>
              </div>

              <button
                onClick={copyTrackingId}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-800 text-sm font-medium"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          )}

          {/* Delivery Address */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Delivery Address
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              {order.address || "No address available"}
            </p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">
              Order Summary
            </h3>

            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center mb-3 border-b pb-2 text-gray-800"
              >
                <span>{item.carpet?.name || "Item"}</span>
                <span>
                  {item.quantity} × ₹{item.price}
                </span>
              </div>
            ))}

            <div className="text-right font-semibold text-gray-800 mt-4">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
