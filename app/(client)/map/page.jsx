import MainMap from "@/components/shared/MainMap";
import React from "react";

const MapPage = () => {
  return (
    <div className="lg:h-[93vh] h-[85vh] w-screen -translate-x-6 md:translate-x-0 -translate-y-6 md:scale-100">
      <MainMap />
    </div>
  );
};

export default MapPage;
