import React from "react";

const SideBarRight = () => {
  return (
    <div className="h-[calc(100vh-200px)] w-1/4 bg-gray-100   rounded-3xl overflow-hidden shadow-lg">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-16 w-full border-b border-gray-700">
          <h1 className="text-2xl font-extrabold text-blue-600">Upcoming Events</h1>
        </div>
        
      </div>
    </div>
  );
};

export default SideBarRight;
