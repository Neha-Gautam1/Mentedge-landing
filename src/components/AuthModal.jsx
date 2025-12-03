import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------- LOGIN / SIGNUP ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        activeTab === "login"
          ? "https://rosewell.onrender.com/api/auth/login"
          : "https://rosewell.onrender.com/api/auth/signup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      onClose();

      if (data.user.role === "Admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FORGOT PASSWORD ----------
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");

    try {
      const res = await fetch("https://rosewell.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setForgotMessage("Password reset link sent to your email.");
    } catch (error) {
      setForgotMessage(error.message);
    }
  };

  return (
    <>
      {/* MAIN LOGIN/SIGNUP MODAL */}
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 " />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
              Welcome to Rosewell Carpets
            </Dialog.Title>

            {/* TABS */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`w-1/2 py-2 rounded-md ${
                  activeTab === "login"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`w-1/2 py-2 rounded-md ${
                  activeTab === "signup"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-800">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* FORGOT PASSWORD LINK - only in login */}
              {activeTab === "login" && (
                <p
                  className="text-sm text-red-600 cursor-pointer"
                  onClick={() => setForgotModalOpen(true)}
                >
                  Forgot Password?
                </p>
              )}

              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-800">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-md"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : activeTab === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* FORGOT PASSWORD POPUP */}
      <Dialog
        open={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg">
            <Dialog.Title className="text-lg font-semibold mb-3 text-gray-800">
              Reset Password
            </Dialog.Title>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />

              {forgotMessage && (
                <p className="text-sm text-green-600">{forgotMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-orange-600 text-white rounded-md"
              >
                Send Reset Link
              </button>

              <button
                onClick={() => setForgotModalOpen(false)}
                type="button"
                className="w-full py-2 mt-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
