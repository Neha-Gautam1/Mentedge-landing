// src/pages/Contact.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-orange-50 text-center py-16 px-4">
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
          Contact Us
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mt-4">
          Have questions, feedback, or want to work with us? We’d love to hear
          from you. Send us a message and we’ll get back to you as soon as
          possible.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Send Us a Message
          </h2>
          <form
            action="https://formspree.io/f/xwprbzgn" // <-- Replace with your Formspree form ID
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Email"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Subject"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Other Ways to Reach Us
          </h3>
          <p className="text-gray-600 mb-2">
            📍 BAGH KUNJAL GIRH MIRZAPUR-231001(U.P) INDIA
          </p>
          <p className="text-gray-600 mb-2">📧 rosewellcarpets@gmail.com</p>
          <p className="text-gray-600">📞 +91 9810890227,+91 8787009870</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
