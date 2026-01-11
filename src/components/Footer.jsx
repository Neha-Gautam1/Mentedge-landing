import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              MentEdge
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Build real products. Earn real value. MentEdge is a
              product-building internship program by Stibium that focuses on
              real-world impact, not just certificates.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                📧{" "}
                <a
                  href="mailto:info@stibiumtech.com"
                  className="hover:text-blue-400 transition"
                >
                  info@stibiumtech.com
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:9073282066"
                  className="hover:text-blue-400 transition"
                >
                  +91 9073282066
                </a>
              </li>
              <li>
                🌐{" "}
                <a
                  href="https://www.stibiumtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  www.stibiumtech.com
                </a>
              </li>
              <li>
                💼{" "}
                <a
                  href="https://www.linkedin.com/company/stibium-tech-private-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  LinkedIn – Stibium Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              © {new Date().getFullYear()} Stibium Tech Pvt. Ltd. <br />
              All rights reserved. MentEdge is a flagship product by Stibium.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          Don’t just learn. <span className="text-blue-400">Build. Earn.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
