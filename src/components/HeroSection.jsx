import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Add your carousel images here
  const images = [
    "hero1.jpg",
    "/hero.jpg",
    "/carpet1.jpg",
    "/carpet2.jpg",
    "/carpet3.jpg",
    "/carpet4.jpg",
    "/carpet5.jpg",
    "/carpet6.jpg",
    "/carpet7.jpg",
    "carpet8.jpg",
    "carpet9.jpg",
    "/carpetbg.jpeg",
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-8">
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          ✨ Handcrafted Excellence
        </span>
        <h1 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">
          Exquisite Carpets from <br />
          <span className="text-orange-600">Mirzapur</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Discover the timeless beauty of handwoven carpets, crafted by skilled
          artisans using traditional techniques passed down through generations.
        </p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Explore Collection →
          </button>
          <button
            onClick={() => navigate("/about")}
            className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
