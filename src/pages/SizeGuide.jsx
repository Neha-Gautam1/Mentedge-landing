import React from "react";

// Import your existing Navbar and Footer components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Badge component (simplified, Tailwind only)
function Badge({ children, variant = "secondary", className = "" }) {
  let base = "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0";
  let variantClasses = {
    default: "bg-gray-200 text-gray-800",
    secondary: "bg-amber-100 text-amber-800",
    outline: "border border-gray-400 text-gray-700",
  };
  return (
    <span className={`${base} ${variantClasses[variant] || variantClasses.secondary} ${className}`}>
      {children}
    </span>
  );
}

// Separator component
function Separator({ className = "" }) {
  return <hr className={`border-gray-300 my-4 ${className}`} />;
}

export default function SizeGuide({ onNavigate }) {
  const roomSizes = [
    { room: "Living Room", size: "8' × 10' to 9' × 12'", description: "Place front legs of furniture on carpet" },
    { room: "Dining Room", size: "8' × 10' to 9' × 12'", description: "Should extend 24\" beyond table on all sides" },
    { room: "Bedroom", size: "5' × 8' to 8' × 10'", description: "Place under bed with 18\" extending on each side" },
    { room: "Kitchen", size: "2' × 3' to 4' × 6'", description: "Runner style works best in galley kitchens" },
    { room: "Hallway", size: "2' × 8' to 3' × 12'", description: "Runner should be 6\" narrower than hallway width" },
    { room: "Entryway", size: "3' × 5' to 4' × 6'", description: "Welcome guests with a statement piece" },
  ];

  const standardSizes = [
    { size: "2' × 3'", metric: "60 × 90 cm", type: "Accent", color: "bg-amber-100" },
    { size: "3' × 5'", metric: "90 × 150 cm", type: "Small", color: "bg-orange-100" },
    { size: "4' × 6'", metric: "120 × 180 cm", type: "Medium", color: "bg-amber-200" },
    { size: "5' × 8'", metric: "150 × 240 cm", type: "Large", color: "bg-orange-200" },
    { size: "6' × 9'", metric: "180 × 270 cm", type: "Large", color: "bg-amber-300" },
    { size: "8' × 10'", metric: "240 × 300 cm", type: "Extra Large", color: "bg-orange-300" },
    { size: "9' × 12'", metric: "270 × 360 cm", type: "Extra Large", color: "bg-amber-400" },
    { size: "10' × 14'", metric: "300 × 420 cm", type: "Oversized", color: "bg-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4 text-gray-900 font-bold">Size Guide</h1>
            <p className="text-xl text-gray-600">Find the perfect carpet size for your space</p>
          </div>

          {/* Standard Sizes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-lg font-semibold mb-2">Standard Carpet Sizes</h2>
            <p className="text-gray-600 mb-4">Our most popular sizes with imperial and metric measurements</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {standardSizes.map((item, idx) => (
                <div key={idx} className={`${item.color} p-4 rounded-lg text-center`}>
                  <div className="text-lg font-semibold">{item.size}</div>
                  <div className="text-sm text-gray-600">{item.metric}</div>
                  <Badge className="mt-2">{item.type}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Room-by-Room Guide */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-lg font-semibold mb-2">Room-by-Room Guide</h2>
            <p className="text-gray-600 mb-4">Recommended sizes for different spaces in your home</p>
            <div className="space-y-6">
              {roomSizes.map((room, idx) => (
                <div key={idx}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h4 className="text-lg mb-1 font-semibold">{room.room}</h4>
                      <p className="text-gray-600">{room.description}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Badge variant="outline" className="text-base px-4 py-2">{room.size}</Badge>
                    </div>
                  </div>
                  {idx < roomSizes.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>

          {/* Placement Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">📏 Measuring Tips</h3>
              <div>
                <h4 className="mb-2 font-semibold">1. Measure Your Space</h4>
                <p className="text-gray-700">Measure the area where you want to place the carpet, including furniture arrangement.</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">2. Consider Furniture</h4>
                <p className="text-gray-700">Decide if you want all furniture legs on the carpet or just the front legs.</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">3. Leave Space</h4>
                <p className="text-gray-700">Allow 18-24 inches of bare floor around the carpet perimeter.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">🏠 Placement Rules</h3>
              <div>
                <h4 className="mb-2 font-semibold">Living Room</h4>
                <p className="text-gray-700">All front legs of seating should be on the carpet for a cohesive look.</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Dining Room</h4>
                <p className="text-gray-700">Carpet should extend beyond table so chairs remain on carpet when pulled out.</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Bedroom</h4>
                <p className="text-gray-700">Place carpet so it extends under the bed and out on three sides.</p>
              </div>
            </div>
          </div>

          {/* Custom Sizes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-12 text-center">
            <h2 className="text-lg font-semibold mb-2">Custom Sizes Available</h2>
            <p className="text-gray-700 mb-6">
              Need a specific size? We can create custom carpets to fit your exact requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate && onNavigate("/contact")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
              >
                Request Custom Size
              </button>
              <button 
                onClick={() => onNavigate && onNavigate("/products")}
                className="border border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-all duration-300"
              >
                Browse Standard Sizes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
