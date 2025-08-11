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
        className="md:px-8 glass mx-4 mt-4 px-1 md:py-3 py-1 flex md:justify-between items-center !sticky top-2 z-50 border-b-2 border-gray-200 backdrop-blur-md dark:!bg-transparent"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div className="flex w-full items-center justify-between ">
          <div className="md:scale-150 dark:invert h-12 dark:drop-shadow-[0_0_4px_#fff]   flex items-center justify-center">
            <Link href="/">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>

          <div className="flex-1 font-bold text-[#075E54] dark:text-green-500 md:text-3xl md:pl-10">
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
