"use client";

import SideBarLeft from "@/app/(client)/(home)/_components/SideBarLeft";
import SideBarRight from "@/app/(client)/(home)/_components/SideBarRight";
import MainMap from "@/components/shared/MainMap";
import EventsPage from "../events/page";

export default function HomePage() {
  return (
    <>
      <div className="md:flex hidden justify-between flex-col md:flex-row px-8 py-2 w-full ">
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
