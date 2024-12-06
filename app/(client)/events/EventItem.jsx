import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventItem = ({ item }) => {
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
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <Image
          src={
            isValidUrl(item.event.poster_image_link)
              ? item.event.poster_image_link
              : "/default-image.jpg"
          }
          alt={item.event.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute z-[9999] top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:block hidden transition-colors duration-300">
          <FavoriteBorder className="text-gray-700 z-10 " />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
          {item.event.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {item.event.description}
        </p>
      </div>
    </Link>
  );
};

export default EventItem;
