"use client";

import SideBarRight from "@/app/(client)/(home)/_components/SideBarRight";
import SideBarLeft from "@/app/(client)/(home)/_components/SideBarLeft";
import EventsPage from "../events/page";
import MainMap from "@/components/shared/MainMap";

export default function HomePage() {
  return (
    <>
      <div className="md:flex hidden justify-between flex-col md:flex-row px-4 w-full ">
        <SideBarLeft />{" "}
        <div className="flex-grow min-h-[70vh]  glass rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
          <MainMap />
        </div>
        <SideBarRight />{" "}
      </div>
      <div className="md:hidden">
        <EventsPage />
      </div>
    </>
  );
}
