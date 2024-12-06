import React from "react";
import VenuesSection from "./Venues/VenuesSection";

const SideBarRight = () => {
  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full  rounded-xl border overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 w-full border-b-2  ">
          <h1 className="text-2xl font-extrabold ">Venues</h1>
        </div>
        <VenuesSection />
      </div>
    </div>
  );
};

export default SideBarRight;
