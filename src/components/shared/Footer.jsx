
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <img src="/logo-white.svg" alt="Ebrikho logo" className="h-10 mb-4" />
          <p className="text-sm">Shaping tomorrow, today.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Solutions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Insights
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Legal / Governance */}
        <div>
          <h4 className="text-white font-semibold mb-3">Integrity</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Compliance & Ethics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sustainability Report
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h4 className="text-white font-semibold mb-3">Join the Movement</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded bg-gray-800 border border-gray-700 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-5 text-lg">
            <a href="#" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
          <p className="text-xs mt-4 text-gray-500 italic">
            “Innovation is born in boldness.”
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 Ebrikho. All rights reserved. Made with ❤️ wherever bold ideas
        live.
      </div>
    </footer>
  );
}
