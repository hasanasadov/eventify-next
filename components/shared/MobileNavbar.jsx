"use client";

import React, { useEffect, useState } from "react";
import { RenderIf } from "@/utils/RenderIf";
import Hamburger from "hamburger-react";
import { NAVBAR_ITEM } from "@/constants/navbar";
import { AccountPopOver } from "./AccountPopover";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Search } from "@mui/icons-material";
import { useTheme } from "next-themes";

const MobileNavbar = () => {
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("access_token") || "";
  //   setToken(storedToken);
  // }, []);
  const [user, setUser] = useState(null);
  const isAdmin = user?.is_admin === true || user?.first_name === "Hasanali";

  // useEffect(() => {
  //   getUser();
  // }, [token]);

  // async function getUser() {
  //   const data = await getCurrentUser(token);
  //   if (data?.success) {
  //     setUser(data.user);
  //   }

  //   // if (!data?.success) {
  //   //   localStorage.removeItem("access_token");
  //   //   localStorage.removeItem("refresh_token");
  //   // }
  // }
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
            // Use a dynamic color based on theme
          />
        </div>
      </RenderIf>
      <RenderIf condition={isOpen}>
        <HamburgerMenu setIsOpen={setIsOpen} user={user} />
      </RenderIf>
    </div>
  );
};

const HamburgerMenu = ({ user, setIsOpen }) => {
  return (
    <div className="">
      <div className=" h-full !absolute top-0 left-0  !bg-white dark:!bg-black p-2 glass">
        <div className="flex ">
          {NAVBAR_ITEM.map((item, index) =>
            item.title === "Account" ? (
              <AccountPopOver key={index} user={user} />
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
