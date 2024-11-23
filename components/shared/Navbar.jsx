"use client";

import React, { useState } from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import { CalendarPlus2Icon, User2Icon, MessageCircleIcon } from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="p-8 w-screen flex md:justify-between items-center  sticky top-0 z-50 bg-white shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="w-24 h-12 flex items-center justify-center">
          <Link href="/">
            <Image src={Logo} alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className="w-full px-10">
          <InputWithButton />
        </div>
      </div>

      <div className="lg:flex md:flex-row flex-col gap-8 hidden">
        <Link href="/chat">
          <Button variant={"ghost"}>
            <MessageCircleIcon /> Chat
          </Button>
        </Link>

        <Link href="/pricing">
          <Button variant={"ghost"}>
            <CalendarPlus2Icon /> Subscriptions
          </Button>
        </Link>
        <Link href="/account">
          <Button variant={"ghost"}>
            <User2Icon /> Account
          </Button>
        </Link>
      </div>

      <button className="lg:hidden block" onClick={handleToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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

      {/* Black Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggle}
      ></div>

      {/* Hamburger Menu */}
      <div
        className={`fixed right-0 top-0 h-full md:w-1/3  bg-green-500 p-8 flex flex-col gap-8 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/chat">
          <Button className="text-3xl p-8" variant={"ghost"}>
            <MessageCircleIcon style={{ width: "30px", height: "30px" }} /> Chat
          </Button>
        </Link>
        <Link href="/pricing">
          <Button className="text-3xl p-8" variant={"ghost"}>
            <CalendarPlus2Icon style={{ width: "30px", height: "30px" }} />{" "}
            Subscriptions
          </Button>
        </Link>
        <Link href="/account">
          <Button className="text-3xl p-8" variant={"ghost"}>
            <User2Icon style={{ width: "30px", height: "30px" }} /> Account
          </Button>
        </Link>

        <Button
          variant={"secondary"}
          className="text-xl"
          onClick={handleToggle}
        >
          Close Menu
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
