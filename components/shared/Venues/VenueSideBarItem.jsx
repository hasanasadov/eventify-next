import React from "react";
import { TimelapseOutlined } from "@mui/icons-material";
import Link from "next/link";
import ContentLoader from "react-content-loader";
const VenueSideBarItem = ({ venue }) => {
  return (
    <Link
      href={`/venues/${venue.id}`}
      key={venue.id}
      className="bg-white flex items-center flex-col p-4 gap-4 w-[95%] border-2  transition-all rounded-lg relative "
    >
      <div className="w-full h-48  bg-white flex items-center justify-center overflow-hidden shadow">
        <img
          src={venue.image_1_link || "/default-image.jpg"}
          alt={venue.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 items-start justify-center">
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="font-bold text-lg">{venue.name}</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            {venue.description}
          </p>
        </div>
        <div className="absolute  flexx top-2 right-2                         hidden ">
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow">
            <TimelapseOutlined className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const VenueSideBarItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width="90%"
    height="250px"
    viewBox="0 0 100% 100%"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </ContentLoader>
);

export { VenueSideBarItem, VenueSideBarItemSkeleton };
