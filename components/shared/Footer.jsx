"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { IoArrowUpCircle } from "react-icons/io5";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-white text-black py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We provide high-quality services and products tailored to meet
              your needs. Join us in building a brighter future.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-green-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-green-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <a
                  href="tel:+1234567890"
                  className="flex items-center hover:text-green-400 transition-colors"
                >
                  <FaPhoneAlt className="mr-2 text-green-400" /> +1 234 567 890
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="mailto:support@example.com"
                  className="flex items-center hover:text-green-400 transition-colors"
                >
                  <FaEnvelope className="mr-2 text-green-400" />{" "}
                  support@example.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-grow p-2 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-green-500"
              />
              <button
                type="submit"
                className="mt-3 sm:mt-0 sm:ml-3 text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-black hover:text-green-400 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-black hover:text-green-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-black hover:text-green-400 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-black hover:text-green-400 transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-green-400 hover:text-green-600 transition-all"
          >
            <IoArrowUpCircle size={40} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
