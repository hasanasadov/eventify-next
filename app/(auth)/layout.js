import Link from "next/link";
import "../globals.css";
import { ArrowBack } from "@mui/icons-material";
import { Toaster } from "sonner";
import React from "react";
import AccountImage from "../../assets/logo.png";
import Image from "next/image";

export const metadata = {
  title: "Eventify",
  description: "Eventify app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="absolute top-6 left-8 font-bold flex items-center hover:cursor-pointer hover:scale-105 hover:translate-x-[-15px] transition-transform duration-300">
          <ArrowBack className="transition-transform duration-300" />
          <Link href="/" className="ml-2">
            {" "}
            Back To Home{" "}
          </Link>
        </div>
        <div className="bg-gray-300 w-screen h-screen flex items-center justify-center p-6">
          <>
            <div className="container relative max-w-[850px] w-full bg-white p-0 border-2  ">
              <div className="right-0 cover absolute top-0  h-full lg:w-1/2 z-10 hidden md:block">
                <div className="absolute top-0 left-0 h-full w-full ">
                  <Image
                    src={AccountImage}
                    alt="image"
                    className="absolute h-full w-full object-cover z-10"
                  />
                  <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10"></div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between ">
                {children}
              </div>
            </div>
          </>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
