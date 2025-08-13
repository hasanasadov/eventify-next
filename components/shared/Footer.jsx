"use client";

import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { toast } from "sonner";
import { Task } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import ToggleTheme from "./Toggle";
import DownloadButtons from "./DownloadButttons";

const Footer = () => {
  return (
    <footer className="p-5 py-8 backdrop-blur-md px-5 md:px- mt-4  relative glassss !bg-white/30 dark:!bg-black/30  border-t dark:border-white/10 border-black/10">
      <Container className="relative z-10">
        <div className="flex justify-between md:flex-row flex-col   md:gap-10 gap-6">
          <div className="flex flex-col justify-between gap-5">
            <div className="scale-150 dark:invert h-12 dark:drop-shadow-[0_0_4px_#fff]   flex items-center justify-center">
              <Link href="/">
                <Image src={Logo} alt="logo" width={100} height={100} />
              </Link>
            </div>

            <DownloadButtons />
          </div>

          <div className="flex gap-20">
            <div>
              <h3 className="md:text-md font-semibold mb-3">Company</h3>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Sell on Tixr
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                About
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Blog
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Discover
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Fan Support
              </div>
            </div>
            <div>
              <h3 className="md:text-md font-semibold mb-3">Legal</h3>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Cookie Policy
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Manage Cookies
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Privacy Policy
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Privacy Choices
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Do Not Sell My Info
              </div>
              <div className="text-[13px] mb-1 cursor-pointer hover:opacity-60 duration-300 transition-all">
                Terms
              </div>
            </div>
          </div>
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
};

const FooterBottom = () => {
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
    // {
    //   Icon: FaFacebookF,
    //   href: "https://facebook.com",
    //   color: "hover:text-blue-500",
    // },
    // {
    //   Icon: FaTwitter,
    //   href: "https://twitter.com",
    //   color: "hover:text-sky-400",
    // },
    // {
    //   Icon: FaInstagram,
    //   href: "https://instagram.com",
    //   color: "hover:text-pink-500",
    // },
    // {
    //   Icon: FaLinkedinIn,
    //   href: "https://linkedin.com",
    //   color: "hover:text-blue-700",
    // },
  ];
  return (
    <>
      <div className="mt-4 md:mt-12 border-t border-gray-300 pt-6 flex md:flex-row justify-between items-center ">
        <div className="flex space-x-2 ">
          {socialLinks.map(({ Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={` ${color} transition-all rounded-full p-2 `}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
        <div>
          <ToggleTheme />
        </div>
      </div>
    </>
  );
};

export default Footer;
