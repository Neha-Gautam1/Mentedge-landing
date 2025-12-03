import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Grid, List } from "lucide-react";
import axios from "axios";

const CollectionPage = () => {
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState([0, 5000]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://rosewell.onrender.com/api/carpets");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching carpets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter logic (runs when filters change)
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter (case-insensitive)
    if (category !== "All Categories") {
      result = result.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Price filter
    result = result.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    // Sorting
    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [search, category, price, sort, products]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <section className="w-full px-10 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>
        <p className="text-gray-600 mt-2">
          Discover handcrafted carpets from master artisans
        </p>
      </section>

      {/* Filters + Products */}
      <section className="flex-1 w-full px-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Search</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Category */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Category</h2>
            <div className="space-y-2">
              {["All Categories", "Traditional", "Contemporary", "Vintage", "Modern"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${category === cat
                        ? "bg-yellow-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Price Range</h2>
            <input
              type="range"
              min="0"
              max="5000"
              value={price[1]}
              onChange={(e) => setPrice([0, Number(e.target.value)])}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹{price[0]}</span>
              <span>₹{price[1]}</span>
            </div>
          </div>
        </aside>

        {/* Products Area */}
        <main className="lg:col-span-3">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-md ${view === "grid"
                    ? "bg-black text-white"
                    : "border text-gray-600"
                  }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md ${view === "list"
                    ? "bg-black text-white"
                    : "border text-gray-600"
                  }`}
              >
                <List size={18} />
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm text-gray-700"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Loading / No Products / Product Grid */}
          {loading ? (
            <div className="flex justify-center py-20 text-gray-600">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
              <p>No products found matching your criteria</p>
              <button
                onClick={() => {
                  setCategory("All Categories");
                  setPrice([0, 5000]);
                  setSearch("");
                }}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col space-y-6"
              }
            >
              {filteredProducts.map((carpet) => (
                <div
                  key={carpet._id}
                  className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${view === "list" ? "flex" : ""
                    }`}
                >
                  <img
                    src={carpet.image || "/placeholder.jpg"}
                    alt={carpet.name}
                    className={`${view === "list"
                      ? "w-1/3 object-cover"
                      : "w-full h-56 object-cover"
                      }`}
                  />

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {carpet.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 capitalize">
                        {carpet.category}
                      </p>
                    </div>
                    <p className="mt-3 text-orange-600 font-semibold text-lg">
                      ₹{carpet.price}
                    </p>
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

export default CollectionPage;
