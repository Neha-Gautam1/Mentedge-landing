// src/components/ProductSection.jsx
import { Star } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Royal Persian Classic",
    description: "Luxurious handwoven carpet with intricate traditional patterns",
    price: 2999,
    rating: 4.9,
    image:
      "/carpet1.jpg",
  },
  {
    id: 2,
    title: "Mirzapur Heritage",
    description:
      "Traditional design showcasing the artistry of Mirzapur weavers",
    price: 1899,
    rating: 4.9,
    image:
      "/carpet2.jpg",
  },
  {
    id: 3,
    title: "Contemporary Elegance",
    description:
      "Modern design that complements contemporary interiors",
    price: 2499,
    rating: 4.9,
    image:
      "/carpet3.jpg",
  },
];

export default function ProductSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Title + Description (Centered) */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Featured Collection
          </h2>
          <p className="mt-2 text-gray-500">
            Discover our most sought-after carpets, each piece carefully curated for discerning homes
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>

                {/* Price */}
                <p className="text-orange-600 font-semibold text-xl mt-4">
                  ${product.price}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button  onClick={() => setIsModalOpen(true)}
           className="px-6 py-2 border border-orange-500 text-orange-600 rounded-md font-medium flex items-center space-x-2 hover:bg-orange-50 transition">
            <span>View All Products</span>
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
       <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
