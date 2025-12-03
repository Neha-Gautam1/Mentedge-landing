import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    addresses: [""],
    upiIds: [""],
    photo: null,
    password: "",
  });

  const token = localStorage.getItem("token");
  const fileInputRef = useRef();

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("https://rosewell.onrender.com/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

       const userData = data; // get user from backend
      setUser(userData);
      setForm({
        name: userData.name || "",
        mobile: userData.mobile || "",
        addresses: userData.addresses?.length ? userData.addresses : [""],
        upiIds: userData.upiIds?.length ? userData.upiIds : [""],
        photo: null,
        password: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e, index, type) => {
    const { value, files } = e.target;
    if (type === "photo") setForm({ ...form, photo: files[0] });
    else if (type === "addresses") {
      const updated = [...form.addresses];
      updated[index] = value;
      setForm({ ...form, addresses: updated });
    } else if (type === "upiIds") {
      const updated = [...form.upiIds];
      updated[index] = value;
      setForm({ ...form, upiIds: updated });
    } else {
      setForm({ ...form, [type]: value });
    }
  };

  const addField = (type) => {
    if (type === "addresses") setForm({ ...form, addresses: [...form.addresses, ""] });
    if (type === "upiIds") setForm({ ...form, upiIds: [...form.upiIds, ""] });
  };

  const removeField = (type, index) => {
    if (type === "addresses") setForm({ ...form, addresses: form.addresses.filter((_, i) => i !== index) });
    if (type === "upiIds") setForm({ ...form, upiIds: form.upiIds.filter((_, i) => i !== index) });
  };

  // Submit updated profile
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("mobile", form.mobile);
      formData.append("password", form.password);
      if (form.photo) formData.append("photo", form.photo);
      formData.append("addresses", JSON.stringify(form.addresses));
      formData.append("upiIds", JSON.stringify(form.upiIds));

      const { data } = await axios.put("https://rosewell.onrender.com/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });

      toast.success("Profile updated!");
      setUser(data.user);
      setForm({ ...form, password: "", photo: null });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating profile");
    }
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-gray-800">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6 relative">
            <img
              src={form.photo ? URL.createObjectURL(form.photo) : user.photo ? `https://rosewell.onrender.com/${user.photo}` : "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-orange-500 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              name="photo"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleChange(e, null, "photo")}
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">{user.role} Profile</h2>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange(e, null, "name")}
              placeholder="Name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Email */}
            <input
              type="email"
              value={user.email}
              disabled
              className="border border-gray-300 rounded-md p-2 bg-gray-100"
            />

            {/* Mobile */}
            <input
              type="text"
              value={form.mobile}
              onChange={(e) => handleChange(e, null, "mobile")}
              placeholder="Mobile"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Addresses */}
            <div>
              <label className="font-medium mb-1 block">Addresses</label>
              {form.addresses.map((addr, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={addr}
                    onChange={(e) => handleChange(e, i, "addresses")}
                    placeholder={`Address ${i + 1}`}
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {i > 0 && (
                    <button
                      onClick={() => removeField("addresses", i)}
                      className="text-red-500 font-bold"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addField("addresses")}
                className="text-sm text-orange-500 hover:underline"
              >
                + Add Address
              </button>
            </div>

            {/* UPI IDs */}
            <div>
              <label className="font-medium mb-1 block">UPI IDs</label>
              {form.upiIds.map((upi, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={upi}
                    onChange={(e) => handleChange(e, i, "upiIds")}
                    placeholder={`UPI ID ${i + 1}`}
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {i > 0 && (
                    <button
                      onClick={() => removeField("upiIds", i)}
                      className="text-red-500 font-bold"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addField("upiIds")}
                className="text-sm text-orange-500 hover:underline"
              >
                + Add UPI ID
              </button>
            </div>

            {/* Password */}
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange(e, null, "password")}
              placeholder="New Password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
