import React, { useState } from "react";
import Footer from "../components/Footer";
const AvailableInternships = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* ================= HERO / LANDING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Build Real Products with{" "}
            <span className="text-blue-400">MentEdge</span>
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            MentEdge is not only a learning program — it’s a{" "}
            <span className="text-gray-100 font-medium">
              product-building internship
            </span> where you not only build projects but products that go live.
            You work on real-world products, publish them in the market, and
            earn from their success.
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Real, market-ready products</li>
            <li>✔ 1:1 mentorship from experienced professionals</li>
            <li>✔ Revenue sharing from live products</li>
            <li>✔ Verified internship certificate with unique ID</li>
          </ul>

         <div className="flex gap-4">
  <button
    onClick={() =>
      document.getElementById("internships")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="bg-blue-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
  >
    Explore Internships
  </button>

  <button
    onClick={() =>
      document.getElementById("mentedge-details")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="border border-gray-600 px-6 py-3 rounded-lg hover:border-blue-400 transition"
  >
    Learn More
  </button>
</div>

        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6">
            <img
              src="https://illustrations.popsy.co/gray/product-launch.svg"
              alt="MentEdge Illustration"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>
      {/* ================= INTERNSHIP CARD ================= */}
     <section
  id="internships"
  className="max-w-7xl mx-auto px-6 pb-24"
>

        <h2 className="text-3xl font-bold mb-8 text-blue-400">
          Product Development
        </h2>

        <div className="max-w-md">
          <div className="bg-[#020617] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition">
            <h3 className="text-xl font-semibold mb-1">
              House Price Prediction Web App
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Product Development ID: PDME002
            </p>

            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <b>Start Date:</b> 15 Jan 2026
              </p>
              <p>
                <b>Duration:</b> 3 Months
              </p>
              <p>
                <b>Mentor:</b> Ritik Jaiswal
              </p>
              <p>
                <b>Slots:</b> 7
              </p>
              <p>
                <b>Status:</b>{" "}
                <span className="text-green-400 font-semibold">Open</span>
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-black transition"
              >
                View Details
              </button>

              <a
                href="https://forms.gle/QoUyb9Ns3BemYUTm9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full bg-blue-500 px-4 py-2 rounded-lg text-black font-medium hover:bg-blue-600 transition">
                  Join
                </button>
              </a>
            </div>

          </div>
        </div>
      </section>

     {/* ================= VIEW DETAILS MODAL ================= */}
{showDetails && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div className="bg-[#020617] max-w-lg w-full max-h-[85vh] 
    overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent 
    rounded-xl p-6 border border-gray-800 relative">


      <button
        onClick={() => setShowDetails(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h3 className="text-2xl font-bold mb-4 text-blue-400">
        House Price Prediction Platform
      </h3>

      <p className="text-gray-300 text-sm mb-4">
        This project is a data-driven real estate intelligence platform designed
        to help buyers, investors, brokers, and businesses make smarter and more
        profitable property decisions using machine learning.
      </p>

      <h4 className="font-semibold mb-2 text-white">What You’ll Build</h4>
      <ul className="list-disc list-inside text-gray-300 text-sm mb-4 space-y-1">
        <li>ML-powered web app for accurate house price prediction</li>
        <li>End-to-end system using real market and property data</li>
        <li>Scalable product with real business use cases</li>
      </ul>

      <h4 className="font-semibold mb-2 text-white">Business Use Cases</h4>
      <ul className="list-disc list-inside text-gray-300 text-sm mb-4 space-y-1">
        <li>Real estate agencies for competitive pricing</li>
        <li>Investors to analyze ROI and reduce risk</li>
        <li>Builders & developers to forecast selling prices</li>
        <li>Banks & lenders for loan risk assessment</li>
        <li>Property platforms as a premium feature</li>
      </ul>

      <h4 className="font-semibold mb-2 text-white">Tech Stack You’ll Learn</h4>
      <p className="text-gray-300 text-sm mb-2">
        <span className="font-medium text-blue-300">ML & Data:</span> Python,
        Pandas, NumPy, Scikit-learn, XGBoost, Feature Engineering
      </p>
      <p className="text-gray-300 text-sm mb-2">
        <span className="font-medium text-blue-300">Backend:</span> Node.js,
        Express.js, REST APIs, JWT Authentication
      </p>
      <p className="text-gray-300 text-sm">
        <span className="font-medium text-blue-300">Frontend:</span> React,
        Tailwind CSS, Vite, Charts & Data Visualization
      </p>

      <h4 className="font-semibold mt-4 mb-2 text-white">Vision</h4>
      <p className="text-gray-300 text-sm">
        The long-term goal is to evolve this platform into a trusted real estate
        pricing engine by expanding across cities, improving prediction accuracy,
        and delivering deep market insights.
      </p>
    </div>
  </div>
)}


      {/* ================= MENTEDGE DETAILS ================= */}
     <section
  id="mentedge-details"
  className="max-w-7xl mx-auto px-6 pb-20"
>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              What Makes MentEdge Different?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike traditional internships, MentEdge focuses on real product
              development. Your work is published, sold, and monetized — not
              just reviewed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              How It Works
            </h3>
            <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
              <li>Join the product team</li>
              <li>Idea & market discussion</li>
              <li>Development & deployment</li>
              <li>Sales & revenue generation</li>
            </ol>
          </div>

          {/* Card 3 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Who Should Join?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              College students, aspiring developers, startup founders, and
              anyone who wants real-world experience with income potential.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Products Under MentEdge
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Participants work on real-world product development including SaaS web
              applications, EdTech & productivity platforms, AI-powered tools,
              community-based platforms, Android & iOS apps, startup MVPs, and
              client-backed commercial products.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Technology Stack & Skills
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Gain hands-on experience with HTML, CSS, JavaScript, React, Node.js or
              Python, APIs, databases, Git & GitHub, system design, real deployment,
              payment integration, and startup-style agile workflows.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              How Mentorship Works
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              MentEdge follows a hands-on mentorship model with dedicated product
              mentors, weekly live guidance and reviews, code & product feedback
              sessions, startup-style collaboration, and real accountability with
              deadlines.
            </p>
          </div>

          {/* Card 7 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Career & Long-Term Benefits
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Build a startup-grade portfolio, gain experience recruiters value,
              understand real product thinking and business models, get public
              recognition for your contributions, and open doors to startup roles and
              freelancing.
            </p>
          </div>

          {/* Card 8 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Certification & Verification
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Receive a verified internship certificate with a unique ID and online
              verification. The certificate is linked to real product contributions and
              is suitable for resumes, LinkedIn profiles, and interviews.
            </p>
          </div>

          {/* Card 9 */}
          <div className="bg-[#020617] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">
              Why Just ₹1,999?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The fee ensures serious and committed participants, quality mentorship,
              real product infrastructure and hosting, sales & marketing execution,
              and long-term sustainability of real market-ready products.
            </p>
          </div>

        </div>
      </section>



      <Footer />
    </div>
  );
};

export default AvailableInternships;
