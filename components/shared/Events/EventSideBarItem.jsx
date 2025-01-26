"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import LOGO from "@/assets/logo.png";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const EventSideBarItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState("hidden");
  const [isFavorite, setIsFavorite] = useState(true);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/events/${item.id}`}
      key={item.id}
      onMouseEnter={() => {
        setIsHovered("block");
      }}
      onMouseLeave={() => setIsHovered("hidden")}
      className="flex items-center flex-col  p-4 gap-4 w-[90%] bg-white border-2 border-gray-200 rounded-lg relative"
    >
      <img
        src={item.poster_image_link || LOGO}
        className="rounded-lg w-full h-48 "
        alt={item.title || "event"}
        width={100}
        height={100}
      />

      <div className="flex items-center ">
        {/* Event Details */}
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="font-semibold text-lg">{item.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Bookmark Button */}
        <div className={`mt-6 absolute -top-4 right-2 z-10 block ${isHovered}`}>
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
        </div>
      </div>
    </Link>
  );
};

const EventSideBarItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width="90%"
    height="450px"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </ContentLoader>
);

export { EventSideBarItemSkeleton, EventSideBarItem };
