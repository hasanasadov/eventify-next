import React from "react";
import EventsSection from "./Events/EventsSection";
const SideBarLeft = () => {
  return (
    <div className="bg-white h-[40vh] md:h-[80vh] md:w-1/4 w-full overflow-hidden flex justify-between ">
      <div className=" flex border w-full rounded-r-lg flex-col h-full">
        <div className="flex items-center justify-center p-4 w-full  h-fit ">
          <h1 className="text-2xl font-extrabold text-black">Events</h1>
        </div>

        <EventsSection />
      </div>
    </div>
  );
};

export default SideBarLeft;
