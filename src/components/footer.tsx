import { Link } from 'react-router-dom';
import logo from './images/Nilavan-logo New 1.png';
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <div className="h-16 w-40 relative">
                <img src={logo} alt="" />
              </div>
            </div>
            <p className="text-gray-700 max-w-md">
              Nilavan Realtors helps you find the best plots, villas, apartments, and farmhouses in Coimbatore. We offer
              verified properties and a hassle-free buying experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Current Projects
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Address:</h3>
            <address className="not-italic text-gray-700">
              Nilavan Real Estate,
              <br />
              malumichampatti,
              <br />
              Coimbatore,
              <br />
              TN 641001
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 leadtap.ai. All rights reserved.</p>
          <div className="flex items-center mt-2 md:mt-0">
            <span>Site by leadtap.ai</span>
            <span className="ml-1 text-orange-500">🔥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

