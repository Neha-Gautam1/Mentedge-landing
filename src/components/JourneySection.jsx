// src/components/JourneySection.jsx
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";
export default function JourneySection() {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-16 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800">Our Journey</h2>
        <p className="mt-2 text-gray-600">
          Decades of dedication to preserving traditional carpet-making artistry
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <div>
            <p className="text-3xl font-bold text-orange-600">25+</p>
            <p className="text-gray-600">Years of Excellence</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">5000+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">100+</p>
            <p className="text-gray-600">Master Artisans</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">10000+</p>
            <p className="text-gray-600">Carpets Crafted</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-16 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Ready to Transform Your Space?
        </h3>
        <p className="mt-3 text-lg">
          Browse our complete collection and find the perfect carpet that speaks
          to your style
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <button
          onClick={() => setIsModalOpen(true)}
           className="px-6 py-3 bg-white text-orange-600 font-medium rounded-md shadow hover:bg-gray-100 transition">
            Shop Now
          </button>
          <button className="px-6 py-3 bg-white text-orange-600 font-medium rounded-md shadow hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>
       <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
