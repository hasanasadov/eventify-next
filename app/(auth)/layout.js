import Link from "next/link";
import "../globals.css";
import { ArrowBack } from "@mui/icons-material";
import { Toaster } from "sonner";
import React from "react";
import Image from "next/image";
import AccountImage from "@/assets/logo.png";

export const metadata = {
  title: "Eventify",
  description: "Eventify app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="absolute top-6 left-8 hover:cursor-pointer hover:scale-[1.03] transition-transform duration-300">
          <Link href="/" className="ml-2 gap-4 font-bold flex items-center ">
            <ArrowBack className="transition-transform duration-300" />
            <span> Back To Home </span>
          </Link>
        </div>
        <div className="bg-gray-300 w-screen h-screen flex items-center justify-center p-6">
          <div className="container flex relative max-w-[850px] w-full bg-white p-0 border-2  ">
            <div className="right-0 z-10 lg:w-1/2 hidden lg:flex  items-center justify-center border-r ">
              <Image
                src={AccountImage}
                alt="image"
                className=" object-cover z-10"
              />
            </div>

            <div className="lg:w-1/2 w-full border-l">{children}</div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
