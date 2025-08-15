"use client";

import React, { useEffect, useState } from "react";
import { AccountPopOver } from "./AccountPopover";
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
        <div className="md:hidden z-[999999]">
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
        <HamburgerMenu setIsOpen={setIsOpen} />
      </RenderIf>
    </div>
  );
};

const HamburgerMenu = ({ setIsOpen }) => {
  return (
    <div className="">
      <div className=" h-full !absolute top-0 left-0  !bg-white dark:!bg-black p-2 glass">
        <div className="flex ">
          {NAVBAR_ITEM.map((item, index) =>
            item.title === "Account" ? (
              <AccountPopOver key={index} />
            ) : (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-bold"
              >
                <Button variant="ghost" className={cn(``)}>
                  {<item.icon />}
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
