import React from "react";
import Navbar from "../components/Navbar";

export default function CareInstructionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="pt-24 container mx-auto px-4"> {/* pt-24 adds spacing below fixed navbar */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4 text-gray-900 font-bold">Care Instructions</h1>
            <p className="text-xl text-gray-600">
              Proper care ensures your handmade carpet will last for generations
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Daily Care */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4 text-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">🧹 Daily Care</h2>
              <p className="text-gray-600">Simple steps to maintain your carpet daily</p>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Vacuuming</h4>
                  <p className="text-gray-600">Vacuum regularly using low suction. Avoid beater bars on delicate fibers.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Rotation</h4>
                  <p className="text-gray-600">Rotate your carpet every 3-6 months to ensure even wear.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Sunlight</h4>
                  <p className="text-gray-600">Protect from direct sunlight to prevent fading of natural dyes.</p>
                </div>
              </div>
            </div>

            {/* Stain Removal */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4 text-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">💧 Stain Removal</h2>
              <p className="text-gray-600">Quick action for spills and stains</p>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Immediate Action</h4>
                  <p className="text-gray-600">Blot spills immediately with clean, dry cloth. Never rub or scrub.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Water-Based Stains</h4>
                  <p className="text-gray-600">Use mild soap solution and blot gently from outside of stain inward.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Oil-Based Stains</h4>
                  <p className="text-gray-600">Sprinkle cornstarch, let sit for 15 minutes, then vacuum gently.</p>
                </div>
              </div>
            </div>

            {/* Storage */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4 text-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">🏠 Storage</h2>
              <p className="text-gray-600">Proper storage for seasonal carpets</p>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Clean Before Storage</h4>
                  <p className="text-gray-600">Always clean thoroughly before storing to prevent moth damage.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Roll, Don't Fold</h4>
                  <p className="text-gray-600">Roll around a tube with acid-free paper. Never fold handmade carpets.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Climate Control</h4>
                  <p className="text-gray-600">Store in cool, dry place with consistent temperature and humidity.</p>
                </div>
              </div>
            </div>

            {/* Professional Care */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4 text-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">⚡ Professional Care</h2>
              <p className="text-gray-600">When to seek professional help</p>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Annual Deep Cleaning</h4>
                  <p className="text-gray-600">Professional cleaning every 12-18 months to maintain quality.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Damage Repair</h4>
                  <p className="text-gray-600">Contact specialists for tears, burns, or significant staining.</p>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h4 className="mb-2 font-semibold">Restoration</h4>
                  <p className="text-gray-600">Antique carpets may need specialized restoration services.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What to Avoid */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">⚠️ What to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2 text-red-700 font-semibold">Never Use:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Bleach or harsh chemicals</li>
                  <li>• Steam cleaners</li>
                  <li>• Excessive water</li>
                  <li>• Beater bar vacuums</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-red-700 font-semibold">Avoid:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Direct sunlight exposure</li>
                  <li>• Heavy furniture without pads</li>
                  <li>• High humidity areas</li>
                  <li>• DIY repairs on valuable pieces</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
