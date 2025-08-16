"use client";

import React, { useEffect, useState } from "react";
import { NAVBAR_ITEM } from "@/constants/navbar";
import { RenderIf } from "@/utils/RenderIf";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import Link from "next/link";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [bgColor, setBgColor] = useState("black");

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setBgColor("white");
    } else {
      setBgColor("black");
    }
  }, [resolvedTheme]);

  return (
    <div>
      <RenderIf condition={true}>
        <div className="lg:hidden z-[999999]">
          <Hamburger
            color={bgColor}
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            rounded
            aria-label="Toggle mobile menu"
          />
        </div>
      </RenderIf>
      <RenderIf condition={isOpen}>
        <HamburgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />
      </RenderIf>
    </div>
  );
};

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className="">
      <div
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 w-screen h-screen  transition-all duration-300",
          // pointer-events guards interactions when hidden
          isOpen
            ? "pointer-events-auto backdrop-blur-md bg-black/90 opacity-100"
            : "pointer-events-none backdrop-blur-0 bg-transparent opacity-0"
        )}
      />

      <div className=" h-screen w-screen   !absolute top-0 left-0   p-2">
        <div className="z-[999999]  !absolute top-1 right-1">
          <Hamburger
            color={"white"}
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            rounded
            aria-label="Toggle mobile menu"
          />
        </div>
        <div className="flex h-full items-start justify-center pt-40 ">
          <div className="flex flex-col gap-6">
            {NAVBAR_ITEM.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-bold "
              >
                <Button variant="ghost" className={cn(`text-3xl text-white `)}>
                  {<item.icon />} <span>{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
