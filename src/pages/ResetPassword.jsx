import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://rosewell.onrender.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg("Password reset successful! Redirecting...");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full mt-4 py-2 bg-gray-900 text-white rounded-md"
        >
          Reset Password
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </form>
    </div>
  );
}
