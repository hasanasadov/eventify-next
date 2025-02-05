import React from "react";
import VenuesSection from "./Venues/VenuesSection";

const SideBarRight = () => {
  return (
    <div className="bg-white h-[40vh] md:h-[85vh] md:w-1/4 w-full  overflow-hidden flex justify-between  border rounded-lg flex-col">
      <div className="text-center p-4 w-full  h-fit text-2xl font-extrabold text-black">
        Venues
      </div>
      <VenuesSection />
    </div>
  );
};

export default SideBarRight;
