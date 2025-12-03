// src/pages/About.jsx
import React from "react";
  import { Heart, Users, Target, Lightbulb } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-orange-50 text-center py-16 px-4">
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
          Weaving Dreams Since 1998
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mt-4">
          From the historic city of Mirzapur, we bring you carpets that are not
          just floor coverings, but masterpieces of art, tradition, and
          craftsmanship passed down through generations.
        </p>
      </section>

      {/* Our Heritage Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 gap-8 bg-white">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Our Heritage
          </h2>
          <p className="text-gray-700 mb-4">
            Our heritage is built upon the remarkable legacy of two master
             artisans whose dedication and artistry have shaped the identity of our
              craft: Khalil Ahmad, recipient of the National Award, the prestigious Shilp Guru Award,
               and later honored with the Padma Shri, and his son Rustam Sohrab, 
               who has also been honored with the National Award.

          </p>
          <p className="text-gray-700 mb-4">
            The journey begins with Khalil Ahmad, a respected and highly skilled master weaver
             from Mirzapur, Uttar Pradesh. His lifelong commitment to preserving
              traditional weaving techniques, nurturing local artisans, 
              and elevating handcrafted carpets to national and international 
              recognition earned him some of the highest honors in Indian handicrafts.
               His contributions continue to inspire artisans across the region and beyond.

          </p>
          <p className="text-gray-700">
            Carrying forward this legacy with pride is his son,
             Rustam Sohrab, who learned the craft under his father’s 
             guidance. His refined artistry, innovation in design,
              and dedication to craftsmanship earned him the National Award,
               marking him as one of the leading artisans of his generation.
                His work continues to bring recognition to Mirzapur’s 
                weaving tradition while supporting and empowering local artisans.

          </p>
          <p className="text-gray-700">
            Together, their achievements
             represent a powerful heritage — a generational commitment to excellence,
             tradition, and the timeless art of handwoven carpets.

          </p>
          <p className="text-gray-700">
            Every carpet we create carries their legacy:
a story of tradition, craftsmanship, and the enduring artistry of Khalil Ahmad and Rustam Sohrab.
          </p>
        </div>
        {/* Image */}
        <div className="flex-1">
          <img
            src="./hero.jpg"
            alt="Carpet"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-gray-50 py-16 px-6 md:px-20 flex justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl flex flex-col md:flex-row gap-6 items-center">
          <img
            src="./ceo.jpg"
            alt="Founder"
            className=" object-cover  scale-125 w-48 h-48 rounded-lg object-cover"
          />
          <div>
            <p className="italic text-gray-700 mb-4">
              "Every thread we weave carries the soul of our artisans and the
              heritage of our ancestors. When you bring a Rosewell carpet into
              your home, you're not just decorating a space - you're preserving
              a tradition and supporting a community."
            </p>
            <h4 className="font-semibold text-gray-900">Ramesh Kumar</h4>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* The Art of Creation */}
      <section className="py-16 px-6 md:px-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          The Art of Creation
        </h2>
        <p className="text-gray-700 mb-12">
          Each carpet undergoes a meticulous process that can take months to
          complete
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              id: 1,
              title: "Design",
              desc: "Traditional patterns are carefully selected and adapted for modern aesthetics",
            },
            {
              id: 2,
              title: "Materials",
              desc: "Premium wool and silk are hand-selected for quality, durability, and texture",
            },
            {
              id: 3,
              title: "Weaving",
              desc: "Master artisans hand-weave each carpet using time-honored techniques",
            },
            {
              id: 4,
              title: "Finishing",
              desc: "Final washing, trimming, and quality inspection ensure perfection",
            },
          ].map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 flex items-center justify-center rounded-full font-bold mb-4">
                {step.id}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}

{/* Our Values */}
<section className="py-16 bg-white text-gray-800">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
      Our Values
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Value 1 */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-start space-x-4 border border-gray-200">
        <div className="bg-orange-500 p-3 rounded-full shadow-md">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Compassion</h3>
          <p className="text-gray-600">
            We believe in treating every individual with kindness,
            understanding, and empathy.
          </p>
        </div>
      </div>

      {/* Value 2 */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-start space-x-4 border border-gray-200">
        <div className="bg-orange-500 p-3 rounded-full shadow-md">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Community</h3>
          <p className="text-gray-600">
            Building a safe and supportive community for healing and growth.
          </p>
        </div>
      </div>

      {/* Value 3 */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-start space-x-4 border border-gray-200">
        <div className="bg-orange-500 p-3 rounded-full shadow-md">
          <Target className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Commitment</h3>
          <p className="text-gray-600">
            Staying dedicated to helping people achieve mental wellness.
          </p>
        </div>
      </div>

      {/* Value 4 */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-start space-x-4 border border-gray-200">
        <div className="bg-orange-500 p-3 rounded-full shadow-md">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
          <p className="text-gray-600">
            Using modern tools and approaches to make therapy accessible to
            everyone.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<div className="bg-white py-12">
  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900">Meet Our Master Artisans</h2>
    <p className="text-gray-600 mt-2">The skilled hands behind every masterpiece</p>
  </div>

  {/* Cards Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
    {/* Card 1 */}
    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
      <img
        src="https://via.placeholder.com/100" // replace with actual image
        alt="Rajesh Sharma"
        className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-900">Khalil Ahmad</h3>
      <p className="text-orange-600 font-medium">Master Artisan</p>
      <p className="text-gray-600 mt-2">60 years of experience</p>
    </div>

    {/* Card 2 */}
    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4-4-4-4m16 8l-4-4 4-4M12 20l-4-4 4-4m0 8l4-4-4-4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Rustam Sohrab</h3>
      <p className="text-orange-600 font-medium">Master Artisan</p>
      <p className="text-gray-600 mt-2">36 years of experience</p>
    </div>

    {/* Card 3 */}
    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
      <img
        src="https://via.placeholder.com/100" // replace with actual image
        alt="Mohammad Ali"
        className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-900">Jalil Ahmad</h3>
      <p className="text-orange-600 font-medium">Master Artisan</p>
      <p className="text-gray-600 mt-2">30 years of experience</p>
    </div>
  </div>
</div>

{/* Orange Section */}
<div className="bg-orange-600 text-center text-white py-16 px-6">
  <h2 className="text-3xl font-bold mb-4">Experience Our Craftsmanship</h2>
  <p className="max-w-2xl mx-auto mb-6">
    Discover the perfect carpet that will transform your space and preserve tradition
  </p>
  <div className="flex justify-center gap-4">
    <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition">
      View Collection
    </button>
    <button className="bg-transparent border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-orange-600 transition">
      Learn More
    </button>
  </div>
</div>




      <Footer />
    </div>
  );
};

export default About;
