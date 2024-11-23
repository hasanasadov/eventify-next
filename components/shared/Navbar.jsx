import React from "react";
import { InputWithButton } from "../ui/search";
import { Button } from "../ui/button";
import { CalendarPlus2Icon } from "lucide-react";
import { User2Icon } from "lucide-react";
import Logo from "/assets/logo.png";
import Image from "next/image";
import { MessageCircleIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="p-8 w-screen flex  md:flex-row md:justify-between items-center flex-col sticky top-0 z-50 bg-white shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="w-24 h-12 flex items-center justify-center">
          <Image src={Logo} alt="logo" width={100} height={100} />
        </div>
        <div className="w-full px-10 ">
          <InputWithButton />
        </div>
      </div>
      <div className="flex md:flex-row  flex-col gap-8">
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
    </div>
  );
};

export default Navbar;
