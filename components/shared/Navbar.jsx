"use client";

import React, { useEffect, useState } from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { NAVBAR_ITEM } from "@/constants/navbar";
import { cn } from "@/lib/utils";
// import { getCurrentUser } from "@/services/users";
import MobileNavbar from "./MobileNavbar";
import { AccountPopOver } from "./AccountPopover";
import { RenderIf } from "../../utils/RenderIf";
import { paths } from "@/constants/paths";
import { ControlPoint } from "@mui/icons-material";
import ToggleTheme from "./Toggle";

const Navbar = () => {
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("access_token") || "";
  //   setToken(storedToken);
  // }, []);
  const [user, setUser] = useState(null);
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
  const isAdmin = user?.is_admin === true || user?.first_name === "Hasanali";

  return (
    <>
      <div
        className="md:px-8 px-1 md:py-3 py-1 w-screen flex md:justify-between items-center sticky top-0 z-50 border-b-2 border-gray-200 backdrop-blur-md dark:!bg-transparent"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div className="flex w-full items-center justify-between ">
          <div className="w-40  md:scale-150 dark:invert h-12 dark:drop-shadow-[0_0_4px_#fff]   flex items-center justify-center">
            <Link href="/">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <div className="w-full md:pl-4">
            <InputWithButton />
          </div>
          <div className="hidden md:flex justify-center items-center px-4">
            <ToggleTheme />
          </div>
        </div>

        <div className="md:flex md:flex-row flex-col gap-8 hidden">
          {NAVBAR_ITEM.map((item, index) =>
            item.title === "Account" ? (
              <AccountPopOver key={index} user={user} />
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  `flex items-center gap-2 font-bold ${
                    item.title == "Chat" ? " hidden " : ""
                  }`
                )}
              >
                <Button variant="ghost" className={cn(``)}>
                  {<item.icon />} {item.title}
                </Button>
              </Link>
            )
          )}
        </div>

        <MobileNavbar user={user} />
      </div>
    </>
  );
};

export default Navbar;
