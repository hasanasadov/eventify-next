import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-black py-10">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold  mb-4">About Us</h3>
            <p className="text-black text-sm">
              We provide high-quality services to help your business grow. Stay
              connected with us for updates and offers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold  mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <p className="hover:text-green-400">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p className="hover:text-green-400">About</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p className="hover:text-green-400">Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:text-green-400">Contact</p>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold  mb-4">
              Subscribe to Our Newsletter
            </h3>
            <form className="flex flex-col sm:flex-row items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-grow p-2 rounded-lg border border-gray-700  focus:outline-none focus:ring focus:ring-green-500"
              />
              <button
                type="submit"
                className="mt-3 sm:mt-0 sm:ml-3 text-white bg-green-600 hover:bg-green-700  py-2 px-4 rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-green-400"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-green-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-green-400"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-green-400"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>

          <p className="text-black text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
