"use client";
import React, { useState } from "react";
import LoginForm from "./_components/LoginForm";
import SignupForm from "./_components/SignupForm";
import LoginImage from "../../assets/images/maksi.jpg";
import SignupImage from "../../assets/images/luna.jpg";
import Image from "next/image";

const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(isFlipped);
  return (
    <div className="container mx-auto my-20 relative max-w-[850px] w-full bg-white p-10 shadow-lg perspective-[2700px] transition-transform duration-1000 ease-in-out ">
      <div
        className={`
          ${isFlipped ? "left-0" : "right-0"}
        cover absolute top-0  h-full w-1/2 z-10 transition-all ease-in-out duration-1000 transform-origin-left preserve-3d hidden md:block `}
      >
        <div
          className={`absolute top-0 left-0 h-full w-full ${
            isFlipped ? "hidden" : "rotate-y-180"
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
          className={`absolute top-0 left-0 h-full w-full ${
            !isFlipped ? "hidden" : "rotate-y-180"
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
        <LoginForm setIsFlipped={setIsFlipped} />

        <SignupForm setIsFlipped={setIsFlipped} />
      </div>
    </div>
  );
};

export default AuthForm;
