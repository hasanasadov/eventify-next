"use client";

import React, { useState } from "react";
import { TimelapseOutlined } from "@mui/icons-material";
import Link from "next/link";
import LOGO from "@/assets/logo.png";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const VenueSideBarItem = ({ venue }) => {
  const [isHovered, setIsHovered] = useState("hidden");

  const [isFavorite, setIsFavorite] = useState(true);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Link
      href={`/venues/${venue.id}`}
      key={venue.id}
      onMouseEnter={() => {
        setIsHovered("block");
      }}
      onMouseLeave={() => setIsHovered("hidden")}
      className="bg-white hover:shadow-xl hover:border-blue-300 duration-200 flex items-center flex-col p-4 gap-4 w-[95%] border-2  transition-all rounded-lg relative "
    >
      <div className="w-full h-48  bg-white flex items-center justify-center overflow-hidden ">
        <img
          src={venue.image_1_link || LOGO}
          alt={venue.name || "venue"}
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
        {/* <div className="absolute  flexx top-2 right-2                          ">
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center ">
            <TimelapseOutlined className="h-5 w-5 text-gray-600" />
          </button>
        </div> */}
        {/* <div className={`mt-6 absolute -top-4 right-2 z-10 block ${isHovered}`}>
          {isFavorite ? (
            <Favorite
              style={{
                fontSize: 27,
                color: "red",
              }}
              className="cursor-pointer"
              onClick={toggleFavorite}
            />
          ) : (
            <FavoriteBorderOutlined
              style={{
                color: "black",
                fontSize: 27,
              }}
              className="cursor-pointer"
              onClick={toggleFavorite}
            />
          )}
        </div> */}
      </div>
    </Link>
  );
};

export { VenueSideBarItem };
