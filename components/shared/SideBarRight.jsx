import React from "react";
import VenuesSection from "./Venues/VenuesSection";

const SideBarRight = () => {
  return (
    <div className="bg-white dark:bg-white/10 h-[40vh] md:h-[85vh] md:w-1/4 w-full  overflow-hidden flex justify-between  border rounded-lg flex-col">
      <div className="text-center p-4 w-full  h-fit text-2xl font-extrabold ">
        Venues
      </div>
      <VenuesSection />
    </div>
  );
};

export default SideBarRight;
