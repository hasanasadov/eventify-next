import MainMap from "@/components/shared/MainMap";
import React from "react";

const MapPage = () => {
  return (
    <div>
      {/* <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54] dark:text-green-500">
        Explore Map
      </h1> */}
      <div className="h-[90vh]">
        <MainMap />
      </div>
    </div>
  );
};

export default MapPage;
