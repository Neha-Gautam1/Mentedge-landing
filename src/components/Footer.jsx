// src/components/Footer.jsx
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
   <footer className="bg-gradient-to-br from-[#3b2416] via-[#4a2c18] to-[#1c120d] text-gray-300">
 {/* Matched color from image */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-white">Rosewell Carpets</h3>
          <p className="mt-3">
            Handcrafted carpets from Mirzapur since 1998
          </p>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/rosewellcarpets/?utm_source=qr&igsh=MXJydzVjaDRodm9lNA%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-orange-400 hover:text-orange-500"
          >
            <FaInstagram size={22} className="mr-2" />
            Follow us on Instagram
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/products" className="hover:text-orange-500">Products</a></li>
            <li><a href="/about" className="hover:text-orange-500">About</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white">Customer Service</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/care" className="hover:text-orange-500">Care Instructions</a></li>
            <li><a href="/size" className="hover:text-orange-500">Size Guide</a></li>
            <li><a href="#" className="hover:text-orange-500">Returns</a></li>
            <li><a href="/faqs" className="hover:text-orange-500">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Info</h3>
          <ul className="mt-3 space-y-2">
            <li>+91 98765 43210</li>
            <li>info@rosewellcarpets.com</li>
            <li>Mirzapur, UP 231001</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2024 Rosewell Carpets. All rights reserved.
      </div>
    </footer>
  );
}
