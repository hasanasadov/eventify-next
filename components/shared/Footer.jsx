"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { IoArrowUpCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Task } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import ToggleTheme from "./Toggle";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    Task;
    toast.success(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="p-5 px-4 md:px-0 mt-4  relative glass md:m-4 !mb-0 border-t border-green-400">
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div> */}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3  md:gap-10 gap-6">
          <div className="flex flex-col items-center md:items-start gap-2 p-2">
            <Link href="/" className="group">
              <div className="w-40 h-12 dark:drop-shadow-[0_0_4px_#fff] dark:invert flex items-center justify-center mb-4">
                <Image src={Logo} alt="logo" width={240} height={120} />
              </div>
            </Link>
            <p className="text-center md:text-left text-sm opacity-80 hover:opacity-100 transition-opacity">
              Providing high-quality services tailored to meet your needs.
            </p>
            <ToggleTheme />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold  border-b border-green-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="group flex items-center transition-all"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-green-400">
                      →
                    </span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="md:text-lg font-semibold mb-4 border-b border-green-400 pb-2">
              Subscribe
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row  items-center md:gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:w-3/4  glass sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition-all"
              />
              <Button
                type="submit"
                variant="glass"
                className="!bg-green-600 w-full md:w-1/4  hover:!bg-green-700 text-white !py-3 !px-6 rounded-lg transition-all mt-3 sm:mt-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
};

const FooterBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      Icon: FaPhoneAlt,
      href: "tel:+994502068605",
      color: "hover:text-green-700",
    },
    {
      Icon: FaEnvelope,
      href: "mailto:info@myeventsaz.com",
      color: "hover:text-red-500",
    },
    // {
    //   Icon: FaTelegramPlane,
    //   href: "https://t.me/myeventsaz",
    //   color: "hover:text-black/40 dark:hover:text-white/60",
    // },
    {
      Icon: FaWhatsapp,
      href: "https://wa.me/+994502068605",
      color: "hover:text-green-700",
    },
    {
      Icon: FaFacebookF,
      href: "https://facebook.com",
      color: "hover:text-blue-500",
    },
    // {
    //   Icon: FaTwitter,
    //   href: "https://twitter.com",
    //   color: "hover:text-sky-400",
    // },
    {
      Icon: FaInstagram,
      href: "https://instagram.com",
      color: "hover:text-pink-500",
    },
    {
      Icon: FaLinkedinIn,
      href: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
  ];
  return (
    <>
      <div className="mt-4 md:mt-12 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm ">
          &copy; {new Date().getFullYear()} Myevents. All rights reserved.
        </p>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {socialLinks.map(({ Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={` ${color} transition-all glass-border p-2`}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="!fixed glass-border lg:bottom-8 bottom-24 !right-8 text-green-400 hover:text-green-600 transition-all p-3 z-50"
        >
          <IoArrowUpCircle size={24} />
        </button>
      )}
    </>
  );
};

export default Footer;
