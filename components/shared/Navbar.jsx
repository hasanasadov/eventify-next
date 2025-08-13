"use client";

import React from "react";
import { AccountPopOver } from "./AccountPopover";
import { NAVBAR_ITEM } from "@/constants/navbar";
import { Button } from "../ui/button";
import MobileNavbar from "./MobileNavbar";
import NavbarText from "@/utils/NavbarText";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div
        className="md:px-8 glassss  px-1 md:py-3 py-1 flex md:justify-between items-center !sticky top-0 z-50 border-bo border-gray-200 backdrop-blur-md !bg-transparen !bg-white/30 dark:!bg-background/30"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div className="flex w-full items-center justify-between ">
          <div className="pl-4 md:pl-0 dark:invert h-12 dark:drop-shadow-[0_0_4px_#fff]   flex items-center justify-center">
            <Link href="/">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>

          <div className="flex-1 font-bold hover:text-[#075E54] dark:hover:text-green-500 md:text-xl md:pl-16 pl-6 cursor-pointer transition-all duration-300 ease-in-out">
            <NavbarText />
          </div>
        </div>

        <div className="md:flex md:flex-row flex-col gap-4 hidden">
          {NAVBAR_ITEM.map((item, index) =>
            item.title === "Account" ? (
              <AccountPopOver key={index} />
            ) : (
              <Link
                key={index}
                href={item.href}
                className="flex items-center !font-bold"
              >
                <Button variant="ghost">
                  {<item.icon />} {item.title}
                </Button>
              </Link>
            )
          )}
        </div>

        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
