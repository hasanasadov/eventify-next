import { BookmarkAddOutlined } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ContentLoader from "react-content-loader";

const EventSideBarItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState("hidden");
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <Link
      href={`/events/${item.event.id}`}
      key={item.event.id}
      onMouseEnter={() => {
        setIsHovered("block");
      }}
      onMouseLeave={() => setIsHovered("hidden")}
      className="flex items-center flex-col  p-4 gap-4 w-[90%] bg-white border-2 border-gray-200 rounded-lg relative"
    >
      <Image
        src={
          isValidUrl(item.event.poster_image_link)
            ? item.event.poster_image_link
            : "/default-image.jpg"
        }
        className="rounded-lg w-full h-48 bg-red-500"
        alt={item.event.title}
        width={100}
        height={100}
      />

      <div className="flex items-center ">
        {/* Event Details */}
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="font-semibold text-lg">{item.event.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            {item.event.description}
          </p>
        </div>

        {/* Bookmark Button */}
        <div
          className={`mt-6 absolute z-10  -top-4 right-2 z-10 block ${isHovered}`}
        >
          {isFavorite ? (
            <Bookmark
              style={{
                fontSize: 27,
              }}
              className="cursor-pointer"
              onClick={toggleFavorite}
            />
          ) : (
            <BookmarkAddOutlined
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
    height="250px"
    viewBox="0 0 100% 100%"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
  </ContentLoader>
);

export { EventSideBarItemSkeleton, EventSideBarItem };
