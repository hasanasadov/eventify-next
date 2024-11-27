"use client";

import React, { useState } from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import { CalendarPlus2Icon, User2Icon, MessageCircleIcon } from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Calendar1Icon } from "lucide-react";
import { SubscriptionsOutlined } from "@mui/icons-material";
import { MuseumOutlined } from "@mui/icons-material";
import { FavoriteSharp } from "@mui/icons-material";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      className="px-8 py-3 w-screen flex md:justify-between items-center sticky top-0 z-50 shadow-lg"
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
        <Link href="/events">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <Calendar1Icon /> Events
          </Button>
        </Link>

        <Link href="/venues">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <MuseumOutlined /> Venues
          </Button>
        </Link>

        <Link href="/chat">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <MessageCircleIcon /> Chat
          </Button>
        </Link>

        <Link href="/favorites">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <FavoriteBorderOutlined /> Favorites
          </Button>
        </Link>

        <Link href="/pricing">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <SubscriptionsOutlined /> Subscriptions
          </Button>
        </Link>

        <Link href="/account">
          <Button
            variant="ghost"
            style={{
              color: "var(--text-primary)",
              "--tw-bg-hover": "var(--accent-primary)",
            }}
          >
            <User2Icon /> Account
          </Button>
        </Link>
      </div>

      <button
        className="lg:hidden block text-[var(--text-primary)]"
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
            <MuseumOutlined style={{ width: "28px", height: "28px" }} /> Venues
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
            <MessageCircleIcon style={{ width: "28px", height: "28px" }} /> Chat
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
  );
};

export default Navbar;
