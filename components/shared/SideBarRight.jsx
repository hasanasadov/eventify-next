import React from "react";
import VenuesSection from "./VenuesSection";

const SideBarRight = () => {
  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 w-full border-b-2 border-blue-700 bg-gray-50">
          <h1 className="text-2xl font-extrabold text-blue-700">Venues</h1>
        </div>
        <VenuesSection />
      </div>
    </div>
  );
};

export default SideBarRight;
