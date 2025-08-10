import React from "react";

const PulseSkeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse glass flex flex-col gap-4 p-5 min-h-[300px] rounded-lg  border ${className}`}
    >
      <div className="h-40 rounded-2xl bg-gray-200"></div>
      <div className="h-4 w-1/2 bg-gray-200"></div>
      <div className="h-4 bg-gray-200"></div>
      <div className="h-4 bg-gray-200"></div>
    </div>
  );
};

export default PulseSkeleton;
