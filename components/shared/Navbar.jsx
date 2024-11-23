"use client";

import React from "react";
import { useState } from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import { CalendarPlus2Icon } from "lucide-react";
import { User2Icon } from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";
import { MessageCircleIcon } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="p-8  w-screen  flex  md:flex-row md:justify-between items-center flex-col sticky top-0 z-50 bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="w-24 h-12 flex items-center justify-center">
          <Image src={Logo} alt="logo" width={100} height={100} />
        </div>
        <div className="w-full px-10 ">
          <InputWithButton />
        </div>
      </div>
      <div className="lg:flex md:flex-row  flex-col gap-8 hidden">
        <div>
          <Button variant={"ghost"}>
            <MessageCircleIcon /> Chat
          </Button>
        </div>
        <div>
          <Button variant={"ghost"}>
            <CalendarPlus2Icon /> Subscriptions
          </Button>
        </div>
        <div>
          <Button variant={"ghost"}>
            <User2Icon /> Account
          </Button>
        </div>
      </div>
      <button className="lg:hidden block" onClick={handleToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 lg:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div
        className={`lg:hidden  ${
          open ? "flex" : "hidden"
        } absolute h-screen justify-between w-1/3 top-0 right-0 flex-col text-3xl font-extrabold bg-gray-500 p-8`}
      >
        <div className="flex flex-col gap-12">
          <div>
            <Button className="text-3xl p-8" variant={"ghost"}>
              <MessageCircleIcon style={{ width: "30px", height: "30px" }} /> Chat
            </Button>
          </div>
          <div>
            <Button className="text-3xl p-8" variant={"ghost"}>
              <CalendarPlus2Icon style={{ width: "30px", height: "30px" }} /> Subscriptions
            </Button>
          </div>
          <div>
            <Button className="text-3xl p-8" variant={"ghost"}>
              <User2Icon style={{ width: "30px", height: "30px" }} /> Account
            </Button>
          </div>
        </div>
        <Button className="lg:hidden block" onClick={handleToggle}>
          Close Menu
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
