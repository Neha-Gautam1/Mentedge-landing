import React from "react";

const features = [
  {
    title: "Premium Quality",
    desc: "Hand-selected materials and meticulous craftsmanship ensure every carpet meets the highest standards.",
    icon: (
      <svg
        className="w-7 h-7 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ),
  },
  {
    title: "Master Artisans",
    desc: "Our skilled weavers from Mirzapur bring generations of expertise to every piece.",
    icon: (
      <svg
        className="w-7 h-7 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5V4H2v16h5m10 0a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Timeless Designs",
    desc: "Traditional patterns and contemporary styles that complement any space beautifully.",
    icon: (
      <svg
        className="w-7 h-7 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Lifetime Value",
    desc: "Built to last for generations with proper care, our carpets are an investment in beauty.",
    icon: (
      <svg
        className="w-7 h-7 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.97 0 1.372 1.24.588 1.81l-3.369 2.45a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118L12 13.347l-3.501 2.396c-.785.57-1.84-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.513 9.382c-.784-.57-.382-1.81.587-1.81h4.163a1 1 0 00.95-.69l1.286-3.955z"
        />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  return (
    <section className="py-16 bg-white" id="why">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Why Choose Rosewell Carpets
        </h2>
        <p className="mt-2 text-gray-500">
          Every carpet tells a story of heritage, craftsmanship, and uncompromising quality
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
