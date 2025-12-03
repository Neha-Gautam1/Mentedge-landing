import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Simple Badge component
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 ${className}`}>
      {children}
    </span>
  );
}

// Simple Accordion component
function Accordion({ children }) {
  return <div className="w-full">{children}</div>;
}

function AccordionItem({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, setOpen })
      )}
    </div>
  );
}

function AccordionTrigger({ children, open, setOpen }) {
  return (
    <button
      className="flex justify-between w-full py-4 text-left font-medium text-sm hover:text-amber-700 transition-all"
      onClick={() => setOpen(!open)}
    >
      {children}
      <span className={`transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
        ▼
      </span>
    </button>
  );
}

function AccordionContent({ children, open }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 text-gray-600 text-sm ${
        open ? "max-h-96 py-2" : "max-h-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function FAQPage({ onNavigate }) {
  const faqCategories = [
    {
      category: "General",
      color: "bg-amber-100",
      faqs: [
        {
          question: "What makes Rosewell Carpets special?",
          answer:
            "Our carpets are handwoven by skilled artisans in Mirzapur using traditional techniques passed down through generations. Each piece is unique, made with natural materials and traditional dyes, ensuring authenticity and quality.",
        },
        {
          question: "How long does it take to make a handmade carpet?",
          answer:
            "Depending on the size and complexity, our carpets take anywhere from 3-12 months to complete. Larger, more intricate designs with higher knot counts require more time and skilled craftsmanship.",
        },
        {
          question: "Are your carpets authentic handmade pieces?",
          answer:
            "Yes, absolutely. All our carpets are 100% handwoven using traditional looms. We work directly with artisan families in Mirzapur who have been weaving carpets for generations.",
        },
      ],
    },
    {
      category: "Materials & Quality",
      color: "bg-orange-100",
      faqs: [
        {
          question: "What materials are used in your carpets?",
          answer:
            "We use premium materials including wool, silk, cotton, and natural fiber blends. Our wool comes from highland sheep and is hand-spun for durability. Silk accents add lustre and detail to our finest pieces.",
        },
        {
          question: "How do I know the quality of a carpet?",
          answer:
            "Quality is determined by knot count (density), material quality, and craftsmanship. Our carpets range from 120-400 knots per square inch. Higher knot count means finer detail and greater durability.",
        },
        {
          question: "Do you use natural dyes?",
          answer:
            "Yes, we primarily use natural dyes derived from plants, minerals, and insects. These create the rich, authentic colors and ensure the carpets age beautifully over time.",
        },
      ],
    },
    {
      category: "Ordering & Shipping",
      color: "bg-amber-200",
      faqs: [
        {
          question: "How long is the shipping time?",
          answer:
            "Standard shipping within India takes 5-7 business days. International shipping takes 10-15 business days. All carpets are carefully packaged and insured during transit.",
        },
        {
          question: "Can I return a carpet if I'm not satisfied?",
          answer:
            "Yes, we offer a 30-day return policy for unused carpets in original condition. Custom-made carpets cannot be returned unless there is a manufacturing defect.",
        },
        {
          question: "Do you offer custom sizes and designs?",
          answer:
            "Absolutely! We can create carpets in custom sizes and adapt traditional designs to your specifications. Custom orders typically take 8-12 weeks and require a 50% deposit.",
        },
      ],
    },
    {
      category: "Care & Maintenance",
      color: "bg-orange-200",
      faqs: [
        {
          question: "How should I clean my handmade carpet?",
          answer:
            "Regular vacuuming with low suction is best. For deep cleaning, we recommend professional carpet cleaning services experienced with handmade pieces. Avoid steam cleaning and harsh chemicals.",
        },
        {
          question: "How long will my carpet last?",
          answer:
            "With proper care, our handmade carpets can last 50-100 years or more. The high-quality materials and traditional construction methods ensure exceptional durability and longevity.",
        },
        {
          question: "What should I do if my carpet gets stained?",
          answer:
            "Act quickly - blot (don't rub) spills immediately with a clean cloth. For stubborn stains, contact a professional cleaner. Never use bleach or harsh chemicals on handmade carpets.",
        },
      ],
    },
    {
      category: "Pricing & Value",
      color: "bg-amber-300",
      faqs: [
        {
          question: "Why are handmade carpets more expensive?",
          answer:
            "Handmade carpets represent months of skilled labor, premium materials, and traditional craftsmanship. They are investment pieces that appreciate in value and last for generations.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes, we offer flexible payment options for purchases over ₹50,000. Contact us to discuss payment plans that work for your budget.",
        },
        {
          question: "Are your prices negotiable?",
          answer:
            "Our prices reflect the true value of authentic handmade craftsmanship. While we don't negotiate on individual pieces, we do offer volume discounts for multiple purchases.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-gray-900 font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about our handmade carpets
          </p>
        </div>

        {/* Quick Contact */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl shadow-lg p-8 text-center mb-12">
          <h3 className="text-xl mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-700 mb-6">
            Our carpet experts are here to help answer any questions about our products and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate && onNavigate("/contact")}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              Contact Us
            </button>
            <button className="border border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-all duration-300">
              Call: +91 98765 43210
            </button>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${category.color} text-gray-800`}>
                  {category.category}
                </Badge>
                <h2 className="text-lg font-semibold">{category.category}</h2>
              </div>
              <Accordion>
                {category.faqs.map((faq, faqIdx) => (
                  <AccordionItem key={faqIdx}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mt-12 text-center">
          <h3 className="text-xl mb-4">Ready to find your perfect carpet?</h3>
          <p className="text-gray-700 mb-6">
            Browse our collection of authentic handmade carpets from Mirzapur
          </p>
          <button
            onClick={() => onNavigate && onNavigate("/products")}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
