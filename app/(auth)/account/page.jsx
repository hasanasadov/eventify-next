"use client";
import React, { useState } from "react";
import LoginForm from "./_components/LoginForm";
import SignupForm from "./_components/SignupForm";
import LoginImage from "../../../assets/images/maksi.jpg";
import SignupImage from "../../../assets/images/luna.jpg";
import Image from "next/image";

const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <>
      <div className="container relative max-w-[850px] w-full bg-white p-0 shadow-lg  ">
        <div
          className={`
          ${isFlipped ? "left-0" : "right-0"}
        cover absolute top-0  h-full w-1/2 z-10 hidden md:block `}
        >
          <div
            className={`absolute top-0 left-0 h-full w-full ${
              isFlipped ? "hidden" : ""
            } `}
          >
            <Image
              src={LoginImage}
              alt="image"
              className="absolute h-full w-full object-cover z-10"
            />
            <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10"></div>
          </div>

          <div
            className={`absolute top-0 right-0 h-full w-full ${
              !isFlipped ? "hidden" : ""
            } `}
          >
            <Image
              src={SignupImage}
              alt="image"
              className="absolute h-full w-full object-cover z-10"
            />
            <div className=" absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <LoginForm isFlipped={isFlipped} setIsFlipped={setIsFlipped} />

          <SignupForm isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        </div>
      </div>
    </>
  );
};

export default AuthForm;
