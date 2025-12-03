import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "traditional",
    stock: 0,
    image: null,

    // NEW FIELDS
    details: "",
    disclaimer: "",
    dimensions: "",
    care: "",
    color: "",
    craftsmen: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://rosewell.onrender.com/api/carpets");
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Create Product
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await axios.post(
        "https://rosewell.onrender.com/api/carpets",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) => [...prev, data]);
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding product");
    }
  };

  // Update Product
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await axios.put(
        `https://rosewell.onrender.com/api/carpets/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? data : p))
      );

      setEditingProduct(null);
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      category: product.category,
      stock: product.stock,
      image: null,

      // NEW FIELDS
      details: product.details || "",
      disclaimer: product.disclaimer || "",
      dimensions: product.dimensions || "",
      care: product.care || "",
      color: product.color || "",
      craftsmen: product.craftsmen ? product.craftsmen.join(", ") : "",
    });
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rosewell.onrender.com/api/carpets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      discount: 0,
      category: "traditional",
      stock: 0,
      image: null,

      details: "",
      disclaimer: "",
      dimensions: "",
      care: "",
      color: "",
      craftsmen: "",
    });
  };

  return (
    <div>
      <Navbar />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Manage Products
            </h2>
            <p className="mt-2 text-gray-500">
              Add, view, update, or delete carpets in your collection
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editingProduct ? "Update Product" : "Add New Product"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded-md" />

              <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded-md">
                <option value="traditional">Traditional</option>
                <option value="vintage">Vintage</option>
                <option value="modern">Modern</option>
                <option value="contemporay">Contemporay</option>
                <option value="persian">Persian</option>
                <option value="doormat">Doormat</option>
              </select>

              <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded-md" />

              <input type="number" name="discount" placeholder="Discount" value={form.discount} onChange={handleChange} className="border p-2 rounded-md" />

              <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 rounded-md" />

              <input type="text" name="color" placeholder="Color" value={form.color} onChange={handleChange} className="border p-2 rounded-md" />

              <input type="text" name="craftsmen" placeholder="Craftsmen (comma-separated)" value={form.craftsmen} onChange={handleChange} className="border p-2 rounded-md" />

              <input type="file" name="image" onChange={handleChange} accept="image/*" className="border p-2 rounded-md" />

              <textarea name="description" placeholder="Short Description" value={form.description} onChange={handleChange} className="border p-2 rounded-md col-span-2" />

              <textarea name="details" placeholder="Product Details" value={form.details} onChange={handleChange} className="border p-2 rounded-md col-span-2" />

              <textarea name="disclaimer" placeholder="Disclaimer" value={form.disclaimer} onChange={handleChange} className="border p-2 rounded-md col-span-2" />

              <textarea name="dimensions" placeholder="Dimensions" value={form.dimensions} onChange={handleChange} className="border p-2 rounded-md col-span-2" />

              <textarea name="care" placeholder="Care Instructions" value={form.care} onChange={handleChange} className="border p-2 rounded-md col-span-2" />
            </div>

            {/* BUTTONS */}
            {editingProduct ? (
              <div className="mt-4 flex space-x-2">
                <button onClick={handleUpdate} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  Save Changes
                </button>
                <button onClick={() => setEditingProduct(null)} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={handleAddProduct} className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                Add Product
              </button>
            )}
          </div>

          {/* PRODUCTS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>

                    <p className="text-orange-600 font-semibold text-xl mt-4">₹{product.price}</p>

                    <p className="text-gray-500 text-sm">Category: {product.category}</p>
                    <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                    <p className="text-gray-500 text-sm">Discount: {product.discount}%</p>

                    {/* NEW FIELDS DISPLAY */}
                    <p className="text-gray-700 text-sm mt-2"><strong>Color:</strong> {product.color}</p>
                    <p className="text-gray-700 text-sm"><strong>Craftsmen:</strong> {product.craftsmen?.join(", ")}</p>
                    <p className="text-gray-700 text-sm"><strong>Dimensions:</strong> {product.dimensions}</p>
                    <p className="text-gray-700 text-sm"><strong>Care:</strong> {product.care}</p>
                    <p className="text-gray-700 text-sm"><strong>Details:</strong> {product.details}</p>
                    <p className="text-gray-700 text-sm"><strong>Disclaimer:</strong> {product.disclaimer}</p>

                    <div className="flex justify-between mt-4">
                      <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>

                      <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ManageProducts;
