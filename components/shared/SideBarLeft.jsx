import { MapIcon } from "lucide-react";
import { Settings2 } from "lucide-react";
import { SaveIcon } from "lucide-react";
import React from "react";

const SideBarLeft = () => {
  return (
    <div className="h-[calc(100vh-200px)] w-1/4   rounded-3xl overflow-hidden gap-2 flex flex-between ">
      <div className="shadow-lg flex flex-col items-center justify-between rounded-lg overflow-hidden  bg-white w-[70px] py-10">
        <div className="flex flex-col gap-3">
          <button className="py-4 rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
            <MapIcon className="h-6 w-6" />
          </button>
          <button className="py-4 rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
            <SaveIcon className="h-6 w-6" />
          </button>
        </div>

        <button className="py-4 rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
          <Settings2 className="h-6 w-6" />
        </button>
      </div>
      <div className=" shadow-lg flex bg-gray-100 w-full rounded-lg overflow-hidden  flex-col items-center">
        <div className="flex items-center justify-center h-16 w-full border-b border-gray-700">
          <h1 className="text-2xl">Events</h1>
          
        </div>
      </div>
    </div>
  );
};

export default SideBarLeft;
