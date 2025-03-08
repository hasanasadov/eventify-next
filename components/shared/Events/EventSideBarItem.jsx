"use client";

import { LOGO } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
// import { FavoriteBorderOutlined } from "@mui/icons-material";
// import { Favorite } from "@mui/icons-material";

const EventSideBarItem = ({ item }) => {
  // const [isHovered, setIsHovered] = useState("hidden");
  // const [isFavorite, setIsFavorite] = useState(true);

  // const toggleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  // };

  return (
    <Link
      href={`/events/${item.id}`}
      key={item.id}
      // onMouseEnter={() => {
      //   setIsHovered("block");
      // }}
      // onMouseLeave={() => setIsHovered("hidden")}
      className="flex hover:shadow-xl hover:border-green-300 duration-200 items-center flex-col  p-4 gap-4 w-[90%] bg-white border-2 border-gray-200 rounded-lg relative "
    >
      <div className="w-full !h-48  bg-white flex items-center justify-center overflow-hidden ">
        <img
          className="!w-full !h-full object-cover rounded-lg"
          src={item.poster_image_link || LOGO}
          alt={item.title || "event"}
        />
      </div>

      <div className="flex items-center ">
        {/* Event Details */}
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="font-semibold text-lg line-clamp-1">{item.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Bookmark Button */}
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

export { EventSideBarItem };
