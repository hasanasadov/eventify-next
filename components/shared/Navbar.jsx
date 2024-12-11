"use client";

import React, { useEffect, useState } from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import { CalendarPlus2Icon, User2Icon, MessageCircleIcon } from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Calendar1Icon } from "lucide-react";
import { MuseumOutlined } from "@mui/icons-material";
import { NAVBAR_ITEM } from "@/constants/navbar";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/services/users";

const Navbar = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token") || "";
      setToken(storedToken);
    }
  }, []);
  const [user, setUser] = useState({ first_name: "Account" });
  useEffect(() => {
    getUser();
  }, [token]);

  async function getUser() {
    const data = await getCurrentUser(token);
    if (data.success) {
      setUser(data.user);
    }

    if (!data.success) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="px-8 py-3 w-screen flex md:justify-between items-center sticky top-0 z-50 border-b-2 border-gray-200"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="w-40  md:scale-150 h-12  flex items-center justify-center">
            <Link href="/">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <div className="w-full md:px-10 px-4">
            <InputWithButton />
          </div>
        </div>

        <div className="lg:flex md:flex-row flex-col gap-8 hidden">
          {NAVBAR_ITEM.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(`flex items-center gap-2 font-bold`)}
            >
              <Button variant="ghost" className={cn(``)}>
                {<item.icon />}{" "}
                {item.title === "Account" ? user?.first_name : item.title}
              </Button>
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden  block text-[var(--text-primary)]"
          onClick={handleToggle}
        >
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
          className={`fixed inset-0 transition-opacity duration-300 ${
            open ? "opacity-50 visible" : "opacity-0 invisible"
          }`}
          style={{ backgroundColor: "var(--overlay)" }}
          onClick={handleToggle}
        ></div>

        {/* Hamburger Menu */}
        <div
          className={`fixed right-0 top-0 h-full md:w-1/3 p-8 flex flex-col gap-8 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "var(--accent-secondary)" }}
        >
          <Link href="/events">
            <Button
              className="text-2xl p-8"
              style={{
                color: "var(--bg-light)",
                "--tw-bg-hover": "var(--accent-primary)",
              }}
              variant="ghost"
              onClick={handleToggle}
            >
              <Calendar1Icon style={{ width: "28px", height: "28px" }} /> Events
            </Button>
          </Link>

          <Link href="/venues">
            <Button
              className="text-2xl p-8"
              style={{
                color: "var(--bg-light)",
                "--tw-bg-hover": "var(--accent-primary)",
              }}
              variant="ghost"
              onClick={handleToggle}
            >
              <MuseumOutlined style={{ width: "28px", height: "28px" }} />{" "}
              Venues
            </Button>
          </Link>

          <Link href="/chat">
            <Button
              className="text-2xl p-8"
              style={{
                color: "var(--bg-light)",
                "--tw-bg-hover": "var(--accent-primary)",
              }}
              variant="ghost"
              onClick={handleToggle}
            >
              <MessageCircleIcon style={{ width: "28px", height: "28px" }} />{" "}
              Chat
            </Button>
          </Link>

          <Link href="/pricing">
            <Button
              className="text-2xl p-8"
              style={{
                color: "var(--bg-light)",
                "--tw-bg-hover": "var(--accent-primary)",
              }}
              variant="ghost"
              onClick={handleToggle}
            >
              <CalendarPlus2Icon style={{ width: "28px", height: "28px" }} />{" "}
              Subscriptions
            </Button>
          </Link>

          <Link href="/account">
            <Button
              className="text-2xl p-8"
              style={{
                color: "var(--bg-light)",
                "--tw-bg-hover": "var(--accent-primary)",
              }}
              variant="ghost"
              onClick={handleToggle}
            >
              <User2Icon style={{ width: "28px", height: "28px" }} /> Account
            </Button>
          </Link>

          <Button
            variant="secondary"
            className="text-xl"
            style={{
              "--tw-bg-hover": "var(--accent-primary)",
            }}
            onClick={handleToggle}
          >
            Close Menu
          </Button>
        </div>
      </div>
      {/* <span className="loader"></span> */}
    </>
  );
};

export default Navbar;
