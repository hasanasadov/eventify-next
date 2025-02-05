import React from "react";

const PulseSkeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse flex flex-col gap-4 m-6 p-3 min-h-[300px] rounded-lg  border ${className}`}
    >
      <div className="h-40 bg-gray-200"></div>
      <div className="h-4 w-1/2 bg-gray-200"></div>
      <div className="h-4 bg-gray-200"></div>
      <div className="h-4 bg-gray-200"></div>
    </div>
  );
};

export default PulseSkeleton;
